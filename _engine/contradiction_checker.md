# Contradiction checker — CodeWiser v4.2

Normative overview: **`v4.2_architecture.plan.md` §5**. Config: **`_engine/contradiction_rules.json`**.

## When to run

After phase synthesis writes to **`blueprint_blocks`**, evaluate **`cross_field_rules`** (and any additional rule blocks) against current **`session_state`**. Respect **`max_open_contradiction_flags`**.

## Open-flag cap

- Never allow **`contradiction_flags.length` > `max_open_contradiction_flags`** (**2**). New conflicts coalesce or displace per product policy documented in **`contradiction_rules.json`** when already at capacity.

## Two-tier halt (`open_flags` count)

| State | Behavior |
| --- | --- |
| **`open_flags == 1`** | Schedule resolution at **start of next phase only**; **no** full-session halt finishing the current phase. |
| **`open_flags == 2`** | **Full halt.** Present **both** contradictions in **one** exchange. No new discovery until both resolved — except Delegation fallback. |

## Delegation Detector fallback

If the user dismisses / ignores resolution **twice** while **`open_flags == 2`**: propose **`ai_default`** for both resolutions, set **`reversible: true`**, log to **`_META.json`** and **`meta_log`**, clear **`contradiction_flags`**, continue.

## Clear conditions

A contradiction clears only when: **(a)** user explicitly confirms a resolution, or **(b)** Delegation **`ai_default`** applies with **`reversible: true`**.

## Archive rule

Resolved contradictions append to **`session_state.meta_log.contradiction_resolutions[]`** (and export **`_META.json`** audit). **Never delete** archived entries.

Mirror behavior in **`MASTER_ENGINE.md` §1.6 and §5.4** when implementing the orchestration runtime.
