/* Question-generator helpers (window.QG).
   Loaded BEFORE the content files. Dependency-free.

   A practice item may be static:
       { type:'text', q:'…', answer:'…', hint:'…' }
   or generated — a function returning a fresh item every time it is called:
       { gen:function(){ var a=QG.int(2,9); return {type:'text', q:'…', answer:[…], hint:'…'}; } }

   app.js calls gen() each time the practice set is built or the student presses
   "New questions", so every attempt is a different set of numbers.

   ANSWER STRINGS: app.js normalises before comparing — it lowercases, strips all
   whitespace, drops a leading '+', maps the Unicode minus/en-dash to '-', turns
   superscript digits into ordinary ones and removes '^'. So 'x^2', 'x²' and 'x2'
   all match, and you never need to list those variants yourself. */
(function(){
  "use strict";

  // ---- random ----
  function int(a,b){ return a + Math.floor(Math.random()*(b-a+1)); }          // inclusive
  function nz(a,b){ var v; do{ v=int(a,b); }while(v===0); return v; }         // non-zero
  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
  function shuffle(a){ a=a.slice();
    for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)), t=a[i]; a[i]=a[j]; a[j]=t; }
    return a; }
  function sample(a,n){ return shuffle(a).slice(0,n); }
  function chance(p){ return Math.random()<p; }
  function sign(){ return chance(0.5)?1:-1; }

  // ---- number theory ----
  function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ var t=b; b=a%b; a=t; } return a; }
  function lcm(a,b){ return Math.abs(a*b)/gcd(a,b); }
  function simp(a,b){ var g=gcd(a,b)||1; return [a/g,b/g]; }
  // coprime pairs used to build "nice" HCF/LCM/fraction questions
  var COPRIME=[[2,3],[2,5],[2,7],[2,9],[3,4],[3,5],[3,7],[3,8],[4,5],[4,7],[4,9],
               [5,6],[5,7],[5,8],[5,9],[6,7],[7,8],[7,9],[8,9]];
  function coprime(){ var p=pick(COPRIME); return chance(0.5)?[p[1],p[0]]:p; }

  // ---- display ----
  function frac(a,b){ return '<span class="frac"><span>'+a+'</span><span>'+b+'</span></span>'; }
  function num(n){ return String(n).replace('-','−'); }   // proper minus sign for display
  var SUP={0:'⁰',1:'¹',2:'²',3:'³',4:'⁴',5:'⁵',
           6:'⁶',7:'⁷',8:'⁸',9:'⁹','-':'⁻'};
  function sup(n){ return String(n).split('').map(function(c){ return SUP[c]||c; }).join(''); }
  // 'x',3 -> 'x³'.  An index of 1 is never written: 'x',1 -> 'x'
  function pow(base,e){ return e===1 ? String(base) : base+sup(e); }
  // a bracketed value, so substitutions read correctly: sub(-3) -> '(−3)'
  function sub(n){ return n<0 ? '('+num(n)+')' : String(n); }

  /* Build a polynomial from parts [[coef, varPart], …]; varPart '' for a constant.
     Use Unicode superscripts in varPart ('x²') — they normalise to 'x2'.
     Returns { html:'3x − 4y + 5', ascii:'3x-4y+5' }. */
  function poly(parts){
    var html='', ascii='', first=true;
    parts.forEach(function(p){
      var c=p[0], v=p[1]||'';
      if(c===0) return;
      var mag=Math.abs(c), body = v ? (mag===1?v:mag+v) : String(mag);
      if(first){ html+=(c<0?'−':'')+body; ascii+=(c<0?'-':'')+body; first=false; }
      else     { html+=(c<0?' − ':' + ')+body; ascii+=(c<0?'-':'+')+body; }
    });
    return first ? {html:'0', ascii:'0'} : {html:html, ascii:ascii};
  }
  function polyHtml(parts){ return poly(parts).html; }
  function polyAns(parts){ return poly(parts).ascii; }

  /* Multiple choice: shuffle the correct answer in among the distractors and
     report where it landed. Duplicates are dropped, so distractors that happen to
     equal the answer cannot appear twice. */
  function mc(correct, distractors){
    var opts=[String(correct)];
    (distractors||[]).forEach(function(d){ d=String(d); if(opts.indexOf(d)<0) opts.push(d); });
    opts=shuffle(opts);
    return { options:opts, answer:opts.indexOf(String(correct)) };
  }

  /* ---- inline SVG diagram primitives ----
     Shared by the Geometry, Sets and Statistics strands. Plain markup, no runtime
     dependency, nothing fetched — the diagram is part of the note's HTML. */
  var INK='#24435e', ACC='#2b7fd4', FILL='#e8f1fa';
  function dia(w,h,body){
    return '<svg class="dia" viewBox="0 0 '+w+' '+h+'" role="img" '+
           'style="max-width:'+w+'px" xmlns="http://www.w3.org/2000/svg">'+body+'</svg>';
  }
  function ln(x1,y1,x2,y2,c,sw){
    return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+
           '" stroke="'+(c||INK)+'" stroke-width="'+(sw||2)+'" stroke-linecap="round"/>';
  }
  function txt(x,y,s,c,sz){
    return '<text x="'+x+'" y="'+y+'" fill="'+(c||INK)+'" font-size="'+(sz||13)+
           '" font-family="system-ui,sans-serif" text-anchor="middle">'+s+'</text>';
  }
  function polyg(pts,fill){
    return '<polygon points="'+pts+'" fill="'+(fill||FILL)+'" stroke="'+INK+'" stroke-width="2"/>';
  }
  function rect(x,y,w,h,fill){
    return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+(fill||FILL)+
           '" stroke="'+INK+'" stroke-width="2"/>';
  }
  function circ(cx,cy,r,fill,c){
    return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+(fill||'none')+
           '" stroke="'+(c||INK)+'" stroke-width="2"/>';
  }
  function arc(cx,cy,r,a1,a2,c){
    var rad=function(d){ return d*Math.PI/180; };
    var x1=cx+r*Math.cos(rad(a1)), y1=cy-r*Math.sin(rad(a1));
    var x2=cx+r*Math.cos(rad(a2)), y2=cy-r*Math.sin(rad(a2));
    var big=(Math.abs(a2-a1)>180)?1:0;
    return '<path d="M '+x1.toFixed(1)+' '+y1.toFixed(1)+' A '+r+' '+r+' 0 '+big+' 0 '+
           x2.toFixed(1)+' '+y2.toFixed(1)+'" fill="none" stroke="'+(c||ACC)+'" stroke-width="2"/>';
  }
  function rightAngle(x,y,dx,dy){
    return '<path d="M '+(x+dx)+' '+y+' L '+(x+dx)+' '+(y+dy)+' L '+x+' '+(y+dy)+
           '" fill="none" stroke="'+ACC+'" stroke-width="2"/>';
  }
  // a filled pie slice from angle a1 to a2 (degrees, anticlockwise from east)
  function slice(cx,cy,r,a1,a2,fill){
    var rad=function(d){ return d*Math.PI/180; };
    var x1=cx+r*Math.cos(rad(a1)), y1=cy-r*Math.sin(rad(a1));
    var x2=cx+r*Math.cos(rad(a2)), y2=cy-r*Math.sin(rad(a2));
    var big=(a2-a1>180)?1:0;
    return '<path d="M '+cx+' '+cy+' L '+x1.toFixed(1)+' '+y1.toFixed(1)+' A '+r+' '+r+' 0 '+
           big+' 0 '+x2.toFixed(1)+' '+y2.toFixed(1)+' Z" fill="'+(fill||FILL)+
           '" stroke="'+INK+'" stroke-width="2"/>';
  }

  // ---- answer-list builders ----
  // round to dp decimal places, killing floating-point dust (3.14*49 -> 153.86, not 153.86000000000001)
  function fix(v,dp){ var m=Math.pow(10,dp==null?2:dp); return Math.round(v*m)/m; }
  // a money answer, accepting 12.50 / $12.50 / 12.5 / $12.5
  function money(v){
    var out={}, two=v.toFixed(2), plain=String(fix(v,2));
    [two, plain].forEach(function(s){ out[s]=1; out['$'+s]=1; });
    return Object.keys(out);
  }
  /* Every sensible way of typing a decimal: 0.2 / .2 / 0.20 / .20 …
     Without this, a student who writes 0.2 for an answer stored as '0.20' is marked wrong. */
  function dec(v){
    var out={}, s=String(v);
    out[s]=1; out[s.replace(/^0\./,'.')]=1; out[s.replace(/^-0\./,'-.')]=1;
    for(var d=1; d<=4; d++){
      var t=v.toFixed(d);
      if(parseFloat(t)===v){ out[t]=1; out[t.replace(/^0\./,'.')]=1; out[t.replace(/^-0\./,'-.')]=1; }
    }
    return Object.keys(out);
  }
  // an inequality answer, accepting 'x<7', '<7' and '7'
  function ineq(op,val){ return ['x'+op+val, op+val, String(val)]; }
  // standard form A × 10ⁿ, accepting the common ways of typing it
  function stdform(A,n){ return [A+'e'+n, A+'x10'+n, A+'×10'+n, A+'*10'+n]; }
  // an equation answer, accepting '5' and 'x=5'
  function root(v,letter){ letter=letter||'x'; return [String(v), letter+'='+v]; }

  // ---- base conversion ----
  function toBase(n,b){ return n.toString(b); }
  function fromBase(s,b){ return parseInt(s,b); }

  window.QG={ int:int, nz:nz, pick:pick, shuffle:shuffle, sample:sample, chance:chance, sign:sign,
              gcd:gcd, lcm:lcm, simp:simp, coprime:coprime,
              frac:frac, num:num, sup:sup, pow:pow, sub:sub,
              poly:poly, polyHtml:polyHtml, polyAns:polyAns, mc:mc,
              dec:dec, fix:fix, money:money, ineq:ineq, stdform:stdform, root:root,
              toBase:toBase, fromBase:fromBase,
              // diagram primitives + the shared palette
              dia:dia, ln:ln, txt:txt, polyg:polyg, rect:rect, circ:circ,
              arc:arc, rightAngle:rightAngle, slice:slice,
              INK:INK, ACC:ACC, FILL:FILL };
})();
