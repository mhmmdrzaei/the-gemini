# The Gemini — Setup

## 1. Create a Sanity project

```bash
npx sanity@latest init --bare
```

Note the **Project ID** and **Dataset** name.

## 2. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## 3. Run the dev server

```bash
npm install
npm run dev
```

- Site: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

## 4. Add content in Sanity Studio

### Site Settings
Open **Site Settings** and add:
- Menu items (label + link, e.g. label: "Reservations", link: "/reservations")
- Restaurant address
- Hours (one row per line/group)
- Instagram URL

### Pages
Create pages with these slugs to match the mockups:

| Slug | Layout | Notes |
|---|---|---|
| `home` | Cards with Overlay | Add logo image as content block; overlay text "Coming soon!" |
| `reservations` | Cards with Overlay | Walk-ins info in main card; overlay text "RESY Coming Soon!" |
| `contact` | Cards with Overlay | Email + phone in main card; overlay text "Drop us a line!" |
| `faq` | Full Content Card | Questions as **H2/H3**, answers as normal paragraphs |

For pages using the **Cards with Overlay** layout, upload the fish lure image in the **Overlay Card Image** field.

## Stack
- **Next.js 16** (App Router, `app/` directory)
- **React 19**
- **Sanity v5** with the Studio embedded at `/studio`
- **next-sanity v13** for the client + Studio
- **SCSS modules**, all type set in Helvetica
