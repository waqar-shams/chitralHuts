This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Admin Panel

This application includes a built‑in administration interface for managing the project data and user accounts. Only authenticated users with the **admin** role can access it.

### Default credentials

- **Admin user:** `admin@example.com` / `Admin123!`
- **Regular user:** `user@example.com` / `Passw0rd!`

### Accessing the admin area

1. Sign in at `/auth/login` with an admin account.
2. Visit `/admin` – the layout provides links to:
   - **Project Data:** edit the JSON used by the dashboard.
   - **Users:** add/remove users and assign roles.
   - **Transactions:** manage per-user transaction histories.

Admins can also hit the REST endpoint directly:

- `GET /api/transactions?userId={id}` returns the array for the specified user.
- `POST /api/transactions` with JSON `{ userId, transactions }` overwrites that user's data.

Regular users simply call `GET /api/transactions` to retrieve their own records. The dashboard page (`/dashboard/transactions`) now uses this API instead of static JSON.

Every API under `/api` now requires a valid JWT; mutations are restricted to admins via role‑based checks.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
