# Cursor AI Rules

Rules that guide AI code generation for **netmifi-pro** (hackathon Next.js app).
Standards are aligned with `netmifi-mono` so features can move into the monorepo later.

## Rule Files

### `.cursorrules` (root)

Always-on project identity, Next.js vs mono, and generation checklist.

### `.cursor/rules/*.mdc`

| File | Scope |
| --- | --- |
| `code-style.mdc` | Biome, naming, React, Tailwind |
| `typescript-best-practices.mdc` | No `any`, interfaces, `??` |
| `project-conventions.mdc` | Folders, `@/` imports, Bun |
| `architecture-patterns.mdc` | Server/Client Components, portable UI |
| `nextjs.mdc` | App Router conventions for this Next.js version |
| `portability.mdc` | How to write code that can land in netmifi-mono |
| `dependencies.mdc` | When editing `package.json` |

## Updating Rules

Edit `.mdc` files or `.cursorrules`. Keep rules short and one concern per file.
Do not put project standards only in `AGENTS.md` — Next.js regenerates that file.
