# Phase activation matrix — v4.2

Symbols: **A** always (complexity ≥ minimal), **M** medium+, **X** excluded from minimal/simple, **C** complex-only or conditional notation, **[D]** delegated/bulk adaptable.

Rough expected active module counts drift (targets not guarantees):

| Level | Target active depth |
| ----- | -------------------- |
| minimal | 5–7 |
| simple | 9–12 |
| medium | 13–16 |
| complex | 17–21 |

---

## Core grid

| Phase module | min | simpl | medium | compl | Conditions / Notes |
| ------------ | --- | ----- | ------ | ----- | ------------------ |
| foundation/the_big_idea | A | A | A | A | anchors problem/outcome |
| foundation/the_positioning | A | A (merge oft) | A | A | may merge early for Simple |
| foundation/the_people | A | A | A | A | enriched personas v4.1 |
| foundation/the_landscape | A | A | A | A | differentiation + inspired vs clone |
| journeys/first_impressions | A | A | A | A | |
| journeys/the_main_event | A | A | A | A | incl. states v4.1 |
| journeys/the_full_picture | — | lite | M | M | merges under simple |
| journeys/where_paths_cross | — | — | soft | M | multi-role / intersect flows |
| rules/rules_of_the_game | lite | lite | M | M | strengthens w transactions |
| rules/when_things_go_wrong | — | lite | M | C | expands w risk |
| rules/whos_watching | — | — | M | C | moderation oversight |
| rules/show_me_the_money | — | — | M | M | + if reference monetized |
| screens/the_screen_map | A | A | A | A | |
| screens/core_screen_deep_dive | lite | lite | M | M | merges possible |
| screens/supporting_screens | — | — | lite | C | secondary depth |
| design/look_and_feel | A* | A* | A* | A* | *skip api/back-end only stacks |
| data/forms_and_inputs | lite | lite | M | M | |
| data/what_the_app_remembers | lite | lite | M | M | |
| data/schema_capture | A | A | A | A | After **`storage_strategy`**; **hard gate** before **`IMPLEMENTATION_PLAN.md`** export |
| data/staying_connected | — | lite | M | M | notifications engagement |
| infrastructure/behind_the_curtain | A | A | A | A | platform scale enriched |
| infrastructure/the_plumbing | A | A | A | A | scaled question breadth |
| infrastructure/the_constraints | A | A | A | A | early cascade |
| infrastructure/the_control_room | — | — | lite | C | admin dashboards |
| ship/feature_tiering | A | A | A | A | always before blueprint |
| ship/the_blueprint | A | A | A | A | merges success metrics wedge medium |
| ship/getting_it_to_users | lite | lite | M | M | distribution |
| ship/the_fine_print | cond | cond | cond | cond | payments or PII personal data pathways |
| ship/success_metrics_and_horizon | X | X | embed | standalone | **Medium+ ONLY** — explicitly **never** Minimal or Simple. Medium: **exactly one 3-question merged exchange** inside `the_blueprint` (no standalone runner step). Complex: standalone phase. |

**success_metrics embedding (medium):** Three questions consolidated **inside blueprint synthesis**, single exchange (`north_star_metric`, `month_1_target`, roadmap sketch third). **Excluded** entirely for minimal/simple — see `codewiser_v4.1_refinement_7b662aba.plan.md` §4.

---

## Quick lookup — v4.2 recap

Always active (+ merge flexibility): positioning, plumbing, constraints, **`data/schema_capture`** (after storage strategy), tiering  
Medium+: show_me_the_money (+ reference override), horizon block (embedded not standalone unless complex)

Conditional compliance: fine_print

**Schema-first:** `data/schema_capture` row is **A** at all complexity levels; hard-completes before **`IMPLEMENTATION_PLAN.md`** per `completion_matrix.json`.

---

## Conflict resolution precedence

Higher row authority if numeric contradictions unresolved: constraints budget > monetization realism > flashy optional integrations.
