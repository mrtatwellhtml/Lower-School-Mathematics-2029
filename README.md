# Mathematics Review — Class of 2029 (Forms 1–3)

A static review website: notes, worked examples and self-checking practice for every
Forms 1–3 mathematics topic, organised by strand, with private on-device progress
tracking. Graded/teacher-visible tracking is handled in **Google Classroom** via linked
Google Form quizzes.

## What's here

```
math-review-site/
├── index.html         Home + progress dashboard
├── strand.html        Topic list for one strand (?s=1..6)
├── topic.html         A single topic (?id=1.1.1)
├── assets/
│   ├── style.css      All styling
│   ├── app.js         Rendering + localStorage progress logic
│   ├── data.js        All 70 topics: objectives + prerequisites (auto-generated)
│   └── content.js     Full notes/examples/practice — Number strand (Forms 1–3)
└── README.md
```

`data.js` gives every topic a page (objectives + prerequisites). `content.js` adds the
rich content. Right now the **Number Operations & Number Theory** strand is fully built
(10 topics); the other five strands show their objectives and a "coming soon" note until
their content is authored the same way.

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

Open `assets/content.js` and copy the pattern of a built topic:

```js
set('CODE', {
  notes:    [ {h:'Heading', html:'<p>…</p>'} ],
  examples: [ {q:'…', answer:'…', steps:['…','…']} ],
  practice: [ {type:'text'|'mc', q:'…', answer:'…' /*or [..]*/, options:[…], answer:index, hint:'…'} ]
});
```

Objectives and prerequisites are already supplied for all 70 topics from `data.js`, so you
only ever write notes, examples and practice.

## Progress model

- **Students** self-mark each topic (Not started / In progress / Mastered); passing the
  on-site practice at 80%+ unlocks a "Mark Mastered" shortcut. Saved in the browser
  (`localStorage`) — private, per-device. "Reset progress" clears it.
- **Teacher** sees authoritative mastery in the Google Classroom gradebook from the
  linked Form quizzes.

Mastery threshold is 80% (set as `MASTERY` in `app.js`).
