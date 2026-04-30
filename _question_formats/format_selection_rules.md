# Format selection rules — CodeWiser v4.1

When authoring or generating runtime questions:

1. **Minimize cognitive load** — Prefer choice + confirm over prose.
2. **Match phase intent** — `feature_tiering` must use Tiering Bucket (or Priority Rank fallback if tooling cannot bucket).
3. **Constraints early** — Budget Bucket appears in `the_constraints`; never duplicate as free-form money questions later.
4. **Reference Accelerator** — If full clone: replace open discovery with confirm on preloaded bullets.
5. **Anti-overwhelm** — At most one open-text slot per exchange unless synthesizing paragraphs from user story.
6. **Conditional gating** — `show_me_the_money`: single/multi only when monetization path known or assumed from reference.
7. **Delegation bulk** — In bulk mode, consolidate into one confirm checklist per exchange slice (still obey max bullet count ~7 items).

---

### Phase → format anchors

| Phase module | Default formats |
| ------------ | ---------------- |
| foundation | open + single + confirm |
| journeys | confirm + conditional |
| rules | single + conditional |
| screens | multi + confirm |
| design/look_and_feel | single + confirm (four MVP fields) |
| data | single + conditional + confirm |
| infrastructure/the_constraints | Budget Bucket + single + confirm |
| infrastructure/the_plumbing | multi + single |
| ship/feature_tiering | Tiering Bucket |
| ship/the_blueprint | structured compile (no bare open) |
