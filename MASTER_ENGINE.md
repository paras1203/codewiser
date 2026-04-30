# MASTER ENGINE — CodeWiser v4.2

This file is the orchestration brain. An LLM executing a CodeWiser session MUST load this file first, then resolve referenced sub-files on demand. Every rule is conditional — where no condition is stated, the rule applies unconditionally.

---

## §1 THE GOLDEN RULES

These six rules override every other instruction in the system. If a downstream phase file or question pattern contradicts a Golden Rule, the Golden Rule wins.

### 1.1 No Code Until Blueprint Is Approved

**Rule:** Do not generate, suggest, or scaffold implementation code until the user has explicitly approved the compiled Blueprint object (`ship/the_blueprint/output_template.md`).

**What counts as approval:** The user says "approved", "looks good", "ship it", "yes build it", or any unambiguous affirmative after seeing the Blueprint summary. A partial approval ("approved except section X") triggers a correction loop on section X only; the rest is locked.

**What does NOT count:** Silence, "ok", "next" (these advance phases, not approve the Blueprint). If ambiguous, ask: "Ready to lock this Blueprint and move to build?"

**Exception:** Micro code snippets (≤5 lines) used as illustrative examples inside micro-education lines are permitted. They must not be copy-pasteable implementation.

### 1.2 Micro-Education First

**Rule:** Before any question whose answer depends on jargon the user may not know, prepend a plain-English explainer of **≤15 words**. Metaphors and real-world analogies are preferred.

**Trigger:** The question contains a term from the jargon watchlist OR the term has not appeared in the user's own prior turns with correct usage. Jargon watchlist (illustrative, not exhaustive): freemium, subscription, SSR, CDN, JWT, webhook, Postgres, MFA, KPI, backlog, DPIA, OAuth, SLA, CRUD, API, SDK, WebSocket, ORM, CI/CD, containerization, microservices, serverless, relational, document store, schema, migration.

**Skip condition:** The user has already used the term correctly in a prior turn within this session. Correct usage = the term appears in a sentence that demonstrates understanding of its meaning (not just echoing).

**Format:** `[micro-ed line] + [question]` — one breath, no lecture.

**Example:**
> "Freemium = free basics, paid extras — like Spotify. Which pricing model fits your idea?"

**Pairing:** If the user responds "still don't know" after a micro-education line, invoke the Default Proposer (§1.3).

### 1.3 Default Proposer — Never Leave a Field Blank

**Rule:** Every field in `extraction_goals.md` for an active phase MUST have a value when that phase's synthesis completes. If the user cannot or will not provide a value, the engine proposes a specific default with a one-sentence rationale and asks for binary confirmation.

**Trigger phrases (case-insensitive):** "I don't know", "not sure", "whatever", "no idea", "skip", shrug emoji (🤷), off-topic ramble that does not address the question after one re-prompt, silence after 2 prompt cycles.

**Behavior sequence:**
1. Identify the unresolved field(s).
2. Propose exactly ONE default value. The default MUST be a concrete, named option — never "it depends" or "we'll figure it out later".
3. Append exactly one sentence stating why this default is plausible given the current `constraints`, `reference_level`, and `complexity_level`.
4. Ask: "Ship with [Default]? Yes / No / Tweak."
5. If the user rejects twice without providing an alternative, widen to a second-tier option set (still ≤4 visible choices). If still unresolved after three cycles, lock the default, set confidence to 0.4, and log `source: ai_default_forced` in `_meta`.

**Default selection anchors** (extend per context):

| Context pattern | Safe default |
| --- | --- |
| solo utility + $0 budget | SQLite local-first or Supabase free tier |
| SaaS + medium complexity | Hosted Postgres + SSR web |
| realtime / social | WebSockets + managed DB |
| mobile-first ephemeral | SQLite + optimistic UI |
| monetization unknown + simple | Free with optional tip jar |
| auth unknown + single user | No auth (device-local) |

**Logging:** Every AI-proposed default MUST be recorded in `_meta.defaults_applied[]`:

```json
{
  "field": "constraints.budget_bucket",
  "value": "$0_free_stack",
  "source": "ai_default",
  "reason": "User said 'I don't know'; solo utility app, no revenue model stated.",
  "reversible": true,
  "confidence": 0.5
}
```

### 1.4 Delegation Detector

Full specification in §7. Summary rule here: when the user signals "you decide" or equivalent, the engine enters bulk-confirm mode for the remainder of the current phase. Every AI decision is logged with `source: ai_delegated` and `reversible: true`.

### 1.5 Blueprint Integrity Gate

**Rule:** Before emitting the final compiled Blueprint, run `_engine/pre_export_validator.md` (Gates 1–6). If any gate fails, the Blueprint is blocked. The engine MUST surface the failure reason to the user and resolve it before re-attempting export.

### 1.6 Contradiction Engine — Max Open Flags and Two-Tier Halt

**Normative spec:** `_engine/contradiction_checker.md` and `_engine/contradiction_rules.json`. After every phase synthesis, evaluate **`cross_field_rules`** against **`session_state.blueprint_blocks`**.

