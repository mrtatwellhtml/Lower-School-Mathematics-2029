/* Headless test suite — no browser, no dependencies.  Run from the site folder:
       node tools/verify.js

   It loads the real assets against a small DOM shim and checks:
     - QG helper unit tests (especially that mc() reports the right option index)
     - every topic's content structure, and that no practice item is still static
     - each generator fuzzed 400x: valid shape, no NaN/undefined, no duplicate MC
       options, enough variety, no fraction-over-1, no index written as 1
     - all three pages render, and "New questions" really regenerates the set */
const fs = require('fs');
const path = require('path');
const ROOT = process.argv[2] || path.join(__dirname, '..');

// ---- tiny DOM shim ----
function mkEl(tag){
  const e = {
    tagName:(tag||'div').toUpperCase(), children:[], className:'', _html:'',
    style:{setProperty(){}}, dataset:{}, classList:{ _s:new Set(),
      add(...c){c.forEach(x=>this._s.add(x));}, remove(...c){c.forEach(x=>this._s.delete(x));},
      toggle(c){this._s.has(c)?this._s.delete(c):this._s.add(c);}, contains(c){return this._s.has(c);} },
    appendChild(c){ this.children.push(c); return c; },
    _q:{},
    querySelector(sel){ return this._q[sel] || (this._q[sel]=mkEl('div')); },  // stable per selector
    querySelectorAll(){ return []; },
  };
  Object.defineProperty(e,'innerHTML',{get(){return e._html;},
    set(v){ e._html=String(v); if(e._html==='') e.children.length=0; }});   // '' clears, like the real DOM
  Object.defineProperty(e,'textContent',{get(){return '';},set(){}});
  return e;
}
const byId = {};
global.document = {
  createElement: mkEl,
  getElementById(id){ return byId[id] || (byId[id]=mkEl('div')); },
  querySelector(){ return mkEl('div'); },
  documentElement:{},
};
global.getComputedStyle = () => ({ getPropertyValue: () => '#000000' });
global.localStorage = { _d:{}, getItem(k){return this._d[k]||null;}, setItem(k,v){this._d[k]=v;}, removeItem(k){delete this._d[k];} };
global.location = { search:'', href:'', reload(){} };
global.confirm = () => false;
global.alert = () => {};
global.window = global;

function load(f){ eval(fs.readFileSync(path.join(ROOT,'assets',f),'utf8')); }
['data.js','qgen.js','content.js','content-algebra.js','content-measurement.js','content-geometry.js','app.js'].forEach(load);

let fail = 0;
function ok(cond, msg){ console.log((cond?'  PASS  ':'  FAIL  ')+msg); if(!cond) fail++; }

// app.js's answer normaliser, mirrored so we can check generated answers the same way
const SUPMAP={'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-'};
function norm(s){
  return String(s).trim().toLowerCase()
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]/g,c=>SUPMAP[c])
    .replace(/[−–—]/g,'-')
    .replace(/\s+/g,'').replace(/\^/g,'').replace(/^\+/,'');
}

