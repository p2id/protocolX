$("h").textContent = t("tMap"); $("mt").textContent = t("mapTitle"); $("mn").textContent = t("mapNote"); $("at").textContent = t("addManual");
var range = "7";
function inRange(s) { return range === "all" || (Date.now() - new Date(s.t).getTime()) <= 7 * 864e5; }
function render() {
  var all = PX.store.load().filter(function (s) { return s.closed && inRange(s); }), w = PX.week(all);
  var sel = '<label class="f" for="rg">' + t("week") + '</label><select id="rg"><option value="7"' + (range === "7" ? " selected" : "") + '>' + t("range7") + '</option><option value="all"' + (range === "all" ? " selected" : "") + '>' + t("rangeAll") + '</option></select>';
  var rd = PX.KEYS.map(function (k) { var v = w.readings[k], inv = (k === "ARI" || k === "WII"); return '<div class="bar' + (inv ? " inv" : "") + '"><b>' + k + '</b><i><u style="width:' + (v == null ? 0 : v * 10) + '%"></u></i><span>' + (v == null ? "–" : v.toFixed(1)) + '</span></div>'; }).join("");
  var msg = w.total ? (w.overAllowance ? t("over") : t("within")) : "";
  $("sum").innerHTML = sel + '<div class="res"><span class="num">' + (w.score == null ? "–" : w.score.toFixed(1)) + '</span>' + (w.score == null ? "" : '<span class="tag t' + PX.band(w.score) + '">' + t("bands")[PX.band(w.score)] + '</span>') + '<span class="muted">' + t("weeklyScore") + '</span></div>' +
    '<p class="small">' + t("total") + ': <strong>' + w.total + '</strong> · ' + t("digitalMin") + ': <strong>' + w.digital + '</strong> · ' + t("allowance") + ': <strong>' + Math.round(w.allowance) + '</strong><br><span class="' + (w.overAllowance ? "t3" : "muted") + '">' + msg + '</span></p>' + rd;
  $("rg").addEventListener("change", function () { range = this.value; render(); });
  var days = [0, 0, 0, 0, 0, 0, 0].map(function () { return [0, 0, 0, 0, 0]; });
  all.forEach(function (s) { var di = dayOf(s); if (s.fast) days[di][4] += s.minutes; else days[di][PX.score(s).band] += s.minutes; });
  var mx = Math.max.apply(null, days.map(function (d) { return d[0] + d[1] + d[2] + d[3] + d[4]; }).concat([60]));
  var rtl = PX.lang() === "ar", cw = 64, gap = 18, h = 220, W = 7 * (cw + gap) + gap;
  var cols = ["var(--b0)", "var(--b1)", "var(--b2)", "var(--b3)", "var(--muted)"];
  var svg = '<svg viewBox="0 0 ' + W + " " + (h + 60) + '" width="100%" style="min-width:' + Math.min(W, 520) + 'px;max-width:640px" role="img" aria-label="' + PX.esc(t("mapTitle")) + '">';
  for (var i = 0; i < 7; i++) {
    var di = rtl ? 6 - i : i, x0 = gap + i * (cw + gap), yb = h, tot = 0;
    for (var b = 0; b < 5; b++) {
      var hh = days[di][b] / mx * h;
      if (hh > 0) { yb -= hh; svg += '<rect x="' + x0 + '" y="' + yb + '" width="' + cw + '" height="' + hh + '" fill="' + cols[b] + '" rx="4"><title>' + (b < 4 ? t("bands")[b] : t("fastName")) + ": " + days[di][b] + " " + t("minutes") + '</title></rect>'; }
      tot += days[di][b];
    }
    svg += '<text x="' + (x0 + cw / 2) + '" y="' + (h + 24) + '" text-anchor="middle" font-size="14" fill="var(--muted)">' + t("days")[di] + '</text>';
    if (tot) svg += '<text x="' + (x0 + cw / 2) + '" y="' + (h + 44) + '" text-anchor="middle" font-size="13" fill="var(--ink)">' + tot + '</text>';
  }
  svg += '</svg><div class="small" style="display:flex;gap:1rem;flex-wrap:wrap;margin-top:.4rem">' + t("bands").concat([t("fastName")]).map(function (n, i) { return '<span><span style="display:inline-block;width:.8rem;height:.8rem;border-radius:3px;background:' + cols[i] + ';margin-inline-end:.35rem"></span>' + PX.esc(n) + '</span>'; }).join("") + '</div>';
  $("map").innerHTML = all.length ? svg : '<p class="muted">' + t("none") + '</p>';
}
function addForm() {
  var dopt = t("days").map(function (d, i) { return '<option value="' + i + '">' + d + '</option>'; }).join("");
  $("add").innerHTML = '<div class="grid2"><div><label class="f" for="md">' + t("day") + '</label><select id="md">' + dopt + '</select>' +
    '<label class="f" for="ma">' + t("activity") + '</label><input id="ma" type="text" maxlength="60">' +
    '<label class="f" for="mm">' + t("minutes") + '</label><input id="mm" type="number" min="1" value="30">' +
    '<label class="f" for="me">' + t("medium") + '</label><select id="me"><option value="digital">' + t("digital") + '</option><option value="non-digital">' + t("nondigital") + '</option></select></div><div id="mr">' +
    PX.KEYS.map(function (k) { return sliderRow(k, k === "ARI" || k === "WII" ? 2 : 5); }).join("") + '<label class="check"><input type="checkbox" id="mna"> ' + t("na") + '</label></div></div><p><button class="p" id="madd">' + t("save") + '</button> <span class="muted small" id="mok"></span></p>';
  wireOutputs($("add"));
  $("mna").addEventListener("change", function () { $("mr").querySelector('.sl[data-k="CQI"]').disabled = this.checked; });
  $("madd").addEventListener("click", function () {
    var s = { id: PX.uid(), t: new Date().toISOString(), day: +$("md").value, activity: $("ma").value.trim(), medium: $("me").value, minutes: +$("mm").value || 30, closed: true };
    PX.KEYS.forEach(function (k) { s[k] = (k === "CQI" && $("mna").checked) ? null : val($("mr"), k); });
    var c = PX.clean(s); if (!c) return;
    var a = PX.store.load(); a.push(c); PX.store.save(a); $("mok").textContent = t("saved"); render();
  });
}
function io() {
  $("io").innerHTML = '<button id="ex">' + t("ex") + '</button> <label class="btn" style="cursor:pointer">' + t("im") + '<input id="im" type="file" accept="application/json" hidden></label> <button id="cl">' + t("clr") + '</button>';
  $("ex").addEventListener("click", function () { download(new Blob([JSON.stringify(PX.store.load(), null, 2)], { type: "application/json" }), "protocol-x-sessions.json"); });
  $("im").addEventListener("change", function () {
    var f = this.files[0]; if (!f || f.size > 2e6) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var d = JSON.parse(r.result); if (!Array.isArray(d)) return;
        var cur = PX.store.load(), ids = {}; cur.forEach(function (x) { ids[x.id] = 1; });
        d.slice(0, 5000).forEach(function (x) { var c = PX.clean(x); if (c && !ids[c.id]) { ids[c.id] = 1; cur.push(c); } });
        PX.store.save(cur); render();
      } catch (e) {}
    };
    r.readAsText(f);
  });
  $("cl").addEventListener("click", function () { if (confirm(t("confirmClr"))) { PX.store.clear(); render(); } });
}
addForm(); io(); render();