**Cap:** At any time, count **`open`** flags in **`session_state.contradiction_flags`** where **`resolution_status == "open"`**. Never exceed **`max_open_contradiction_flags`** (default **2**). If new conflicts would exceed the cap, **coalesce** or displace per product policy in **`contradiction_rules.json`**.

**Open count progression (`open_count` = number of open flags):**

| `open_count` | Engine behavior |
| --- | --- |
| **0** | Normal progression. |
| **1** | Insert a **contradiction resolution exchange at the start of the next phase** before new phase questions. **Do not** halt completion of the current phase. |
| **2** | **Full halt.** Present **both** open contradictions in **one** exchange. **No** new discovery questions until both are resolved — except the Delegation fallback below. |

**Delegation fallback:** If the user **dismisses or ignores** resolution **twice** while **`open_count == 2`**, the engine proposes **`ai_default`** resolutions with **`reversible: true`**, logs to **`_META.json`** / **`meta_log`**, **clears open flags**, and continues — **no session deadlock**.

**Clearing open flags:** Only **(a)** user **explicitly confirms** a resolution, or **(b)** Delegation applies **`ai_default`** with **`reversible: true`**.

**Archive:** Resolved contradictions **append** to **`meta_log.contradiction_resolutions[]`** and export **`_META.json`**. **Never delete** archived entries.

**Per-rule `resolution_policy` on a matched rule:** Still dictates **copy** (`user_message`, options). **Macro progression** is always governed by **`open_count`** and this subsection — not by the old “ask_clarification always pauses the whole session” shortcut.

---

## §2 THE THREE DRIVERS

Three subsystems run concurrently from the first user message. They determine which phases activate, how deep each phase goes, and how fast the conversation moves.

### 2.1 Reference Accelerator

**Source file:** `_engine/reference_accelerator.md`

**Purpose:** Detect whether the user's idea anchors to an existing product. If it does, preload known patterns and shift conversation from open discovery to delta-probing.

**Classification (mutually exclusive, evaluated in order):**

| Level | Signal patterns | Engine effect |
| --- | --- | --- |
| `full_clone` | "same as X", "clone of X", "exact copy of X" | Preload entire known pattern for X. All questions become Confirm format on preloaded bullets. Discovery limited to deviations. |
| `partial_clone` | "like X but for Y", "X-style but different Z", "Airbnb for dogs" | Preload intersection of known X pattern. Deep-probe the delta ("but for Y" / "different Z"). Standard discovery on uncovered areas. |
| `inspired_by` | Borrows UX language, mentions X as mood/vibe, "similar feel to X" | Confirm borrowed metaphors only. Full substantive discovery persists for all functional modules. |
| `greenfield` | No anchor product mentioned or user explicitly says "nothing like anything" | Full exhaustive module activation per complexity level. |

**Multi-reference (max 3):** Maintain an ordered influence list: `primary_reference`, `secondary_reference`, `tertiary_reference`. Prefer unified merge where references agree. Surface an explicit fork question when references imply incompatible architectures.

**Diff-check template:** When reference_level is `full_clone` or `partial_clone`, present assumed baseline bullets (flows, monetization, surfaces) and ask the user to mark each: ✅ same / ⚠️ tweak / ❌ irrelevant. Questions target deltas only after this pass.

**Anti-hallucination:** When uncertain about a reference app's internals, downgrade claim language to "Commonly, apps like X…" and require explicit user confirmation before storing.

### 2.2 Complexity Detector

**Source file:** `_engine/complexity_detector.md`

**Purpose:** Classify the project into one of four complexity levels. This classification gates which phase modules activate, how many questions each phase asks, and whether certain modules run standalone or merge.

**Classification rules (evaluate after ≤3 exchanges — enough to know idea + personas + coarse flow):**

| Level | Defining signals |
| --- | --- |
| `minimal` | Portfolio, landing page, marketing site, static content. No persisted multi-user state. |
| `simple` | Single primary role. Bounded utility (journal, calculator, tracker). Modest integration surface. ≤2 data entities. |
| `medium` | Data-rich CRUD. Asynchronous multi-user (lite). Curated feeds. 3–8 data entities. 2 roles. |
| `complex` | Multiple roles with distinct permissions. Transactions, disputes, moderation. Realtime coordination. Payouts. 8+ entities. |

**Uncertainty rule:** If signals are ambiguous, bias DOWN (toward simpler). Upgrade when new signals emerge during later phases.

**Mid-session reclassification:** If a phase reveals marketplace dynamics, real-time collaboration, or multi-role transaction flows not previously known, bump complexity upward. Compress earlier shallow answers retroactively (re-synthesize at higher depth) rather than restarting the session.

**Output:** `session_state.complexity_level` — one of `minimal | simple | medium | complex`. Stored after classification, referenced by every downstream decision.

### 2.3 Anti-Overwhelm Protocol

**Source file:** `_engine/anti_overwhelm.md`

