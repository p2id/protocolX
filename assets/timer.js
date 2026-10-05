$("h").textContent = t("tTimer"); $("oh").textContent = t("open");
var S = { end: 0, total: 0, left: 0, running: false, alerted: false, done: false, tick: null, ctx: null, wl: null, fast: false, act: "", med: "digital" };

function beep(n) {
  try {
    var c = S.ctx || (S.ctx = new (window.AudioContext || window.webkitAudioContext)());
    for (var i = 0; i < n; i++) {
      var o = c.createOscillator(), g = c.createGain(); o.frequency.value = 660; o.connect(g); g.connect(c.destination);
      var at = c.currentTime + i * 0.35;
      g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(0.25, at + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, at + 0.25);
      o.start(at); o.stop(at + 0.27);
    }
  } catch (e) {}
  if (navigator.vibrate) { try { navigator.vibrate(n > 1 ? [200, 100, 200] : 120); } catch (e) {} }
}
function fmt(ms) { var s = Math.max(0, Math.ceil(ms / 1000)), m = Math.floor(s / 60); s = s % 60; return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s; }
function lock() { try { if (navigator.wakeLock) navigator.wakeLock.request("screen").then(function (l) { S.wl = l; }).catch(function () {}); } catch (e) {} }
function unlock() { try { if (S.wl) { S.wl.release(); S.wl = null; } } catch (e) {} }

