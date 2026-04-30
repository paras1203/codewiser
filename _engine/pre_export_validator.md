# Pre-export validator — CodeWiser v4.2

Authoritative gate list mirrors **`v4.2_architecture.plan.md`** §10. Run before bundle / blueprint export; **block** on any failed gate.

---

## Gate 1 — Required sections

All bundle artifacts required for this session’s **`storage_strategy`** and **`platform_access`** profile are present (`_output/bundle_spec.md`).

---

## Gate 2 — Contradictions

`contradiction_flags` is **empty** after resolution (no open blocking flags).

---

## Gate 3 — Schema completeness

Per **`storage_strategy`** — see **`v4.2_architecture.plan.md`** §10 Gate 3 table (`DATA_MODEL.md` / `SCHEMA.sql` / `SCHEMA.json` rules).

---

## Gate 4 — Feature Tier Consistency (dependency-aware)

**Read:** `feature_dependency_map` from **`session_state.blueprint_blocks.features`**. The map is populated by the **feature_tiering** phase AI-inferred dependency capture exchange (user confirms or corrects only) — see **`phase_library/ship/feature_tiering/`**.

If **`feature_dependency_map`** is **absent** or **empty**: **skip** Gate 4 (no block) and **log a warning** to **`_META.json`**.

Otherwise:

```
FOR EACH feature IN feature_dependency_map WHERE tier == "MVP":
  FOR EACH dep IN feature.depends_on:
    Resolve dependency feature row (same map) → dep.tier, dep.name/id, dependency_type on edge (from feature row: default **hard** if omitted)
    IF dep.tier != "MVP":
      IF dependency_type == "soft":
        WARN only — log to `_META.json` (`feature_tier_warnings[]` or similar); do **not** block export
      ELSE:
        BLOCK export
        Return: "Feature tier conflict: MVP feature '[name]' depends on
                 [v1.1/Future/<offending tier>] feature '[dep]'"
```

Resolve each **`depends_on`** entry by **`feature_id`** against **`feature_dependency_map`** (per **`phase_library/ship/feature_tiering/output_template.md`**). Compare tiers after normalizing casing to the gate’s canonical **`MVP`** label.

---

## Gate 5 — Bundle integrity (examples)

Budget / stack alignment, **`_META`** contradiction archive integrity, or other rules declared in **`bundle_spec`** / product policy.

---

## Gate 6 — Implementation plan chunking compliance

**Input:** **`IMPLEMENTATION_PLAN.md`** from the export bundle.

**BLOCK export** when any check fails:

1. **Tasks per phase:** No phase has **more than 7** tasks (count numbered items under each phase’s **`Tasks:`** section; heading pattern `## Phase` or equivalent).
2. **Phase count:** Total **≤ 10** phases.
3. **Acceptance criteria:** **Every phase** has **≥ 1** observable acceptance criterion (checkbox list under **Acceptance criteria**).
4. **Phase 1 identity:** Phase **1** title and content reflect **Project Setup + Authentication**, **or** the document contains an explicit **waiver** (e.g. static site with no auth — why Phase 1 differs).

**Fail messages:**

- When **tasks per phase** fails (the primary blocker):  
  > Implementation plan has {N} tasks in Phase {X} — exceeds 7 task limit. Split into two phases before export.
- When **another** Gate 6 check fails (phase count, missing acceptance criteria, Phase 1 identity): state which check failed and what to fix — still **BLOCK** export until resolved.

**Non-gate heuristics** (warn or human review; optional automation): **≤ 2,500 words** per phase; **≤ 60** total tasks across all phases (**merge** phases if exceeded).

---

## References

- **`v4.2_architecture.plan.md`** §7 (schema), §10 (this file’s mirror), §11 **`IMPLEMENTATION_PLAN.md`** generation rules.
- **`_output/bundle_spec.md`**
