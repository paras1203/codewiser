# CodeWiser — Tech stack (integrated vs planned)

**Snapshot:** Next.js scaffold + dependencies declared; **spec engine lives in Markdown/JSON**. No production API routes, Supabase migrations, or LLM orchestration wired in-app yet.

---

## Declared dependencies (`package.json`)

| Package | Role in repo today |
| ------- | ------------------ |
| **next** `16.x` | App Router scaffold (`app/`). |
| **react** / **react-dom** `19.x` | UI runtime. |
| **typescript** | Types (strictness per `tsconfig.json`). |
| **tailwindcss** `4.x` + **@tailwindcss/postcss** | Styling pipeline (used by default layout/page). |
| **eslint** + **eslint-config-next** | Lint. |
| **@supabase/supabase-js** + **@supabase/ssr** | **Installed, not wired** — intended per v4.2 for `session_state` and auth. |
| **ai** (Vercel AI SDK) | **Installed, not wired** — streaming/tool calling for chat turns. |
| **@anthropic-ai/sdk** | **Installed, not wired** — direct Claude API alternative to AI SDK providers. |
| **lucide-react** | Icons (available for UI). |
| **clsx** + **tailwind-merge** | Class name utilities (available). |
| **file-saver** + **jszip** | **Installed, not wired** — aligns with Universal Bundle / zip export UX. |

**Package name** is `codewiser_tmp`; rename when branding the app.

---

## Architecture doc vs code

| Area | Spec / plan (v4.2) | Implemented in codebase |
| ---- | ------------------ | ------------------------ |
| Session state | Supabase row shape in `_data/session_state.schema.json` | No DB tables or RLS policies in repo |
| Phase loading | `_engine/phase_loader.md` (≤2k tokens) | No loader service |
| Completion / contradiction | `completion_matrix.json`, `contradiction_rules.json`, MD gates | Not automated in TypeScript |
| Export bundle | `_output/*.template.*`, `bundle_spec.md` | No export pipeline |
| Question UI | `_ui/question_ui_spec.md` | Not mapped to React components |
| Auth | Implied Supabase Auth with SSR helpers | Not configured |

---

## Sensible default stack for “full” CodeWiser app

These are **not all decided in-repo**; they match v4.2 and current dependencies:

- **Frontend:** Next.js App Router, React 19, Tailwind 4, mobile-first layouts per `_ui/question_ui_spec.md`.
- **Backend:** Next Route Handlers or Server Actions for chat turns, persistence, export.
- **DB:** Supabase Postgres for `session_state` + auth users; migrations in-repo or Supabase CLI.
- **LLM:** Vercel AI SDK + Anthropic (already both present) — pick one primary path for streaming and error handling.
- **Deployment:** Vercel (typical for Next + AI SDK) or any Node host; Supabase Cloud for DB/auth.

---

## Styling baseline

- Global styles: `app/globals.css`.
- Current UI is the **create-next-app** template (`app/page.tsx`), not CodeWiser-branded flows.
