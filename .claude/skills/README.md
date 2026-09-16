# Vendored Claude Code skills

Project-level skills for this repository. Claude Code loads every
`.claude/skills/<name>/SKILL.md` automatically at session start, including in
Claude Code on the web, where the container is ephemeral and anything installed
into `~/.claude/` is lost when the session ends. Committing them here is what
makes them survive.

## Source and pin

Vendored from [anthropics/skills](https://github.com/anthropics/skills) at:

    commit  34040c9c568585f6929bedeaad110ad08f079624
    dated   2026-09-10

Licensed Apache 2.0; each skill retains its upstream `LICENSE.txt`.

## What is here, and why these four

| Skill | Use |
|---|---|
| `frontend-design` | Visual direction for new or reworked UI on the website |
| `theme-factory` | Applying a consistent theme across HTML pages and documents |
| `web-artifacts-builder` | Multi-component React/Tailwind artifacts |
| `mcp-builder` | Building MCP servers, if engineering automation goes that way |

Deliberately **not** vendored:

- `brand-guidelines` — this is *Anthropic's* brand (`#141413`, cream `#faf9f5`,
  orange `#d97757`), which conflicts with the Lingenious palette defined in
  `assets/` (navy `#0B1F4D`, steel-blue `#294B73`, orange `#F47A21`). Both
  define an "orange", so loading it risks a plausible-looking but wrong colour
  on Lingenious collateral. A Lingenious-specific brand skill belongs here
  instead.
- `docx`, `xlsx`, `pptx`, `pdf`, `skill-creator` — already provided and kept
  current by account-level skill sync, so vendoring them would pin stale
  duplicates. The document skills are also source-available rather than open
  source, so they should not be redistributed from this public repository.

## Updating

    .claude/skills/update-skills.sh            # re-vendor at the pinned commit
    .claude/skills/update-skills.sh main       # move to current upstream main

Review the resulting diff before committing; the script also rewrites the pin
recorded above.
