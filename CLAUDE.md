# CLAUDE.md — Mathematics Review site (Class of 2029)

Context and working instructions for continuing this project in Claude Code. Read this
first, then `README.md` for deploy details.

## What this is

A static website giving Class of 2029 students a comprehensive **review of Forms 1 & 2**
mathematics (the knowledge they should have coming into Third Form) plus the **Form 3**
syllabus, kept as a separate section. Each topic has objectives, prerequisites, notes,
worked examples, and self-checking practice. Graded/teacher-visible tracking lives in
**Google Classroom** (linked Google Form quizzes); the website only stores private,
per-device self-progress.

Built by a solo teacher. Priorities: zero cost, no student accounts/PII on the site,
easy to extend topic-by-topic. Hosting target is **GitHub Pages** (plain HTML/CSS/JS,
no build step, no framework).

### Source of truth for content
- `../04 Secondary School Curriculum Form 1-3.pdf` — T&T MOE curriculum. The **objectives**
  in `data.js` are its official learning outcomes (numbering `Form.Strand.Topic.Outcome`).
- `../Class of 2029.docx` — the school's actual teaching sequence.
- `../Math_Review_Framework_Forms1-3.docx` — the **framework/blueprint** (Phase 1). It has
  the full per-topic map: objectives, prerequisites, assessment model. Consult it when
  authoring content or making structural decisions.

## Architecture

Three pages, all data-driven. Load order on every page: `data.js` → `content.js` → `app.js`.

```
index.html      Home. Two SEPARATE sections, each with its own progress ring:
                "Forms 1 & 2 · Review" and "Form 3 · Current Year".
strand.html     ?s=<strandId>&g=<group>  — topic list for one strand within one group.
topic.html      ?id=<code>               — a single topic (e.g. ?id=1.1.1).
assets/
  style.css     All styling. CSS variables at top; one colour var per strand (--s1..--s6).
  app.js        Rendering (renderHome/renderStrand/renderTopic) + progress (window.Progress).
  data.js       AUTO-GENERATED. All 70 topics: code, form, strand, name, objectives[],
                prereq[], quizItems, classroomUrl. Do not hand-edit objectives.
  qgen.js       window.QG — random-number/formatting helpers for generated practice.
  content.js             Hand-authored content — Number strand, attached via set('code',{...}).
  content-algebra.js     Same pattern — Algebra strand.
  content-measurement.js Same pattern — Measurement strand.
tools/
  verify.js     Headless test suite. `node tools/verify.js` — run it after any change.
```

**One content file per strand.** Each is a self-contained IIFE with its own `f()` and
`set()` helpers, loaded after `data.js` in all three HTML pages. When you author a new
strand, add `assets/content-<strand>.js` and a `<script>` tag in `index.html`,
`strand.html` and `topic.html` — order among content files doesn't matter.

## The Form-3-separate rule (important)

Forms 1 & 2 = "Review"; Form 3 = "Current Year". They must never appear in one mixed list.
The mechanism, in `app.js`:

```js
var GROUPS={ '12':{forms:[1,2],label:'Forms 1–2'}, '3':{forms:[3],label:'Form 3'} };
function groupOf(form){ return form===3?'3':'12'; }
```

- Home renders two groups via `renderGroup('12',…)` and `renderGroup('3',…)`.
- Strand/topic links carry `&g=12` or `&g=3`; `renderStrand` filters topics by the group's forms.
- Grouping derives purely from a topic's `form` field — to re-group a topic, change its
  `form` in `data.js`, nothing else. Keep this separation intact in any new work.

## Data model

`data.js` (generated) — one entry per topic keyed by code:
```js
"1.1.1": { code, form:1, strandId:1, strand:"Number Operations & Number Theory",
           strandShort:"Number", name:"Whole Numbers",
           objectives:["explain the historical development…", …],  // official outcomes
           prereq:["Whole Numbers", …], quizItems:12, classroomUrl:"" }
```
`window.STRANDS` (6 strands) and `window.TOPIC_ORDER` (all codes in order) are also defined.

`content.js` — attach rich content only:
```js
set('1.1.1', {
  notes:    [ { h:'Heading', html:'<p>…</p>' } ],            // 2–4 sections, HTML allowed
  examples: [ { q:'…', answer:'…', steps:['step1','step2'] } ], // reveal-on-click solutions
  practice: [ /* generated — see below */ ]
});
```

## Generated practice (important)

Notes and worked examples are fixed. **Practice questions are generated**, so a student
can press *New questions* and get an endless supply of the same kind of problem rather
than memorising five fixed answers. Every practice item across all 24 built topics is a
generator — `tools/verify.js` fails the build if a static one creeps back in.

