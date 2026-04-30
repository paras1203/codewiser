# Synthesis protocol — v4.1

Run after substantive content in any phase completes (possibly merged exchanges).

Steps:

1. **Extract** structured slots per `extraction_goals.md`.
2. **Summarize** 3–5 bullets plain language.
3. **Confirm** explicitly: concise yes/no tweak prompt.
4. **Persist** to `blueprint_blocks` plus confidence scores when schema present.
5. **Bridge** one-line preview following phase respecting cascade.

---

## Contradictions

Detect mismatch vs prior authoritative answers. Pause forward motion only if blocking; else annotate resolution options.

Paragraph answers: never penalize verbosity — distill into fields.

---

### _meta logging (v4.1)

Append each phase operation:

```json
{
  "defaults_applied": [{ "field": "constraints.budget_bucket", "tier": "$0_free_stack", "source": "user_confirm" }],
  "delegations_logged": [...],
  "reference_level": "partial_clone",
  "phases_activated_this_session": [...]
}
```

Auditors downstream must see what's AI-chosen versus user verbatim.
