/* Paper mode — assembles a CSEC/NCSE-style practice paper from the site's own question
   generators. ?id=<topic>  builds a single-topic paper;  ?s=<strand>&g=<12|3>  builds a
   whole-strand paper. Original questions only. */
(function () {
  var C = window.CURRICULUM, O = window.TOPIC_ORDER, S = window.STRANDS;
  var qs = new URLSearchParams(location.search);
  var id = qs.get('id'), s = qs.get('s'), g = qs.get('g') || '12';
  var GROUPS = { '12': [1, 2], '3': [3] };
  var sourceCodes, title, subtitle, back;
  if (id && C[id]) { sourceCodes = [id]; title = C[id].name; subtitle = 'Form ' + C[id].form + ' · ' + C[id].strand; back = 'topic.html?id=' + id; }
  else if (s) { var forms = GROUPS[g] || GROUPS['12']; sourceCodes = O.filter(function (c) { return C[c].strandId === +s && forms.indexOf(C[c].form) > -1; });
    var st = (S || []).filter(function (x) { return x.id === +s; })[0] || {}; title = st.name || 'Strand'; subtitle = (g === '3' ? 'Form 3 · Current Year' : 'Forms 1 & 2 · Review'); back = 'strand.html?s=' + s + '&g=' + g; }
  else { document.getElementById('paper').innerHTML = '<p>Add ?id=&lt;topic&gt; or ?s=&lt;strand&gt; to the URL.</p>'; return; }

  var LVMARK = { Basic: 1, Intermediate: 2, Advanced: 3 };
  function levelOf(it) { try { return it.level || (it.gen && it.gen().level) || 'Intermediate'; } catch (e) { return 'Intermediate'; } }
  function pool() { var p = []; sourceCodes.forEach(function (code) { var t = C[code]; if (!t.content || !t.content.practice) return; t.content.practice.forEach(function (it) { if (typeof it.gen === 'function') p.push({ code: code, item: it }); }); }); return p; }
  function take(arr, k) { arr = arr.slice(); var o = []; while (o.length < k && arr.length) o.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]); return o; }

  function assemble() {
    var pl = pool(), N = id ? 10 : 12;
    var byLv = { Basic: [], Intermediate: [], Advanced: [] };
    pl.forEach(function (p) { (byLv[levelOf(p.item)] || byLv.Intermediate).push(p); });
    var plan = take(byLv.Basic, Math.round(N * 0.25)).concat(take(byLv.Intermediate, Math.round(N * 0.45))).concat(take(byLv.Advanced, N));
    plan = plan.slice(0, N);
    while (plan.length < N && pl.length) plan.push(pl[Math.floor(Math.random() * pl.length)]);
    // easy → hard within the paper
    var rank = { Basic: 0, Intermediate: 1, Advanced: 2 };
    plan.sort(function (a, b) { return rank[levelOf(a.item)] - rank[levelOf(b.item)]; });
    var items = [], used = {};
    plan.forEach(function (p) { var tries = 0, q; do { q = p.item.gen(); tries++; } while (q && used[q.q] && tries < 10); if (q) { used[q.q] = 1; q._lv = levelOf(p.item); q._marks = LVMARK[q._lv] || 2; q._code = p.code; items.push(q); } });
    return items;
  }

  var items = [], timer = null, remain = 0;
  function totalMarks() { return items.reduce(function (a, q) { return a + q._marks; }, 0); }

  function render() {
    items = assemble();
    var marks = totalMarks(), mins = Math.max(15, Math.round(marks * 1.5));
    var el = document.getElementById('paper');
    var head =
      '<div class="paper-controls">' +
      '<a class="btn ghost" href="' + back + '">← Back</a>' +
      '<button class="btn" id="newPaper">↻ New paper</button>' +
      '<button class="btn ghost" id="startTimer">▶ Start timer</button>' +
      '<button class="btn ghost" id="showAns">Show answers</button>' +
      '<button class="btn" id="printPaper">🖶 Print / Save PDF</button>' +
      '<span id="clock" class="clock"></span></div>';
    var cover =
      '<div class="paper-head">' +
      '<div class="paper-code">CLASS OF 2029</div>' +
      '<h1>MATHEMATICS</h1>' +
      '<h2>' + title + ' — Practice Paper</h2>' +
      '<div class="paper-sub">' + subtitle + '</div>' +
      '<table class="paper-meta"><tr><td>Time: <b>' + mins + ' minutes</b></td><td>Total: <b>' + marks + ' marks</b></td><td>Questions: <b>' + items.length + '</b></td></tr></table>' +
      '<p class="paper-instr"><b>Answer ALL questions.</b> Show all necessary working. Marks are shown in brackets [ ] at the end of each question.</p>' +
      '</div>';
    var body = items.map(function (q, i) {
      var opts = '';
      if (q.type === 'mc') {
        opts = '<ol class="paper-opts" type="A">' + q.options.map(function (o) { return '<li>' + o + '</li>'; }).join('') + '</ol>';
      } else {
        opts = '<div class="paper-answerline">Answer: ...........................................</div>';
      }
      return '<div class="paper-q"><div class="paper-qnum">' + (i + 1) + '.</div><div class="paper-qbody">' +
        '<div class="paper-qtext">' + q.q + '</div>' + opts +
        '<div class="paper-work"></div>' +
        '<div class="paper-marks">[' + q._marks + ']</div></div></div>';
    }).join('');
    var key = '<div class="paper-key" id="paperKey" style="display:none"><h3>Answer key</h3><ol>' +
      items.map(function (q) {
        var a = (q.type === 'mc') ? ('ABCD'[q.answer] + ')  ' + q.options[q.answer]) : (Array.isArray(q.answer) ? q.answer[0] : q.answer);
        return '<li>' + a + '  <span class="km">[' + q._marks + ']</span></li>';
      }).join('') + '</ol><p class="paper-total">Total: ' + marks + ' marks</p></div>';
    el.innerHTML = head + '<div class="paper-sheet">' + cover + body + key + '</div>';
    wire();
  }

  function wire() {
    document.getElementById('newPaper').onclick = function () { stopTimer(); render(); };
    document.getElementById('showAns').onclick = function () { var k = document.getElementById('paperKey'); var on = k.style.display === 'none'; k.style.display = on ? 'block' : 'none'; this.textContent = on ? 'Hide answers' : 'Show answers'; if (on) k.scrollIntoView({ behavior: 'smooth' }); };
    document.getElementById('printPaper').onclick = function () { window.print(); };
    document.getElementById('startTimer').onclick = function () {
      if (timer) { stopTimer(); this.textContent = '▶ Start timer'; return; }
      remain = Math.max(15, Math.round(totalMarks() * 1.5)) * 60; this.textContent = '⏸ Stop timer';
      tick(); timer = setInterval(tick, 1000);
    };
  }
  function tick() { var m = Math.floor(remain / 60), s = remain % 60; document.getElementById('clock').textContent = '⏱ ' + m + ':' + (s < 10 ? '0' : '') + s; if (remain <= 0) { stopTimer(); document.getElementById('clock').textContent = "⏱ Time's up!"; return; } remain--; }
  function stopTimer() { if (timer) { clearInterval(timer); timer = null; } var b = document.getElementById('startTimer'); if (b) b.textContent = '▶ Start timer'; }

  render();
})();
