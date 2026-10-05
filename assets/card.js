$("h").textContent = t("tCard"); $("dl").textContent = t("download");
var state = { mode: "manual", vals: { VRI: 5, CEI: 5, CQI: 5, ARI: 5, WII: 5 }, idx: 0 };
var cs = closedScored();
var opts = '<option value="manual">' + t("manual") + '</option><option value="week">' + t("weeklyScore") + '</option>';
cs.forEach(function (s, i) { opts += '<option value="' + i + '">' + PX.esc((s.activity || t("activity")) + " · " + s.minutes + " " + t("minutes")) + '</option>'; });
$("ctl").innerHTML = '<label class="f" for="src">' + t("pick") + '</label><select id="src">' + opts + '</select><div id="calc" style="margin-top:1rem"></div>';
var calcBox = $("calc");
PX.mountCalc(calcBox, { onChange: function (v) { if (state.mode === "manual") { state.vals = v; draw(); } } });
$("src").addEventListener("change", function () {
  var v = this.value; calcBox.hidden = (v !== "manual");
  if (v === "manual") state.mode = "manual"; else if (v === "week") state.mode = "week"; else { state.mode = "session"; state.idx = +v; }
  draw();
});
function data() {
  if (state.mode === "week") {
    var w = PX.week(PX.store.load().filter(function (s) { return s.closed; }));
    var sc = w.score == null ? 0 : w.score;
    return { score: sc, band: PX.band(sc), vals: w.readings, title: t("cardWeek"), sub: w.total + " " + t("minutes") };
  }
  if (state.mode === "session") {
    var s = closedScored()[state.idx]; var r = PX.score(s);
    return { score: r.score, band: r.band, vals: s, title: t("cardSession"), sub: (s.activity || "") + " · " + s.minutes + " " + t("minutes") };
  }
  var r2 = PX.score(state.vals);
  return { score: r2.score, band: r2.band, vals: state.vals, title: t("cardSession"), sub: "" };
}
function rr(x, a, b, w, h, r) { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); x.fill(); }
function draw() {
  var d = data(), c = $("cv"), x = c.getContext("2d"), rtl = PX.lang() === "ar", W = 1080, H = 1350, P = 90;
  var ink = "#e9eeee", bg = "#0d1115", blue = "#8fa3ff", amber = "#f0b94a", line = "#28323a", muted = "#9aa6ad", bc = ["#5bd1a5", "#8fa3ff", "#f0b94a", "#ff8f7e"][d.band];
  var ff = '"Avenir Next","Segoe UI",system-ui,"Noto Kufi Arabic",Tahoma,sans-serif';
  x.clearRect(0, 0, W, H); x.fillStyle = bg; x.fillRect(0, 0, W, H); x.direction = rtl ? "rtl" : "ltr";
  var side = rtl ? W - P : P, al = rtl ? "right" : "left";
  var a = 3 + (d.vals.VRI == null ? 5 : d.vals.VRI) * 2.1, b = 3 + (d.vals.ARI == null ? 5 : d.vals.ARI) * 2.1, k = 3.2, cx = rtl ? P + 150 : W - P - 150, cy = P + 150;
  x.lineCap = "round"; x.lineWidth = a * k / 1.6; x.strokeStyle = blue; x.beginPath(); x.moveTo(cx - 110, cy + 110); x.lineTo(cx + 110, cy - 110); x.stroke();
  x.lineWidth = b * k / 1.6; x.strokeStyle = amber; x.beginPath(); x.moveTo(cx - 110, cy - 110); x.lineTo(cx + 110, cy + 110); x.stroke();
  x.fillStyle = ink; x.textAlign = al; x.font = "800 54px " + ff; x.fillText("Protocol X", side, P + 60);
  x.fillStyle = muted; x.font = "500 36px " + ff; x.fillText(d.title, side, P + 120);
  if (d.sub) { x.font = "500 30px " + ff; x.fillText(d.sub, side, P + 168); }
  x.fillStyle = ink; x.font = "800 300px " + ff; x.fillText(d.score.toFixed(1), side, 640);
  x.fillStyle = bc; x.font = "800 64px " + ff; x.fillText(t("bands")[d.band], side, 740);
  var y = 830, bw = W - 2 * P - 300;
  PX.KEYS.forEach(function (k2) {
    var v = d.vals[k2]; x.fillStyle = muted; x.font = "600 34px " + ff; x.textAlign = al; x.fillText(k2 + " " + t(k2), side, y);
    var bx = rtl ? P + 100 : P + 330, by = y - 30;
    x.fillStyle = line; rr(x, bx, by, bw - 130, 26, 13);
    if (v != null) { x.fillStyle = (k2 === "ARI" || k2 === "WII") ? amber : blue; var w2 = Math.max(26, (bw - 130) * v / 10); if (rtl) rr(x, bx + (bw - 130) - w2, by, w2, 26, 13); else rr(x, bx, by, w2, 26, 13); }
    x.fillStyle = ink; x.textAlign = rtl ? "left" : "right"; x.fillText(v == null ? "N/A" : (Math.round(v * 10) / 10).toString(), rtl ? P : W - P, y);
    y += 88;
  });
  x.textAlign = al; x.fillStyle = muted; x.font = "500 28px " + ff; x.fillText(t("cardNote"), side, H - 60);
  c.setAttribute("aria-label", d.title + " " + d.score.toFixed(1) + " " + t("bands")[d.band]);
}
$("dl").addEventListener("click", function () { $("cv").toBlob(function (bl) { download(bl, "protocol-x-card.png"); }); });
draw();