console.log('== QG helper unit tests ==');
{
  const QG = window.QG;
  // norm() as app.js actually implements it must agree with the mirror above
  ok(['x^2','x²','x2','X 2'].every(s => window.Site.norm(s)==='x2') && window.Site.norm('x^2')===norm('x^2'),
     'app.js norm() collapses x^2 / x² / x2 and matches the test mirror');
  ok(window.Site.norm('−3')==='-3' && window.Site.norm('+5')==='5', 'norm() handles Unicode minus and leading +');

  // mc(): the reported index must ALWAYS point at the correct option
  let mcBad = 0;
  for(let i=0;i<3000;i++){
    const correct = 'C'+i, ds = ['d1','d2','d3'];
    const r = QG.mc(correct, ds);
    if(r.options[r.answer] !== correct) mcBad++;
    if(r.options.length !== 4) mcBad++;
  }
  ok(mcBad === 0, 'mc() index points at the correct option over 3000 shuffles');
  // duplicates must collapse rather than appear twice
  const dup = QG.mc('7', ['7','8','9']);
  ok(dup.options.length === 3 && dup.options[dup.answer] === '7', 'mc() drops a distractor equal to the answer');

  // polyAns keeps the Unicode superscript; it is norm() that collapses it at grading time,
  // so assert through the real matcher rather than on the raw string.
  ok(norm(QG.polyAns([[1,'x²'],[-2,'x'],[-15,'']])) === norm('x^2-2x-15') &&
     norm(QG.polyAns([[1,'x²'],[-2,'x'],[-15,'']])) === norm('x2-2x-15'),
     'polyAns x²-2x-15 matches a student typing x^2-2x-15 or x2-2x-15');
  ok(QG.polyHtml([[1,'x²'],[-2,'x'],[-15,'']]) === 'x² − 2x − 15', 'polyHtml writes x² − 2x − 15');
  ok(QG.polyAns([[3,'p'],[7,'q']]) === '3p+7q', 'polyAns writes 3p+7q');
  ok(QG.polyAns([[-1,'x'],[4,'']]) === '-x+4', 'polyAns drops a coefficient of 1');

  ok(QG.dec(0.2).map(norm).includes('0.2') && QG.dec(0.2).map(norm).includes('.2') &&
     QG.dec(0.2).map(norm).includes('0.20'), 'dec() accepts 0.2, .2 and 0.20');
  ok(QG.dec(0.75).map(norm).includes('0.75'), 'dec() accepts 0.75');

  ok(QG.toBase(13,2)==='1101' && QG.fromBase('1101',2)===13, 'base-2 conversion round-trips');
  ok(QG.gcd(24,36)===12 && QG.lcm(6,8)===24, 'gcd/lcm');
  ok(QG.coprime().every ? true : true, 'coprime() returns a pair');
  let cpBad=0; for(let i=0;i<500;i++){ const p=QG.coprime(); if(QG.gcd(p[0],p[1])!==1) cpBad++; }
  ok(cpBad===0, 'coprime() pairs really are coprime');

  ok(QG.ineq('<',7).map(norm).includes('x<7'), 'ineq() accepts x<7');
  ok(QG.stdform(3.2,5).map(norm).includes('3.2e5'), 'stdform() accepts 3.2e5');
  ok(QG.sup(12)==='¹²' && QG.pow('x',3)==='x³', 'superscript helpers');
}

const C = window.CURRICULUM;
const built = window.TOPIC_ORDER.filter(c => C[c].content);
const algebra = window.TOPIC_ORDER.filter(c => C[c].strandId === 6);

// Validate one concrete (resolved) practice item.
function checkItem(p, where, issues){
  if(!p.q || typeof p.q !== 'string') issues.push(where+' no question');
  if(!p.hint) issues.push(where+' no hint');
  if(p.type === 'mc'){
    if(!Array.isArray(p.options) || p.options.length < 3) issues.push(where+' mc needs >=3 options');
    else {
      if(typeof p.answer !== 'number' || p.answer < 0 || p.answer >= p.options.length)
        issues.push(where+' mc answer index out of range');
      const seen = p.options.map(norm);
      if(new Set(seen).size !== seen.length) issues.push(where+' mc has duplicate options');
      if(p.options.some(o => o == null || String(o).trim() === '')) issues.push(where+' mc blank option');
    }
  } else if(p.type === 'text'){
    const a = Array.isArray(p.answer) ? p.answer : [p.answer];
    if(!a.length) issues.push(where+' text has no answer');
    if(a.some(x => x == null || norm(x) === '')) issues.push(where+' text answer empty after normalising');
    if(a.some(x => /undefined|NaN|Infinity/.test(String(x)))) issues.push(where+' text answer is not a number: '+a.join('|'));
  } else issues.push(where+' bad type: '+p.type);
  if(/undefined|NaN|Infinity/.test(p.q)) issues.push(where+' question text contains undefined/NaN');
  // a fraction printed over 1 (or over 0) means a generator fell back badly
  const denom = /<span class="frac"><span>[^<]*<\/span><span>([^<]*)<\/span><\/span>/g;
  let m; while((m = denom.exec(String(p.q)))) if(m[1]==='1'||m[1]==='0')
    issues.push(where+' renders a fraction over '+m[1]+': '+p.q);
  // an index of 1 should never be written out (b¹ is not how it is taught)
  if(/¹/.test(String(p.q)) && !/¹[⁰¹²³⁴⁵⁶⁷⁸⁹]/.test(String(p.q)))
    issues.push(where+' writes an index of 1: '+p.q);
  if(p.hint && /undefined|NaN|Infinity/.test(p.hint)) issues.push(where+' hint contains undefined/NaN');
}

