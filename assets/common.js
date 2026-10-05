/* Shared helpers for the tool pages. */
var t = PX.t, $ = function (id) { return document.getElementById(id); };
var uidn = 0;
function el(tag, attrs, html) { var e = document.createElement(tag); for (var k in (attrs || {})) e.setAttribute(k, attrs[k]); if (html != null) e.innerHTML = html; return e; }
function sliderRow(k, val) {
  var id = "sl" + (++uidn);
  return '<div class="row"><label for="' + id + '">' + k + " · " + t(k) + '</label><input id="' + id + '" class="sl" data-k="' + k + '" type="range" min="0" max="10" value="' + val + '"><output for="' + id + '">' + val + '</output><span class="hint">' + t("h" + k) + "</span></div>";
}
function wireOutputs(root) {
  root.querySelectorAll("input[type=range]").forEach(function (i) {
    var o = i.parentNode.querySelector("output");
    i.addEventListener("input", function () { o.textContent = i.value; });
  });
}
function val(root, k) { return +root.querySelector('.sl[data-k="' + k + '"]').value; }
function dayOf(s) { return s.day != null ? +s.day : ((new Date(s.t).getDay() + 6) % 7); }
function closedScored() { return PX.store.load().filter(function (s) { return s.closed && !s.fast; }); }
function download(blob, name) {
  var u = URL.createObjectURL(blob), a = el("a", { href: u, download: name });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function () { URL.revokeObjectURL(u); }, 1000);
}
$("priv").textContent = t("priv");
