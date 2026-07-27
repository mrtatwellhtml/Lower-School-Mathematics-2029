/* Shared logic: progress (localStorage) + rendering. Dependency-free. */
(function(){
  "use strict";
  var KEY='mathreview.progress.v1';
  var MASTERY=0.8; // 80% to master

  // ---- progress store ----
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY))||{}; }catch(e){ return {}; } }
  function save(p){ localStorage.setItem(KEY, JSON.stringify(p)); }
  function get(code){ return load()[code]||{status:'none'}; }
  function set(code, patch){ var p=load(); p[code]=Object.assign({}, p[code], patch, {updated:Date.now()}); save(p); return p[code]; }
  window.Progress={load:load,get:get,set:set,MASTERY:MASTERY,
    reset:function(){ if(confirm('Reset ALL your progress on this device? This cannot be undone.')){ localStorage.removeItem(KEY); location.reload(); } }
  };

  // ---- helpers ----
  function qp(n){ return new URLSearchParams(location.search).get(n); }
  function el(tag,cls,html){ var e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; }
  function statusClass(s){ return s==='mastered'?'m':s==='progress'?'p':'n'; }
  function statusLabel(s){ return s==='mastered'?'Mastered':s==='progress'?'In progress':'Not started'; }
  var STRAND_VARS={1:'--s1',2:'--s2',3:'--s3',4:'--s4',5:'--s5',6:'--s6'};
  function strandColor(id){ return getComputedStyle(document.documentElement).getPropertyValue(STRAND_VARS[id]).trim(); }
  window.Site={qp:qp,el:el,statusClass:statusClass,statusLabel:statusLabel,strandColor:strandColor};

  // ---- shared header ----
  window.renderHeader=function(){
    var h=document.querySelector('header.site .wrap');
    if(!h) return;
  };

  // ---- HOME / dashboard ----
  window.renderHome=function(){
    var C=window.CURRICULUM, order=window.TOPIC_ORDER, prog=load();
    var codes=order;
    var mastered=codes.filter(function(c){return (prog[c]||{}).status==='mastered';}).length;
    var inprog=codes.filter(function(c){return (prog[c]||{}).status==='progress';}).length;
    var pct=Math.round(mastered/codes.length*100);
    var ring=document.getElementById('ring');
    ring.style.setProperty('--p',pct); ring.querySelector('b').textContent=pct+'%';
    document.getElementById('ovmeta').innerHTML=
      '<h3>Your review progress</h3><p><b>'+mastered+'</b> of '+codes.length+
      ' topics mastered · '+inprog+' in progress. Progress is saved on this device.</p>'+
      '<div class="legend"><span><i class="dot m"></i>Mastered</span>'+
      '<span><i class="dot p"></i>In progress</span><span><i class="dot n"></i>Not started</span></div>';

    var grid=document.getElementById('grid');
    window.STRANDS.forEach(function(s){
      var tc=order.filter(function(c){return C[c].strandId===s.id;});
      var built=tc.filter(function(c){return C[c].content;}).length;
      var m=tc.filter(function(c){return (prog[c]||{}).status==='mastered';}).length;
      var col=strandColor(s.id);
      var card=el('a','scard'); card.href='strand.html?s='+s.id; card.style.setProperty('--sc',col);
      card.innerHTML='<div style="display:flex;justify-content:space-between;align-items:start;gap:8px">'+
        '<div><h3>'+s.name+'</h3><div class="sub">'+tc.length+' topics · Forms 1–3</div></div>'+
        (built? '<span class="badge ready">Ready</span>':'<span class="badge soon">Soon</span>')+'</div>'+
        '<div class="bar"><i style="width:'+(m/tc.length*100)+'%"></i></div>'+
        '<div class="stat"><span>'+m+' / '+tc.length+' mastered</span><span>'+
        (built?built+' built':'coming soon')+'</span></div>';
      grid.appendChild(card);
    });
  };

  // ---- STRAND page ----
  window.renderStrand=function(){
    var C=window.CURRICULUM, id=+qp('s'), prog=load();
    var s=window.STRANDS.find(function(x){return x.id===id;});
    var col=strandColor(id);
    document.getElementById('crumbs').innerHTML='<a href="index.html">Home</a> › '+s.name;
    var head=document.getElementById('shead');
    head.innerHTML='<h1 style="color:'+col+'">'+s.name+'</h1>'+
      '<p>Select a topic to review its objectives, notes, worked examples and practice.</p>';
    var list=document.getElementById('tlist');
    window.TOPIC_ORDER.filter(function(c){return C[c].strandId===id;}).forEach(function(c){
      var t=C[c], st=(prog[c]||{}).status||'none', built=!!t.content;
      var li=el('li','trow'+(built?'':' locked'));
      li.innerHTML='<span class="code">'+t.code+'</span>'+
        '<span class="tt"><b>'+t.name+'</b><small>Form '+t.form+' · '+t.objectives.length+' objectives'+
        (built?'':' · content coming soon')+'</small></span>'+
        '<span class="status '+statusClass(st)+'">'+statusLabel(st)+'</span>';
      if(built){ li.style.cursor='pointer'; li.onclick=function(){location.href='topic.html?id='+t.code;}; }
      list.appendChild(li);
    });
  };

  // ---- TOPIC page ----
  window.renderTopic=function(){
    var C=window.CURRICULUM, code=qp('id'), t=C[code];
    if(!t){ document.getElementById('topic').innerHTML='<p>Topic not found.</p>'; return; }
    var col=strandColor(t.strandId);
    document.getElementById('crumbs').innerHTML=
      '<a href="index.html">Home</a> › <a href="strand.html?s='+t.strandId+'">'+t.strandShort+'</a> › '+t.code;
    var root=document.getElementById('topic');

    // header
    var hd=el('div','');
    hd.innerHTML='<h1>'+t.name+'</h1><div class="tagrow">'+
      '<span class="tag strand" style="background:'+col+'">'+t.strand+'</span>'+
      '<span class="tag">Form '+t.form+'</span><span class="tag">Code '+t.code+'</span></div>';
    root.appendChild(hd);

    // objectives
    var os=el('div','section');
    os.innerHTML='<h2>What you should be able to do</h2>';
    var ul=el('ul','objlist');
    t.objectives.forEach(function(o){ ul.appendChild(el('li',null,'I can '+o.charAt(0).toLowerCase()+o.slice(1))); });
    os.appendChild(ul); root.appendChild(os);

    // prerequisites
    var pr=el('div','section');
    pr.innerHTML='<h2>Before you start</h2><p>Be comfortable with:</p>';
    var chips=el('div','chips');
    t.prereq.forEach(function(p){ chips.appendChild(el('span','chip',p)); });
    pr.appendChild(chips); root.appendChild(pr);

    if(t.content){
      // notes
      t.content.notes.forEach(function(sec){
        var d=el('div','section note'); d.innerHTML='<h2>'+sec.h+'</h2>'+sec.html; root.appendChild(d);
      });
      // examples
      if(t.content.examples&&t.content.examples.length){
        var ex=el('div','section'); ex.innerHTML='<h2>Worked examples</h2>';
        t.content.examples.forEach(function(e,i){
          var box=el('div','eg');
          var steps=(e.steps||[]).map(function(s){return '<li>'+s+'</li>';}).join('');
          box.innerHTML='<div class="q">Example '+(i+1)+': '+e.q+'</div>'+
            '<button class="toggle">Show solution ▾</button>'+
            '<div class="reveal"><ol>'+steps+'</ol><p class="ans">Answer: '+e.answer+'</p></div>';
          box.querySelector('.toggle').onclick=function(){ box.classList.toggle('open');
            this.textContent=box.classList.contains('open')?'Hide solution ▴':'Show solution ▾'; };
          ex.appendChild(box);
        });
        root.appendChild(ex);
      }
      // practice
      if(t.content.practice&&t.content.practice.length){
        root.appendChild(buildPractice(t));
      }
    } else {
      var soon=el('div','section');
      soon.innerHTML='<h2>Notes & practice</h2><div class="soonbox">Full notes, worked examples and practice for this topic are coming soon. The objectives and prerequisites above are final and ready to study from.</div>';
      root.appendChild(soon);
    }

    // assessment / prove-it
    var as=el('div','section');
    as.innerHTML='<h2>Prove it</h2><p>When you can meet every objective, take the Mastery Quiz in Google Classroom'+
      ' (about '+t.quizItems+' questions — score '+(Progress.MASTERY*100)+'% to master this topic).</p>';
    var quizBtn=el('a','btn big',(t.classroomUrl?'Open Mastery Quiz →':'Mastery Quiz — link coming soon'));
    if(t.classroomUrl){ quizBtn.href=t.classroomUrl; quizBtn.target='_blank'; quizBtn.rel='noopener'; }
    else { quizBtn.href='#'; quizBtn.onclick=function(ev){ ev.preventDefault();
      alert('This quiz link has not been added yet. Set classroomUrl for "'+t.code+'" in assets/data.js.'); }; }
    var quizP=el('p'); quizP.appendChild(quizBtn); as.appendChild(quizP);
    root.appendChild(as);

    // status control
    var stObj=Progress.get(code);
    var sc=el('div','section');
    sc.innerHTML='<h2>Mark your progress</h2><p>This is saved on your device and shown on your dashboard.</p>';
    var ctl=el('div','statusctl');
    [['none','◻ Not started'],['progress','◐ In progress'],['mastered','✓ Mastered']].forEach(function(x){
      var b=el('button',null,x[1]); b.dataset.s=x[0];
      if((stObj.status||'none')===x[0]) b.classList.add('active');
      b.onclick=function(){ Progress.set(code,{status:x[0]});
        ctl.querySelectorAll('button').forEach(function(bb){bb.classList.remove('active');});
        b.classList.add('active'); };
      ctl.appendChild(b);
    });
    sc.appendChild(ctl); root.appendChild(sc);
  };

  function buildPractice(t){
    var sec=el('div','section'); sec.innerHTML='<h2>Practice — check yourself</h2>'+
      '<p>Answer these, then press <b>Check my answers</b>. Score '+(Progress.MASTERY*100)+'%+ to unlock the “I mastered it” shortcut.</p>';
    var qs=t.content.practice, inputs=[];
    qs.forEach(function(q,i){
      var pq=el('div','pq'); pq.dataset.i=i;
      var body='<div class="qn">'+(i+1)+'. '+q.q+'</div>';
      if(q.type==='mc'){
        body+='<div class="opts">'+q.options.map(function(o,j){
          return '<label><input type="radio" name="q'+i+'" value="'+j+'"> <span>'+o+'</span></label>';
        }).join('')+'</div>';
      } else {
        body+='<input type="text" autocomplete="off" placeholder="your answer">';
      }
      body+='<div class="fb ok">✓ Correct</div><div class="fb no">✗ Not quite</div>'+
            (q.hint?'<div class="hint">Hint: '+q.hint+'</div>':'');
      pq.innerHTML=body; sec.appendChild(pq); inputs.push(pq);
    });
    var actions=el('div',''); actions.style.marginTop='10px';
    actions.innerHTML='<button class="btn" id="checkBtn">Check my answers</button> '+
      '<button class="btn ghost" id="clearBtn">Clear</button>';
    sec.appendChild(actions);
    var scorebox=el('div','scorebox'); sec.appendChild(scorebox);

    function norm(s){ return String(s).trim().toLowerCase().replace(/\s+/g,'').replace(/^\+/,''); }
    actions.querySelector('#checkBtn').onclick=function(){
      var correct=0;
      qs.forEach(function(q,i){
        var pq=inputs[i], ok=false;
        if(q.type==='mc'){
          var sel=pq.querySelector('input:checked'); ok=sel&&(+sel.value===q.answer);
        } else {
          var v=pq.querySelector('input').value;
          var accept=Array.isArray(q.answer)?q.answer:[q.answer];
          ok=accept.some(function(a){return norm(a)===norm(v);});
        }
        pq.classList.remove('correct','wrong'); pq.classList.add(ok?'correct':'wrong');
        if(ok)correct++;
      });
      var pct=Math.round(correct/qs.length*100);
      scorebox.classList.add('show');
      var pass=pct>=Progress.MASTERY*100;
      scorebox.innerHTML='You scored <b>'+correct+'/'+qs.length+'</b> ('+pct+'%). '+
        (pass?'Great — you’re ready for the Mastery Quiz. ':'Review the notes and try again. ')+
        '<button class="btn ghost" id="markBtn" '+(pass?'':'disabled')+' style="margin-left:8px">Mark “In progress”'+(pass?' → set Mastered':'')+'</button>';
      var mp=Progress.get(t.code); var best=Math.max(mp.bestScore||0,pct);
      Progress.set(t.code,{bestScore:best, status: mp.status==='mastered'?'mastered':'progress'});
      var mb=scorebox.querySelector('#markBtn');
      if(mb) mb.onclick=function(){ Progress.set(t.code,{status:pass?'mastered':'progress'});
        alert(pass?'Marked as Mastered on this device. Now confirm it with the Classroom quiz!':'Marked as In progress.');
        location.reload(); };
    };
    actions.querySelector('#clearBtn').onclick=function(){
      inputs.forEach(function(pq){ pq.classList.remove('correct','wrong');
        var t=pq.querySelector('input[type=text]'); if(t)t.value='';
        pq.querySelectorAll('input:checked').forEach(function(r){r.checked=false;}); });
      scorebox.classList.remove('show');
    };
    return sec;
  }
})();