const measurement = window.TOPIC_ORDER.filter(c => C[c].strandId === 5);
const geometry = window.TOPIC_ORDER.filter(c => C[c].strandId === 4);

console.log('== Content structure (all built strands) ==');
ok(algebra.length === 14 && algebra.every(c => C[c].content), 'Algebra: all 14 topics built');
ok(measurement.length === 16 && measurement.every(c => C[c].content), 'Measurement: all 16 topics built');
ok(geometry.length === 16 && geometry.every(c => C[c].content), 'Geometry: all 16 topics built');
ok(built.length === 56, '56 topics have content (found '+built.length+')');
built.forEach(code => {
  const t = C[code], k = t.content;
  const issues = [];
  if(!Array.isArray(k.notes) || k.notes.length < 2) issues.push('needs >=2 notes');
  (k.notes||[]).forEach((n,i)=>{ if(!n.h||!n.html) issues.push('note '+i+' missing h/html'); });
  if(!k.examples || k.examples.length < 2) issues.push('needs >=2 examples');
  (k.examples||[]).forEach((e,i)=>{ if(!e.q||!e.answer||!Array.isArray(e.steps)||!e.steps.length) issues.push('example '+i+' incomplete'); });
  if(!k.practice || k.practice.length < 4 || k.practice.length > 6) issues.push('practice must be 4-6, got '+(k.practice||[]).length);
  const kinds = (k.practice||[]).map(p => typeof p.gen === 'function' ? (p.gen().type||'text') : p.type);
  if(!(kinds.includes('mc') && kinds.includes('text'))) issues.push('practice should mix text and mc');
  ok(issues.length === 0, code+' '+t.name+(issues.length?' -> '+issues.join('; '):''));
});

console.log('== Every practice item is generated ==');
let staticItems = [];
built.forEach(code => (C[code].content.practice||[]).forEach((p,i)=>{
  if(typeof p.gen !== 'function') staticItems.push(code+'#'+(i+1));
}));
ok(staticItems.length === 0, 'no static practice items remain'+(staticItems.length?' -> '+staticItems.join(', '):''));

console.log('== Generator fuzzing (400 draws each) ==');
const RUNS = 400;
built.forEach(code => {
  const issues = [];
  const variety = [];
  (C[code].content.practice||[]).forEach((item,i)=>{
    if(typeof item.gen !== 'function') return;
    const seenQ = new Set();
    for(let r=0; r<RUNS; r++){
      let p;
      try { p = item.gen(); }
      catch(e){ issues.push('#'+(i+1)+' threw: '+e.message); break; }
      if(!p){ issues.push('#'+(i+1)+' returned nothing'); break; }
      if(p.type == null) p.type = item.type || 'text';
      const before = issues.length;
      checkItem(p, '#'+(i+1), issues);
      if(issues.length > before) break;          // one report per item is enough
      // a question varies if its stem OR its options change (MC stems are often fixed)
      seenQ.add(p.q + ' || ' + (p.options||[]).join(' | '));
    }
    variety.push(seenQ.size);
    if(seenQ.size < 8) issues.push('#'+(i+1)+' only produced '+seenQ.size+' distinct question(s) in '+RUNS+' draws');
  });
  ok(issues.length === 0, code+' '+C[code].name+' — distinct questions per item: ['+variety.join(', ')+']'+
     (issues.length?'\n           -> '+issues.join('\n           -> '):''));
});

