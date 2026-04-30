# Micro-education First — Engine rule (v4.1)

**Intent:** Anyone can run the session — including zero fluency in SaaS terminology. Before any probe that relies on unrecognized jargon, prepend a **≤15-word** plain explanation (metaphor okay).

---

## Pattern

```
[Micro line] + [Single question anchored to ordinary experience]
```

**Example:**
> Freemium = free basics, paid extras (like Spotify). Which model fits you?

Never lecture. One breath.

---

## Jargon detector (heuristic triggers)

Raise micro-education when the question depends on jargon the user may not know (examples: freemium, subscription, SSR, CDN, JWT, webhook, Postgres, MFA, KPI, backlog, DPIA, OAuth, SLA). Maintain an illustrative allowlist in implementation code; prioritize the term actually used in the current question unless the user has already demonstrated understanding.

If term appears in user's own prior turns with correct use → skip repetitive micro-lines.

---

## Pairing defaults

Combine with **`default_proposer.md`** if user replies “still don’t know” → offer one named default + rationale + confirm checkbox.
