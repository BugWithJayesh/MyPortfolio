# Jayesh Bairagi — Portfolio

A premium, responsive personal portfolio for Jayesh Bairagi, an aspiring software developer and Computer Science student. The site presents an honest learning journey without fabricated projects, achievements, or experience.

## Highlights

- Responsive, accessible single-page portfolio
- System-aware light and dark themes with saved preference
- Subtle, reduced-motion-aware animations
- Sticky navigation with a mobile menu
- Dynamic Open Graph, robots, and sitemap URLs
- Accessible Formspree contact form with validation and submission feedback
- GitHub-ready source with dedicated Vercel build configuration

## Tech stack

- React 19
- Next.js with Vinext + Vite for local and Cloudflare-compatible builds
- Tailwind CSS 4
- Motion for React
- Lucide React
- TypeScript

## Installation

Requirements: Node.js 22.13 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` in your browser.

## Contact form setup

1. Copy `.env.example` to `.env.local`.
2. The project is configured with this Formspree endpoint:

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/meeyqbyo
```

Restart the development server after changing the environment variable. The endpoint is public configuration rather than a secret, but it should still be managed through environment settings so each deployment can use the correct form. If the Formspree form changes later, update both `.env.local` and the matching Vercel environment variable.

## Available scripts

```bash
pnpm dev      # Start the local development server
pnpm build    # Create the production bundle
pnpm build:vercel # Validate the Vercel/Next.js production build
pnpm lint     # Run static code checks
pnpm test     # Test the production-rendered HTML after a build
```

## Folder structure

```text
app/
  components/
    Portfolio.tsx    # Interactive page sections and reusable UI
  data.ts            # Portfolio content and navigation data
  globals.css        # Design system, layout, and responsive styles
  layout.tsx         # Global metadata, font, and theme bootstrap
  page.tsx           # Main route
  robots.ts          # Dynamic robots metadata
  sitemap.ts         # Dynamic sitemap metadata
public/
  favicon.svg        # JB favicon
  og.png             # Social sharing card
tests/
  rendered-html.test.mjs
vercel.json           # Vercel framework and build settings
```

## Customization

Most content lives in `app/data.ts` and `app/components/Portfolio.tsx`.

- Replace the profile placeholder in the `Hero` component when a real portrait is available.
- Add verified projects to the `projects` collection and update the card markup with real links.
- Replace the LinkedIn placeholder only when Jayesh has a public profile URL.
- Update colors through the CSS custom properties at the top of `app/globals.css`.
- Keep all claims factual and verifiable.

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. In the Vercel project settings, add `NEXT_PUBLIC_FORMSPREE_ENDPOINT` with your Formspree endpoint for Production, Preview, and Development.
4. Vercel reads `vercel.json` and runs the verified `pnpm run build:vercel` command.
5. Deploy and optionally attach a custom domain.

For a Vinext-compatible deployment, `pnpm build` remains available. Configure the same environment variable in that hosting environment.

## Accessibility

The site uses semantic landmarks, visible keyboard focus, a skip link, accessible labels, contrast-safe colors, and reduced-motion fallbacks. Any future content or image additions should preserve meaningful alt text and heading order.
