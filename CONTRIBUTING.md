# Contributing to Tamada Companion

Contributions should improve the product while treating Georgian language and supra traditions with care. A technically correct change is not sufficient if it introduces unsupported cultural claims or disrespectful wording.

## Before starting

1. Keep each change focused and reviewable.
2. Cite or document the human review behind material cultural or language changes.
3. Do not add analytics, remote storage, or tracking without an explicit privacy review.
4. Never commit secrets, personal event details, or private guest information.

## Development workflow

1. Create a short-lived branch from `main`.
2. Start the app with `./server.ps1`.
3. Make the smallest coherent implementation or content change.
4. Complete the relevant checks in [`docs/TESTING.md`](docs/TESTING.md).
5. Update the documentation when behavior or cultural scope changes.
6. Use a commit message that describes the resulting improvement.

## Code and content expectations

- Keep the web experience local-first and usable without a backend.
- Escape or safely render any user-provided content.
- Ensure audio is optional and has a clear stop control.
- Preserve responsive behavior and keyboard reachability.
- Version service-worker caches when cached files change.
- Treat the Android folder as incomplete until its assets and build files are reproducible.
- Ask a qualified native speaker to review meaningful Georgian-language edits.
- Avoid presenting one family's or region's customs as universal Georgian rules.

## Pull request checklist

- [ ] The change has a clear user, cultural, or maintenance benefit.
- [ ] No secrets, private guest information, or generated build output are included.
- [ ] Relevant manual checks pass.
- [ ] Georgian language and cultural claims were reviewed when applicable.
- [ ] Offline, storage, clipboard, or audio behavior was checked when affected.
- [ ] Keyboard and narrow-screen behavior remain usable.
- [ ] Documentation matches the resulting behavior and limitations.
