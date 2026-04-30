# Question priority engine — CodeWiser v4.2

Normative summary: **`v4.2_architecture.plan.md` §3.**

## `priority_weight` on patterns

Every **`## PATTERN:`** block in **`phase_library/**/question_patterns.md`** SHOULD include a line:

`**priority_weight:** \`{ "impact": 1-5, "dependency": 1-5, "uncertainty": 1-5 }\`` (JSON object inside backticks).

Scores are **1–5** integers. Interpretation:

- **impact** — How much blueprint quality drops if unanswered.
- **dependency** — How many downstream phases block without it (constraints, tiering deps).
- **uncertainty** — Inverse of **`confidence_map`** prior for that intent (bootstrap at **3** when unknown).

## Sort key

Compute **`impact × dependency × uncertainty`**. Stable-sort ties by declaration order.

## Yield per assistant turn

Return the **top 4–5** patterns unless **delegation_detector** invokes bulk-confirm (then expand per delegation rules). Honor **`anti_overwhelm.md`** ceiling.

## Fallback

If patterns lack weights, default each dimension to **3** and log **`defaults_applied`** in synthesis **`_meta`**.
