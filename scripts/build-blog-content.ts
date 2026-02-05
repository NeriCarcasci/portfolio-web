import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { z } from 'zod';
import sharp from 'sharp';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

// Schemas
export const PersonSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().optional(),
  url: z.string().url().optional(),
  avatar: z.string().nullable().optional()
});

export const PostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD format'),
  modified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  people: z.array(z.string()).default([]),
  type: z.enum(['article', 'note', 'tutorial']).default('article'),
  draft: z.boolean().default(false)
});

export const PeopleFileSchema = z.array(PersonSchema);

type Person = z.infer<typeof PersonSchema>;
type PostMeta = z.infer<typeof PostSchema>;

export interface ProcessedPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  modified?: string;
  tags: string[];
  coverUrl?: string;
  coverWidth?: number;
  coverHeight?: number;
  people: string[];
  type: string;
  draft: boolean;
  html: string;
  wordCount: number;
  readingTime: number;
  assets: string[];
}

interface ProcessedPerson {
  id: string;
  name: string;
  role?: string;
  url?: string;
  avatarUrl?: string;
}

interface MissingAssetError {
  slug: string;
  filename: string;
  expectedPath: string;
}

const CONTENT_DIR = 'content/blog';
const POSTS_DIR = path.join(CONTENT_DIR, 'posts');
const OUTPUT_DIR = 'src/lib/generated';
const STATIC_BLOG_DIR = 'static/blog';

// Configure marked with syntax highlighting
const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

function normalizeSlug(folderName: string): string {
  let slug = folderName.replace(/-/g, '_').toLowerCase();
  if (!/^[a-z]/.test(slug)) {
    slug = 'post_' + slug;
  }
  return slug;
}

function hashContent(content: Buffer): string {
  return crypto.createHash('md5').update(content).digest('hex').slice(0, 12);
}

async function ensureDir(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
}

function countWords(text: string): number {
  // Strip HTML and count words
  const plainText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return plainText.split(/\s+/).filter(word => word.length > 0).length;
}

function calculateReadingTime(wordCount: number): number {
  // Average reading speed: 200 words per minute
  return Math.max(1, Math.ceil(wordCount / 200));
}

async function processImage(
  inputPath: string,
  outputDir: string,
  baseName: string
): Promise<{ url: string; width: number; height: number } | null> {
  try {
    const inputBuffer = await fs.readFile(inputPath);
    const hash = hashContent(inputBuffer);
    const outputName = `${baseName}_${hash}.webp`;
    const outputPath = path.join(outputDir, outputName);

    // Check if it's already a valid image or just a placeholder
    const stats = await fs.stat(inputPath);
    if (stats.size < 100) {
      // Placeholder file, skip processing
      console.log(`  Skipping placeholder: ${inputPath}`);
      return null;
    }

    const image = sharp(inputBuffer);

    await image
      .webp({ quality: 85 })
      .resize({ width: 1200, height: 630, fit: 'cover', withoutEnlargement: true })
      .toFile(outputPath);

    const outputMeta = await sharp(outputPath).metadata();

    return {
      url: `/blog/${outputName}`,
      width: outputMeta.width || 1200,
      height: outputMeta.height || 630
    };
  } catch (error) {
    console.warn(`  Warning: Could not process image ${inputPath}:`, error);
    return null;
  }
}

