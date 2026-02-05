import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { z } from 'zod';
import sharp from 'sharp';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

export const ProjectSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  tech: z.array(z.string()).default([]),
  links: z.array(
    z.object({
      label: z.string().min(1),
      url: z.string().min(1)
    })
  ).default([]),
  order: z.number().int().optional(),
  draft: z.boolean().default(false)
});

type ProjectMeta = z.infer<typeof ProjectSchema>;

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProcessedProject {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  featured: boolean;
  tech: string[];
  links: ProjectLink[];
  order?: number;
  draft: boolean;
  html: string;
  text: string;
  assets: string[];
}

interface MissingAssetError {
  slug: string;
  filename: string;
  expectedPath: string;
}

const CONTENT_DIR = 'content/projects';
const PROJECTS_DIR = CONTENT_DIR;
const OUTPUT_DIR = 'src/lib/generated';
const STATIC_PROJECTS_DIR = 'static/projects';

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
  let slug = folderName.toLowerCase();
  if (!/^[a-z]/.test(slug)) {
    slug = 'project_' + slug;
  }
  return slug;
}

function hashContent(content: Buffer): string {
  return crypto.createHash('md5').update(content).digest('hex').slice(0, 12);
}

async function ensureDir(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

async function processImage(
  inputPath: string,
  outputDir: string,
  baseName: string
): Promise<string | null> {
  try {
    const inputBuffer = await fs.readFile(inputPath);
    const hash = hashContent(inputBuffer);
    const outputName = `${baseName}_${hash}.webp`;
    const outputPath = path.join(outputDir, outputName);

    const stats = await fs.stat(inputPath);
    if (stats.size < 100) {
      console.log(`  Skipping placeholder: ${inputPath}`);
      return null;
    }

    await sharp(inputBuffer)
      .webp({ quality: 85 })
      .toFile(outputPath);

    return `/projects/${outputName}`;
  } catch (error) {
    console.warn(`  Warning: Could not process image ${inputPath}:`, error);
    return null;
  }
}

async function processLocalAssets(
  markdown: string,
  projectDir: string,
  outputDir: string,
  slug: string
): Promise<{ markdown: string; assets: string[]; errors: MissingAssetError[] }> {
  const assets: string[] = [];
  const errors: MissingAssetError[] = [];
  let processedMarkdown = markdown;

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

  const uniqueFiles = new Map<string, string[]>();
  for (const { match, filename } of allMatches) {
    if (!uniqueFiles.has(filename)) {
      uniqueFiles.set(filename, []);
    }
    uniqueFiles.get(filename)!.push(match);
  }

  for (const [filename, matches] of uniqueFiles) {
    const inputPath = path.join(projectDir, 'content', filename);

    try {
      await fs.access(inputPath);
      const inputBuffer = await fs.readFile(inputPath);
      const hash = hashContent(inputBuffer);
      const ext = path.extname(filename);
      const baseName = path.basename(filename, ext);

      if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext.toLowerCase())) {
        const stats = await fs.stat(inputPath);
        if (stats.size > 100) {
          const outputName = `${slug}_${baseName}_${hash}.webp`;
          const outputPath = path.join(outputDir, outputName);
          await sharp(inputBuffer)
            .webp({ quality: 85 })
            .toFile(outputPath);
          const assetUrl = `/projects/${outputName}`;
          assets.push(assetUrl);

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
        const outputName = `${slug}_${baseName}_${hash}${ext}`;
        const outputPath = path.join(outputDir, outputName);
        await fs.copyFile(inputPath, outputPath);
        const assetUrl = `/projects/${outputName}`;
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

async function processProject(
  folderName: string
): Promise<{ project: ProcessedProject | null; errors: MissingAssetError[] }> {
  const projectDir = path.join(PROJECTS_DIR, folderName);
  const metaPath = path.join(projectDir, 'project.json');
  const mdPath = path.join(projectDir, 'project.md');
  const errors: MissingAssetError[] = [];

  console.log(`Processing: ${folderName}`);

  let metaRaw: string;
  try {
    metaRaw = await fs.readFile(metaPath, 'utf-8');
  } catch {
    console.error(`  Error: Missing project.json in ${folderName}`);
    return { project: null, errors };
  }

  let meta: ProjectMeta;
  try {
    const parsed = JSON.parse(metaRaw);
    meta = ProjectSchema.parse(parsed);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(`  Validation error in ${folderName}:`, error.errors);
    } else {
      console.error(`  JSON parse error in ${folderName}:`, error);
    }
    process.exit(1);
  }

  let markdown: string;
  try {
    markdown = await fs.readFile(mdPath, 'utf-8');
  } catch {
    console.error(`  Error: Missing project.md in ${folderName}`);
    return { project: null, errors };
  }

  const slug = normalizeSlug(folderName);

  const assetResult = await processLocalAssets(
    markdown,
    projectDir,
    STATIC_PROJECTS_DIR,
    slug
  );

  errors.push(...assetResult.errors);
  const assets = assetResult.assets;

  const html = await marked.parse(assetResult.markdown);
  const text = stripHtml(html);

  return {
    project: {
      slug,
      title: meta.title,
      summary: meta.summary,
      tags: meta.tags,
      featured: meta.featured,
      tech: meta.tech,
      links: meta.links,
      order: meta.order,
      draft: meta.draft,
      html,
      text,
      assets
    },
    errors
  };
}

function generateProjectsTS(projects: ProcessedProject[]): string {
  const sorted = [...projects].sort((a, b) => {
    const orderDiff = (a.order ?? 0) - (b.order ?? 0);
    if (orderDiff !== 0) return orderDiff;
    return a.title.localeCompare(b.title);
  });

  return `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated by scripts/build-project-content.ts

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  featured: boolean;
  tech: string[];
  links: ProjectLink[];
  order?: number;
  draft: boolean;
  html: string;
  text: string;
  assets: string[];
}

export const projects: Project[] = ${JSON.stringify(sorted, null, 2)};
`;
}

async function main(): Promise<void> {
  console.log('Building project content...\n');

  await ensureDir(OUTPUT_DIR);
  await ensureDir(STATIC_PROJECTS_DIR);

  let projectDirs: string[];
  try {
    const entries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });
    projectDirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    console.log('No projects directory found, creating empty generated files');
    projectDirs = [];
  }

  const projects: ProcessedProject[] = [];
  const allErrors: MissingAssetError[] = [];

  for (const dir of projectDirs) {
    const { project, errors } = await processProject(dir);
    if (project) {
      projects.push(project);
    }
    allErrors.push(...errors);
  }

  if (allErrors.length > 0) {
    console.error('\n\x1b[31mBuild failed: Missing assets\x1b[0m\n');
    for (const err of allErrors) {
      console.error(`  Project: ${err.slug}`);
      console.error(`  Missing file: ${err.filename}`);
      console.error(`  Expected path: ${err.expectedPath}\n`);
    }
    process.exit(1);
  }

  console.log(`\nProcessed ${projects.length} projects`);

  const projectsTS = generateProjectsTS(projects);
  await fs.writeFile(path.join(OUTPUT_DIR, 'projects.ts'), projectsTS);

  console.log('\nGenerated:');
  console.log(`  ${OUTPUT_DIR}/projects.ts`);
  console.log('\nProject content build complete!');
}

if (process.argv[1]?.endsWith('build-project-content.ts')) {
  main().catch((error) => {
    console.error('Build failed:', error);
    process.exit(1);
  });
}

export { main, processProject, normalizeSlug };