```js
practice:[
  {gen:function(){
     var a=Q.int(2,8), x=Q.int(2,12);              // pick the numbers FIRST
     return {type:'text', q:'Solve '+a+'x = '+(a*x)+'.',   // build the question FROM them
             answer:Q.root(x), hint:'Divide both sides by '+a+'.'};
  }},
  {gen:function(){
     var o=Q.mc('correct',['wrong1','wrong2','wrong3']);   // mc() shuffles and reports the index
     return {type:'mc', q:'…', options:o.options, answer:o.answer, hint:'…'};
  }},
]
```

Rules that keep generated questions correct:
- **Derive the question from the answer, not the other way round.** Choose the root `x`,
  then print `a*x` as the right-hand side. That makes a wrong answer impossible by
  construction and guarantees whole-number results.
- When a constraint (divisibility) can fail, **search the parameter grid** for the valid
  combinations and `Q.pick` one — never fall back to a degenerate value. A `c=1` fallback
  is what once produced a fraction printed over 1.
- Always build MC options with `Q.mc()`; never hand-write an `answer:` index.
- `Q.int/nz/pick/shuffle/sample/chance`, `Q.gcd/lcm/simp/coprime`, `Q.frac/num/sup/pow/sub`,
  `Q.poly/polyHtml/polyAns`, `Q.dec/ineq/stdform/root`, `Q.toBase/fromBase`. See qgen.js.
- Keep 4–6 practice items per topic, mixing `text` and `mc`.

Answer matching — `norm()` in app.js lowercases, strips whitespace, drops a leading `+`,
maps the Unicode minus to `-`, converts superscript digits to ordinary ones and removes
`^`. So `x^2`, `x²` and `x2` all match and you need not list those variants. Use `Q.dec()`
for decimal answers (it accepts `0.2`, `.2`, `0.20`) and `Q.root()` for equation answers
(accepts `5` and `x=5`).

For display use the `f(a,b)` helper for fractions, `Q.pow`/`Q.sup` for powers, and Unicode
`√ × ° ₂`. No math engine is loaded (keeps it simple). Escape `<` and `>` as `&lt;`/`&gt;`
in question text — the verifier checks this.

## Progress model

`window.Progress` in app.js, stored in `localStorage['mathreview.progress.v1']`:
`{ "1.1.1": { status:'none'|'progress'|'mastered', bestScore, updated } }`.
Mastery threshold = **80%** (`MASTERY` const). Scoring 80%+ on on-site practice unlocks a
"Mark Mastered" shortcut. Teacher-facing mastery comes from Classroom, not this store.

## Status — done vs. next

**Done:** site skeleton; two-group split; self-tracking + dashboards; all 70 topics have
objectives + prerequisites. Three strands fully built (40 of 70 topics):
- **Number Operations & Number Theory** (10) — F1: 1.1.1–1.1.6, F2: 2.1.1–2.1.3, F3: 3.1.1.
- **Algebra** (14) — F1: 1.6.1, 1.6.2, 1.6.6; F2: 2.6.1–2.6.4; F3: 3.6.1–3.6.7.
- **Measurement** (16) — F1: 1.5.1–1.5.6, F2: 2.5.1–2.5.6, F3: 3.5.1–3.5.4.

The other three strands (Sets & Functions, Statistics, Geometry) render objectives +
prerequisites with a "content coming soon" note.

**Next (suggested order):**
1. Author content for another strand — **Geometry (4, 15 topics)** is the biggest
   remaining, then Statistics (3) and Sets & Functions (2). Use the per-strand file
   convention above; pull objectives/prereqs context from the framework docx. Note that
   Geometry leans on diagrams, so consider inline SVG in the notes.
2. Create the Google Form Mastery Quizzes and paste each share link into the matching
   topic's `classroomUrl` in `data.js`.
3. Build the diagnostic pre-test (Google Form) and link it on the home page.
4. Optional: a printable topic view; MathJax/KaTeX if richer notation is wanted.

## Working conventions & gotchas

- **No build step / no framework.** Keep everything vanilla and dependency-free. External
  CDNs are acceptable on GitHub Pages but avoid unless clearly worth it.
- **Preview locally:** VS Code Live Server on `index.html`, or `python -m http.server`.
- **Run `node tools/verify.js` after every change.** It is the whole test suite (96 checks,
  no dependencies): helper unit tests, per-topic content structure, 400-draw fuzzing of
  every generator, page rendering, and the New-questions path. `node --check assets/*.js`
  catches plain syntax errors.
- **Regenerating `data.js`:** it was produced from the curriculum PDF. Prefer editing the
  generator over hand-editing generated objectives, to keep them faithful to the MOE text.
- **Git on this folder:** if opened from the original mounted Windows drive, stale
  `.git/HEAD.lock` / `.git/index.lock` may exist — delete them, then commit normally.
```