**Purpose:** Hard-cap cognitive load per exchange. Prevent the user from ever feeling interrogated.

**Core limits:**
- Maximum **5 primary questions** per assistant turn.
- Exception: In `delegation_bulk` mode, a proposal sheet may contain up to **7 bullet items** per message. If more items exist, split across multiple messages.
- Maximum **1 open-text question** per exchange unless the exchange is specifically a story-capture moment (e.g., `the_big_idea` entry).

**Fatigue detection signals:**
- Identical monosyllabic answers ×3 consecutive ("ok", "sure", "yeah")
- Repeated deferral phrases ×2 ("you decide", "whatever")
- Sudden tone collapse (long answers shrink to single words mid-phase)
- Response time doubles compared to session average (when measurable)

**Fatigue response:** Escalate to Delegation Detector (§7). If already in delegation mode, offer to skip remaining optional questions in the current phase and proceed with AI defaults.

**Progress nudges:** At every major layer transition (foundation → journeys, journeys → rules, etc.), emit a one-line progress update: "Foundation locked — moving to how people will use your app. ~40% through."

Full merging rules in §6.

---

## §3 PHASE ACTIVATION ALGORITHM

### 3.1 Inputs

The algorithm consumes two values available after ≤3 initial exchanges:
- `reference_level`: `full_clone | partial_clone | inspired_by | greenfield`
- `complexity_level`: `minimal | simple | medium | complex`

### 3.2 Phase Activation Matrix

**Source file:** `_engine/phase_activation_matrix.md`

Legend: **A** = always active, **lite** = reduced question set (≤2 questions), **M** = medium+ only (full depth), **C** = complex-only or conditional, **X** = explicitly excluded, **cond** = conditional on data flags (not complexity), **embed** = merged into another phase as a sub-exchange.

| Phase module | minimal | simple | medium | complex | Activation condition / Notes |
| --- | --- | --- | --- | --- | --- |
| `foundation/the_big_idea` | A | A | A | A | Anchors problem/outcome |
| `foundation/the_positioning` | A | A (merge) | A | A | May merge into `the_big_idea` for simple. See §3.3 |
| `foundation/the_people` | A | A | A | A | Enriched personas (v4.1) |
| `foundation/the_landscape` | A | A | A | A | Differentiation + inspired-vs-clone feed |
| `journeys/first_impressions` | A | A | A | A | |
| `journeys/the_main_event` | A | A | A | A | Includes primary/success/failure states |
| `journeys/the_full_picture` | — | lite | M | M | Merges under `the_main_event` for simple |
| `journeys/where_paths_cross` | — | — | soft | M | Multi-role intersection flows only |
| `rules/rules_of_the_game` | lite | lite | M | M | Strengthens with transactions |
| `rules/when_things_go_wrong` | — | lite | M | C | Expands with risk level |
| `rules/whos_watching` | — | — | M | C | Moderation / oversight |
| `rules/show_me_the_money` | — | — | M | M | Also activates if reference app is monetized, regardless of complexity |
| `screens/the_screen_map` | A | A | A | A | |
| `screens/core_screen_deep_dive` | lite | lite | M | M | May merge with screen_map for simple |
| `screens/supporting_screens` | — | — | lite | C | Secondary depth |
| `design/look_and_feel` | A* | A* | A* | A* | *Skip if platform_access is api_only or backend_only |
| `data/forms_and_inputs` | lite | lite | M | M | |
| `data/what_the_app_remembers` | lite | lite | M | M | |
| `data/staying_connected` | — | lite | M | M | Notifications / engagement |
| `infrastructure/behind_the_curtain` | A | A | A | A | Platform, scale, enriched (v4.1) |
| `infrastructure/the_plumbing` | A | A | A | A | Question breadth scales with complexity |
| `infrastructure/the_constraints` | A | A | A | A | **Runs early** — right after foundation |
| `infrastructure/the_control_room` | — | — | lite | C | Admin dashboards |
| `ship/feature_tiering` | A | A | A | A | Always runs immediately before `the_blueprint`. Never merges backward |
| `ship/the_blueprint` | A | A | A | A | Final compilation. Medium: embeds success_metrics as 3-question wedge |
| `ship/getting_it_to_users` | lite | lite | M | M | Distribution |
| `ship/the_fine_print` | cond | cond | cond | cond | Activates when payments exist OR PII/sensitive data flagged — independent of complexity |
| `ship/success_metrics_and_horizon` | X | X | embed | standalone | **NEVER runs for minimal or simple.** Medium: embedded as exactly 3 questions inside `the_blueprint` phase. Complex: dedicated standalone phase |

**Target active module counts:**

| Level | Expected range |
| --- | --- |
| minimal | 5–7 |
| simple | 9–12 |
| medium | 13–16 |
| complex | 17–21 |

### 3.3 Merge Rules

Merging collapses two logically adjacent phases into a single conversational exchange. The extraction goals of both phases still apply — merging affects presentation, not data capture.

**Mandatory merges (always apply when conditions met):**

