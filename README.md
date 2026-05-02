# LeanLogicLab Content Machine

A static prompt-generation dashboard for the Instagram fitness brand **LeanLogicLab** (`@leanlogiclab`).

The app helps create high-quality prompts for ChatGPT image/content generation without using the OpenAI API, without a backend, and without browser automation. It is designed for a safe manual workflow: build a premium prompt, copy it, open ChatGPT, paste/send manually, then download and organize generated slides yourself.

## Live Hosting

This project is designed to run on **free GitHub Pages**.

For free hosting, use a **public GitHub repository**. Private-repo Pages availability depends on the GitHub account/organization plan.

## What It Does

- Builds LeanLogicLab-specific Instagram post prompts.
- Supports `Form / Exercise Technique`, `Nutrition / Supplements`, and `Gym Motivation`.
- Generates category-specific prompt logic, visual direction, slide structure, caption instructions, and hashtag instructions.
- Lets you choose format, slide count, tone, goal, output type, color scheme, and mannequin gender.
- Copies the generated prompt to your clipboard.
- Opens your saved ChatGPT chat URL in a new tab.
- Saves the ChatGPT URL in your browser using `localStorage`.

## What It Does Not Do

- No OpenAI API usage.
- No API keys.
- No backend server.
- No database.
- No Selenium or Playwright automation.
- No ChatGPT scraping.
- No Instagram automation.
- No local file watching or file moving in the static version.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static export with `output: "export"`
- GitHub Actions deployment to GitHub Pages

## Prompt Categories

### Form / Exercise Technique

Default setup:

- Format: `Carousel`
- Slide count: `7`
- Tone: `Evidence-based`
- Goal: `Save`

The generated prompt uses a futuristic neon-blue fitness infographic system with consistent mannequin styling, movement arrows, cue panels, mistake panels, checklist panels, and strict slide-to-slide design consistency.

### Nutrition / Supplements

Default setup:

- Format: `Carousel`
- Slide count: `7`
- Tone: `Evidence-based` or `Beginner-friendly`
- Goal: `Educate`

The generated prompt uses a premium science-editorial infographic system with clean data panels, dosage boxes, myth-vs-fact sections, comparison tables, macro/supplement visuals, and practical evidence-aware guidance.

### Gym Motivation

Default setup:

- Format: `Carousel`
- Slide count: `5`
- Tone: `Motivational`
- Goal: `Reach`

The generated prompt uses a cinematic typography-led system focused on short, sharp, repost-worthy copy.

## Color Schemes

The prompt builder includes 10 preset color schemes:

- Neon Blue Form
- Cyber Cyan Steel
- Graphite Gold
- Redline Intensity
- Science Mint
- Teal Ivory Evidence
- Violet Future Self
- Steel Blue Calm
- Lime Performance
- Amber Graphite

The prompt locks the selected palette across the full carousel so generated slides stay visually consistent.

## Mannequin Gender

The app includes a `Mannequin Gender` selector:

- Male - athletic
- Female - athletic

The female option is written as a strong, athletic, performance-focused training mannequin. The prompt explicitly avoids glamour, fashion-model styling, or sexualized presentation.

## Local Development

Install dependencies:

```bash
npm install
```

On Windows PowerShell, if `npm` is blocked by execution policy, use:

```powershell
npm.cmd install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Static Build

Build the static site:

```bash
npm run build
```

The generated static site is created in:

```text
out/
```

## GitHub Pages Deployment

This repo includes:

```text
.github/workflows/deploy-github-pages.yml
```

To deploy on free GitHub Pages:

1. Create a public GitHub repository.
2. Upload or push this project source to the repository.
3. Open the repository on GitHub.
4. Go to `Settings -> Pages`.
5. Set `Build and deployment` source to `GitHub Actions`.
6. Push to the `main` or `master` branch.
7. GitHub Actions will install dependencies, build the static site, and deploy it.

The workflow automatically handles the base path for normal GitHub project pages like:

```text
https://yourusername.github.io/your-repo-name/
```

For a user site repo like:

```text
yourusername.github.io
```

the workflow builds without a base path.

## Manual Static Deployment

If you do not use GitHub Actions, build manually with the correct base path.

For a project page:

```bash
NEXT_PUBLIC_BASE_PATH=/your-repo-name npm run build
```

On Windows PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH="/your-repo-name"
npm.cmd run build
```

Then upload the contents of `out/` to the GitHub Pages branch or static host.

## Browser Settings

The saved ChatGPT URL is stored in the browser using:

```text
localStorage
```

That means:

- It is private to your browser/device.
- It is not uploaded to GitHub.
- Other visitors will not see your saved ChatGPT URL.
- If you clear browser data, you may need to enter it again.

## Suggested Workflow

1. Select the post category.
2. Enter a topic, or leave it blank to let the prompt ask ChatGPT to choose a viral LeanLogicLab topic.
3. Select format, slide count, tone, goal, output type, mannequin gender, and color scheme.
4. Click `Generate Prompt`.
5. Click `Copy Prompt` or `Open ChatGPT Chat`.
6. Paste/send the prompt in ChatGPT manually.
7. Generate the content/images manually.
8. Download and organize the final slides yourself.

## Repository Notes

Generated folders are ignored:

- `node_modules/`
- `.next/`
- `out/`
- `content-machine/`

These should not be committed. GitHub Actions installs dependencies and builds the static output during deployment.
