// ─── ThoughtHealer Blog Data Store ───────────────────────────────────────────
// Central aggregator for all ThoughtHealer blogs (58 comprehensive clinical articles across 12 categories)

import { existingBlogs } from './blogs/existingBlogs';
import { adhdBlogs } from './blogs/adhdBlogs';
import { anxietyBlogs } from './blogs/anxietyBlogs';
import { depressionBlogs } from './blogs/depressionBlogs';
import { sleepBlogs } from './blogs/sleepBlogs';
import { crisisBlogs } from './blogs/crisisBlogs';
import { ocdBlogs } from './blogs/ocdBlogs';
import { emotionalHealthBlogs } from './blogs/emotionalHealthBlogs';
import { therapyBlogs } from './blogs/therapyBlogs';

export const blogs = [
  ...existingBlogs,
  ...adhdBlogs,
  ...anxietyBlogs,
  ...depressionBlogs,
  ...sleepBlogs,
  ...crisisBlogs,
  ...ocdBlogs,
  ...emotionalHealthBlogs,
  ...therapyBlogs,
];

// Helper: get blog by slug
export const getBlogBySlug = (slug) => blogs.find((b) => b.slug === slug) || null;

// Helper: get blogs by category
export const getBlogsByCategory = (category) =>
  category === 'All' ? blogs : blogs.filter((b) => b.category === category);

// All unique categories in user-friendly order
const categoryPriority = [
  'All',
  'Anxiety',
  'ADHD',
  'Depression',
  'Sleep',
  'Therapy & Treatment',
  'Emotional Health',
  'OCD',
  'Crisis Support',
  'ThoughtPro',
  'MiniMinds',
  'HerMind',
  'LES',
];
const discoveredCategories = Array.from(new Set(blogs.map((b) => b.category)));

export const blogCategories = [
  'All',
  ...categoryPriority.filter((c) => c !== 'All' && discoveredCategories.includes(c)),
  ...discoveredCategories.filter((c) => !categoryPriority.includes(c)),
];