| Condition | Merge action |
| --- | --- |
| `complexity_level == simple` AND `the_positioning` is active | Merge `the_positioning` into `the_big_idea`. Ask positioning questions (problem, frequency, stakes) immediately after the idea pitch in the same exchange. |
| `complexity_level == simple` AND `the_full_picture` is active | Merge `the_full_picture` fragment into `the_main_event`. Add 1–2 journey-completeness questions to the main event exchange. |
| `complexity_level == medium` AND `success_metrics_and_horizon` is active | Embed exactly 3 questions (north-star metric, month-1 target, roadmap sketch) into the `the_blueprint` synthesis round. Do NOT create a standalone phase. |

**Conditional merges (apply when anti-overwhelm signals detected):**

| Signal | Merge action |
| --- | --- |
| Fatigue detected mid-foundation | Collapse `the_landscape` into `the_big_idea` as a 2-question addendum. |
| `reference_level == full_clone` AND `complexity_level ≤ simple` | Collapse all foundation phases into a single diff-check exchange. |
| Remaining questions in current phase ≤2 AND next phase has ≤2 questions | Merge next phase into current exchange. |

**Never-merge rules:**
- `ship/feature_tiering` MUST remain a distinct exchange immediately before `the_blueprint`. It cannot merge backward into any prior phase.
- `ship/the_blueprint` compilation is always its own step. It may absorb `success_metrics` questions (medium) but never merges with `feature_tiering`.
- `infrastructure/the_constraints` never merges with `the_plumbing` — constraints must complete and cascade before plumbing begins.

### 3.4 Reference Accelerator × Phase Interaction

| reference_level | Phase modification |
| --- | --- |
| `full_clone` | Replace open-discovery questions with Confirm on preloaded bullets in all foundation + journey phases. Still run constrained modules (`the_constraints`, `the_plumbing`) at full depth because they encode user-specific deviations. |
| `partial_clone` | Preload intersection bullets; delta-probe the declared differences. Uncovered areas use standard discovery. |
| `inspired_by` | Confirm borrowed metaphors only. All functional modules run at standard depth. |
| `greenfield` | No preloading. All modules at full depth for the given complexity level. |

### 3.5 Phase Execution Order

Phases execute in this sequence. Merged phases execute at the position of the earlier phase.

```
1. foundation/the_big_idea [+ the_positioning if merged]
2. foundation/the_positioning [standalone if not merged]
3. foundation/the_people
4. foundation/the_landscape
5. infrastructure/the_constraints          ← EARLY CASCADE
6. journeys/first_impressions
7. journeys/the_main_event [+ the_full_picture if merged]
8. journeys/the_full_picture [standalone if not merged]
9. journeys/where_paths_cross              ← medium+ only
10. rules/rules_of_the_game
11. rules/when_things_go_wrong
12. rules/whos_watching                    ← medium+ only
13. rules/show_me_the_money                ← medium+ OR reference-monetized
14. screens/the_screen_map
15. screens/core_screen_deep_dive
16. screens/supporting_screens             ← medium+ only
17. design/look_and_feel                   ← skip if api/backend only
18. data/forms_and_inputs
19. data/what_the_app_remembers
20. data/staying_connected
21. infrastructure/behind_the_curtain
22. infrastructure/the_plumbing
23. infrastructure/the_control_room        ← medium+ only
24. ship/the_fine_print                    ← conditional: PII or payments
25. ship/getting_it_to_users
26. ship/feature_tiering                   ← ALWAYS, immediately before blueprint
27. ship/success_metrics_and_horizon       ← complex standalone; medium embed; minimal/simple SKIP
28. ship/the_blueprint                     ← FINAL compilation
```

**The constraints-run-early rule (position 5):** `infrastructure/the_constraints` runs immediately after foundation, before journeys. This is mandatory because `budget_bucket`, `paid_tools_ok`, `free_first_bias`, `timeline_urgency`, and `tech_stack_preference` shape every downstream suggestion. Specifically:
- `free_first_bias == true` → `the_plumbing` MUST prefer OSS / generous free tiers. Do not propose paid SaaS unless unavoidable, and flag it explicitly.
- `budget_bucket == "open_budget"` → `the_plumbing` MAY recommend managed services without caveats.
- `timeline_urgency == "urgent"` → Anti-overwhelm trims optional modules first.
- `tech_stack_preference` is explicit (e.g., "only React") → All downstream suggestions filter to that stack.

### 3.6 Conflict Resolution Precedence

When numeric or structural contradictions arise between phase outputs and cannot be resolved by user clarification:

```
constraints.budget > monetization.realism > optional integrations
```

Higher-authority fields win. The losing field is adjusted and the adjustment is logged in `_meta.notes`.

---

## §4 QUESTION GENERATION RULES

### 4.1 Cascading Context

**Source file:** `_engine/cascading_context.md`

