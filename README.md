# Retro Terminal Portfolio

A developer portfolio with a retro CRT terminal aesthetic. Built for competitive programmers and software engineers who want a unique, memorable portfolio site.

## Features

- Retro CRT monitor visual effects (scanlines, flicker, phosphor glow)
- Competitive programming stats section
- Work experience timeline
- Tech stack display
- Contact form with email delivery via Resend
- Fully responsive design
- Smooth scroll navigation
- Single data file for all content customization

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Form Handling:** React Hook Form + Zod validation
- **Email:** Resend API
- **Font:** Geist Mono

## Quick Start

### Prerequisites

- Node.js 18+ installed
- A [Resend](https://resend.com) account (free tier available) for the contact form

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Environment Setup

Create a `.env.local` file in the project root:

```env
RESEND_API_KEY=re_your_api_key_here
```

> **WARNING:** Never commit `.env.local` to version control. It is already listed in `.gitignore`.

To get your Resend API key:
1. Sign up at [resend.com](https://resend.com)
2. Go to **API Keys** in the dashboard
3. Create a new API key
4. Copy the key into your `.env.local` file

### Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Customization

All portfolio content is stored in a single file:

```
app/data/portfolio-data.ts
```

Open this file and replace every `[PLACEHOLDER]` value with your own information. The file includes sections for:

- **Hero** -- your name, role, and tagline
- **CP Stats** -- competitive programming platform ratings
- **DSA Skills** -- data structures and algorithms expertise
- **Experience** -- work history with descriptions and tech used
- **Tech Stack** -- frontend, backend, databases, and tools
- **Contact** -- email, GitHub, and LinkedIn links

For a detailed step-by-step customization guide, see **[docs/CUSTOMIZATION.md](docs/CUSTOMIZATION.md)**.

> **Note:** You should only need to edit `portfolio-data.ts` and the environment variables. Do not modify component files unless you want to change the layout or visual design.

## Build for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add the `RESEND_API_KEY` environment variable in Vercel project settings
4. Deploy

### Netlify

1. Push your repository to GitHub
2. Go to [netlify.com](https://www.netlify.com) and import your repository
3. Set the build command to `npm run build`
4. Set the publish directory to `.next`
5. Add the `RESEND_API_KEY` environment variable in site settings
6. Deploy

> **Note:** For Netlify, you may need the `@netlify/plugin-nextjs` plugin for full Next.js support.

## Project Structure

```
portfolio/
  app/
    api/             # API routes (contact form endpoint)
    components/
      effects/       # CRT visual effects components
      layout/        # Layout components (Section, TerminalHeader)
      sections/      # Page sections (Hero, Experience, etc.)
      ui/            # Reusable UI components
    data/
      portfolio-data.ts   # <-- Edit this file to customize content
    hooks/           # Custom React hooks
    styles/          # Additional styles
    layout.tsx       # Root layout
    page.tsx         # Main page
  docs/
    CUSTOMIZATION.md # Detailed customization guide
  tailwind.config.ts # Tailwind theme (terminal colors, animations)
```

## Scripts

| Command         | Description                 |
| --------------- | --------------------------- |
| `npm run dev`   | Start development server    |
| `npm run build` | Build for production        |
| `npm start`     | Start production server     |
| `npm run lint`  | Run ESLint                  |

## License

MIT
