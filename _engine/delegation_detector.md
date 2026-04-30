# Delegation detector — Engine rule (v4.1)

**Goal:** Respect user desire to offload decisions without losing auditability — switch to bulk proposal inside current phase remainder.

---

## Trigger phrases / signals

Normalize case-insensitivity:

you decide • whatever works • up to you • pick for me • you’re the expert • surprise me • I trust you • just draft it • don’t ask me anymore

Repeated ultra-short affirmative (`ok`, `sure`, `yeah`) ×3 counts as fatigue + soft delegation overlap with `anti_overwhelm`.

---

## Mode transition

1. Enter **delegation_bulk** for remainder of phase (until synthesis checkpoint boundary).
2. Assistant produces **proposal sheet** bullets (still ≤7 bullets per bubble; may split continuation).
3. User single confirmation pass (accept all / annotate exceptions).
4. Log each accepted default into `_meta.delegations`:

```json
{
  "phase": "journeys/the_main_event",
  "field": "success_state_ai_default",
  "proposal": "...",
  "user_action": "bulk_accept_all"
}
```

5. If rejected items exist → narrowed follow-up rounds.

---

### Rationale logging

Minimal notes (one line each): why plausible under constraints/reference.