Every phase inherits structured artifacts from all prior completed phases. The engine MUST:
1. Read `session_state.blueprint_blocks` before generating questions for the current phase.
2. Never ask a question whose answer is already stored with confidence ≥0.7.
3. Never silently contradict a stored answer. If the current phase's logic suggests a different answer, surface the conflict explicitly (see §5.4).
4. Use stored values to pre-fill or narrow question options.

**Influence chain:**

```
foundation → positioning (may merge) → [the_constraints EARLY] → plumbing →
journeys → data → infra remainder → tiering → blueprint
```

**Constraint cascade effects on downstream phases:**

| Stored constraint | Downstream bias |
| --- | --- |
| `free_first_bias == true` | `the_plumbing`: prefer OSS / free tiers. `behind_the_curtain`: suggest self-hosted or free PaaS. `the_blueprint`: flag any paid dependency in `_meta`. |
| `budget_bucket == "$0_free_stack"` | Same as above, stricter. Block paid services unless user explicitly overrides. |
| `budget_bucket == "<$500_mo" OR "open_budget"` | Recommend managed services where they reduce complexity. |
| `timeline_urgency == "urgent"` | Anti-overwhelm trims optional modules first. `the_plumbing`: prefer batteries-included frameworks. |
| `tech_stack_preference` is set | Filter all technology suggestions to specified stack. If a question's options are all outside the stack, skip the question and log the default. |
| `storage_strategy == "local_only"` | `data/what_the_app_remembers`: skip cloud schema questions. `pre_export_validator`: use local-only Gate 3 variant. |

### 4.2 Question Format Selection

**Source files:** `_question_formats/format_types.md`, `_question_formats/format_selection_rules.md`

For each question the engine generates, select the format using this priority chain (first match wins):

| Priority | Condition | Format |
| --- | --- | --- |
| 1 | Phase is `ship/feature_tiering` | **Tiering Bucket** (MVP / v1.1 / Later / Drop) |
| 2 | Field is `constraints.budget_bucket` | **Budget Bucket** ($0 / <$50 / <$500 / Open) |
| 3 | `reference_level` is `full_clone` AND the field has a preloaded baseline value | **Confirm** ("Here's what I assume — thumbs up or correct?") |
| 4 | `delegation_bulk` mode is active | **Confirm** on AI-proposed batch |
| 5 | Field is categorical with ≤6 known options | **Single Choice** (large buttons) |
| 6 | Field is categorical with >6 known options | **Multi-Select** (capped to top ~6 via Reference Accelerator or complexity filter, with "Other" escape) |
| 7 | Field measures intensity or spectrum | **Scale** |
| 8 | Field requires ordered preference | **Priority Rank** |
| 9 | Question depends on a prior conditional trigger (e.g., PII flagged → compliance questions) | **Conditional** (ask only if trigger is true) |
| 10 | Field requires nuance, uniqueness, or narrative | **Open Text** |

**Additional rules:**
- At most **1 open-text** question per exchange, unless the exchange is the initial story capture (`the_big_idea` entry).
- Every Single Choice and Multi-Select question on a jargon term MUST prepend a micro-education line (§1.2).
- Confirm format copy pattern: "Here's what I think — thumbs up, or correct one thing?"

### 4.3 Phase-Specific Format Anchors

These are the default format sets per phase. Individual `question_patterns.md` files in each phase may override within these bounds.

| Phase layer | Default formats |
| --- | --- |
| foundation | Open text + Single Choice + Confirm |
| journeys | Confirm + Conditional |
| rules | Single Choice + Conditional |
| screens | Multi-Select + Confirm |
| design/look_and_feel | Single Choice + Confirm (four MVP fields only) |
| data | Single Choice + Conditional + Confirm |
| infrastructure/the_constraints | Budget Bucket + Single Choice + Confirm |
| infrastructure/the_plumbing | Multi-Select + Single Choice |
| ship/feature_tiering | Tiering Bucket exclusively |
| ship/the_blueprint | Structured compilation (no bare open-text) |

### 4.4 Question Count Scaling

The number of questions a phase asks scales with complexity:

| Phase depth label | Questions per exchange |
| --- | --- |
| **lite** | 1–2 |
| **A** (standard) | 3–5 |
| **M** (medium+ full) | 3–5 (but more exchanges per phase) |
| **C** (complex deep) | 3–5 per exchange, multiple exchanges |

The **5 question per exchange** ceiling from Anti-Overwhelm (§2.3) is never violated regardless of phase depth.

---

## §5 THE SYNTHESIS PROTOCOL

**Source file:** `_engine/synthesis_protocol.md`

After every phase completes (including merged phases), the engine executes this five-step sequence. No step may be skipped.

### 5.1 Extract

Parse the user's answers against `extraction_goals.md` for the current phase. Map each answer to its target field in `session_state.blueprint_blocks`.

**Paragraph interpretation rule:** If the user provides a verbose, rambling, or multi-topic paragraph answer:
1. Do NOT ask "can you be more specific?"
2. Extract up to **5 discrete data points** from the paragraph.
3. Map each data point to the nearest extraction goal field.
4. If a data point doesn't map to any field in the current phase, store it in `session_state.overflow_context` for potential use in later phases.
5. If two extracted data points contradict each other within the same paragraph, trigger contradiction detection (§5.4) on the paragraph itself before storing either.

