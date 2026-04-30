# The Constraints — extraction goals

**Phase:** `infrastructure/the_constraints`  
**Runs early** so budget/timeline/stack steer `the_plumbing` and vendor suggestions.

## Must capture

| Field | Detail |
| ----- | ------ |
| `budget_bucket` | $0 / \<$50 / \<$500 / open |
| `paid_tools_ok` | willingness to pay for SaaS tooling |
| `free_first_bias` | prioritize zero-cost path when plausible |
| `timeline_urgency` | schedule pressure |
| `tech_stack_preference` | language/framework guardrails or delegation |
| `storage_strategy` | **Required.** One of: `local_only` \| `cloud_relational` \| `cloud_document` \| `local_first_sync_later`. See `question_patterns.md` (`storage_strategy_selection`). Downstream: **`data/schema_capture`** + Pre-Export **Gate 3** (`v4.2_architecture.plan.md` §7 / §10). |

All feed `blueprint_blocks.constraints`.
