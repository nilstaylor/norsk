# Norsk — Learn Norwegian

An interactive Norwegian language learning app built with React + Vite. No backend required — everything runs as a static site hosted on GitHub Pages.

## Features

- **Dashboard** — progress overview, XP tracking, lesson completion streaks
- **Lessons** — 13 structured lessons covering greetings, numbers, grammar, travel, and more
- **Flashcards** — spaced repetition (SM-2 algorithm), 189 vocabulary words
- **Vocabulary** — search and filter all words by category or difficulty
- **Grammar** — comprehensive reference with phonetics, verb conjugation, and sentence structure

## Deploy to GitHub Pages (5 minutes)

### Step 1 — Fork this repository

Click **Fork** in the top-right corner of this repository on GitHub.

### Step 2 — Enable GitHub Pages

1. Go to your forked repo → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Branch: `gh-pages` | Folder: `/ (root)`
4. Click **Save**

### Step 3 — Trigger the first deployment

The GitHub Actions workflow runs automatically on every push to `main`. To trigger it manually:

1. Go to **Actions** tab in your repo
2. Select **Deploy to GitHub Pages**
3. Click **Run workflow** → **Run workflow**

### Step 4 — Visit your site

After ~2 minutes, your site will be live at:

```
https://<your-github-username>.github.io/<repo-name>/
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS v3 |
| Routing | wouter (hash-based) |
| State | React Context (in-memory) |
| Algorithm | SM-2 spaced repetition |
| Hosting | GitHub Pages (static) |

## Adding a Custom Domain

1. Add a `CNAME` file to the repo root with your domain (e.g. `norsk.yourdomain.com`)
2. Update DNS with your registrar: add a CNAME record pointing to `<your-username>.github.io`
3. In GitHub Pages settings, enter your custom domain

## Data & Privacy

All learning data (XP, lesson progress, flashcard reviews) is stored in memory only — it resets when you close the tab. No data is sent to any server. The app works entirely offline after first load.

## Content

- **189 vocabulary words** across 13 categories
- **13 lessons** with explanations, vocabulary lists, dialogues, and quizzes
- **Grammar reference** covering phonetics, pronouns, verb conjugations, adjective agreement, and sentence structure
- All content reviewed against multiple Norwegian language reference sources for accuracy
