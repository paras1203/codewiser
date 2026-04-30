# The Constraints Phase — Question Patterns

**Phase:** `infrastructure/the_constraints`  
**Purpose:** Extract technical and resource constraints that shape implementation decisions — **runs early** (after foundation) per `_engine/cascading_context.md`. v4.1 adds budget/timeline/stack preference alongside storage strategy (v4.2).

---

## PATTERN: budget_bucket

**priority_weight:** `{ "impact": 5, "dependency": 5, "uncertainty": 3 }`

**Field:** `budget_bucket`  
**FORMAT:** Budget Bucket (`_question_formats/format_types.md`)

**OPTIONS:** `$0_free_stack` | `<$50_mo` | `<$500_mo` | `open_budget`

**ASK WHEN:** Phase entry — biasing `the_plumbing`.

---

## PATTERN: timeline_urgency

**priority_weight:** `{ "impact": 3, "dependency": 3, "uncertainty": 4 }`

**Field:** `timeline_urgency`  
**FORMAT:** Single choice — relaxed | normal | urgent demo | hard deadline (date optional)

---

## PATTERN: stack_preference_gate

**priority_weight:** `{ "impact": 4, "dependency": 4, "uncertainty": 4 }`

**Field:** `tech_stack_preference`  
**FORMAT:** Single + optional text — strict (name framework) | flexible | delegate

**MICRO-ED before named stacks if user is non-technical.**

---

## PATTERN: paid_tools_ok

**priority_weight:** `{ "impact": 4, "dependency": 4, "uncertainty": 3 }`

**Field:** `paid_tools_ok`  
**FORMAT:** yes | no_free_first | case_by_case

---

## PATTERN: storage_strategy_selection

**priority_weight:** `{ "impact": 5, "dependency": 5, "uncertainty": 3 }`

**Field:** `storage_strategy` After `platform_access` and persona **`user_count_type`** exist (foundation), before **`data/schema_capture`**

**FORMAT:** Single Choice (4 large buttons)

**MICRO_EDUCATION:**
"This decides where your app saves data — on the device, in the cloud, or both."

**QUESTION:**
"Where should your app store its data?"

**OPTIONS:**

### A) On device only — works offline, no server needed, free
**Value:** `local_only`  
**Best for:** Single-user apps, offline-first tools, privacy-sensitive apps  
**Examples:** Todo lists, note-taking apps, local calculators, offline games  
**Trade-offs:** No multi-device sync, data stays on one device

### B) Cloud database — accessible anywhere, multi-device sync
**Value:** `cloud_relational` or `cloud_document` (AI decides based on data structure complexity)  
**Best for:** Multi-user apps, collaborative tools, apps that need cross-device access  
**Examples:** Social apps, team collaboration tools, marketplaces  
**Trade-offs:** Requires backend infrastructure, hosting costs

### C) Device first, cloud later — start simple, add sync when ready
**Value:** `local_first_sync_later`  
**Best for:** MVPs that want to start simple but plan to add cloud sync in v1.1  
**Examples:** Apps where sync is nice-to-have but not critical for MVP  
**Trade-offs:** Two-phase implementation, potential data migration when adding sync

### D) You decide — AI will recommend based on your app type
**Value:** `ai_default` (triggers inference logic below)

---

## AI INFERENCE LOGIC (Option D — `ai_default`)

Resolve using **`session_state.complexity_level`** and **`blueprint_blocks.personas.user_count_type`**. For **real-time**, use explicit feature/journey signals (e.g. live collaboration, shared cursors, sub-second updates) when present; if ambiguous and `complexity_level == "complex"`, treat as real-time-suspect and default to cloud unless user steers otherwise.

```
IF (complexity_level == "minimal" OR complexity_level == "simple")
   AND blueprint_blocks.personas.user_count_type == "single_user":
  → SET storage_strategy: local_only
  → REASON: "Simple single-user app — on-device storage fits best."

ELSE IF complexity_level == "medium"
   AND blueprint_blocks.personas.user_count_type == "multi_user":
  → SET storage_strategy: cloud_relational
  → REASON: "Multi-user access needs a shared cloud database."

ELSE IF complexity_level == "complex"
   AND (real_time_signals OR blueprint_blocks.personas.user_count_type == "multi_user"):
  → SET storage_strategy: cloud_relational
  → REASON: "Complex or real-time multi-user patterns need cloud infrastructure."

ELSE:
  → SET storage_strategy: local_first_sync_later
  → REASON: "Default flexible path — local MVP, cloud when you scale."
```

If **`user_count_type`** is still unknown when D fires, ask one **`user_count_type`** confirm or infer with low confidence then re-run this block.

---

## SMART DEFAULT (if user skips without selecting D)

```
IF complexity_level == "minimal" OR "simple":
  → SET: local_first_sync_later
  → CONFIDENCE: 0.5 (inferred — should ask for confirmation)

IF complexity_level == "medium" OR "complex":
  → SET: cloud_relational
  → CONFIDENCE: 0.6 (inferred — should ask for confirmation)
```

---

## EXTRACTION TARGET

**session_state field:** `storage_strategy`  
**Allowed values:** `local_only | cloud_relational | cloud_document | local_first_sync_later`

**Affects downstream phases:**
- `data/schema_capture` — artifacts per `v4.2_architecture.plan.md` §7 ( **`SCHEMA.sql`**, **`DATA_MODEL.md`**, **`SCHEMA.json`** flags)
- `infrastructure/tech_stack` + bundle **`TECH_STACK.md`** — storage library / deferral notes
- `pre_export_validator` — **Gate 3** variant per strategy

---

## FOLLOW-UP CLARIFICATIONS (based on selection)

### If user selects B (Cloud database):

**Follow-up question:**
"What type of data will your app store?"

**Options:**
- **Structured tables with relationships** (orders, users, transactions) → `cloud_relational`
- **Flexible documents with nested data** (profiles, settings, activity feeds) → `cloud_document`
- **You decide** → AI infers from feature list:
  - If features include "transactions", "inventory", "orders" → `cloud_relational`
  - If features include "feeds", "profiles", "rich content" → `cloud_document`
  - Default: `cloud_relational` (safer default, more structured)

---

## VALIDATION RULES

- **Required:** Yes (cannot proceed to schema_capture without this field)
- **Confidence threshold:** 0.7 (must be explicitly chosen or confirmed by user)
- **Contradiction checks:** Will trigger `storage_vs_multiuser` conflict if local_only + multi-user personas

---

## OUTPUT TO CONFIDENCE_MAP

```json
{
  "storage_strategy": {
    "value": "local_only",
    "source": "user",
    "confidence": 0.9
  }
}
```

---

## RELATED PATTERNS

- `budget_bucket` (in same phase) — $0 free stack suggests local_only or local_first_sync_later
- `platform_access` (foundation phase) — mobile apps often prefer local_first for offline capability
- `user_count_type` (personas phase) — single-user suggests local_only, multi-user suggests cloud

---

## VERSION HISTORY

**v4.2:** Initial pattern — 4 storage strategy options with smart defaults and AI inference
