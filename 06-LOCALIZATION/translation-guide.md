# Translation guide

Protocol X is CC0. You do not need permission to translate it. These notes keep translations compatible.

## Keep exactly

- The five codes: VRI, CEI, CQI, ARI, WII.
- The formula, weights, thresholds and the safety gate (Pull ≥ 7 or Spill ≥ 6 caps at 3.9).
- The bands and their cut-offs: 8.0, 6.0, 4.0.
- The disclaimer: self-observation, not medical advice.

## Adapt

- Words for the five readings and the four steps, using the glossary.
- Examples of activities, so they feel ordinary where you live.
- Units and date formats.
- The tone: calm, plain, short sentences. No promises of results.

## Avoid

- Words that mean addiction or disorder in any language for Pull. It is a rating of how hard something was to stop.
- Claims of research or proven effect.

## How to add a language

1. Copy `00-CORE/protocol-x.en.md` to `00-CORE/protocol-x.<code>.md`.
2. Translate. Keep headings and tables in the same order.
3. Add your terms to `glossary.md`.
4. Add `strings` for the tools in `assets/px.js` (the `T` object) and a landing page under `/<code>/`.
5. Add `hreflang` links to every landing page.
6. Open a pull request.
