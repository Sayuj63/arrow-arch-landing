# The Arrow Arch

**Aim once. Land once.**

[Live site](https://arrow-arch-landing.vercel.app) · [Interactive walkthrough](https://arrow-arch-landing.vercel.app/demo)

A white, editorial launch experience for The Arrow Arch: a bounded AI crew that plans, builds and independently verifies code before landing a reviewable local branch.

## What is here

- Six product-story sections, built from the supplied Arrow landing pack and specification.
- GSAP + ScrollTrigger motion: masked hero reveal, evidence paths, crew progression, project-memory flow, proof sequence and FAQ transitions.
- An interactive `/demo` walkthrough. It is explicitly an illustrative example, not a live model run.
- Mobile layouts, keyboard navigation, visible focus states and reduced-motion support.
- Self-hosted Inter font and optimized WebP illustrations, with original PNG/SVG assets retained.
- Automated browser and WCAG AA checks with Playwright and axe.

The real product lives at [AnshumanAtrey/the-arrow-arch](https://github.com/AnshumanAtrey/the-arrow-arch). It runs locally and may require repository access. This website never asks for an IBM Bob API key and does not execute agents.

## Run locally

Requires Node.js 22 or newer (CI uses Node.js 24).

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

```sh
npm run build
npm run typecheck
npm run test:e2e
```

Browser tests use installed Google Chrome on macOS; CI installs Playwright Chromium. To run tests elsewhere, set `CI=1` after `npx playwright install chromium`. Set `BASE_URL` to test an existing deployment.

## Structure

```text
app/                  Routes, metadata and responsive design system
components/           Landing story, walkthrough and shared UI
public/assets/        Supplied icons, illustrations and reference boards
public/assets/illustrations/*.webp  Optimized production images
docs/BUILD_SPEC.md    Original user-provided build specification
tests/                Browser, responsive, link and accessibility checks
.github/workflows/    Build + browser validation on pushes and PRs
```

## Deploy

Deploy on Vercel with the Next.js preset. There are no required secrets, database, or server credentials. Production is deployed with the authenticated Vercel CLI. GitHub Actions validates pushes and pull requests. Automatic Vercel deployments are not connected yet: the Vercel account’s GitHub integration needs access to `Sayuj63/arrow-arch-landing`. After granting access in Vercel’s Git settings, run `npx vercel git connect`.

```sh
npx vercel link
npx vercel --prod
```

Set `NEXT_PUBLIC_SITE_URL` to the canonical site URL if adding a custom domain. It controls social image resolution. All demo buttons lead to `/demo`; the repository links lead to the actual Arrow product.

## Content and evidence

The landing copy follows `docs/BUILD_SPEC.md`. Research fragments are explicitly identified as paraphrased themes, not attributed quotations, testimonials or prevalence estimates. The diff canvas and walkthrough are labeled illustrative. No dataset counts, invented endorsements, automatic production-push claims or live-demo claims are used.

Illustrations and icon artwork are the user-supplied Arrow landing-pack assets. GSAP is the only animation dependency; there is no custom cursor, continuous decorative animation or WebGL scene.
