/* Protocol X shared logic. CC0. Runs in the browser only; nothing is sent anywhere. */
(function (root) {
  "use strict";
  var W = { VRI: 0.30, CEI: 0.25, CQI: 0.15, ARI: 0.15, WII: 0.15 };
  var KEYS = ["VRI", "CEI", "CQI", "ARI", "WII"];
  var DAILY_CAP = 120;

  function num(x) { return x === null || x === undefined || x === "" ? null : +x; }
  function clamp(x, a, b) { x = +x; if (!isFinite(x)) return a; return Math.min(b, Math.max(a, x)); }

  /* v: {VRI,CEI,CQI|null,ARI,WII}. Returns {raw, score, gated, band(0..3)} */
  function score(v) {
    var n = 0, d = 0;
    KEYS.forEach(function (k) {
      var x = num(v[k]);
      if (x === null) return;
      n += W[k] * ((k === "ARI" || k === "WII") ? 10 - x : x);
      d += W[k];
    });
    var raw = d ? n / d : 0;
    var gated = num(v.ARI) >= 7 || num(v.WII) >= 6;
    var s = gated ? Math.min(raw, 3.9) : raw;
    return { raw: raw, score: s, gated: gated, band: band(s) };
  }
  function band(s) { return s >= 8 ? 0 : s >= 6 ? 1 : s >= 4 ? 2 : 3; }

  /* Fast-mode sessions count toward minutes and limits, never toward readings or score. */
  function week(sessions) {
    var out = { total: 0, digital: 0, readings: {}, score: null, allowance: 0, overAllowance: false, byBand: [0, 0, 0, 0], fast: 0 };
    sessions.forEach(function (s) {
      var m = +s.minutes || 0;
      out.total += m;
      if (s.medium === "digital") out.digital += m;
      if (s.fast) out.fast += m;
    });
    var scored = sessions.filter(function (s) { return !s.fast; });
    KEYS.forEach(function (k) {
      var n = 0, d = 0;
      scored.forEach(function (s) {
        var x = num(s[k]); var m = +s.minutes || 0;
        if (x === null) return;
        n += x * m; d += m;
      });
      out.readings[k] = d ? n / d : null;
    });
    var sn = 0, sd = 0;
    scored.forEach(function (s) {
      var m = +s.minutes || 0; var r = score(s);
      sn += r.score * m; sd += m; out.byBand[r.band] += m;
    });
    out.score = sd ? sn / sd : null;
    out.allowance = Math.min(480, 0.5 * out.total);
    out.overAllowance = out.digital > out.allowance;
    return out;
  }

  /* ---------- storage, with strict cleaning of anything read back ---------- */
  var KEY = "protocolx.sessions.v1";
  var ENUM = { fr: ["restored", "neutral", "drained"], fs: ["easy", "hard"] };
  function clean(s) {
    if (!s || typeof s !== "object") return null;
    var id = String(s.id == null ? "" : s.id);
    if (!/^[A-Za-z0-9_-]{1,40}$/.test(id)) return null;
    var t = typeof s.t === "string" && !isNaN(Date.parse(s.t)) ? new Date(s.t).toISOString() : new Date().toISOString();
    var o = {
      id: id, t: t,
      activity: String(s.activity == null ? "" : s.activity).slice(0, 60),
      medium: s.medium === "digital" ? "digital" : "non-digital",
      minutes: Math.round(clamp(s.minutes, 1, 1440)),
      planned: Math.round(clamp(s.planned, 0, 1440)),
      closed: s.closed === true, fast: s.fast === true
    };
    if (s.day != null && s.day !== "") { var d = +s.day; if (d === Math.floor(d) && d >= 0 && d <= 6) o.day = d; }
    KEYS.forEach(function (k) { var x = num(s[k]); o[k] = x !== null && isFinite(x) ? clamp(x, 0, 10) : null; });
    if (o.fast) {
      o.closed = true; KEYS.forEach(function (k) { o[k] = null; });
      o.fr = ENUM.fr.indexOf(s.fr) >= 0 ? s.fr : "neutral";
      o.fw = s.fw === true; o.fs = ENUM.fs.indexOf(s.fs) >= 0 ? s.fs : "easy";
      return o;
    }
    if (o.closed && (o.VRI === null || o.CEI === null || o.ARI === null || o.WII === null)) o.closed = false;
    if (o.closed) { var r = score(o); o.score = r.score; o.label = ["Enhancing", "Acceptable", "Warning", "Harmful"][r.band]; }
    return o;
  }
  var store = {
    load: function () {
      try {
        var a = JSON.parse(localStorage.getItem(KEY) || "[]");
        if (!Array.isArray(a)) return [];
        var seen = {}, out = [];
        a.forEach(function (x) { var c = clean(x); if (c && !seen[c.id]) { seen[c.id] = 1; out.push(c); } });
        return out;
      } catch (e) { return []; }
    },
    save: function (a) { try { localStorage.setItem(KEY, JSON.stringify(a)); return true; } catch (e) { return false; } },
    clear: function () { try { localStorage.removeItem(KEY); } catch (e) {} }
  };
  function uid() { return "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  function dayKey(iso) { var d = new Date(iso); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function minutesToday(sessions) {
    var k = dayKey(new Date().toISOString());
    return sessions.reduce(function (a, s) { return a + (dayKey(s.t) === k ? s.minutes : 0); }, 0);
  }

  /* ---------- strings ---------- */
  var T = {
    en: {
      VRI: "Vitality", CEI: "Clarity", CQI: "Give", ARI: "Pull", WII: "Spill",
      hVRI: "0 drained · 10 restored", hCEI: "0 foggy · 10 clear or inspired",
      hCQI: "0 closed off · 10 wanting to give", hARI: "0 easy to stop · 10 hard to stop", hWII: "0 no effect · 10 work cancelled",
      bands: ["Enhancing", "Acceptable", "Warning", "Harmful"],
      na: "Does not apply (N/A)", raw: "Before the safety gate", gate: "Safety gate applied: capped at 3.9.",
      priv: "Everything runs in your browser. Nothing is sent anywhere.",
      disc: "Protocol X is a self-observation practice. It is not medical advice and does not diagnose any condition.",
      minutes: "minutes", activity: "Activity", medium: "Medium", digital: "Digital", nondigital: "Non-digital",
      start: "Start", pause: "Pause", resume: "Resume", reset: "Reset", save: "Save", del: "Delete",
      alert80: "80% of your time is used.", up: "Time is up. Stop here.", keepOpen: "Keep this tab open so the alerts can sound.",
      rateNow: "Rate now", rateNowNote: "Two readings, right after the session.",
      closeBtn: "Close card", laterNote: "Rate these 4 to 24 hours later.",
      open: "Open sessions", none: "Nothing here yet.", saved: "Saved on this device.",
      ex: "Export JSON", im: "Import JSON", clr: "Clear all data", confirmClr: "Delete every saved session on this device?",
      week: "Range", total: "Total", digitalMin: "Digital", allowance: "Digital allowance", over: "Over the allowance. The stricter limit applies.",
      within: "Within the allowance.", weeklyScore: "Weekly score", addManual: "Add a session",
      pick: "Pick a session", manual: "Or set values by hand", download: "Download PNG",
      mapTitle: "Minutes by result", mapNote: "Each bar is one day. Colour is the result of the session. Grey is fast mode.",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], day: "Day", range7: "Last 7 days", rangeAll: "All saved",
      cardTitle: "My week", cardSession: "Session score", cardWeek: "Weekly score",
      tTimer: "Session timer", tCard: "Score card", tMap: "Week map",
      fastLbl: "Fast mode: three words, no scores", fastTitle: "Fast check", fastNote: "Three questions, thirty seconds.",
      fq1: "How did it leave you?", fr: ["Restored", "Neutral", "Drained"], fq2: "Did it touch your work?", yes: "Yes", no: "No",
      fq3: "Was it easy to stop?", fs: ["Easy", "Hard"], fastName: "Fast",
      today: "Today", cap: "daily cap", overCap: "This would go past your daily cap.", cardNote: "Self-observation practice. Not medical advice."
    },
    ar: {
      VRI: "الحيوية", CEI: "الصفاء", CQI: "العطاء", ARI: "الشد", WII: "التسرّب",
      hVRI: "0 استنزاف · 10 استعادة", hCEI: "0 تشوّش · 10 وضوح أو إلهام",
      hCQI: "0 انغلاق · 10 رغبة في العطاء", hARI: "0 سهل التوقف · 10 صعب التوقف", hWII: "0 لا أثر · 10 إلغاء العمل",
      bands: ["مُعزّز", "مقبول", "تحذير", "ضار"],
      na: "لا ينطبق (N/A)", raw: "قبل بوابة السلامة", gate: "طُبّقت بوابة السلامة: الحد الأقصى 3.9.",
      priv: "كل شيء يعمل داخل متصفحك. لا يُرسَل أي شيء إلى أي مكان.",
      disc: "Protocol X ممارسة لمراقبة الذات. وليس نصيحة طبية ولا يشخّص أي حالة.",
      minutes: "دقيقة", activity: "النشاط", medium: "الوسط", digital: "رقمي", nondigital: "غير رقمي",
      start: "ابدأ", pause: "أوقف مؤقتًا", resume: "تابع", reset: "إعادة", save: "احفظ", del: "احذف",
      alert80: "استُهلك 80% من وقتك.", up: "انتهى الوقت. توقف هنا.", keepOpen: "أبقِ هذا التبويب مفتوحًا ليعمل التنبيه.",
      rateNow: "قيّم الآن", rateNowNote: "قراءتان، مباشرة بعد الجلسة.",
      closeBtn: "أغلق البطاقة", laterNote: "قيّم هذه بعد 4 إلى 24 ساعة.",
      open: "جلسات مفتوحة", none: "لا شيء هنا بعد.", saved: "حُفظ على هذا الجهاز.",
      ex: "تصدير JSON", im: "استيراد JSON", clr: "مسح كل البيانات", confirmClr: "حذف كل الجلسات المحفوظة على هذا الجهاز؟",
      week: "النطاق", total: "المجموع", digitalMin: "الرقمي", allowance: "المسموح الرقمي", over: "تجاوزت المسموح. يُطبَّق الحد الأشد.",
      within: "ضمن المسموح.", weeklyScore: "درجة الأسبوع", addManual: "أضف جلسة",
      pick: "اختر جلسة", manual: "أو اضبط القيم يدويًا", download: "نزّل PNG",
      mapTitle: "الدقائق حسب النتيجة", mapNote: "كل عمود يوم واحد. اللون هو نتيجة الجلسة. والرمادي هو الوضع السريع.",
      days: ["الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"], day: "اليوم", range7: "آخر 7 أيام", rangeAll: "كل المحفوظ",
      cardTitle: "أسبوعي", cardSession: "درجة الجلسة", cardWeek: "درجة الأسبوع",
      tTimer: "مؤقت الجلسة", tCard: "بطاقة الدرجة", tMap: "خريطة الأسبوع",
      fastLbl: "الوضع السريع: ثلاث كلمات بلا درجات", fastTitle: "الفحص السريع", fastNote: "ثلاثة أسئلة، وثلاثون ثانية.",
      fq1: "كيف تركتك؟", fr: ["أعادت طاقتي", "محايدة", "استنزفتني"], fq2: "هل مسّت عملك؟", yes: "نعم", no: "لا",
      fq3: "هل كان التوقف سهلًا؟", fs: ["سهل", "صعب"], fastName: "سريع",
      today: "اليوم", cap: "السقف اليومي", overCap: "هذا سيتجاوز سقفك اليومي.", cardNote: "ممارسة لمراقبة الذات. ليست نصيحة طبية."
    }
  };
  function lang() { return (document.documentElement.lang || "en").slice(0, 2) === "ar" ? "ar" : "en"; }
  function t(k) { return (T[lang()] || T.en)[k]; }

  /* ---------- the X mark: stroke widths follow Vitality and Pull ---------- */
  function xmark(vri, ari) {
    var a = 3 + (vri == null ? 5 : vri) * 2.1, b = 3 + (ari == null ? 5 : ari) * 2.1;
    return '<svg class="xmark" viewBox="0 0 100 100" role="img" aria-label="Protocol X">' +
      '<line x1="18" y1="82" x2="82" y2="18" stroke="var(--blue)" stroke-width="' + a.toFixed(1) + '" stroke-linecap="round"/>' +
      '<line x1="18" y1="18" x2="82" y2="82" stroke="var(--amber)" stroke-width="' + b.toFixed(1) + '" stroke-linecap="round"/></svg>';
  }

  /* ---------- reusable calculator ---------- */
  function mountCalc(el, opts) {
    opts = opts || {};
    var vals = { VRI: 5, CEI: 5, CQI: 5, ARI: 5, WII: 5 }, na = false;
    el.innerHTML = '<div class="grid2"><div class="rows"></div><div class="out" aria-live="polite"></div></div>';
    var rows = el.querySelector(".rows"), out = el.querySelector(".out");
    KEYS.forEach(function (k) {
      var d = document.createElement("div");
      d.className = "row";
      d.innerHTML = '<label for="c-' + k + '">' + k + " · " + t(k) + '</label><input id="c-' + k + '" type="range" min="0" max="10" step="1" value="5"><output for="c-' + k + '">5</output><span class="hint">' + t("h" + k) + "</span>";
      var i = d.querySelector("input"), o = d.querySelector("output");
      i.addEventListener("input", function () { vals[k] = +i.value; o.textContent = i.value; go(); });
      rows.appendChild(d);
      if (k === "CQI") {
        var c = document.createElement("label");
        c.className = "check";
        c.innerHTML = '<input type="checkbox" id="c-na"> ' + t("na");
        c.querySelector("input").addEventListener("change", function (e) { na = e.target.checked; i.disabled = na; go(); });
        rows.appendChild(c);
      }
    });
    function go() {
      var v = { VRI: vals.VRI, CEI: vals.CEI, CQI: na ? null : vals.CQI, ARI: vals.ARI, WII: vals.WII };
      var r = score(v);
      out.innerHTML = xmark(vals.VRI, vals.ARI) +
        '<div class="res"><span class="num">' + r.score.toFixed(1) + '</span><span class="tag t' + r.band + '">' + t("bands")[r.band] + "</span></div>" +
        '<p class="small muted">' + t("raw") + ": " + r.raw.toFixed(1) + (r.gated ? " · " + t("gate") : "") + "</p>";
      if (opts.onChange) opts.onChange(v, r);
    }
    go();
  }

  root.PX = { W: W, KEYS: KEYS, CAP: DAILY_CAP, score: score, band: band, week: week, clean: clean, store: store, uid: uid, esc: esc,
              minutesToday: minutesToday, t: t, T: T, lang: lang, xmark: xmark, mountCalc: mountCalc };
  if (typeof module !== "undefined") module.exports = root.PX;
})(typeof window !== "undefined" ? window : globalThis);