async function processLocalAssets(
  markdown: string,
  postDir: string,
  outputDir: string,
  slug: string
): Promise<{ markdown: string; assets: string[]; errors: MissingAssetError[] }> {
  const assets: string[] = [];
  const errors: MissingAssetError[] = [];
  let processedMarkdown = markdown;

  // Match patterns:
  // - <local:filename> (direct reference)
  // - ![alt](<local:filename>) or ![alt](local:filename) (markdown image)
  // - [text](<local:filename>) or [text](local:filename) (markdown link)
  // - <img src="<local:filename>"> or src='<local:filename>' (HTML)
  const patterns = [
    /<local:([^>]+)>/g,
    /!\[[^\]]*\]\(<?local:([^>)\s]+)>?\)/g,
    /\[[^\]]*\]\(<?local:([^>)\s]+)>?\)/g,
    /src=["']<?local:([^"'>]+)>?["']/g
  ];

  const allMatches: Array<{ match: string; filename: string }> = [];

  for (const pattern of patterns) {
    const matches = [...markdown.matchAll(pattern)];
    for (const match of matches) {
      allMatches.push({ match: match[0], filename: match[1] });
    }
  }

  // Deduplicate by filename
  const uniqueFiles = new Map<string, string[]>();
  for (const { match, filename } of allMatches) {
    if (!uniqueFiles.has(filename)) {
      uniqueFiles.set(filename, []);
    }
    uniqueFiles.get(filename)!.push(match);
  }

  for (const [filename, matches] of uniqueFiles) {
    const inputPath = path.join(postDir, 'content', filename);

    try {
      await fs.access(inputPath);
      const inputBuffer = await fs.readFile(inputPath);
      const hash = hashContent(inputBuffer);
      const ext = path.extname(filename);
      const baseName = path.basename(filename, ext);

      // Process if it's an image
      if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext.toLowerCase())) {
        const stats = await fs.stat(inputPath);
        if (stats.size > 100) {
          const outputName = `${slug}_${baseName}_${hash}.webp`;
          const outputPath = path.join(outputDir, outputName);
          await sharp(inputBuffer)
            .webp({ quality: 85 })
            .toFile(outputPath);
          const assetUrl = `/blog/${outputName}`;
          assets.push(assetUrl);

          // Replace all occurrences
          for (const matchStr of matches) {
            const replacement = matchStr
              .replace(/<local:[^>]+>/g, assetUrl)
              .replace(/local:[^\s)>"']+/g, assetUrl);
            processedMarkdown = processedMarkdown.replace(matchStr, replacement);
          }
        } else {
          for (const matchStr of matches) {
            processedMarkdown = processedMarkdown.replace(matchStr, '');
          }
        }
      } else {
        // Non-image asset, copy as-is with hash
        const outputName = `${slug}_${baseName}_${hash}${ext}`;
        const outputPath = path.join(outputDir, outputName);
        await fs.copyFile(inputPath, outputPath);
        const assetUrl = `/blog/${outputName}`;
        assets.push(assetUrl);

        for (const matchStr of matches) {
          const replacement = matchStr
            .replace(/<local:[^>]+>/g, assetUrl)
            .replace(/local:[^\s)>"']+/g, assetUrl);
          processedMarkdown = processedMarkdown.replace(matchStr, replacement);
        }
      }
    } catch {
      errors.push({
        slug,
        filename,
        expectedPath: inputPath
      });
    }
  }

  return { markdown: processedMarkdown, assets, errors };
}

async function processPost(
  folderName: string,
  people: Map<string, ProcessedPerson>
): Promise<{ post: ProcessedPost | null; errors: MissingAssetError[] }> {
  const postDir = path.join(POSTS_DIR, folderName);
  const metaPath = path.join(postDir, 'article.json');
  const mdPath = path.join(postDir, 'article.md');
  const errors: MissingAssetError[] = [];

  console.log(`Processing: ${folderName}`);

  // Read and validate metadata
  let metaRaw: string;
  try {
    metaRaw = await fs.readFile(metaPath, 'utf-8');
  } catch {
    console.error(`  Error: Missing article.json in ${folderName}`);
    return { post: null, errors };
  }

  let meta: PostMeta;
  try {
    const parsed = JSON.parse(metaRaw);
    meta = PostSchema.parse(parsed);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(`  Validation error in ${folderName}:`, error.errors);
    } else {
      console.error(`  JSON parse error in ${folderName}:`, error);
    }
    process.exit(1);
  }

  // Read markdown
  let markdown: string;
  try {
    markdown = await fs.readFile(mdPath, 'utf-8');
  } catch {
    console.error(`  Error: Missing article.md in ${folderName}`);
    return { post: null, errors };
  }

  const slug = normalizeSlug(folderName);

  // Process local assets in markdown
  const assetResult = await processLocalAssets(
    markdown,
    postDir,
    STATIC_BLOG_DIR,
    slug
  );

  errors.push(...assetResult.errors);
  const assets = assetResult.assets;

  // Process cover image
  let coverUrl: string | undefined;
  let coverWidth: number | undefined;
  let coverHeight: number | undefined;

  if (meta.cover) {
    const localMatch = meta.cover.match(/<local:([^>]+)>/);
    if (localMatch) {
      const coverFilename = localMatch[1];
      const coverPath = path.join(postDir, 'content', coverFilename);

      try {
        await fs.access(coverPath);
        const result = await processImage(coverPath, STATIC_BLOG_DIR, `${slug}_cover`);
        if (result) {
          coverUrl = result.url;
          coverWidth = result.width;
          coverHeight = result.height;
          assets.push(coverUrl);
        }
      } catch {
        errors.push({
          slug,
          filename: coverFilename,
          expectedPath: coverPath
        });
      }
    } else if (meta.cover.startsWith('http')) {
      coverUrl = meta.cover;
      // Don't include width/height for external URLs - we don't know them
    }
  }

  // Validate people references
  for (const personId of meta.people) {
    if (!people.has(personId)) {
      console.warn(`  Warning: Unknown person "${personId}" in ${folderName}`);
    }
  }

  // Convert markdown to HTML with syntax highlighting
  const html = await marked.parse(assetResult.markdown);

  // Calculate word count and reading time from markdown
  const wordCount = countWords(markdown);
  const readingTime = calculateReadingTime(wordCount);

  return {
    post: {
      slug,
      title: meta.title,
      description: meta.description,
      date: meta.date,
      modified: meta.modified,
      tags: meta.tags,
      coverUrl,
      coverWidth,
      coverHeight,
      people: meta.people,
      type: meta.type,
      draft: meta.draft,
      html,
      wordCount,
      readingTime,
      assets
    },
    errors
  };
}

