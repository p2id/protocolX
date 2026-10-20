# Leisure Loop — Public Leisure Idea Generator

Leisure Loop is a dependency-free static web app for creating, editing, and sharing a seven-day leisure schedule.

## Use
Open `index.html` in a modern browser. No build step, server, analytics, or third-party dependencies are needed.

## Features
- Generates fresh daily ideas based on energy level.
- Real-world leisure is the default; digital leisure is optional.
- Calculates a 20% digital ceiling and applies the lower of that ceiling and the participant's weekly maximum.
- Editable daily activity, session type, duration, digital reason, offline alternative, and after-session review.
- Live totals and warning when edits exceed the digital cap.
- Exports a public Markdown schedule, excluding private constraints and reflection answers.
- Prepares a GitHub issue draft for community review. Users must review and submit it themselves.

## Sharing
The static app intentionally does not contain a GitHub token and cannot silently write to the repository. Use the “Prepare GitHub contribution” button to open a prefilled proposal, review the content, and submit it. A maintainer should review proposed schedules before adding them to the canonical collection.

Suggested public schedule folder: `01-KITS/community-schedules/`.

## Protocol alignment
This tool supplements the core protocol and does not redefine core scoring, safety, privacy, or existing weekly calculations. Adapt ideas for accessibility, safety, budget, and local context. Digital leisure is not inherently bad; each digital session should have a reason.
