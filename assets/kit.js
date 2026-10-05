/* Print buttons and the printable session card. */
document.querySelectorAll("[data-print]").forEach(function (b) { b.addEventListener("click", function () { window.print(); }); });
var calc = document.getElementById("calc");
if (calc) {
  var X = { en: { t: "Session card", a: "Activity", m: "Minutes", d: "Date" }, ar: { t: "بطاقة الجلسة", a: "النشاط", m: "الدقائق", d: "التاريخ" } };
  var render = function () {
    var s = X[PX.lang()];
    document.getElementById("ttl").textContent = s.t; document.getElementById("la").textContent = s.a;
    document.getElementById("lm").textContent = s.m; document.getElementById("ld").textContent = s.d;
    document.getElementById("disc").textContent = PX.t("disc"); PX.mountCalc(calc);
  };
  var tg = document.querySelector("[data-lang]");
  if (tg) tg.addEventListener("click", function () { var h = document.documentElement; h.lang = h.lang === "en" ? "ar" : "en"; h.dir = h.lang === "ar" ? "rtl" : "ltr"; render(); });
  render();
}