async function loadPeople(): Promise<Map<string, ProcessedPerson>> {
  const peoplePath = path.join(CONTENT_DIR, 'people.json');
  const peopleMap = new Map<string, ProcessedPerson>();

  try {
    const raw = await fs.readFile(peoplePath, 'utf-8');
    const parsed = JSON.parse(raw);
    const people = PeopleFileSchema.parse(parsed);

    for (const person of people) {
      const normalizedId = person.id.replace(/-/g, '_');
      peopleMap.set(person.id, {
        id: normalizedId,
        name: person.name,
        role: person.role,
        url: person.url,
        avatarUrl: person.avatar || undefined
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('People validation error:', error.errors);
      process.exit(1);
    }
    console.warn('Warning: Could not load people.json');
  }

  return peopleMap;
}

function generatePeopleTS(people: Map<string, ProcessedPerson>): string {
  const peopleArray = Array.from(people.values());
  return `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated by scripts/build-blog-content.ts

export interface Person {
  id: string;
  name: string;
  role?: string;
  url?: string;
  avatarUrl?: string;
}

export const people: Person[] = ${JSON.stringify(peopleArray, null, 2)};

export function getPersonById(id: string): Person | undefined {
  return people.find(p => p.id === id);
}
`;
}

function generatePostsTS(posts: ProcessedPost[]): string {
  // Sort by date descending
  const sorted = [...posts].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated by scripts/build-blog-content.ts

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  modified?: string;
  tags: string[];
  coverUrl?: string;
  coverWidth?: number;
  coverHeight?: number;
  people: string[];
  type: string;
  draft: boolean;
  html: string;
  wordCount: number;
  readingTime: number;
  assets: string[];
}

export const posts: BlogPost[] = ${JSON.stringify(sorted, null, 2)};
`;
}

async function main(): Promise<void> {
  console.log('Building blog content...\n');

  // Ensure output directories exist
  await ensureDir(OUTPUT_DIR);
  await ensureDir(STATIC_BLOG_DIR);

  // Load people
  const people = await loadPeople();
  console.log(`Loaded ${people.size} people\n`);

  // Find all post directories
  let postDirs: string[];
  try {
    const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
    postDirs = entries.filter(e => e.isDirectory()).map(e => e.name);
  } catch {
    console.log('No posts directory found, creating empty generated files');
    postDirs = [];
  }

  // Process all posts
  const posts: ProcessedPost[] = [];
  const allErrors: MissingAssetError[] = [];

  for (const dir of postDirs) {
    const { post, errors } = await processPost(dir, people);
    if (post) {
      posts.push(post);
    }
    allErrors.push(...errors);
  }

  // Fail build if any assets are missing
  if (allErrors.length > 0) {
    console.error('\n\x1b[31mBuild failed: Missing assets\x1b[0m\n');
    for (const err of allErrors) {
      console.error(`  Post: ${err.slug}`);
      console.error(`  Missing file: ${err.filename}`);
      console.error(`  Expected path: ${err.expectedPath}\n`);
    }
    process.exit(1);
  }

  console.log(`\nProcessed ${posts.length} posts`);

  // Generate TypeScript files
  const peopleTS = generatePeopleTS(people);
  const postsTS = generatePostsTS(posts);

  await fs.writeFile(path.join(OUTPUT_DIR, 'people.ts'), peopleTS);
  await fs.writeFile(path.join(OUTPUT_DIR, 'posts.ts'), postsTS);

  console.log('\nGenerated:');
  console.log(`  ${OUTPUT_DIR}/people.ts`);
  console.log(`  ${OUTPUT_DIR}/posts.ts`);
  console.log('\nBlog content build complete!');
}

// Only run main if this is the entry point
if (process.argv[1]?.endsWith('build-blog-content.ts')) {
  main().catch((error) => {
    console.error('Build failed:', error);
    process.exit(1);
  });
}

// Export for testing
export { main, processPost, loadPeople, normalizeSlug, countWords, calculateReadingTime };
