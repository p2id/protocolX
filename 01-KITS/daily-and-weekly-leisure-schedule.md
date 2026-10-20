# Prompt and template: daily and weekly leisure schedule

> **Leisure is a biological and psychological necessity, not a luxury.** Its primary functions include mood regulation, attention restoration, and mental balance. Plan leisure to support those functions—not to optimize productivity, complete obligations, or prove achievement.

This portable prompt/template can be used in ChatGPT, another text assistant, on paper, or adapted for a community. The repository is only a publication location; it does not define or own the method. Reuse, edit, translate, and republish freely under the repository's CC0 license.

## Copy-and-use prompt

Act as a flexible leisure-schedule facilitator. Create a practical daily or weekly schedule using the rules and inputs below. Ask only for missing details that materially affect the plan. Do not assume the repository's example activities are mandatory.

**Purpose and method**
1. Treat leisure as a biological and psychological necessity supporting mood regulation, attention restoration, and mental balance. Use those functions to shape activity choice, duration, pacing, and review.
2. Schedule leisure only: no work, study, chores, errands, productivity tasks, or other obligations disguised as leisure.
3. Classify every session as exactly one of:
   - **Real-world:** the physical world is the main medium.
   - **Digital:** a screen, device, or internet is the main medium.
   If an experience changes medium, split it into separately timed sessions and classify each one.
4. Default to real-world leisure. Digital leisure is not inherently bad; use it when it fits the person's intention and circumstances.
5. Prefer self-sufficient activities that can start immediately with free or low-cost resources already available. Do not assume subscriptions, pre-produced content, special equipment, purchases, or another person's participation.
6. Adapt for energy, accessibility, safety, location, space, culture, weather, time, and personal preference. Offer genuine variety; do not repeat one pattern merely to fill a schedule.
7. Every digital session must state a short, honest reason. Apply the chosen weekly digital maximum strictly.
8. After each session ask: **What did it take? What did it give? Would I repeat it (yes, no, or with conditions)?**
9. In the weekly review ask: **Which real-world session improved mood most? Was the digital cap exceeded? What real-world alternative could replace or complement a digital session?**
10. Keep personal constraints and reflections private by default. For a public version, exclude names, precise locations, contact details, sensitive details, and private reflections.
11. Make the output reusable and editable. Do not mention brands, named services, or named entertainment entities in generated activity content.

**Inputs to customize**
- Schedule length: [one day / seven days / custom number of days]
- Leisure time available: [minutes per day or per session]
- Current energy: [low / medium / high / varies]
- Desired planning mode: [minimal / balanced / low-energy / high-variety / custom]
- Output format: [table / list / Markdown / prompt-ready text]
- Accessibility, safety, space, weather, budget, and other constraints: [optional; keep private]
- Real-world interests or activities to include/avoid: [optional]
- Weekly digital maximum: [minutes, or a stricter personal percentage]
- Optional 20% planning ceiling: [on / off; default on]
- Preferred variation: [familiar / mixed / exploratory]
- Any activity to exclude: [optional]

**Generation requirements**
- Build each suggestion from the person's constraints and preferences; use the chosen mode to change session count, duration distribution, variety, and structure—not just activity names.
- Each activity must be leisure, self-sufficient, feasible now or with resources already available, and adaptable. If a suggestion requires unavailable resources, replace it.
- Show total planned leisure minutes, digital minutes, the applicable digital cap, and remaining allowance.
- Before publication, check every digital reason and check that digital minutes do not exceed the cap. If a schedule exceeds the cap, revise it rather than presenting the excess as compliant.
- Include an offline alternative for each digital session.
- Leave blank review fields for actual experiences; do not invent outcomes.

## Base rules first; optional planning cap second

The core leisure rules above govern scope, classification, participant choice, evaluation, safety, privacy, and any applicable core-protocol scoring or limits. **The 20% digital ceiling is an additional planning constraint, not a replacement for those core rules or calculations.** When enabled, calculate:

- Planned leisure total = sum of all planned leisure-session minutes.
- 20% planning ceiling = floor(planned leisure total × 0.20).
- Effective digital maximum = the lowest of the participant's stated weekly digital maximum, the optional 20% ceiling (if enabled), and any stricter applicable core-protocol limit.
- Digital minutes must be at or below the effective maximum. Every digital session still needs a reason, even when the cap is not reached.

Do not alter or reinterpret existing core score formulas, safety gates, or weekly-page calculations.

## Editable schedule

| Day/date | Window | Activity | Type (real-world/digital) | Minutes | Reason (required for digital) | Offline alternative |
|---|---|---|---|---:|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |
| 6 | | | | | | |
| 7 | | | | | | |

Add or remove rows to match the requested schedule length. A session's duration should fit the available time and current energy; an empty slot or rest is acceptable.

## After each session

- **What did it take?** (for example: fatigue, distraction, boredom, friction): ____________________
- **What did it give?** (for example: energy, calm, clarity, connection, enjoyment, mental balance): ____________________
- **Would I repeat it?** Yes / No / With conditions
- If conditional, what would I change? ____________________

## Weekly review

- Which real-world session improved my mood most, if any? ____________________
- Planned leisure minutes: ______ · Actual leisure minutes: ______
- Planned digital minutes: ______ · Actual digital minutes: ______
- Was the effective digital maximum exceeded? Yes / No
- What real-world alternative could replace or complement a digital session next week? ____________________
- What took energy? ____________________
- What gave energy, clarity, calm, or balance? ____________________
- One small adjustment for next week: ____________________

## Community publication: propose → review → approve → publish

1. **Propose:** prepare an editable, anonymized Markdown file and submit it through a GitHub issue or pull request targeting `01-KITS/community-schedules/`.
2. **Review:** a maintainer checks leisure-only scope, self-sufficiency, accessibility, privacy, classification, digital reasons, cap arithmetic, and consistency with the core rules.
3. **Approve:** the maintainer explicitly approves the proposed change. Submission is not approval.
4. **Publish:** only after approval is the file merged into the canonical community folder.

Never auto-publish generated schedules to the canonical collection. Personal notes and session reflections should remain local unless the participant deliberately removes private details and chooses to share.

## Portability

This template is intentionally independent of any app, repository structure, activity catalogue, or named entity. Copy it into any text editor or assistant and change its inputs, rules, or output format as needed. The repository is simply one public place to publish and update versions.