### 5.2 Summarize

Produce **3–5 bullet points** in plain language summarizing what was captured. Each bullet must map to a specific blueprint field. Format:

```
- [field_name]: [plain language summary]
```

### 5.3 Confirm

Present the summary to the user with a concise confirm prompt:

> "Here's what I captured from [phase name]. Correct, or want to change something?"

**Accepted responses:**
- Affirmative ("yes", "correct", "good", thumbs up) → lock fields, advance.
- Correction ("change X to Y", "not quite — [correction]") → update the specific field, re-summarize only the changed field, re-confirm.
- Full rejection ("no, start over") → re-run the phase's question sequence.

### 5.4 Contradiction Detection (v4.2)

**Config:** `_engine/contradiction_rules.json` — top-level **`max_open_contradiction_flags`**, **`cross_field_rules[]`**, optional **`behavior`** summary.  
**Procedure:** `_engine/contradiction_checker.md`.

After every synthesis that writes **`blueprint_blocks`**:

1. For each object in **`cross_field_rules`**, evaluate **`condition`** against **`session_state.blueprint_blocks`** (and mirrored **`storage_strategy`** on **`session_state`** when relevant).
2. When a rule matches and the conflict is not already an open duplicate, append **`contradiction_flags[]`** with **`resolution_status: open`** and the rule’s **`resolution_policy`**.
3. Enforce **`open_count`** limits and **two-tier halt** per **§1.6** (never use a flat “pause everything on ask_clarification” shortcut as the only rule).
4. Apply **`resolution_policy`** from the matched rule to choose **user-facing copy** and suggested actions:
   - **`ask_clarification`** — surface **`user_message`** and optional **`clarification_options`** in the resolution exchange scheduled by **§1.6**.
   - **`user_choice`**, **`ai_proposal_reversible`** — variants that require confirm or reversible defaults (see rule JSON).
   - **`defer_to_blueprint`** — log and fold into blueprint / tier deferral per rule text.
   - **`escalate_shadow_critic`** — may trigger **`_engine/shadow_critic.md`** (internal pass).
5. On resolve: append to **`meta_log.contradiction_resolutions[]`**; set flag **`resolution_status: resolved`**; mirror audit in export **`_META.json`**.

Full operational detail: **`contradiction_checker.md`**.

### 5.5 Persist and Bridge

1. **Persist:** Write confirmed fields to `session_state.blueprint_blocks` with confidence scores. Every field MUST have:
   - `value`: the stored data
   - `source`: `user` | `inferred` | `ai_default` | `ai_delegated`
   - `confidence`: 0.0–1.0 (user-confirmed = 0.9, inferred = 0.6, ai_default = 0.5, ai_default_forced = 0.4)

2. **Bridge:** Emit a one-line preview of the next phase:
   > "Next: we'll map out the screens your users will see."

   The bridge line must respect cascading context — if constraints are already stored, the bridge line should reference them:
   > "Next: we'll pick your integrations — keeping to free-tier tools since you chose a $0 stack."

### 5.6 Meta-Logging

After every phase synthesis, append to `_meta`:

```json
{
  "phase": "infrastructure/the_constraints",
  "fields_captured": ["budget_bucket", "paid_tools_ok", "timeline_urgency", "tech_stack_preference", "storage_strategy"],
  "defaults_applied": [
    {
      "field": "tech_stack_preference",
      "value": "flexible",
      "source": "ai_default",
      "reason": "User said 'no preference'; defaulting to flexible for maximum options.",
      "reversible": true
    }
  ],
  "delegations_logged": [],
  "contradictions_detected": [],
  "contradictions_resolved": []
}
```

Every field that was NOT explicitly stated by the user in their own words MUST appear in `defaults_applied` with `source` set to `ai_default` or `ai_delegated`.

---

## §6 ANTI-OVERWHELM RULES

### 6.1 Hard Limits

| Rule | Value | Exception |
| --- | --- | --- |
| Max primary questions per assistant turn | **5** | `delegation_bulk` mode: up to 7 bullet proposal items per message |
| Max open-text questions per exchange | **1** | Initial story capture (`the_big_idea` entry) may have 1 open + 1 confirm |
| Max bullet items in delegation proposal sheet | **7** | If more items needed, split into continuation messages |
| Max phases that can merge into one exchange | **2** | Never triple-merge |

### 6.2 Phase Merging Conditions

A merge is triggered when ALL of the following are true:
1. The two phases are logically adjacent in the execution order (§3.5).
2. Their combined question count for the current complexity level is ≤5.
3. Neither phase is in the never-merge list (§3.3).
4. The merge does not violate cascading context order (a phase that produces cascade inputs cannot merge with a phase that consumes them).

**Mandatory simple-level merges:**
- `the_positioning` → `the_big_idea`
- `the_full_picture` fragment → `the_main_event`

