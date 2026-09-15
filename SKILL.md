---
name: design-system-arc-from-the-browser-company
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# Arc from The Browser Company

## Mission

Deliver implementation-ready design-system guidance for Arc from The Browser Company that can be applied consistently across e-commerce storefront interfaces.

## Brand

- Product/brand: Arc from The Browser Company
- URL: https://arc.net/
- Audience: developers and technical teams
- Product surface: e-commerce storefront

## Style Foundations

- Visual style: structured, accessible, implementation-first
- Main font style: `font.family.primary=Marlin Soft SQ`, `font.family.stack=Marlin Soft SQ, -apple-system, system-ui, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`, `font.size.base=16px`, `font.weight.base=700`, `font.lineHeight.base=normal`
- Typography scale: `font.size.xs=12px`, `font.size.sm=14px`, `font.size.md=16px`, `font.size.lg=17px`, `font.size.xl=20px`, `font.size.2xl=24px`, `font.size.3xl=45.51px`, `font.size.4xl=50px`
- Color palette: `color.text.primary=#3139fb`, `color.text.secondary=#fffcec`, `color.surface.base=#000000`, `color.text.inverse=#ffffff`
- Spacing scale: `space.1=8px`, `space.2=10px`, `space.3=20px`, `space.4=22px`, `space.5=30px`, `space.6=37px`, `space.7=40px`, `space.8=50px`
- Radius/shadow/motion tokens: `radius.xs=4px`, `radius.sm=8px`, `radius.md=10px`, `radius.lg=22px` | `shadow.1=rgba(0, 0, 0, 0.1) 0px 5px 5px 0px`, `shadow.2=rgba(0, 0, 0, 0.25) 0px 2px 8px 0px` | `motion.duration.instant=150ms`, `motion.duration.fast=200ms`

## Accessibility

- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone

concise, confident, implementation-focused

## Rules: Do

- Use semantic tokens, not raw hex values in component guidance.
- Every component must define required states: default, hover, focus-visible, active, disabled, loading, error.
- Responsive behavior and edge-case handling should be specified for every component family.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't

- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow

1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure

- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations

- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates

- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.

<!-- TYPEUI_SH_MANAGED_END -->
