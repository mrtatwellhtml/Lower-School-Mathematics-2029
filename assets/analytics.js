/* Lightweight usage analytics — ADDITIVE, privacy-conscious, OFF by default.
   Sends a tiny "ping" to a Google Apps Script Web App you own, which logs to YOUR
   Google Sheet. No third parties, no cookies, no gradebook. Inert until you paste your
   endpoint below.

   PRIVACY: this deliberately collects NO personal data about students. The only thing
   asked for is a CLASS CODE ("3B"), which identifies a group, not a child. No names, no
   email, no accounts, no cookies, no third parties. Each device also gets a random id so
   one pupil refreshing the page is not counted five times — it is meaningless on its own
   and is never linked to a person.

   The endpoint below is a PUBLIC URL in a public repo: anyone who finds it could post
   junk rows to your Sheet. That is tolerable precisely because nothing personal is in it.
   Do NOT reintroduce names here — that trade stops being acceptable the moment the Sheet
   contains children's names. */
(function () {
  "use strict";
  var CONFIG = {
    endpoint: "https://script.google.com/macros/s/AKfycby0ai7rXgEQrjCCCZMVu56Br0zJ__TdXGol7ojRs20wTdfPsSTCn_zipIYtjazdkZdf/exec",  // live
    identityMode: "class",     // "class" (class code only) or "anon" (device only). Names are not an option.
    siteName: "Class of 2029 Mathematics"
  };
  window.ANALYTICS_CONFIG = CONFIG;
  if (!CONFIG.endpoint) return;               // OFF until an endpoint is set — nothing happens

  var LS = "mathreview.identity.v1";
  function load() { try { return JSON.parse(localStorage.getItem(LS)) || null; } catch (e) { return null; } }
  function save(o) { localStorage.setItem(LS, JSON.stringify(o)); }
  function uid() { return "d" + Math.random().toString(36).slice(2) + Date.now().toString(36); }

  function identity(cb) {
    var id = load();
    if (id) {
      // Migration: an earlier build asked for a first name. If one is stored on this
      // device, delete it now so it is never sent.
      if (id.name) { delete id.name; save(id); }
      return cb(id);
    }
    if (CONFIG.identityMode === "anon") { id = { anon: true, device: uid() }; save(id); return cb(id); }
    ask(cb);
  }

  function ask(cb) {
    var ov = document.createElement("div");
    ov.style.cssText = "position:fixed;inset:0;background:rgba(20,35,50,.55);z-index:9999;display:grid;place-items:center;padding:20px";
    ov.innerHTML =
      '<div style="background:#fff;max-width:420px;border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.25);padding:22px;font-family:inherit">' +
      '<h3 style="margin:.1em 0 .3em;color:#1F4E79">Welcome 👋</h3>' +
      '<p style="margin:.2em 0 1em;color:#5b6b7a;font-size:.92rem">Which class are you in? This lets your teacher see that the class is using the site. It is optional.</p>' +
      '<label style="display:block;font-size:.8rem;font-weight:600;color:#1F4E79">Class</label>' +
      '<input id="an-class" placeholder="e.g. 3B" maxlength="12" style="width:100%;padding:9px 11px;margin:4px 0 6px;border:1.5px solid #e2e9f1;border-radius:9px;font-size:1rem">' +
      '<p style="font-size:.72rem;color:#9aa7b3;margin:.4em 0 1em"><b>We never ask for your name.</b> Your teacher sees only the class and which topics are being practised — never who you are.</p>' +
      '<div style="display:flex;gap:10px;justify-content:flex-end">' +
      '<button id="an-skip" style="background:#fff;border:1.5px solid #2E75B6;color:#2E75B6;border-radius:9px;padding:9px 14px;font-weight:600;cursor:pointer">Skip</button>' +
      '<button id="an-ok" style="background:#2E75B6;border:none;color:#fff;border-radius:9px;padding:9px 16px;font-weight:600;cursor:pointer">Continue</button>' +
      '</div></div>';
    document.body.appendChild(ov);
    ov.querySelector("#an-ok").onclick = function () {
      // Strip anything that is not a short class code, so a name typed here cannot get through.
      var cls = (ov.querySelector("#an-class").value || "").replace(/[^A-Za-z0-9 \-]/g, "").trim().slice(0, 12);
      var id = cls ? { cls: cls, device: uid() } : { anon: true, device: uid() };
      save(id); document.body.removeChild(ov); cb(id);
    };
    ov.querySelector("#an-skip").onclick = function () {
      var id = { anon: true, device: uid() }; save(id); document.body.removeChild(ov); cb(id);
    };
  }

  var ID = null;
  function send(event, detail) {
    if (!ID) return;
    // No name field exists here by design — see the privacy note at the top of this file.
    var payload = { ts: Date.now(), site: CONFIG.siteName, event: event,
      cls: ID.cls || "", device: ID.device || "", anon: !!ID.anon,
      topic: (detail && detail.topic) || "", detail: detail || {} };
    try { navigator.sendBeacon(CONFIG.endpoint, new Blob([JSON.stringify(payload)], { type: "text/plain" })); }
    catch (e) { /* offline / blocked — ignore silently */ }
  }
  window.Track = send;

  function pageContext() {
    var p = location.pathname.split("/").pop() || "index.html";
    var q = new URLSearchParams(location.search);
    if (p.indexOf("topic") === 0) return { page: "topic", topic: q.get("id") || "" };
    if (p.indexOf("strand") === 0) return { page: "strand", topic: "s" + (q.get("s") || "") };
    return { page: "home" };
  }

  function start() {
    identity(function (id) {
      ID = id;
      send("open", pageContext());
      // practice checked → read the score box a moment later
      document.addEventListener("click", function (e) {
        var t = e.target;
        if (t && (t.id === "checkBtn" || (t.closest && t.closest("#checkBtn")))) {
          setTimeout(function () {
            var sb = document.querySelector(".scorebox");
            var m = sb && /(\d+)%/.exec(sb.textContent || "");
            send("practice", { topic: (pageContext().topic || ""), score: m ? +m[1] : null });
          }, 450);
        }
        if (t && t.closest && t.closest(".statusctl") && t.dataset && t.dataset.s) {
          send("status", { topic: pageContext().topic || "", status: t.dataset.s });
        }
      });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
