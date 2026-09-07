# BuildWithShreya

BuildWithShreya is a creator-focused digital product platform combining a public personal-brand website, digital library, product marketplace, authenticated reader portal, admin dashboard, newsletter tools, and a private LifeOS workspace.

## Features

- Public home, blog, books, resources, shop, pricing, and contact pages
- Google OAuth sign-in through NextAuth
- MongoDB and Mongoose persistence
- Role-based access with `admin`, `editor`, and `customer` roles
- Admin dashboard for books, blogs, resources, newsletters, settings, purchases, and LifeOS
- Stripe Checkout with signed webhook processing
- Authenticated purchase downloads through `/api/download`
- Private local PDF storage in `private-uploads`
- Website template marketplace at `/shop/templates`

## Requirements

- Node.js 20 or newer
- npm
- MongoDB
- Google OAuth application
- Stripe account for checkout testing or production payments

## Local setup

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The application validates required environment variables during startup. Missing required values prevent the app from running.

## Environment variables

### Required

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_SECRET` | Secret used to sign NextAuth sessions |
| `AUTH_GOOGLE_ID` | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret |

### Optional

| Variable | Purpose |
| --- | --- |
| `ADMIN_EMAIL` | Additional email promoted to the `admin` role during sign-in |
| `STRIPE_SECRET_KEY` | Stripe server key; required to enable checkout |
| `STRIPE_WEBHOOK_SECRET` | Secret used to verify Stripe webhook signatures |
| `RESEND_API_KEY` | Reserved for transactional/newsletter email delivery |
| `NEXT_PUBLIC_APP_URL` | Public application URL; defaults to `http://localhost:3000` |

Example `.env.local`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/buildwithshreya
NEXTAUTH_SECRET=replace-with-a-long-random-secret
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
ADMIN_EMAIL=your-admin-email@example.com
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Add these when Stripe is available.
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
```

Do not commit `.env.local` or expose server-only secrets in client-side code.

## Google OAuth

Add these redirect URIs to the Google OAuth application:

```text
http://localhost:3000/api/auth/callback/google
https://your-production-domain.com/api/auth/callback/google
```

The bootstrap admin email is `shrivastavashreya071@gmail.com`. Users are stored in MongoDB with a role. Admin users see the Admin Dashboard button and can access `/dashboard`.

## Stripe

Checkout is disabled when Stripe keys are missing. The application does not create fake orders or mock payments.

For local test payments:

1. Add a Stripe test-mode `STRIPE_SECRET_KEY`.
2. Forward Stripe events to the local webhook:

   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

3. Put the CLI-provided `whsec_...` value in `STRIPE_WEBHOOK_SECRET`.

The production webhook URL is:

```text
https://your-production-domain.com/api/webhooks/stripe
```

Webhook signatures are required. Completed orders are associated with the signed-in user's email and book ID, and downloads are granted only for completed orders owned by that user.

## File storage

Paid PDFs uploaded by the admin are stored in `private-uploads`, outside the public Next.js asset directory. They are delivered through `/api/download` after session and purchase checks.

The local filesystem is suitable for development only. For Vercel or other serverless deployments, use private object storage such as S3, Cloudflare R2, or Supabase Storage. Store the private object key in MongoDB and return short-lived signed URLs after authorization.

Public images and non-sensitive assets belong in `public/`. Do not place paid files there.

## Main routes

| Area | Routes |
| --- | --- |
| Public site | `/`, `/about`, `/contact`, `/pricing` |
| Content | `/blog`, `/books`, `/resources` |
| Shop | `/shop`, `/shop/templates`, `/cart`, `/checkout` |
| Authentication | `/sign-in`, `/api/auth/*` |
| Reader portal | `/portal`, `/portal/read`, `/portal/downloads`, `/portal/challenge` |
| Admin | `/dashboard` and its books, blogs, resources, newsletter, settings, purchases, and LifeOS sections |

## Project structure

```text
src/app/          Next.js App Router pages and API routes
src/components/   Shared and domain-specific UI components
src/lib/actions/  Server actions and authorization boundaries
src/lib/models/   CMS, newsletter, commerce, and order models
src/models/       User, book, brand, notification, and LifeOS models
src/data/         Static marketing and content data
src/types/        Shared TypeScript types
public/           Public images, fonts, previews, and non-sensitive assets
private-uploads/  Local-only private paid files
scripts/          PDF and content utility scripts
```

## Commands

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run start     # Start the production server
npm run lint      # Run ESLint
npx tsc --noEmit  # Run TypeScript validation
```

There is currently no automated test script in `package.json`.

## Deployment

1. Create a production MongoDB database.
2. Deploy the Next.js application to Vercel or another Node-compatible host.
3. Add all required environment variables in the hosting provider.
4. Add the production Google OAuth callback URI.
5. Add Stripe production or test keys and configure the webhook endpoint.
6. Use private object storage for paid files instead of the local `private-uploads` directory.
7. Verify the production build before release:

   ```bash
   npm run build
   npm run start
   ```

Do not use development secrets or local filesystem uploads in production.
