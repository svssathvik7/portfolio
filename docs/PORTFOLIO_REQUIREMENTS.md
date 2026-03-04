# Portfolio Implementation Requirements

This file is a shared spec for all AI agents working on this repository.

## Current Mandatory Requirements

1. Landing page must occupy full viewport width and height.
2. Responsiveness is mandatory from the first commit (mobile-first + desktop polished).
3. Theme system must support one-click Light/Dark mode toggle.
4. Color palette must be centralized in one editable source of truth.
5. Future sections (projects, experience, interests, etc.) must reuse centralized theme tokens.

## Source of Truth for Theme

- File: `frontend/src/theme.ts`
- `themePalettes.light` and `themePalettes.dark` are canonical palette definitions.
- `applyTheme()` is responsible for injecting CSS variables into `:root` and toggling mode.

## Styling Contract

- Use CSS variables (`--bg`, `--text`, etc.) for all semantic colors.
- Avoid hardcoding one-off hex values in components (except controlled previews/examples).
- Maintain visual parity across breakpoints.

## UX Contract

- Theme toggle must be visible and usable on all screen sizes.
- Layout should remain stable during theme switch (no jumpy reflow).
- Components should maintain contrast/accessibility in both modes.
