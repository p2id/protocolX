# Protocol X

A practice for setting leisure apart, using it on purpose, and keeping it in bounds.

Edition: October 2026 · License: CC0 (public domain; credit to "Protocol X" is welcome, never required)

---

## 1. What it is

Protocol X treats leisure as something you set apart from the rest of your day, use deliberately, and keep within limits you chose. It does not rank activities by type. It looks at what a session left behind.

It runs on paper, in a spreadsheet, in a notes app or in chat. You need a timer and the session card.

Protocol X is a self-observation practice. It is not medical advice, and it does not diagnose or treat any condition. If a habit is harming your health, work or relationships, speak with a qualified professional.

## 2. The loop

| Step | What you do |
|---|---|
| **Set apart** | Choose one activity, a window and a duration. Start a timer that alerts at 80% of the duration. |
| **Use** | Do the activity inside the window. Stop at the timer. |
| **Read** | Rate the session on the five readings below. |
| **Review** | Once a week, average the sessions and look at the pattern. |

**Fast mode.** On a day when the full card is too much, answer three questions in words instead: did it leave you restored, neutral or drained? Did it touch your work? Was it easy or hard to stop? No numbers. A fast session counts toward your minutes and limits, but not toward the weekly readings or score.

## 3. The five readings

Each reading is rated 0 to 10 about the session you just finished.

| Code | Reading | 0 means | 5 means | 10 means |
|---|---|---|---|---|
| VRI | Vitality | More depleted than before | No change | Clearly restored, ready to work |
| CEI | Clarity | Foggy, scattered | No effect | A new idea or clear thinking |
| CQI | Give | Isolated or closed off | Neutral | Wanting to share or give |
| ARI | **Pull** | No wish to repeat it | Moderate, controlled wish | Hard to stop; keeps returning to mind |
| WII | Spill | No effect on work | Minor delay, managed | Work obligations cancelled |

**Give (CQI)** has two forms. In a shared activity it asks how connected you felt. In a solo activity (a walk, writing, quiet) it asks how much patience, warmth or willingness to give you carry out of it. If neither fits, mark it **N/A**.

**Pull (ARI)** is your own rating of how hard it was to stop. It is not a clinical measure.

When to rate: ARI and WII immediately after the session. VRI, CEI and CQI four to twenty-four hours later, then close the card.

## 4. The score

Weights:

| Reading | Weight | Direction |
|---|---|---|
| VRI | 0.30 | higher is better |
| CEI | 0.25 | higher is better |
| CQI | 0.15 | higher is better |
| ARI | 0.15 | lower is better, scored as 10 − ARI |
| WII | 0.15 | lower is better, scored as 10 − WII |

```text
Score = Σ(weight × value) ÷ Σ(weight)      over the readings that apply
```

With all five rated, the weights sum to 1 and this equals:

```text
Score = 0.30×VRI + 0.25×CEI + 0.15×CQI + 0.15×(10−ARI) + 0.15×(10−WII)
```

If CQI is N/A, it drops out and the other four weights are scaled up in proportion (VRI 0.353, CEI 0.294, ARI 0.176, WII 0.176).

**Safety gate.** If ARI ≥ 7 or WII ≥ 6, the score is capped at 3.9 and the session is labelled Harmful, however well it scored elsewhere.

| Score | Label |
|---|---|
| 8.0 – 10 | Enhancing |
| 6.0 – 7.9 | Acceptable |
| 4.0 – 5.9 | Warning |
| below 4.0 | Harmful |

## 5. Limits

Defaults. Every number is yours to change.

| Limit | Default |
|---|---|
| Daily cap | 120 minutes of leisure |
| Weekly digital allowance | the **lower** of 480 minutes and 50% of the week's total leisure minutes |
| Weekly digital-free day | 1 day |
| Block before sleep | no high-interaction digital leisure in the last 60 minutes |

When two limits disagree, the stricter one applies.

## 6. Work boundaries

- Do the day's minimum work before leisure.
- Keep leisure inside the windows you set.
- Keep the first and last hour of work free of leisure.
- Every session is timed.

## 7. Decisions from the readings

Applied in this order when more than one fits.

| If | Then |
|---|---|
| ARI ≥ 7 or WII ≥ 6 | Reduce (ARI 7–8) or stop (ARI ≥ 9) |
| ARI ≥ 6 for two weeks in a row | A 7-day digital fast, then a gradual return: 25%, 50%, 100% over three weeks |
| VRI ≤ 4 and CEI ≤ 4 | The activity is draining. Replace it |
| VRI ≥ 7 and WII ≤ 3 | It fuels your work. Keep it close to work time |
| CEI ≥ 7 and ARI ≤ 3 | Schedule it before creative work |

## 8. Weekly review

Average each reading across the week, weighted by session length:

```text
weekly value = Σ(reading × minutes) ÷ Σ(minutes)
```

Targets: VRI ≥ 6 · CEI ≥ 6 · CQI ≥ 5 · ARI ≤ 4 · WII ≤ 3 · Score ≥ 7.

Change **at most one rule per month**, and write down what you changed.

## 9. Optional supports

Off by default. Switch on only what you choose.

- **Partner.** Share your weekly page with one person you pick. A partner supports; they do not control.
- **24-hour pause.** After a session with Pull ≥ 6 or a daily-cap breach, pause that activity for a day.
- **Gradual swap.** Replace 25% of a draining activity each week with one that restores you.
- **20/20 technique.** Twenty minutes of digital leisure, then twenty minutes of focused work before more digital. It suits days when you reach for the screen without choosing to. It does not suit a film, a match or an evening with friends.

## 10. Start in seven days

| Day | Do |
|---|---|
| 1 | List three activities you already do. Use a timer only. |
| 2–3 | After each session, answer three questions: Did it restore me? Did it affect my work? Was it hard to stop? |
| 4–5 | Add one window and the daily cap. |
| 6 | Fill one full session card. |
| 7 | Do your first weekly page. |

Add no new rule until the last one holds. Dropping a rule never breaks the practice.

## 11. When something goes missing

- If the delayed ratings (Vitality, Clarity, Give) are not given within 48 hours, mark the session incomplete and leave it out of the weekly average. Do not fill in a placeholder score.
- If you miss a whole week, resume at day 4 of the seven-day start.

## 12. The session card

`session_id` · `activity` · `medium (digital / non-digital)` · `date_time` · `planned_minutes` · `actual_minutes` · `mode (full / fast)` · `VRI` · `CEI` · `CQI (or N/A)` · `ARI` · `WII` · `score` · `label` · `closed_at`
