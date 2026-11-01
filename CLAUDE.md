# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A personal portfolio site built with Next.js 15 (App Router) + TypeScript, with a public-facing portfolio and a full admin CMS for managing its own content (projects, honors, experience, education, skills, CVs, public profile). Data lives in MongoDB Atlas via Prisma; media (images/PDFs) is stored in Cloudinary.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build         # Production build
npm run start          # Start production server
npm run lint            # next lint (ESLint, next/core-web-vitals config)

npm run db:generate   # prisma generate (also runs automatically via postinstall)
npm run db:seed        # Seed DB via tsx scripts/seed.ts
npm run db:studio      # Open Prisma Studio
npx prisma db push      # Push schema.prisma changes to MongoDB (no migrations; Mongo connector)
```

There is no test suite configured in this repo.

Admin panel is at `/admin` (login at `/admin/login`); default seeded credentials are `admin@askhan.com` / `admin123` (see README).

## Architecture

**Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Prisma ORM over MongoDB, NextAuth.js (credentials provider, JWT sessions), Cloudinary for media, Zod for validation, Framer Motion for animation.

**Path alias:** `@/*` → `src/*` (configured in both `tsconfig.json` and the webpack alias in `next.config.mjs`).

### Data layer
- `prisma/schema.prisma` is the single source of truth for all models: `User`, `Project`, `Honor`, `Experience`/`ExperienceRole`, `Resume`, `PublicProfile`, `Education`, `Skill`, `AnalyticsVisit`. Mongo uses `@db.ObjectId` ids (no SQL migrations — use `prisma db push`).
- `src/lib/prisma.ts` exports a singleton `PrismaClient`, cached on `globalThis` in dev to survive HMR.
- `src/lib/validations.ts` holds Zod schemas per model, mirroring the Prisma models. Several schemas use `z.preprocess` to convert admin-form input (comma-separated or newline-separated strings) into `String[]` before validation — e.g. `techStack` is comma-separated, `features`/`challenges`/`learnings` are newline-separated. Follow this convention when adding new list fields.

### API routes (`src/app/api/**`)
Every resource (`projects`, `honors`, `experience`, `education`, `skills`, `cvs`, `profile`, `public-profile`, `analytics`, `upload`, `auth`) follows the same route-handler pattern:
- `route.ts` → `GET` (list, public) / `POST` (create, admin-only)
- `[id]/route.ts` → `GET` (single, public) / `PUT` (update, admin-only) / `DELETE` (admin-only)
- Admin-only handlers check `getServerSession(authOptions)` and require `session.user.role === 'ADMIN'`, returning 401 otherwise.
- Request bodies are parsed with the corresponding Zod schema from `src/lib/validations.ts`; `ZodError` is caught and returned as 400.
- Errors are logged with `console.error` and returned as a generic JSON `{ error: ... }` with the appropriate status — follow this shape for new routes rather than throwing.

### Auth
- `src/lib/auth.ts` defines `authOptions`: NextAuth credentials provider, bcrypt password check against `User.password`, JWT session strategy, `role` (`ADMIN`/`VIEWER`) attached to both the JWT and the session.
- `src/middleware.ts` wraps `withAuth` and does two unrelated things in one middleware:
  1. Gates `/admin/*` (except `/admin/login`) to sessions with `role === 'ADMIN'`.
  2. Fires a non-blocking POST to `/api/analytics/track` for every non-API, non-static, non-Next-internal page view (used to populate `AnalyticsVisit`).
  - The matcher explicitly excludes `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, and `google*.html` so Search Console can crawl them without hitting auth.

### Media
- `src/lib/cloudinary.ts` wraps the Cloudinary SDK: `uploadImage` (accepts `File` or `Buffer`, base64-encodes and uploads with `resource_type: 'auto'` so images/PDFs both work), `deleteImage`, `getOptimizedImageUrl`. Go through this module rather than calling the Cloudinary SDK directly.
- The `/api/upload` route is the single entry point the admin UI uses to push files to Cloudinary.

### Frontend
- `src/app/page.tsx` composes the public homepage from section components in `src/app/components/` (Profile, Skills, Projects, Experience, Education, Honors, Contact, Footer, Navbar). Each section fetches its own data via a matching hook in `src/hooks/` (`useProjects`, `useSkills`, `useExperience`, etc.), which in turn call the typed API client in `src/lib/api.ts`.
- `src/lib/api.ts` is a single axios instance (`apiClient`) plus one `xApi` object per resource (`projectsApi`, `honorsApi`, `experienceApi`, `cvsApi`, `profileApi`, `publicProfileApi`, `educationApi`, `skillsApi`, `uploadApi`), all pointed at endpoint builders in `src/lib/constants.ts` (`API_ENDPOINTS`). Add new endpoints there rather than hardcoding URLs.
- `src/app/admin/**` mirrors the public resources 1:1 (`projects`, `honors`, `experience`, `education`, `skills`, `cvs`, `profile`, `public-profile`) as CRUD admin pages, built from components in `src/components/admin/`.
- `src/context/ThemeContext.tsx` provides light/dark theme state app-wide.

### SEO
- `src/lib/seo/site.ts` centralizes site-wide constants (`SITE_URL`, `SITE_NAME`, social links, `absoluteUrl()` helper) — use these instead of hardcoding the domain.
- `src/lib/seo/jsonld.ts` builds structured data (JSON-LD) for pages; `src/lib/seo/data.ts` holds supporting SEO content.
- `src/app/sitemap.xml/route.ts` is a hand-written route handler (not Next's built-in `sitemap.ts`) that queries `Project` for dynamic URLs and revalidates hourly — chosen so Google Search Console can fetch it as a stable route unaffected by the auth middleware (see middleware matcher exclusions above).

### Analytics
- Page views are recorded into `AnalyticsVisit` by the middleware's fire-and-forget call to `/api/analytics/track` (captures pathname, country, device/browser/OS parsed from the user agent via `ua-parser-js`, referrer).
- `/api/analytics/stats` and the admin dashboard aggregate this table (via `recharts`) for the live admin dashboard.

## Environment variables

See `env.example`. Required: `MONGODB_URI`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_FOLDER`. Optional: `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` (Google OAuth is not currently wired into `authOptions` despite being documented).
