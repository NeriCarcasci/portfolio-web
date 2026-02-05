import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  PostSchema,
  PersonSchema,
  PeopleFileSchema,
  normalizeSlug,
  countWords,
  calculateReadingTime
} from '../build-blog-content';

describe('Zod Schema Validation', () => {
  describe('PostSchema', () => {
    it('validates a valid post', () => {
      const validPost = {
        title: 'Test Post',
        description: 'A test description',
        date: '2024-01-15',
        tags: ['test', 'example'],
        people: ['author'],
        type: 'article',
        draft: false
      };

      expect(() => PostSchema.parse(validPost)).not.toThrow();
    });

    it('rejects post with missing title', () => {
      const invalidPost = {
        description: 'A test description',
        date: '2024-01-15'
      };

      expect(() => PostSchema.parse(invalidPost)).toThrow(z.ZodError);
    });

    it('rejects post with missing description', () => {
      const invalidPost = {
        title: 'Test Post',
        date: '2024-01-15'
      };

      expect(() => PostSchema.parse(invalidPost)).toThrow(z.ZodError);
    });

    it('rejects post with invalid date format', () => {
      const invalidPost = {
        title: 'Test Post',
        description: 'A test description',
        date: '01/15/2024' // Wrong format
      };

      expect(() => PostSchema.parse(invalidPost)).toThrow(z.ZodError);
    });

    it('rejects post with invalid date format (no leading zeros)', () => {
      const invalidPost = {
        title: 'Test Post',
        description: 'A test description',
        date: '2024-1-5' // Missing leading zeros
      };

      expect(() => PostSchema.parse(invalidPost)).toThrow(z.ZodError);
    });

    it('accepts post with optional fields missing', () => {
      const minimalPost = {
        title: 'Test Post',
        description: 'A test description',
        date: '2024-01-15'
      };

      const result = PostSchema.parse(minimalPost);
      expect(result.draft).toBe(false);
      expect(result.tags).toEqual([]);
      expect(result.people).toEqual([]);
      expect(result.type).toBe('article');
    });

    it('accepts draft: true', () => {
      const draftPost = {
        title: 'Draft Post',
        description: 'A draft description',
        date: '2024-01-15',
        draft: true
      };

      const result = PostSchema.parse(draftPost);
      expect(result.draft).toBe(true);
    });

    it('rejects invalid type', () => {
      const invalidPost = {
        title: 'Test Post',
        description: 'A test description',
        date: '2024-01-15',
        type: 'invalid-type'
      };

      expect(() => PostSchema.parse(invalidPost)).toThrow(z.ZodError);
    });
  });

  describe('PersonSchema', () => {
    it('validates a valid person', () => {
      const validPerson = {
        id: 'author',
        name: 'John Doe',
        role: 'Engineer',
        url: 'https://example.com'
      };

      expect(() => PersonSchema.parse(validPerson)).not.toThrow();
    });

    it('rejects person with empty id', () => {
      const invalidPerson = {
        id: '',
        name: 'John Doe'
      };

      expect(() => PersonSchema.parse(invalidPerson)).toThrow(z.ZodError);
    });

    it('rejects person with invalid url', () => {
      const invalidPerson = {
        id: 'author',
        name: 'John Doe',
        url: 'not-a-url'
      };

      expect(() => PersonSchema.parse(invalidPerson)).toThrow(z.ZodError);
    });
  });

  describe('PeopleFileSchema', () => {
    it('validates an array of people', () => {
      const validPeople = [
        { id: 'author1', name: 'John Doe' },
        { id: 'author2', name: 'Jane Doe', role: 'Editor' }
      ];

      expect(() => PeopleFileSchema.parse(validPeople)).not.toThrow();
    });

    it('rejects non-array', () => {
      const invalidData = { id: 'author', name: 'John' };

      expect(() => PeopleFileSchema.parse(invalidData)).toThrow(z.ZodError);
    });
  });
});

describe('normalizeSlug', () => {
  it('replaces hyphens with underscores', () => {
    expect(normalizeSlug('my-blog-post')).toBe('my_blog_post');
  });

  it('converts to lowercase', () => {
    expect(normalizeSlug('My-Blog-Post')).toBe('my_blog_post');
  });

  it('adds prefix if slug starts with number', () => {
    expect(normalizeSlug('123-post')).toBe('post_123_post');
  });

  it('handles already valid slugs', () => {
    expect(normalizeSlug('valid_slug')).toBe('valid_slug');
  });
});

describe('countWords', () => {
  it('counts words in plain text', () => {
    expect(countWords('Hello world')).toBe(2);
  });

  it('strips HTML tags', () => {
    expect(countWords('<p>Hello <strong>world</strong></p>')).toBe(2);
  });

  it('handles multiple spaces', () => {
    expect(countWords('Hello    world')).toBe(2);
  });

  it('returns 0 for empty string', () => {
    expect(countWords('')).toBe(0);
  });

  it('handles markdown content', () => {
    const markdown = `# Title

This is a paragraph with some text.

- Item one
- Item two`;
    // Should count: Title, This, is, a, paragraph, with, some, text, Item, one, Item, two
    expect(countWords(markdown)).toBeGreaterThan(5);
  });
});

describe('calculateReadingTime', () => {
  it('returns 1 minute for short content', () => {
    expect(calculateReadingTime(50)).toBe(1);
  });

  it('returns 1 minute for 200 words', () => {
    expect(calculateReadingTime(200)).toBe(1);
  });

  it('returns 2 minutes for 201-400 words', () => {
    expect(calculateReadingTime(201)).toBe(2);
    expect(calculateReadingTime(400)).toBe(2);
  });

  it('returns correct time for longer content', () => {
    expect(calculateReadingTime(1000)).toBe(5);
  });
});

describe('Draft exclusion logic', () => {
  it('draft posts have draft: true', () => {
    const draftPost = PostSchema.parse({
      title: 'Draft',
      description: 'Draft post',
      date: '2024-01-15',
      draft: true
    });

    expect(draftPost.draft).toBe(true);
  });

  it('published posts have draft: false by default', () => {
    const publishedPost = PostSchema.parse({
      title: 'Published',
      description: 'Published post',
      date: '2024-01-15'
    });

    expect(publishedPost.draft).toBe(false);
  });
});
