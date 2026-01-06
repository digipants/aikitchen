# AIKitchen Website (Next.js + Tailwind + TypeScript)

## Quick start
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Lead Form Emails (SMTP)
The enquiry form POSTs to `/api/leads` and sends an email via SMTP.

### Gmail App Password (recommended)
1. Enable 2FA on your Google account
2. Create an App Password
3. Put it into `SMTP_PASS`

## Edit the essentials
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_PHONE_DISPLAY`
- `NEXT_PUBLIC_SITE_URL`

## Pages
- `/` (one-page landing with builder + menu + plans + corporate + FAQ + lead form)
- `/menu`
- `/plans`
- `/about`
- `/contact`
- `/privacy`
- `/terms`

## Deploy
Works cleanly on Vercel, Netlify (Next runtime), or any Node server that supports Next.js.