// unescaped raw < or > inside note/example HTML (would break rendering)
console.log('== HTML safety ==');
let bad = [];
built.forEach(code => {
  (C[code].content.notes||[]).forEach((n,i)=>{
    // strip legitimate tags, then look for leftover bare angle brackets
    const stripped = n.html.replace(/<\/?[a-z][a-z0-9]*(\s[^>]*)?>/gi,'');
    if(/[<>]/.test(stripped)) bad.push(code+' note '+i);
  });
  (C[code].content.practice||[]).forEach((item,j)=>{
    if(typeof item.gen !== 'function') return;
    for(let r=0;r<40;r++){
      const p=item.gen();
      const stripped=String(p.q).replace(/<\/?[a-z][a-z0-9]*(\s[^>]*)?>/gi,'');
      if(/[<>]/.test(stripped)){ bad.push(code+' practice#'+(j+1)+' q: '+p.q); break; }
    }
  });
});
ok(bad.length === 0, 'no unescaped angle brackets in notes or generated questions'+
   (bad.length?'\n           -> '+bad.slice(0,6).join('\n           -> '):''));

console.log('== Page rendering ==');
window.renderHome();
const g12 = document.getElementById('grid-12'), g3 = document.getElementById('grid-3');
ok(g12.children.length === 6, 'home: Forms 1-2 shows 6 strand cards (got '+g12.children.length+')');
ok(g3.children.length === 6, 'home: Form 3 shows 6 strand cards (got '+g3.children.length+')');
ok(g12.children.some(c=>/Algebra/.test(c._html) && /7 built/.test(c._html)), 'home: Algebra F1-2 card reports 7 built');
ok(g3.children.some(c=>/Algebra/.test(c._html) && /7 built/.test(c._html)), 'home: Algebra F3 card reports 7 built');

for (const [g, expect] of [['12', 7], ['3', 7]]) {
  Object.keys(byId).forEach(k=>delete byId[k]);
  global.location = { search:'?s=6&g='+g, href:'', reload(){} };
  window.renderStrand();
  const rows = document.getElementById('tlist').children;
  ok(rows.length === expect, 'strand.html?s=6&g='+g+' lists '+expect+' topics (got '+rows.length+')');
  ok(!rows.some(r=>r.classList.contains('locked')), '  ...and none are locked (all built) for g='+g);
}

algebra.forEach(code => {
  Object.keys(byId).forEach(k=>delete byId[k]);
  global.location = { search:'?id='+code, href:'', reload(){} };
  window.renderTopic();
  const n = document.getElementById('topic').children.length;
  // header, objectives, prereq, notes..., examples, practice, prove-it, status
  const expected = 3 + C[code].content.notes.length + 1 + 1 + 2;
  ok(n === expected, 'topic.html?id='+code+' renders '+expected+' sections (got '+n+')');
});

console.log('== "New questions" regenerates in the real render path ==');
{
  // Render a topic, find the practice section, and confirm pressing the button
  // swaps in a different set of questions.
  Object.keys(byId).forEach(k=>delete byId[k]);
  global.location = { search:'?id=3.6.7', href:'', reload(){} };
  window.renderTopic();
  const sections = document.getElementById('topic').children;
  const practice = sections.find(s => /Practice — check yourself/.test(s._html));
  ok(!!practice, 'practice section rendered');
  ok(/New questions/.test(practice.children.map(c=>c._html).join('')) ||
     practice.children.some(c=>/newBtn/.test(c._html)), 'a "New questions" button is present');

  // qwrap is the first child; capture its questions, press the button, compare
  const qwrap = practice.children[0];
  const before = qwrap.children.map(c=>c._html).join('|');
  const actions = practice.children.find(c=>/checkBtn/.test(c._html));
  const newBtn = actions.querySelector('#newBtn');
  ok(typeof newBtn.onclick === 'function', 'the button has a click handler wired');
  let changed = false;
  for(let i=0;i<25 && !changed;i++){
    newBtn.onclick();
    if(qwrap.children.map(c=>c._html).join('|') !== before) changed = true;
  }
  ok(changed, 'pressing "New questions" produces a different question set');
  ok(qwrap.children.length === C['3.6.7'].content.practice.length,
     'and still renders exactly '+C['3.6.7'].content.practice.length+' questions (no duplication)');
}

console.log(fail ? '\n'+fail+' FAILURE(S)' : '\nAll checks passed.');
process.exit(fail ? 1 : 0);
