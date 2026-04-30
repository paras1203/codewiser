# CodeWiser — Repository file structure

Source tree as of **2026-04-30**. Roles are **spec/engine** vs **Next.js scaffold** vs **examples**.

```
CodeWiser/
├── app/                              # Next.js App Router (scaffold — default create-next-app page)
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/                           # Static assets (Next template SVGs)
├── _adapters/                        # Optional Tier-2 export adapter *specs* (Markdown only)
├── _data/
│   └── session_state.schema.json     # JSON Schema for v4.2 session_state (Supabase-shaped)
├── _engine/                          # Orchestration specs + JSON configs
│   ├── *.md                          # Gates, loaders, contradiction, synthesis, etc.
│   ├── completion_matrix.json
│   └── contradiction_rules.json
├── _output/                          # Universal bundle templates (MASTER_PROMPT, _META, PRD fragments)
├── _question_formats/                # Question format catalog + selection rules
├── _ui/                              # UI specs (question_ui_spec, spec_health_meter)
├── engine/
│   └── MASTER_ENGINE.md              # Duplicate/alternate copy of root MASTER_ENGINE — verify canonical path in tooling
├── examples/                         # Walkthrough transcripts (README per scenario)
├── phase_library/                    # Modular phases: foundation, journeys, data, design, rules, screens, ship, infrastructure
│   └── <layer>/<module>/
│       ├── extraction_goals.md
│       ├── question_patterns.md
│       ├── ai_synthesis_guide.md
│       └── output_template.md
│   └── ship/the_blueprint/
│       └── compilation_rules.md
├── .cursor/rules/
│   └── codewiser.mdc                 # Cursor rule: spec-first, no code until blueprint approval
├── MASTER_ENGINE.md                  # Canonical v4.2 orchestration brain (load first for LLM sessions)
├── README.md                         # v4.1 product overview + doc map
├── v4.2_architecture.plan.md         # v4.2 architecture (state, bundle, Supabase, gates)
├── CodeWiser_* .md                   # Project logs / workflow tracking (if present)
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── eslint.config.mjs
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── (node_modules/, .next/)           # Generated — not source; gitignore typically excludes
```

## Phase library layout (conceptual)

| Layer | Example modules |
| ----- | ---------------- |
| `foundation/` | the_big_idea, the_landscape, the_people, the_positioning |
| `journeys/` | first_impressions, the_main_event, where_paths_cross, the_full_picture |
| `data/` | what_the_app_remembers, forms_and_inputs, staying_connected, schema_capture |
| `design/` | look_and_feel |
| `rules/` | rules_of_the_game, show_me_the_money, when_things_go_wrong, whos_watching |
| `screens/` | the_screen_map, core_screen_deep_dive, supporting_screens |
| `ship/` | feature_tiering, the_blueprint, the_fine_print, success_metrics_and_horizon, getting_it_to_users |
| `infrastructure/` | the_constraints, the_plumbing, behind_the_curtain, the_control_room |

Each module follows the same four Markdown files (`extraction_goals`, `question_patterns`, `ai_synthesis_guide`, `output_template`).

## Duplicate `MASTER_ENGINE.md`

Both `MASTER_ENGINE.md` (root) and `engine/MASTER_ENGINE.md` exist — align app/runtime documentation and any bundler paths on a single canonical file to avoid drift.
