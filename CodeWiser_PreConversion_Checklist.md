# CodeWiser — Pre-conversion checklist (Next.js product)

Use this before building chat UI, persistence, export, and LLM loops so implementation matches **MASTER_ENGINE.md**, **v4.2_architecture.plan.md**, and **`_ui/question_ui_spec.md`**.

---

## 1. Product and scope

- [ ] **MVP boundary:** conversational spec only vs includes zip/Markdown export, adapters, Shadow Critic, health meter interrupts.
- [ ] **Golden Rule:** enforce “no implementation code until blueprint approved” in UI/copy and server policies (Cursor rule mirrors this).
- [ ] **Anonymous vs authenticated:** guest sessions (`session_id` only) vs `user_id` required for billing/history.

## 2. Data and Supabase

- [ ] Create **Postgres tables** aligned with `_data/session_state.schema.json` (including JSON columns for `blueprint_blocks`, `meta_log`, `confidence_map`, `contradiction_flags`).
- [ ] **RLS policies:** per-`user_id` (and optional org) read/write rules.
- [ ] **Migrations** versioned in repo or linked Supabase project.
- [ ] **`storage_strategy` and Gate 3:** server-side validation matches `_engine/pre_export_validator.md` if you automate export blocking.

## 3. Auth

- [ ] Supabase Auth (email, OAuth providers) wired with `@supabase/ssr` middleware and cookie handling for App Router.
- [ ] Session ↔ `user_id` mapping on row create/update.

## 4. LLM and orchestration

- [ ] **Provider:** primary path — Vercel AI SDK (`ai`) vs direct `@anthropic-ai/sdk` (document choice; avoid two divergent implementations).
- [ ] **Context assembly:** implement `_engine/phase_loader.md` (slice phase_library per turn; never whole tree in one prompt).
- [ ] **Structured outputs:** blueprint deltas, contradiction flags, completion checks — schema or tool definitions to reduce parse errors.
- [ ] **Cost/limits:** max tokens per turn, rate limits, Shadow Critic call policy (`_engine/shadow_critic.md`).
- [ ] **Secrets:** API keys server-only (`ANTHROPIC_API_KEY`, etc.); never expose to client.

## 5. API and backend shape

- [ ] Route Handlers or Server Actions for: `POST` message/turn, session load/save, export generation.
- [ ] Idempotency or versioning on writes to avoid lost updates on `blueprint_blocks`.
- [ ] Optional **background jobs** if export compilation is heavy (queue vs synchronous).

## 6. Frontend

- [ ] Map **question formats** from `_question_formats/format_types.md` + `_ui/question_ui_spec.md` to components (≤4–5 prompts per turn, You-Decide escapes).
- [ ] **Spec health meter** UX from `_ui/spec_health_meter.md` when confidence blocks export.
- [ ] Conversation layout, accessibility, and mobile-first behavior per UI spec.

## 7. Styling and assets

- [ ] Replace template `app/page.tsx` with branded shell (nav, session list, chat).
- [ ] Design tokens / Tailwind conventions locked for consistency across question components.

## 8. Export and files

- [ ] Implement **Universal Bundle** assembly per `_output/bundle_spec.md` (MASTER_PROMPT, _META.json, sibling artifacts).
- [ ] **`jszip` + `file-saver`:** zip download UX; sanitization for filenames and size limits.
- [ ] Adapters (**Tier-2**) remain optional per plan — do not block MVP on `_adapters/*`.

## 9. Deployment and environments

- [ ] Env matrix: `NEXT_PUBLIC_*` vs server secrets; Supabase URL/anon key vs service role usage rules.
- [ ] Vercel (or host) preview vs production DB projects.
- [ ] Logging/monitoring for LLM failures and DB errors.

## 10. Housekeeping before large refactors

- [ ] **Canonical MASTER_ENGINE:** resolve duplicate `MASTER_ENGINE.md` vs `engine/MASTER_ENGINE.md`.
- [ ] **Rename** `package.json` `name` from `codewiser_tmp` when ready.
- [ ] `.gitignore` should exclude `.next/` and `node_modules/` so build artifacts do not pollute commits.

---

## Quick “definition of ready” for first vertical slice

1. User signs in (or anonymous session persisted).
2. One turn: load phase slice → LLM reply → persisted `session_state` delta.
3. UI renders at least two question-format components from the spec catalog.

After that slice, iterate on completion gates, contradiction UX, export, and health meter.