function showSetup() {
  $("setup").hidden = false; $("run").hidden = true; $("rate").hidden = true;
  $("setup").innerHTML =
    '<label class="f" for="act">' + t("activity") + '</label><input id="act" type="text" maxlength="60">' +
    '<label class="f" for="min">' + t("minutes") + '</label><input id="min" type="number" min="1" max="600" value="25">' +
    '<label class="f" for="med">' + t("medium") + '</label><select id="med"><option value="digital">' + t("digital") + '</option><option value="non-digital">' + t("nondigital") + '</option></select>' +
    '<label class="check" style="margin-top:.8rem"><input type="checkbox" id="fast"> ' + t("fastLbl") + '</label>' +
    '<p class="muted small" id="tl"></p><p class="small t3" id="cw" aria-live="polite"></p>' +
    '<p><button class="p" id="go">' + t("start") + '</button></p>';
  function cap() {
    var used = PX.minutesToday(PX.store.load());
    $("tl").textContent = t("today") + ": " + used + " / " + PX.CAP + " " + t("minutes");
    $("cw").textContent = (used + (+$("min").value || 0)) > PX.CAP ? t("overCap") : "";
  }
  $("min").addEventListener("input", cap); cap();
  $("go").addEventListener("click", start);
}
function start() {
  var m = Math.max(1, Math.min(600, +$("min").value || 25));
  S.total = m * 60000; S.left = S.total; S.end = Date.now() + S.left; S.alerted = false; S.done = false; S.running = true;
  S.act = $("act").value.trim().slice(0, 60); S.med = $("med").value; S.fast = $("fast").checked;
  try { S.ctx = S.ctx || new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
  lock();
  $("setup").hidden = true; $("run").hidden = false;
  $("run").innerHTML = '<p class="muted" id="ra"></p><div class="big" id="clock" role="timer"></div><p id="msg" class="small" aria-live="assertive"></p><p class="muted small">' + t("keepOpen") + '</p>' +
    '<p><button id="pp">' + t("pause") + '</button> <button class="p" id="stop">' + t("save") + '</button> <button id="rs">' + t("reset") + '</button></p>';
  $("ra").textContent = S.act || t("activity");
  $("pp").addEventListener("click", function () {
    if (S.running) { S.left = S.end - Date.now(); S.running = false; $("pp").textContent = t("resume"); }
    else { S.end = Date.now() + S.left; S.running = true; $("pp").textContent = t("pause"); }
  });
  $("rs").addEventListener("click", function () { clearInterval(S.tick); unlock(); document.title = "Protocol X"; showSetup(); });
  $("stop").addEventListener("click", finish);
  clearInterval(S.tick); S.tick = setInterval(loop, 250); loop();
}
function loop() {
  if (!S.running) return;
  var left = S.end - Date.now(); $("clock").textContent = fmt(left); document.title = fmt(left) + " | Protocol X";
  if (!S.alerted && (S.total - left) >= S.total * 0.8 && left > 0) { S.alerted = true; $("msg").textContent = t("alert80"); beep(1); }
  if (left <= 0 && !S.done) { S.done = true; $("msg").textContent = t("up"); beep(3); finish(); }
}
document.addEventListener("visibilitychange", function () { if (!document.hidden && S.running) { lock(); loop(); } });

function finish() {
  clearInterval(S.tick); S.running = false; unlock();
  var used = S.done ? S.total : (S.total - (S.end - Date.now())); if (used < 0) used = 0;
  var mins = Math.max(1, Math.round(used / 60000)); document.title = "Protocol X";
  $("run").hidden = true; $("rate").hidden = false;
  var base = function () { return { id: PX.uid(), t: new Date().toISOString(), activity: S.act, medium: S.med, planned: Math.round(S.total / 60000), minutes: Math.max(1, +$("am").value || mins) }; };
  if (S.fast) {
    $("rate").innerHTML = '<h2 style="font-size:1.2rem;margin-top:0">' + t("fastTitle") + '</h2><p class="muted small">' + t("fastNote") + '</p>' +
      '<label class="f" for="am">' + t("minutes") + '</label><input id="am" type="number" min="1" value="' + mins + '">' +
      '<label class="f" for="fr">' + t("fq1") + '</label><select id="fr"><option value="restored">' + t("fr")[0] + '</option><option value="neutral" selected>' + t("fr")[1] + '</option><option value="drained">' + t("fr")[2] + '</option></select>' +
      '<label class="f" for="fw">' + t("fq2") + '</label><select id="fw"><option value="no">' + t("no") + '</option><option value="yes">' + t("yes") + '</option></select>' +
      '<label class="f" for="fs">' + t("fq3") + '</label><select id="fs"><option value="easy">' + t("fs")[0] + '</option><option value="hard">' + t("fs")[1] + '</option></select>' +
      '<p><button class="p" id="sv">' + t("save") + '</button></p>';
    $("sv").addEventListener("click", function () {
      var s = base(); s.fast = true; s.closed = true; s.fr = $("fr").value; s.fw = $("fw").value === "yes"; s.fs = $("fs").value;
      var a = PX.store.load(); a.push(s); PX.store.save(a); showSetup(); renderOpen();
    });
    return;
  }
  $("rate").innerHTML = '<h2 style="font-size:1.2rem;margin-top:0">' + t("rateNow") + '</h2><p class="muted small">' + t("rateNowNote") + '</p>' +
    '<label class="f" for="am">' + t("minutes") + '</label><input id="am" type="number" min="1" value="' + mins + '">' + sliderRow("ARI", 3) + sliderRow("WII", 0) +
    '<p><button class="p" id="sv">' + t("save") + '</button></p>';
  wireOutputs($("rate"));
  $("sv").addEventListener("click", function () {
    var s = base(); s.VRI = null; s.CEI = null; s.CQI = null; s.ARI = val($("rate"), "ARI"); s.WII = val($("rate"), "WII"); s.closed = false;
    var a = PX.store.load(); a.push(s); PX.store.save(a); showSetup(); renderOpen();
  });
}

function renderOpen() {
  var box = $("open"), list = PX.store.load().filter(function (s) { return !s.closed && !s.fast; });
  box.innerHTML = "";
  if (!list.length) { box.innerHTML = '<p class="muted">' + t("none") + '</p>'; return; }
  list.forEach(function (s) {
    var d = el("div", { class: "panel", style: "margin:.6rem 0" });
    d.innerHTML = '<strong class="nm"></strong> <span class="muted small">· ' + s.minutes + " " + t("minutes") + " · ARI " + s.ARI + " · WII " + s.WII + '</span><p class="muted small">' + t("laterNote") + '</p>' +
      sliderRow("VRI", 5) + sliderRow("CEI", 5) + sliderRow("CQI", 5) +
      '<label class="check"><input type="checkbox" class="na"> ' + t("na") + '</label>' +
      '<p><button class="p cl">' + t("closeBtn") + '</button> <button class="rm">' + t("del") + '</button></p>';
    d.querySelector(".nm").textContent = s.activity || t("activity");
    box.appendChild(d); wireOutputs(d);
    var q = d.querySelector('.sl[data-k="CQI"]');
    d.querySelector(".na").addEventListener("change", function (e) { q.disabled = e.target.checked; });
    d.querySelector(".cl").addEventListener("click", function () {
      var all = PX.store.load();
      all.forEach(function (x) {
        if (x.id === s.id) {
          x.VRI = val(d, "VRI"); x.CEI = val(d, "CEI"); x.CQI = d.querySelector(".na").checked ? null : val(d, "CQI"); x.closed = true;
        }
      });
      PX.store.save(all.map(PX.clean).filter(Boolean)); renderOpen();
    });
    d.querySelector(".rm").addEventListener("click", function () { PX.store.save(PX.store.load().filter(function (x) { return x.id !== s.id; })); renderOpen(); });
  });
}
showSetup(); renderOpen();
