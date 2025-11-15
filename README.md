# Branch Visualization Tool

A modern GitHub branch visualization tool that displays branch relationships, commit history, and statistics with interactive graphs and dark mode support.

## Features

- **🌳 Branch Relationship Graph**: Interactive SVG visualization showing how branches connect to each other
- **📋 Branch Listing & Details**: Sortable list of all branches with commit information, authors, and timestamps
- **🔍 Repository Search**: Easy search interface supporting multiple GitHub URL formats
- **🌓 Dark Mode Support**: Beautiful light and dark themes with smooth transitions
- **⏱️ Commit History Timeline**: Visual timeline showing recent commits with clickable links to GitHub
- **📊 Branch Statistics**: Real-time metrics including total branches, protected branches, contributors, and activity

## Tech Stack

- **Next.js 15.3.4** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 3.4.0** - Styling
- **Octokit (@octokit/rest 22.0.0)** - GitHub API client
- **Framer Motion 12.22.0** - Animations
- **Recharts 3.0.2** - Data visualization
- **date-fns 4.1.0** - Date formatting
- **next-themes 0.4.6** - Theme management
- **Lucide React 0.525.0** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A GitHub account (optional: Personal Access Token for higher rate limits)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/filiksyos/branch-visualization-tool.git
cd branch-visualization-tool
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Set up GitHub token for higher API rate limits:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your GitHub Personal Access Token:
```
GITHUB_TOKEN=your_github_token_here
```

To create a token:
- Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token with `public_repo` scope

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Search for a Repository**: Enter a GitHub repository in any of these formats:
   - `owner/repo` (e.g., `facebook/react`)
   - `github.com/owner/repo`
   - `https://github.com/owner/repo`

2. **Explore Branches**: View the interactive branch graph showing relationships between branches

3. **Select a Branch**: Click on any branch in the graph or list to view its commit history and statistics

4. **View Statistics**: See real-time metrics about branch activity, contributors, and protection status

5. **Browse Commit History**: Explore the timeline of commits with links to GitHub

6. **Toggle Dark Mode**: Use the theme toggle in the header for light/dark mode

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with theme provider
│   ├── page.tsx                # Home page with search
│   ├── globals.css             # Global styles
│   └── repo/[owner]/[repo]/
│       └── page.tsx            # Repository visualization page
├── components/
│   ├── BranchGraph.tsx         # Interactive branch graph
│   ├── BranchList.tsx          # Branch listing table
│   ├── BranchStats.tsx         # Statistics cards
│   ├── CommitTimeline.tsx      # Commit history timeline
│   ├── SearchRepo.tsx          # Repository search input
│   └── ThemeToggle.tsx         # Dark mode toggle
└── lib/
    └── github-api.ts           # GitHub API utilities
```

## API Rate Limits

- **Without token**: 60 requests per hour
- **With token**: 5,000 requests per hour

For best experience, use a GitHub Personal Access Token.

## Building for Production

```bash
npm run build
npm start
```

## Deployment

This app can be deployed to:
- **Vercel** (recommended - one-click deploy)
- **Netlify**
- **Railway**
- Any platform supporting Next.js

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/filiksyos/branch-visualization-tool)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

Based on the architecture patterns from [PouyaBirvand/Github_analytics](https://github.com/PouyaBirvand/Github_analytics)

---

Built with ❤️ using Next.js and GitHub API