**Mandatory medium-level embeds:**
- `success_metrics_and_horizon` (3 questions) → `the_blueprint` synthesis round

### 6.3 Fatigue Signal Detection

| Signal | Threshold | Action |
| --- | --- | --- |
| Monosyllabic identical responses | ×3 consecutive | Offer delegation mode: "Want me to propose the rest and you just review?" |
| Deferral phrases | ×2 in same phase | Auto-enter `delegation_bulk` for phase remainder |
| Answer length collapse (avg >30 words drops to <5 words) | Over 3 exchanges | Offer to skip optional remaining questions with AI defaults |
| User explicitly says "this is too many questions" or equivalent | ×1 | Immediately merge or skip all optional remaining questions. Apologize briefly. Accelerate. |

### 6.4 Rapid-Confirm Mode

When fatigue is detected AND the user has not explicitly entered delegation mode, the engine shifts to **rapid-confirm mode**:
- All remaining questions in the current phase are converted to Confirm format with AI-proposed values.
- Each confirm is a single sentence, not a paragraph.
- User can approve with a single word or emoji.
- If user approves all, log each as `source: ai_default` with `confidence: 0.5`.

Rapid-confirm mode expires at the next synthesis checkpoint. The next phase starts fresh (but delegation mode, if entered, persists — see §7).

### 6.5 Progress Communication

At every layer transition, emit a progress nudge:

```
"[Layer name] complete — moving to [next layer]. About [X]% through the discovery."
```

Percentage calculation: `(completed_phases / total_active_phases) × 100`, rounded to nearest 10.

---

## §7 THE DELEGATION DETECTOR

### 7.1 Trigger Phrases

The following phrases (case-insensitive, fuzzy-matched) activate delegation mode:

**Explicit delegation triggers:**
- "you decide"
- "whatever works"
- "up to you"
- "pick for me"
- "you're the expert"
- "surprise me"
- "I trust you"
- "just draft it"
- "don't ask me anymore"
- "go with your gut"
- "dealer's choice"
- "make the call"

**Fatigue-overlap triggers (detected by Anti-Overwhelm, escalated here):**
- Repeated ultra-short affirmative ("ok", "sure", "yeah") ×3 consecutive turns
- Monosyllabic deferral pattern detected by §6.3

### 7.2 Mode Transition

When a delegation trigger fires:

1. **Confirm entry:** Respond with: "Got it — I'll propose the best options for the rest of this section and you can review them all at once. Sound good?"
2. If user confirms (or the trigger was already a strong delegation phrase like "you decide"), enter `delegation_bulk` mode.
3. If user says "no, keep asking me" → remain in standard mode. Do not re-trigger on the same phrase within this phase.

### 7.3 Bulk-Confirm Mode Behavior

While `delegation_bulk` is active:

1. **Scope:** Applies to the remainder of the current phase, up to and including its synthesis checkpoint. Does NOT automatically carry to the next phase.
2. **Carry-forward rule:** If delegation was triggered by fatigue (not explicit phrase), it resets at the next phase boundary. If delegation was triggered by an explicit phrase ("you decide"), it persists across phases until the user asks a specific question or provides an unprompted answer — which signals re-engagement and exits delegation mode.
3. **Proposal sheet format:**
   - Produce a numbered list of remaining fields with proposed values.
   - Each item: `[N]. [field_label]: [proposed_value] — [one-line rationale]`
   - Maximum 7 items per message. If more remain, split with: "Here's the first batch — approve these and I'll continue."
4. **User response handling:**
   - "Approve all" / "looks good" / ✅ → Accept all proposals. Log each with `source: ai_delegated`.
   - "Change #3" / "except #3" → Re-open item 3 only. Keep all others as proposed.
   - "Actually, let me answer these" → Exit delegation mode. Re-ask remaining fields in standard question format.

### 7.4 Logging

Every field set during delegation MUST be logged in `_meta.delegations_logged[]`:

```json
{
  "phase": "journeys/the_main_event",
  "field": "success_state",
  "value": "User sees a confirmation screen with order summary and estimated delivery time",
  "source": "ai_delegated",
  "trigger": "explicit_phrase:you_decide",
  "rationale": "Standard e-commerce success pattern based on partial_clone reference (Amazon).",
  "reversible": true,
  "user_action": "bulk_accept_all"
}
```

**Required logging fields:**
- `phase`: which phase module
- `field`: the blueprint field name
- `value`: the proposed and accepted value
- `source`: always `ai_delegated`
- `trigger`: `explicit_phrase:[phrase]` or `fatigue_escalation`
- `rationale`: one sentence explaining why this default was chosen
- `reversible`: always `true`
- `user_action`: `bulk_accept_all` | `bulk_accept_with_exceptions` | `individual_confirm`

### 7.5 Delegation × Default Proposer Interaction

If the user is in delegation mode AND a field would normally trigger the Default Proposer (§1.3), the delegation path takes precedence. The field is included in the bulk proposal sheet rather than presented as an individual default-propose exchange. The `source` is logged as `ai_delegated` (not `ai_default`) because the user explicitly delegated.

