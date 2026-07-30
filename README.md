# Mathematics Review — Class of 2029 (Forms 1–3)

A static review website: notes, worked examples and self-checking practice for every
Forms 1–3 mathematics topic, organised by strand, with private on-device progress
tracking. Graded/teacher-visible tracking is handled in **Google Classroom** via linked
Google Form quizzes.

The home page is split into two separate sections — **Forms 1 & 2 · Review** (incoming
knowledge) and **Form 3 · Current Year** — each with its own progress ring. Strand and
topic pages carry a `g` parameter (`g=12` or `g=3`) so the two never mix. To move a
topic between groups you'd only change its `form` in `data.js`; the grouping follows from
that (form 3 → Form 3 section, forms 1–2 → Review section).

## What's here

```
math-review-site/
├── index.html         Home + progress dashboard
├── strand.html        Topic list for one strand (?s=1..6)
├── topic.html         A single topic (?id=1.1.1)
├── assets/
│   ├── style.css           All styling
│   ├── app.js              Rendering + localStorage progress logic
│   ├── data.js             All 70 topics: objectives + prerequisites (auto-generated)
│   ├── qgen.js             Helpers for the randomly generated practice questions
│   ├── content.js              Notes/examples/practice — Number strand (Forms 1–3)
│   ├── content-algebra.js      Notes/examples/practice — Algebra strand (Forms 1–3)
│   ├── content-measurement.js  Notes/examples/practice — Measurement strand (Forms 1–3)
│   ├── content-geometry.js     Notes/examples/practice — Geometry strand (+ SVG diagrams)
│   ├── content-sets.js         Notes/examples/practice — Sets, Relations & Functions
│   └── content-statistics.js   Notes/examples/practice — Statistics & Probability
├── tools/verify.js         Headless test suite (node tools/verify.js)
└── README.md
```

`data.js` gives every topic a page (objectives + prerequisites). The `content*.js` files —
one per strand — add the rich content. **All 70 topics across all six strands are now fully
built**: Number Operations & Number Theory (10), Sets/Relations & Functions (9),
Statistics & Probability (5), Geometry (16), Measurement (16) and Algebra (14).

The site is live at
**<https://mrtatwellhtml.github.io/Lower-School-Mathematics-2029/>**. Every push to `main`
redeploys it within a minute or two.

## Run it locally

It's plain HTML/CSS/JS — no build step. Either double-click `index.html`, or serve it:

```bash
cd math-review-site
python -m http.server 8000      # then open http://localhost:8000
```

(In VS Code, the *Live Server* extension is the easiest way — right-click `index.html`
→ "Open with Live Server".)

## Deploy free on GitHub Pages

1. Create a new GitHub repo and push this folder's contents to it.
   ```bash
   git init
   git add .
   git commit -m "Initial site: skeleton + Number strand"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   pick `main` / `root`, Save.
3. Your site goes live at `https://<you>.github.io/<repo>/` within a minute or two.

## Link the Mastery Quizzes (Google Classroom)

Each topic's **"Open Mastery Quiz"** button reads a `classroomUrl` field in `data.js`
(currently blank). To wire one up:

1. Build the topic's quiz as a **Google Form** (Settings → *Make this a quiz*, turn on
   automatic marking). Post it to Google Classroom under a Topic named for the strand.
2. Copy the Form's share link.
3. In `assets/data.js`, find the topic (e.g. `"1.1.1"`) and set its `classroomUrl` to that link.

Because scoring lives in the Form/Classroom gradebook, you see per-student mastery there;
the website itself stores nothing about individual students.

## Add content to another strand

Create `assets/content-<strand>.js` (copy the wrapper from `content-algebra.js`), add a
`<script>` tag for it in `index.html`, `strand.html` and `topic.html` after `data.js`, then
copy the pattern of a built topic:

```js
set('CODE', {
  notes:    [ {h:'Heading', html:'<p>…</p>'} ],
  examples: [ {q:'…', answer:'…', steps:['…','…']} ],
  practice: [
    {gen:function(){                       // generated: fresh numbers every time
       var a=Q.int(2,8), x=Q.int(2,12);
       return {type:'text', q:'Solve '+a+'x = '+(a*x)+'.', answer:Q.root(x), hint:'…'};
    }},
    {gen:function(){
       var o=Q.mc('correct',['wrong1','wrong2','wrong3']);
       return {type:'mc', q:'…', options:o.options, answer:o.answer, hint:'…'};
    }},
  ]
});
```

Objectives and prerequisites are already supplied for all 70 topics from `data.js`, so you
only ever write notes, examples and practice.

## Practice questions regenerate

Notes and worked examples are fixed, but every practice question is **generated from a
formula with random numbers**. A student presses **↻ New questions** and gets a fresh set
of the same kind of problem — so practice never becomes "remember that the answer is 12",
and they can keep drilling a topic until it sticks before taking the Classroom quiz.

Answer checking is forgiving: `x^2`, `x²` and `x2` all match, as do `0.2`, `.2` and `0.20`,
and `5` or `x=5` for an equation.

To add a topic, write each practice item as a `gen` function that picks its numbers first
and builds the question from them — see the *Generated practice* section of `CLAUDE.md`.
Run `node tools/verify.js` afterwards; it fuzzes every generator 400 times.

## Progress model

- **Students** self-mark each topic (Not started / In progress / Mastered); passing the
  on-site practice at 80%+ unlocks a "Mark Mastered" shortcut. Saved in the browser
  (`localStorage`) — private, per-device. "Reset progress" clears it.
- **Teacher** sees authoritative mastery in the Google Classroom gradebook from the
  linked Form quizzes.

Mastery threshold is 80% (set as `MASTERY` in `app.js`).
