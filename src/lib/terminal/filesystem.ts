import type { Project } from '$content/projects';
import { getAllProjects } from '$content/projects';
import { about } from '$content/about';
import type { BlogPost } from '$lib/blog';
import { getAllPosts } from '$lib/blog';

export const TERMINAL_USER = 'neric';
export const TERMINAL_HOST = 'portfolio';
export const HOME_PATH = '/';

type FsNode = DirNode | FileNode;

interface DirNode {
  type: 'dir';
  children: Record<string, FsNode>;
}

interface FileNode {
  type: 'file';
  content: () => string;
}

export interface DirEntry {
  name: string;
  type: 'dir' | 'file';
}

export interface PromptParts {
  user: string;
  host: string;
  path: string;
  symbol: string;
}

let cwd = HOME_PATH;

function createFile(content: string | (() => string)): FileNode {
  return {
    type: 'file',
    content: typeof content === 'function' ? content : () => content
  };
}

function buildProjectFile(project: Project): string {
  const linkLine = project.links?.length
    ? `Links:\n${project.links.map((link) => `- ${link.label}: ${link.url}`).join('\n')}`
    : '';

  return [
    `Title: ${project.title}`,
    `Summary: ${project.summary}`,
    project.tags.length ? `Tags: ${project.tags.join(', ')}` : '',
    project.tech.length ? `Tech: ${project.tech.join(', ')}` : '',
    linkLine ? `\n${linkLine}` : '',
    '',
    `Open: /projects/${project.slug}`
  ]
    .filter(Boolean)
    .join('\n');
}

function buildPostFile(post: BlogPost): string {
  return [
    `Title: ${post.title}`,
    `Date: ${post.date}`,
    `Summary: ${post.description}`,
    `Tags: ${post.tags.join(', ')}`,
    '',
    `Open: /blog/${post.slug}`
  ].join('\n');
}

function buildReadme(): string {
  return [
    'Welcome to the portfolio terminal.',
    '',
    'Try:',
    '- ls',
    '- cd /projects',
    '- ls',
    '- cat trusted-ai-metrics.txt',
    '- cat about.txt',
    '',
    'Commands:',
    '  help, ls, cd, cat, pwd, whoami, clear, exit'
  ].join('\n');
}

function buildAbout(): string {
  return [
    `${about.name} - ${about.role}`,
    '',
    about.summary,
    '',
    about.bio,
    '',
    `Skills: ${about.skills.join(', ')}`
  ].join('\n');
}

function buildContact(): string {
  return [
    `Email: ${about.email}`,
    `GitHub: ${about.github}`,
    `LinkedIn: ${about.linkedin}`,
    `CV: ${about.cvUrl}`
  ].join('\n');
}

function buildFileSystem(): DirNode {
  const projectsDir: DirNode = { type: 'dir', children: {} };
  for (const project of getAllProjects()) {
    projectsDir.children[`${project.slug}.txt`] = createFile(() => buildProjectFile(project));
  }

  const blogDir: DirNode = { type: 'dir', children: {} };
  for (const post of getAllPosts()) {
    blogDir.children[`${post.slug}.md`] = createFile(() => buildPostFile(post));
  }

  return {
    type: 'dir',
    children: {
      projects: projectsDir,
      blog: blogDir,
      'readme.md': createFile(buildReadme),
      'about.txt': createFile(buildAbout),
      'contact.txt': createFile(buildContact)
    }
  };
}

const fsRoot = buildFileSystem();

function getNode(path: string): FsNode | null {
  const normalized = normalizePath(path);
  const parts = normalized.split('/').filter(Boolean);
  let node: FsNode = fsRoot;

  for (const part of parts) {
    if (node.type !== 'dir') return null;
    const next = node.children[part];
    if (!next) return null;
    node = next;
  }

  return node;
}

function normalizePath(path: string): string {
  if (!path) return HOME_PATH;

  const parts = path.split('/').filter(Boolean);
  const stack: string[] = [];

  for (const part of parts) {
    if (part === '.' || part === '') continue;
    if (part === '..') {
      stack.pop();
      continue;
    }
    stack.push(part);
  }

  return `/${stack.join('/')}`;
}

export function resolvePath(input: string, base = cwd): string {
  if (!input || input === '.') return normalizePath(base);

  let raw = input;
  if (raw.startsWith('~')) {
    raw = `${HOME_PATH}${raw.slice(1)}`;
  }

  if (!raw.startsWith('/')) {
    raw = `${base.replace(/\/$/, '')}/${raw}`;
  }

  return normalizePath(raw);
}

export function listDir(path: string): DirEntry[] | null {
  const node = getNode(path);
  if (!node || node.type !== 'dir') return null;

  return Object.entries(node.children)
    .map(([name, child]) => ({ name, type: child.type }))
    .sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'dir' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
}

export function isDir(path: string): boolean {
  const node = getNode(path);
  return node?.type === 'dir';
}

export function isFile(path: string): boolean {
  const node = getNode(path);
  return node?.type === 'file';
}

export function readFile(path: string): string | null {
  const node = getNode(path);
  if (!node || node.type !== 'file') return null;
  return node.content();
}

export function setCwd(path: string) {
  cwd = normalizePath(path);
}

export function getCwd(): string {
  return cwd;
}

function formatPathForPrompt(path: string): string {
  const normalized = normalizePath(path);
  if (HOME_PATH === '/') {
    return normalized === '/' ? '~' : `~${normalized}`;
  }
  if (normalized === HOME_PATH) return '~';
  if (normalized.startsWith(`${HOME_PATH}/`)) {
    return `~${normalized.slice(HOME_PATH.length)}`;
  }
  return normalized;
}

export function getPromptParts(path = cwd): PromptParts {
  return {
    user: TERMINAL_USER,
    host: TERMINAL_HOST,
    path: formatPathForPrompt(path),
    symbol: '$'
  };
}
