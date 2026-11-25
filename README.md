# MyPorto

Personal portfolio of **Rayshan Gani Putra** — fullstack web developer based in Bandung, Indonesia.

Built as a real fullstack application: the public site and the admin dashboard share one codebase, one database, and one deployment.

## Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS** + shadcn/ui
- **Supabase** — Postgres, Auth, Storage
- **Zod** + React Hook Form for validation
- **Resend** for contact email notifications
- **Vercel** for deployment

## Features

**Public**

- Hero, about, experience timeline, projects, skills, certifications, contact
- Project detail pages with problem / solution / outcome breakdown
- Contact form with validation, spam honeypot, and rate limiting
- SEO metadata, Open Graph image, sitemap, JSON-LD

**Admin (`/admin`, protected)**

- CRUD for projects, experiences, skills, certifications, and profile
- Image and CV upload to Supabase Storage
- Publish / feature toggles and manual ordering
- Inbox for contact messages

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

### Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
CONTACT_TO_EMAIL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
IP_HASH_SECRET=
```

### Database

Run `supabase/migrations/0001_init.sql` in the Supabase SQL editor, create a public `portfolio` storage bucket, then create the admin user in Supabase Auth (public signup is disabled).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Lint the codebase |

## Structure

```
app/          routes (public + admin)
components/   sections, shared UI, admin UI, shadcn primitives
lib/          Supabase clients, server actions, validation, email
supabase/     SQL migrations
types/        generated database types
```

## License

MIT
