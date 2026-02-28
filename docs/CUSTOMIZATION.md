# Customization Guide

This guide walks you through every step of personalizing the Retro Terminal Portfolio with your own content.

## Table of Contents

- [Overview](#overview)
- [Step 1: Edit Portfolio Data](#step-1-edit-portfolio-data)
  - [Hero Section](#hero-section)
  - [Competitive Programming Stats](#competitive-programming-stats)
  - [DSA Skills](#dsa-skills)
  - [Work Experience](#work-experience)
  - [Tech Stack](#tech-stack)
  - [Contact Information](#contact-information)
- [Step 2: Set Up the Contact Form](#step-2-set-up-the-contact-form)
  - [Get a Resend API Key](#get-a-resend-api-key)
  - [Configure Environment Variables](#configure-environment-variables)
  - [Configure the Recipient Email](#configure-the-recipient-email)
  - [Test the Contact Form](#test-the-contact-form)
- [Step 3: Customize the Theme (Optional)](#step-3-customize-the-theme-optional)
  - [Colors](#colors)
  - [Fonts](#fonts)
  - [CRT Effects](#crt-effects)
- [Step 4: Verify Everything Works](#step-4-verify-everything-works)

---

## Overview

All portfolio content lives in a single file:

```
app/data/portfolio-data.ts
```

Every customizable value is marked with `[BRACKETS]` so you can find and replace them easily. You should **not** need to edit any component files -- only this data file and your environment variables.

**Quick method:** Use your editor's find-and-replace to search for `[` and replace each placeholder one by one.

---

## Step 1: Edit Portfolio Data

Open `app/data/portfolio-data.ts` in your editor. The file is organized into clearly labeled sections.

### Hero Section

The hero section is displayed at the top of the page as your main introduction.

```typescript
hero: {
  name: "[YOUR_NAME]",           // e.g., "Jane Doe"
  role: "[YOUR_ROLE]",           // e.g., "Full-Stack Developer"
  tagline: "[YOUR_TAGLINE]",    // e.g., "Building elegant solutions to complex problems"
},
```

**Example:**

```typescript
hero: {
  name: "Jane Doe",
  role: "Full-Stack Developer & Competitive Programmer",
  tagline: "I build performant web apps and solve algorithmic challenges for fun.",
},
```

### Competitive Programming Stats

This section displays your ratings across competitive programming platforms. Add, remove, or modify entries as needed.

```typescript
cpStats: [
  {
    platform: "Codeforces",          // Platform name
    rating: "[YOUR_CF_RATING]",      // e.g., "1847"
    solved: "[NUM_SOLVED]",          // e.g., "500+"
    rank: "[YOUR_CF_RANK]",          // e.g., "Expert"
  },
  // ... more platforms
],
```

**Example:**

```typescript
cpStats: [
  {
    platform: "Codeforces",
    rating: "1847",
    solved: "523",
    rank: "Expert",
  },
  {
    platform: "LeetCode",
    rating: "2105",
    solved: "400+",
    rank: "Knight",
  },
],
```

**If you don't do competitive programming**, set this to an empty array:

```typescript
cpStats: [],
```

### DSA Skills

Group your data structures and algorithms knowledge by category.

```typescript
dsaSkills: [
  {
    category: "Graph Algorithms",
    skills: ["BFS/DFS", "Dijkstra", "Topological Sort"],
  },
  {
    category: "Dynamic Programming",
    skills: ["Knapsack", "LIS", "Tree DP"],
  },
],
```

**If you prefer not to list DSA skills**, set this to an empty array:

```typescript
dsaSkills: [],
```

### Work Experience

List your work experience in reverse chronological order (most recent first). Each entry includes a description array -- use one string per bullet point.

```typescript
experience: [
  {
    company: "[COMPANY_NAME]",       // e.g., "Acme Corp"
    role: "[JOB_TITLE]",            // e.g., "Senior Software Engineer"
    duration: "[START] - [END]",     // e.g., "Jan 2023 - Present"
    description: [
      "[ACHIEVEMENT_1]",            // One bullet point per string
      "[ACHIEVEMENT_2]",
    ],
    technologies: ["React", "Node.js", "PostgreSQL"],
  },
],
```

**Example:**

```typescript
experience: [
  {
    company: "Acme Corp",
    role: "Senior Software Engineer",
    duration: "Jan 2023 - Present",
    description: [
      "Led migration of monolithic API to microservices, reducing latency by 40%",
      "Mentored 3 junior developers and established code review practices",
      "Built real-time notification system handling 10k+ concurrent users",
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    company: "StartupXYZ",
    role: "Software Engineer",
    duration: "Jun 2021 - Dec 2022",
    description: [
      "Developed customer-facing dashboard used by 5k+ daily active users",
      "Implemented CI/CD pipeline reducing deployment time from 30min to 5min",
    ],
    technologies: ["Vue.js", "Python", "Django", "MongoDB"],
  },
],
```

### Tech Stack

Organize your technologies by category. Each category is an array of strings.

```typescript
techStack: {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  backend: ["Node.js", "Python", "Go"],
  databases: ["PostgreSQL", "Redis", "MongoDB"],
  tools: ["Docker", "Git", "AWS", "Linux"],
},
```

### Contact Information

Your email, GitHub, and LinkedIn links. These are used in the contact section.

```typescript
contact: {
  email: "jane@example.com",
  github: "https://github.com/janedoe",
  linkedin: "https://linkedin.com/in/janedoe",
},
```

---

## Step 2: Set Up the Contact Form

The portfolio includes a contact form that sends emails using the [Resend](https://resend.com) API.

### Get a Resend API Key

1. Go to [resend.com](https://resend.com) and create a free account
2. In the dashboard, navigate to **API Keys**
3. Click **Create API Key**
4. Give it a name (e.g., "portfolio") and select **Full access** permission
5. Copy the generated key (it starts with `re_`)

### Configure Environment Variables

Create a `.env.local` file in the project root (if it does not already exist):

```env
RESEND_API_KEY=re_your_api_key_here
```

> **WARNING:** Never commit `.env.local` to version control. The `.gitignore` file already excludes it, but double-check before pushing.

### Configure the Recipient Email

The contact form API route needs to know where to send emails. Open the API route file:

```
app/api/contact/route.ts
```

Find the `to` field in the Resend send call and set it to your email address:

```typescript
to: "your-email@example.com",
```

**If you are using Resend's free tier**, you can only send to the email address you verified during signup. To send to any address, you need to verify a custom domain in the Resend dashboard.

### Test the Contact Form

1. Start the dev server: `npm run dev`
2. Navigate to the contact section on your portfolio
3. Fill out the form with a test message
4. Submit and verify you receive the email
5. Check the Resend dashboard for delivery logs if the email does not arrive

**Common issues:**
- **"Missing API key" error:** Ensure `.env.local` exists and `RESEND_API_KEY` is set correctly. Restart the dev server after changing environment variables.
- **Email not received:** Check spam/junk folder. On the free tier, emails can only be sent to verified addresses.
- **403 Forbidden:** Your API key may lack send permissions. Regenerate it with **Full access**.

---

## Step 3: Customize the Theme (Optional)

If you want to go beyond content changes and adjust the visual style, here is where to look.

### Colors

Terminal colors are defined in `tailwind.config.ts`:

```typescript
colors: {
  "terminal-bg": "#000000",        // Background color
  "terminal-text": "#00FF00",      // Main text color (green)
  "terminal-glow": "#00FF41",      // Glow/accent color
  "terminal-dim": "#00802080",     // Dimmed text (with transparency)
  "terminal-border": "#00FF0033",  // Border color (with transparency)
  "terminal-amber": "#FFB000",     // Amber accent color
},
```

**To change the color scheme**, replace the green hex values with your preferred color. For example, to use an amber/orange theme:

```typescript
colors: {
  "terminal-bg": "#000000",
  "terminal-text": "#FFB000",
  "terminal-glow": "#FFC041",
  "terminal-dim": "#80600080",
  "terminal-border": "#FFB00033",
  "terminal-amber": "#FFB000",
},
```

After changing colors, also update the matching values in `app/globals.css` for the glow effects and scrollbar.

### Fonts

The default font is Geist Mono (loaded in `app/layout.tsx`). To use a different monospace font:

1. Add the font file to `app/fonts/` or import it via `next/font/google`
2. Update the `localFont` call in `app/layout.tsx`
3. Update the `fontFamily.mono` array in `tailwind.config.ts`

### CRT Effects

CRT visual effects (scanlines, flicker, phosphor glow) are implemented in `app/components/effects/`. You can:

- **Disable scanlines:** Remove or comment out the Scanlines component in the main page
- **Adjust flicker intensity:** Modify the `flicker` keyframes in `tailwind.config.ts`
- **Change glow strength:** Edit the `boxShadow` values in `tailwind.config.ts`

---

## Step 4: Verify Everything Works

Before deploying, run through this checklist:

1. **Start the dev server**
   ```bash
   npm run dev
   ```

2. **Check each section renders correctly**
   - Hero shows your name, role, and tagline
   - CP Stats display your ratings (or the section is hidden if you set an empty array)
   - Experience entries appear in the right order
   - Tech stack shows all your technologies
   - Contact links point to the correct URLs

3. **Test the contact form**
   - Submit a test message
   - Confirm the email arrives at your inbox

4. **Test responsive design**
   - Resize the browser window or use Chrome DevTools device mode
   - Verify the layout works on mobile, tablet, and desktop

5. **Run the production build**
   ```bash
   npm run build
   ```
   Fix any TypeScript or build errors before deploying.

6. **Run the linter**
   ```bash
   npm run lint
   ```

---

## Quick Reference

| What to change              | Where to change it                      |
| --------------------------- | --------------------------------------- |
| Name, role, tagline         | `app/data/portfolio-data.ts` -> `hero`  |
| CP ratings                  | `app/data/portfolio-data.ts` -> `cpStats` |
| Work experience             | `app/data/portfolio-data.ts` -> `experience` |
| Technologies                | `app/data/portfolio-data.ts` -> `techStack` |
| Contact links               | `app/data/portfolio-data.ts` -> `contact` |
| Resend API key              | `.env.local`                            |
| Recipient email             | `app/api/contact/route.ts`              |
| Terminal colors             | `tailwind.config.ts`                    |
| Font                        | `app/layout.tsx` + `tailwind.config.ts` |
| CRT effects                 | `app/components/effects/`               |