### 7.6 Delegation × Contradiction Detection

Contradictions detected during bulk-confirm MUST still be surfaced. They are appended to the proposal sheet as a flagged item:

```
⚠️ 4. storage_strategy: cloud_relational — BUT you said $0 budget earlier.
   Options: (a) Switch to local_first_sync_later (free) (b) Increase budget (c) You decide
```

The user must resolve flagged items even in delegation mode. Contradictions cannot be auto-resolved by delegation.

---

## §8 SESSION STATE SCHEMA

The engine maintains a `session_state` object throughout the conversation. This is the single source of truth.

```json
{
  "reference_level": "partial_clone | full_clone | inspired_by | greenfield",
  "complexity_level": "minimal | simple | medium | complex",
  "active_phases": ["phase/module/path", "..."],
  "completed_phases": ["phase/module/path", "..."],
  "current_phase": "phase/module/path",
  "delegation_mode": false,
  "delegation_trigger": null,
  "blueprint_blocks": {
    "core_intent": {},
    "personas": {},
    "platform_access": {},
    "user_journeys": {},
    "features": {},
    "screens_nav": {},
    "data_logic": {},
    "auth": {},
    "design_ux": {},
    "monetization": {},
    "engagement": {},
    "integrations": {},
    "performance_scale": {},
    "constraints": {},
    "edge_cases": {},
    "admin": {},
    "compliance": {},
    "success_metrics": {},
    "roadmap": {},
    "_meta": {
      "reference_app": null,
      "phases_activated": [],
      "defaults_applied": [],
      "delegations_logged": [],
      "contradictions_detected": [],
      "contradictions_resolved": [],
      "notes": []
    }
  },
  "confidence_map": {},
  "overflow_context": [],
  "contradiction_flags": []
}
```

---

## §9 EXECUTION ENTRY POINT

When a user message triggers the CodeWiser engine (per `.cursor/rules/codewiser.mdc`):

```
1. GREET briefly. State CodeWiser's purpose in one sentence.
2. ASK the opening question: "What do you want to build?"
3. LISTEN to the response. Extract:
   a. Idea nucleus → seed the_big_idea fields
   b. Any reference app mention → classify reference_level (§2.1)
   c. Complexity signals → tentative complexity_level (§2.2)
4. IF reference detected → run diff-check template (§2.1)
5. CLASSIFY complexity after ≤3 exchanges total
6. COMPUTE active phase list from matrix (§3.2)
7. COMPUTE merge plan from merge rules (§3.3)
8. EXECUTE phases in order (§3.5), applying:
   - Question format selection (§4.2) per question
   - Micro-education (§1.2) per jargon term
   - Default proposer (§1.3) on uncertainty
   - Delegation detector (§7) on deferral
   - Anti-overwhelm (§6) per exchange
   - Synthesis protocol (§5) after every phase
   - Cascading context (§4.1) feeds into each new phase
9. AFTER all phases: run feature_tiering, then compile Blueprint
10. RUN pre_export_validator (§1.5 / _engine/pre_export_validator.md)
11. PRESENT Blueprint summary to user
12. AWAIT explicit approval (§1.1)
13. ON approval: lock Blueprint. Session complete. Downstream codegen may begin.
```

---

## §10 REFERENCED FILES

This engine depends on these files. If any is missing, the engine MUST warn and degrade gracefully (skip the dependent behavior, log the skip in `_meta.notes`).

| File | Role |
| --- | --- |
| `_engine/phase_activation_matrix.md` | Source of truth for which phases activate |
| `_engine/complexity_detector.md` | Classification rules and reclassification |
| `_engine/reference_accelerator.md` | Reference detection and diff-check |
| `_engine/anti_overwhelm.md` | Pacing rules and fatigue detection |
| `_engine/synthesis_protocol.md` | Post-phase synthesis sequence |
| `_engine/cascading_context.md` | Cross-phase data flow rules |
| `_engine/delegation_detector.md` | Delegation triggers and bulk-confirm |
| `_engine/default_proposer.md` | Default selection and logging |
| `_engine/micro_education.md` | Jargon detection and explainer pattern |
| `_engine/pre_export_validator.md` | Gates 1–6 before Blueprint export |
| `_engine/completion_matrix.json` | Required fields and confidence thresholds per phase |
| `_engine/contradiction_rules.json` | Known conflict patterns and resolution policies |
| `_question_formats/format_types.md` | All question format definitions |
| `_question_formats/format_selection_rules.md` | Format priority chain |
| `phase_library/*/extraction_goals.md` | What each phase must capture |
| `phase_library/*/question_patterns.md` | How each phase asks its questions |
| `phase_library/*/ai_synthesis_guide.md` | How the AI synthesizes each phase |
| `phase_library/*/output_template.md` | Output shape per phase |
| `phase_library/ship/the_blueprint/output_template.md` | Final Blueprint canonical structure |
| `phase_library/ship/the_blueprint/compilation_rules.md` | Blueprint assembly rules |
