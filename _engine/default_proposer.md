# Default proposer — CodeWiser v4.2

**Trigger phrases:** "I don't know", "whatever", shrug emoji, refusal to choose, off-topic ramble after re-prompt, silence after two cycles.

**Forbidden:** Silent blanks in `blueprint_blocks` or confidence map gaps.

---

## Ranked default entry shape

Every catalogued default MUST include:

```
DEFAULT: <id>
  applies_to: <field or decision>
  default_tier: safe | recommended | high-end
  reason: <one sentence>
  trade_off: <one sentence>
  reversible: true | false
  locale_gate: null | IN | SEA | AF | LATAM | US | EU
```

- **`locale_gate: null`** — eligible unless product context forbids.
- **Non-null `locale_gate`** — show only when **`session_state.locale_context`** matches. Monetisation and payment rails MUST gate on locale (**`_engine/locale_payment_rails.md`**).

---

## Micro-Education First (paired with defaults)

Any default touching jargon MUST pair with **≤15 words** explainer per **`MASTER_ENGINE.md` §1.2:

```
EXPLAINER: "<=15 words plain English"
DEFAULT PROPOSAL: "<named default + reason>"
```

---

## Behavior

1. Identify unresolved field(s).
2. Pick one default matching constraints, reference, complexity, and **`locale_gate`**.
3. State **`trade_off`** with the proposal.
4. Ask: "Ship with this default? Yes / No / Tweak."
5. On reject twice — widen to second tier (≤4 visible). Third cycle: log **`source: ai_default`** or **`ai_default_forced`**, set confidence ≤ 0.5 unless user locks.

---

## Anchors (illustrative)

| Context | default_tier | Hypothesis |
| --- | --- | --- |
| solo utility + free stack | safe | SQLite local-first or Supabase free |
| SaaS + medium | recommended | Hosted Postgres + SSR web |
| realtime social | recommended | WebSockets + managed DB |
| mobile-first ephemeral | safe | SQLite + optimistic UI |

Never claim endorsement.

---

## Logging

Record in **`meta_log.defaults_applied[]`** / **`_META.json`**: `field`, `value`, `default_tier`, `source`, `reason`, `trade_off`, `reversible`, `locale_gate`, `confidence`.
