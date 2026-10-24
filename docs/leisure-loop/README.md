# Leisure schedule organizer

A dependency-free, editable static HTML tool for organizing participant-chosen leisure into a schedule. Leisure can support mood regulation, attention restoration, and mental balance.

## Run locally

Open index.html in a modern browser. No build step, server, analytics, remote script, or account is required. Inputs stay in the browser. No input is sent anywhere unless the person deliberately opens a contribution draft. The tool can be copied and adapted outside this repository.

## Schedule organization

- Configure schedule length, available minutes, structure, output format, participant/configured weekly digital maximum, and number of digital sessions to try to include.
- The tool organizes session count, type, and duration only. It does not invent, prescribe, rank, or prefer activity content. The participant supplies an activity label or leaves it blank.
- Exactly two session types: real-world and digital, using those exact lowercase labels. Real-world is the default.
- Every digital session requires a short reason and an offline/real-world alternative.
- Every session includes exactly these post-session prompts: “What did it take?”, “What did it give?”, and “Would you repeat it?” (yes / no / with conditions).
- Live validation shows planned digital minutes, total planned leisure minutes, the share formula, the 20% ceiling, applicable cap, and compliance.
- The 20% cap is mandatory. The effective cap is the lowest of the 20% ceiling, the core protocol's 480-minute weekly maximum, and any lower participant/configured limit.
- Public export includes blank review prompts but excludes entered private reflections and weekly-review answers. Review participant-entered labels and digital reasons for identifying details before sharing.

## Digital-cap arithmetic

Planned digital minutes ÷ total planned leisure minutes × 100 = digital share. The 20% ceiling in minutes is floor(total planned leisure minutes × 0.20). Confirm the share is at most 20% and planned digital minutes are within the applicable cap. Revise any over-cap plan before export or proposal. The cap is a neutral planning constraint, not a judgment about digital leisure.

## Community publication

Canonical approved schedules belong in 01-KITS/community-schedules/. The process is **Propose → Review → Approve → Publish**. The contribution button opens a draft only; it does not write to the canonical folder. An authorized human maintainer must explicitly approve the exact proposed version before merge. See [the community folder guide](../../01-KITS/community-schedules/README.md).

## Public hosting

The repository's GitHub Pages workflow is configured to deploy this folder, but GitHub Pages must be enabled under Settings → Pages with GitHub Actions selected. Do not claim the Pages URL is live before a successful deployment is verified.

Interim public browser preview: [Open the generator via raw.githack](https://raw.githack.com/p2id/protocolX/main/docs/leisure-loop/index.html). This third-party service has no formal uptime guarantee. The first-party Pages address https://p2id.github.io/protocolX/ is not considered live until a successful deployment is verified. The public source at [GitHub](https://github.com/p2id/protocolX/blob/main/docs/leisure-loop/index.html) can be downloaded and run locally.