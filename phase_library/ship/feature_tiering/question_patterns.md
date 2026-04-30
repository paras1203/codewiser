# Patterns — feature_tiering

## PATTERN: tier_assignment_pass

**priority_weight:** `{ "impact": 5, "dependency": 5, "uncertainty": 2 }`

**FORMAT:** Tiering Bucket  
Assistant enumerates candidate features gleaned earlier; user assigns tiers via Tiering Bucket (MVP | v1.1 | Later | Drop).

## PATTERN: dependency_infer_confirm

**priority_weight:** `{ "impact": 5, "dependency": 5, "uncertainty": 4 }`

**FORMAT:** Confirm  
After tiers set: one AI-inferred dependency pass; user confirms or corrects only. Populate **`feature_dependency_map`**.

Fallback: Priority Rank then auto-split bands.
