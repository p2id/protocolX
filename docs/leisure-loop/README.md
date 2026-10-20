# Leisure schedule generator

A dependency-free, editable static HTML tool for creating and publishing adaptable leisure schedules. The interface begins with the principle that leisure is a biological and psychological necessity supporting mood regulation, attention restoration, and mental balance.

## Run locally

Open `index.html` in a modern browser. No build step, server, analytics, external script, or account is required. Inputs remain in the browser and are not sent to a server. The tool can be copied and adapted outside this repository.

## Flexible generation

- Configurable schedule length, minutes, energy, generation mode, output format, variation, digital maximum, and optional 20% ceiling.
- Modes: minimal, balanced, low-energy, high-variety, and custom.
- Output formats: Markdown, table, list, and prompt-ready text.
- Activity ideas are composed from editable non-branded patterns rather than a fixed activity catalogue.
- Self-sufficiency filter: prefer activities that can start now with free/low-cost resources already available; avoid default dependence on subscriptions, pre-produced content, purchases, or specialized equipment.
- Exactly two session types: Real-world and Digital. Real-world is the default. Every digital session requires a reason.
- Live totals and warnings; the tool does not intentionally generate digital time beyond the effective cap.
- Public export excludes personal constraints and private reflections.
- “Prepare GitHub contribution” opens a reviewable draft only. A person must review and submit it.

## Base rules and the 20% ceiling

The leisure-only scope, classification, real-world default, digital reason, session evaluation, and weekly review are base rules. The optional 20% digital ceiling is an additional planning constraint, not a replacement for core protocol rules, scoring, safety gates, or existing weekly calculations. The effective digital maximum is the lowest applicable maximum.

## Community publication

Canonical approved schedules belong in `01-KITS/community-schedules/`. The process is **propose → maintainer review → approve → publish**. The generator never writes generated schedules into that folder automatically. See [the community folder guide](../../01-KITS/community-schedules/README.md).

## Research refresh

The documented quarterly process for refreshing general, open-source-derived idea patterns is [here](../../01-KITS/activity-suggestion-refresh.md). The current refresh log records the process being established, not a completed literature review.

## Public hosting

The repository's GitHub Pages workflow is configured to deploy this folder, but GitHub Pages must be enabled for the repository under **Settings → Pages**, with **GitHub Actions** selected as the build and deployment source. The deployment workflow's success is the authoritative check; do not claim the Pages URL is live before a successful deployment.

If Pages is not enabled by a repository administrator, use the public source file at [GitHub](https://github.com/p2id/protocolX/blob/main/docs/leisure-loop/index.html) or try the third-party HTML preview URL documented in the root README. The source is public and the app can always be downloaded and run locally. A third-party preview is a convenience, not a maintained hosting guarantee.
