# Portfolio Web

A minimal, SEO-first portfolio built with SvelteKit, TypeScript, and TailwindCSS. Features a progressive Terminal Mode for interactive exploration and a full blog system with markdown authoring.

## Quick Start

```bash
npm install
npm run dev
```

The dev server automatically builds blog content before starting.

Open [http://localhost:5173](http://localhost:5173).

## Terminal SSR Notes

The `/terminal` route renders a lightweight skeleton during SSR and swaps in the interactive terminal after client hydration (guarded with SvelteKit's `browser` flag and `onMount`). If the terminal initialization throws, the page shows a friendly fallback message with a link back home.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Build content + start development server |
| `npm run build` | Build for production (runs build:content first) |
| `npm run build:content` | Process blog content and generate TypeScript |
| `npm run preview` | Preview production build |
| `npm run check` | Run TypeScript/Svelte type checking |
| `npm test` | Run tests |

## Project Structure

```
portfolio-web/
├── content/
│   └── blog/
│       ├── people.json         # Author definitions
│       └── posts/
│           └── <post-folder>/
│               ├── article.json  # Post metadata
│               ├── article.md    # Post content
│               └── content/      # Local assets (images)
├── scripts/
│   ├── build-blog-content.ts   # Blog build script
│   └── __tests__/              # Build script tests
├── src/
│   ├── lib/
│   │   ├── blog/               # Runtime blog API
│   │   ├── components/
│   │   │   ├── ui/             # Button, Card, Tag
│   │   │   └── terminal/       # Terminal UI
│   │   ├── config.ts           # Site configuration
│   │   ├── content/            # Projects/about data
│   │   ├── generated/          # Auto-generated blog files
│   │   ├── schemas/            # Zod validation schemas
│   │   └── terminal/           # Terminal logic
│   └── routes/
│       ├── +layout.svelte
│       ├── +page.svelte        # Home
│       ├── about/
│       ├── blog/               # Blog list
│       ├── blog/[slug]/        # Blog post pages
│       ├── contact/
│       ├── projects/
│       ├── projects/[slug]/
│       ├── terminal/
│       ├── api/ask/            # Q&A API
│       ├── rss.xml/            # RSS feed
│       ├── sitemap.xml/        # XML sitemap
│       └── robots.txt/
└── static/
    └── blog/                   # Processed blog images
```

## Blog System

### Adding a Blog Post

1. Create a new folder in `content/blog/posts/`:
   ```
   content/blog/posts/my-new-post/
   ├── article.json
   ├── article.md
   └── content/
       └── cover.webp  (optional)
   ```

2. Create `article.json` with metadata:
   ```json
   {
     "title": "My Post Title",
     "description": "A brief description for SEO and previews.",
     "date": "2024-12-01",
     "modified": "2024-12-05",
     "tags": ["tag1", "tag2"],
     "cover": "<local:cover.webp>",
     "people": ["author"],
     "type": "article",
     "draft": false
   }
   ```

3. Write content in `article.md`:
   ```markdown
   # My Post Title

   Introduction paragraph.

   ## Section Heading

   Content with **markdown** formatting.

   ![Image description](<local:my-image.png>)
   ```

4. Start dev server or run `npm run build:content` to process the post.

### Draft Posts

Set `"draft": true` in `article.json` to mark a post as a draft.

**Draft posts are excluded from:**
- `/blog` listing page
- `/blog/[slug]` routing (returns 404)
- `/rss.xml` feed
- `/sitemap.xml`
- `/api/ask` search results

Drafts are still processed during build, allowing you to preview them locally by temporarily setting `draft: false`.

### Local Assets

Use `<local:filename>` syntax to reference assets in the post's `content/` folder:

- **In markdown images**: `![Alt text](<local:image.png>)`
- **In markdown links**: `[Download](<local:file.pdf>)`
- **In HTML**: `<img src="<local:image.png>">`
- **In metadata (cover)**: `"cover": "<local:cover.webp>"`

The build script:
- Copies assets to `static/blog/` with content-hashed filenames
- Converts images to optimized WebP format
- **Fails the build with a clear error if any referenced asset is missing**

### Post Metadata Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title |
| `description` | string | Yes | SEO description |
| `date` | string | Yes | Publication date (YYYY-MM-DD) |
| `modified` | string | No | Last modified date |
| `tags` | string[] | No | Topic tags |
| `cover` | string | No | Cover image URL or `<local:...>` |
| `people` | string[] | No | Author IDs from people.json |
| `type` | string | No | "article", "note", or "tutorial" |
| `draft` | boolean | No | **Exclude from all public outputs** |

### Adding Authors

Edit `content/blog/people.json`:
```json
[
  {
    "id": "author",
    "name": "Neri Carcasci",
    "role": "AI/ML Engineer",
    "url": "https://yourdomain.com/about",
    "avatar": null
  }
]
```

### Syntax Highlighting

Code blocks are automatically highlighted at build time using highlight.js. Supports all common languages (Python, JavaScript, TypeScript, JSON, etc.).

````markdown
```python
def hello():
    print("Hello, world!")
```
````

## SEO Features

Blog pages include:
- Per-page title, description, keywords
- Canonical URLs (absolute, using BASE_URL)
- OpenGraph tags (og:title, og:image, og:image:width, og:image:height, article:published_time, etc.)
- Twitter Card tags (summary_large_image)
- JSON-LD structured data (BlogPosting, BreadcrumbList)
- Reading time and word count
- Automatic sitemap.xml with lastmod dates
- RSS feed at /rss.xml
- robots.txt with sitemap reference

**Note:** `og:image:width` and `og:image:height` are only included when dimensions are known (local processed images). External cover URLs omit these to avoid incorrect values.

## Configuration

Edit `src/lib/config.ts`:
```typescript
export const BASE_URL = 'https://yourdomain.com';
export const SITE_NAME = 'Portfolio';
export const SITE_LOCALE = 'en_US';
```

## Terminal Commands

The terminal (`/terminal`) supports:
- `help` - Show available commands
- `projects` - List projects
- `blog` - List blog posts
- `post <slug>` - Show blog post details
- `about` - About information
- `ask <question>` - Q&A from portfolio content
- `clear` / `exit` - Terminal controls

## Development

### Tests

Run tests with:
```bash
npm test        # Run once
npm run test:watch  # Watch mode
```

### CI/CD

GitHub Actions workflow runs on push/PR to main:
1. Install dependencies
2. Run tests
3. Type check
4. Build

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) - Framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Zod](https://zod.dev/) - Schema validation
- [Sharp](https://sharp.pixelplumbing.com/) - Image processing
- [Marked](https://marked.js.org/) - Markdown parsing
- [highlight.js](https://highlightjs.org/) - Syntax highlighting
- [Vitest](https://vitest.dev/) - Testing

## License

MIT
