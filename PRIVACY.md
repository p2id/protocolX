# Privacy

The tools in this repository (timer, score card, week map, session card) run in your browser.

- They store sessions in your browser's local storage on your own device, under the key `protocolx.sessions.v1`.
- They make no network requests and send your data nowhere. They have no accounts, cookies, trackers or analytics.
- Everything read back from storage or from an imported file is validated and cleaned before use.
- Score cards are drawn in your browser. Downloading one saves a file to your device. Nothing is uploaded.
- Export gives you a JSON file. Import reads one you choose. Clear removes everything saved.
- Clearing your browser data also removes saved sessions.

**Where the site is hosted.** Whoever serves these files can see ordinary web-server information about a visit, such as the address of the page requested. That is outside the tools and outside this repository.

**Shared web address.** Browser storage is shared by every page served from the same web address. If you host this site next to other pages at that address, those pages can read the saved sessions. Host it on its own address if that matters to you.
