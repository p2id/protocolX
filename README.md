# Protocol X

**Protocol X is a free practice for rating how a leisure session leaves you: five 0–10 scales, one score, one weekly review.** It runs on paper or in the browser tools included here. Public domain (CC0), Arabic and English.

[Spec (English)](00-CORE/protocol-x.en.md) · [المواصفة (العربية)](00-CORE/protocol-x.ar.md) · [Machine-readable (JSON)](00-CORE/protocol-x.json) · [One-page card](01-KITS/onepage.html) · [Daily and weekly leisure schedule](01-KITS/daily-and-weekly-leisure-schedule.md) · [Leisure Loop generator](docs/leisure-loop/index.html)

> Protocol X is a self-observation practice. It is not medical advice and does not diagnose or treat any condition.
>
> Protocol X has no connection to any cryptocurrency, token or trading platform.

---

## What is Protocol X?

Protocol X treats leisure as something you set apart from the rest of your day, use deliberately, and keep within limits you chose. It does not rank activities by type. A podcast, a match, a walk or a feed can restore you one day and drain you the next, so it asks what a session left behind.

## How does a session work?

1. **Set apart.** Choose one activity, a window and a length. Start a timer that alerts at 80%.
2. **Use.** Do it inside the window. Stop at the timer.
3. **Read.** Rate Pull and Spill straight away. Rate Vitality, Clarity and Give four to twenty-four hours later.
4. **Review.** Once a week, average the sessions by minutes. Change at most one rule a month.

On a day when the full card is too much, use **fast mode**: three questions in words, no numbers.

## How is the score calculated?

| Reading | Code | Weight | Direction |
|---|---|---|---|
| Vitality | VRI | 0.30 | higher is better |
| Clarity | CEI | 0.25 | higher is better |
| Give | CQI | 0.15 | higher is better; N/A allowed |
| Pull | ARI | 0.15 | lower is better |
| Spill | WII | 0.15 | lower is better |

```text
Score = 0.30×VRI + 0.25×CEI + 0.15×CQI + 0.15×(10−ARI) + 0.15×(10−WII)
```

If Give is N/A, it drops out and the other weights scale up in proportion. **Safety gate:** if Pull ≥ 7 or Spill ≥ 6, the score is capped at 3.9 and the session is labelled Harmful. Bands: 8.0–10 Enhancing · 6.0–7.9 Acceptable · 4.0–5.9 Warning · below 4.0 Harmful.

Test vectors for implementers are in [`protocol-x.json`](00-CORE/protocol-x.json).

## Do I need an app?

No. An index card with five boxes is enough. For convenience, the site in this repository includes three tools that run entirely in your browser and save only to your own device: a session timer, a score card maker and a week map. Open `index.html` (English) or `ar/index.html` (Arabic) through the site's published address. Nothing is sent anywhere. See [PRIVACY.md](PRIVACY.md).

## What is in this repository

| Folder | Contents |
|---|---|
| `00-CORE` | The practice in English and Arabic, plus JSON and YAML |
| `01-KITS` | One-page card, printable session card, weekly page |
| `03-CONTENT` | 12 articles (English, Arabic), posts, video scripts, quote cards |
| `04-COMMUNITY` | Seven-day start, partner mode, guidelines |
| `06-LOCALIZATION` | Glossary (English, Arabic, Spanish, French, Chinese) and translation guide |
| `assets`, `tools`, `ar` | The site and the tools |

## Use it, change it, translate it

Protocol X is released under [CC0 1.0](LICENSE). You may copy, change, translate, sell and build on it without asking. Credit to "Protocol X" is welcome, never required. To translate, read [the guide](06-LOCALIZATION/translation-guide.md).

## Contribute

Open an issue with what you changed and what happened. See [CONTRIBUTING.md](CONTRIBUTING.md).

---

# Protocol X (بالعربية)

**Protocol X ممارسة مجانية لتقييم ما تتركه جلسة الترفيه فيك: خمسة مقاييس من 0 إلى 10، ودرجة واحدة، ومراجعة أسبوعية واحدة.** تعمل على الورق أو بأدوات المتصفح المرفقة. ملكية عامة (CC0) بالعربية والإنجليزية.

> Protocol X ممارسة لمراقبة الذات. وليس نصيحة طبية ولا يشخّص أي حالة ولا يعالجها.
>
> لا علاقة لـ Protocol X بأي عملة رقمية أو رمز أو منصة تداول.

## ما هو Protocol X؟

يتعامل مع الترفيه كشيء تفصله عن بقية يومك، وتستعمله بقصد، وتبقيه داخل حدود اخترتها. لا يصنّف الأنشطة بنوعها، فالبودكاست أو المباراة أو المشي أو التصفح قد يعيد إليك طاقتك يومًا ويستنزفها في اليوم التالي. لذلك يسأل: ماذا تركت الجلسة بعدها؟

## كيف تعمل الجلسة؟

1. **افصل.** اختر نشاطًا ونافذة ومدة، وشغّل مؤقتًا ينبّه عند 80%.
2. **استعمل.** مارسه داخل النافذة وتوقف عند المؤقت.
3. **اقرأ.** قيّم الشد والتسرّب فورًا، ثم الحيوية والصفاء والعطاء بعد 4 إلى 24 ساعة.
4. **راجع.** مرة في الأسبوع احسب متوسط الجلسات بالدقائق. وغيّر قاعدة واحدة على الأكثر في الشهر.

وفي يوم تكون فيه البطاقة الكاملة أثقل مما تحتمل استعمل **الوضع السريع**: ثلاثة أسئلة بالكلمات بلا أرقام.

## كيف تُحسب الدرجة؟

```text
الدرجة = 0.30×VRI + 0.25×CEI + 0.15×CQI + 0.15×(10−ARI) + 0.15×(10−WII)
```

إذا كان العطاء N/A فإنه يخرج من الحساب وتُرفع الأوزان الباقية بالتناسب. **بوابة السلامة:** إذا بلغ الشد 7 فأكثر أو التسرّب 6 فأكثر تُخفض الدرجة إلى 3.9 ويُصنّف النشاط ضارًا. النطاقات: 8.0–10 مُعزّز · 6.0–7.9 مقبول · 4.0–5.9 تحذير · أقل من 4.0 ضار.

## هل أحتاج إلى تطبيق؟

لا. تكفي بطاقة فهرسة بخمس خانات. وللراحة يتضمن الموقع ثلاث أدوات تعمل كلها داخل متصفحك وتحفظ على جهازك وحده: مؤقت الجلسة، وبطاقة الدرجة، وخريطة الأسبوع. افتح `ar/index.html` عبر العنوان المنشور للموقع. لا يُرسَل أي شيء إلى أي مكان.

## الاستعمال والترخيص

Protocol X منشور بترخيص [CC0 1.0](LICENSE): انسخه وعدّله وترجمه وابنِ عليه دون إذن. الإسناد مرحَّب به وليس شرطًا.
