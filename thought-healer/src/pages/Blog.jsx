import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { blogs, blogCategories } from '../data/blogs';
import BlogImage from '../components/BlogImage';

const categoryColors = {
  ADHD:                  'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Anxiety:               'bg-sky-500/20 text-sky-400 border-sky-500/30',
  Depression:            'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  Sleep:                 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  'Crisis Support':      'bg-red-500/20 text-red-400 border-red-500/30',
  OCD:                   'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
  'Emotional Health':    'bg-rose-500/20 text-rose-400 border-rose-500/30',
  'Therapy & Treatment': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  ThoughtPro:            'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  MiniMinds:             'bg-orange-500/20 text-orange-400 border-orange-500/30',
  HerMind:               'bg-pink-500/20 text-pink-400 border-pink-500/30',
  LES:                   'bg-purple-500/20 text-purple-400 border-purple-500/30',
  All:                   'bg-white/10 text-white border-white/20',
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: blogs.length };
    blogs.forEach((b) => {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered blogs based on Category & Search query
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return blogs.filter((b) => {
      const matchesCategory = activeCategory === 'All' || b.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        (b.tags && b.tags.some((t) => t.toLowerCase().includes(q)))
      );
    });
  }, [activeCategory, searchQuery]);

  const featured = !searchQuery.trim() && activeCategory === 'All' ? blogs.find((b) => b.featured) : null;
  const rest = filtered.filter((b) => !featured || b.id !== featured.id);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'ThoughtHealer Blog',
    url: 'https://thoughthealer.org/blog',
    description: 'Expert-written articles on mental health, ADHD, anxiety, depression, sleep health, child psychology, and women\'s wellbeing by ThoughtHealer.',
    publisher: {
      '@type': 'Organization',
      name: 'ThoughtHealer',
      logo: 'https://thoughthealer.org/favicon.png',
    },
    blogPost: blogs.map((b) => ({
      '@type': 'BlogPosting',
      headline: b.title,
      url: `https://thoughthealer.org/blog/${b.slug}`,
      datePublished: b.date,
      author: { '@type': 'Organization', name: 'ThoughtHealer Team' },
      image: `https://thoughthealer.org${b.image}`,
      description: b.excerpt,
    })),
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900">
      <SEOHead
        title="Mental Health & Clinical Wellness Blog — ThoughtHealer"
        description="Comprehensive, evidence-based articles on ADHD, anxiety, depression, insomnia, workplace burnout, child psychology, and women's mental health."
        canonical="https://thoughthealer.org/blog"
        schema={blogSchema}
      />
      <Header />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
        <div className="absolute inset-0 bg-neural-pattern bg-repeat opacity-5" />
        <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-secondary-500/10 blur-3xl" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <span className="inline-block bg-primary-500/20 text-primary-400 border border-primary-500/30 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Clinical Mental Health Library
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-4 leading-tight">
            Insights for a <span className="gradient-text">Healthier Mind</span>
          </h1>
          <p className="text-dark-300 text-lg max-w-2xl mx-auto mb-8">
            Expert-reviewed guides on ADHD, anxiety, depression, sleep health, child psychology, and emotional wellbeing — written by ThoughtHealer clinicians.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="relative flex items-center">
              <i className="fas fa-search absolute left-4 text-dark-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by symptom, condition, or keyword (e.g. adhd, insomnia, overthinking)..."
                className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-dark-800/90 border border-dark-700 text-white placeholder-dark-400 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all shadow-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-dark-400 hover:text-white p-1"
                  aria-label="Clear search"
                >
                  <i className="fas fa-times text-sm" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Filter ────────────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-white/95 dark:bg-dark-900/95 backdrop-blur-sm border-b border-dark-100 dark:border-dark-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            {blogCategories.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-primary-500 text-white border-primary-500 shadow-md shadow-primary-500/20'
                      : 'text-dark-600 dark:text-dark-300 border-dark-200 dark:border-dark-600 hover:border-primary-400 hover:text-primary-500 dark:hover:text-primary-400'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-xs px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-dark-100 dark:bg-dark-700 text-dark-500 dark:text-dark-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-6 py-12">
        {/* Search Results Summary */}
        {searchQuery.trim() && (
          <div className="mb-8 flex items-center justify-between">
            <p className="text-dark-600 dark:text-dark-300 text-sm">
              Showing <span className="font-semibold text-dark-900 dark:text-white">{filtered.length}</span> results for &ldquo;<span className="text-primary-500 font-medium">{searchQuery}</span>&rdquo;
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-primary-500 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        {/* ── Featured Post (only when no search query and All category) ──────────────── */}
        {featured && (
          <div className="mb-14">
            <p className="text-xs font-semibold text-primary-500 uppercase tracking-widest mb-4">Featured Article</p>
            <Link to={`/blog/${featured.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl border border-dark-100 dark:border-dark-700 hover:shadow-primary-500/10 transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <BlogImage
                    src={featured.image}
                    alt={featured.title}
                    slug={featured.slug}
                    category={featured.category}
                    aspect="h-64 md:h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-900/30 pointer-events-none" />
                  <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full border z-10 ${categoryColors[featured.category] || categoryColors.All}`}>
                    {featured.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-8 md:p-10 bg-white dark:bg-dark-800">
                  <div className="flex items-center gap-3 text-dark-400 text-sm mb-3">
                    <span>{featured.dateFormatted}</span>
                    <span>·</span>
                    <span>{featured.readTime}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-dark-900 dark:text-white mb-3 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-6 line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xs font-bold">TH</div>
                      <span className="text-sm text-dark-600 dark:text-dark-300">{featured.author}</span>
                    </div>
                    <span className="text-primary-500 dark:text-primary-400 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read article <i className="fas fa-arrow-right text-xs" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ── Blog Grid ─────────────────────────────────────────── */}
        {rest.length > 0 ? (
          <>
            {activeCategory === 'All' && !searchQuery.trim() && (
              <p className="text-xs font-semibold text-dark-400 uppercase tracking-widest mb-6">
                All Articles ({blogs.length})
              </p>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {rest.map((blog) => (
                <Link key={blog.id} to={`/blog/${blog.slug}`} className="group block">
                  <article className="rounded-xl overflow-hidden border border-dark-100 dark:border-dark-700 bg-white dark:bg-dark-800 shadow-md hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <BlogImage
                        src={blog.image}
                        alt={blog.title}
                        slug={blog.slug}
                        category={blog.category}
                        aspect="h-48"
                      />
                      <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border z-10 ${categoryColors[blog.category] || categoryColors.All}`}>
                        {blog.category}
                      </span>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
                        <span>{blog.dateFormatted}</span>
                        <span>·</span>
                        <span>{blog.readTime}</span>
                      </div>
                      <h3 className="font-display font-bold text-dark-900 dark:text-white text-lg mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors leading-snug line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-dark-500 dark:text-dark-400 text-sm leading-relaxed line-clamp-3 flex-1">
                        {blog.excerpt}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs bg-dark-100 dark:bg-dark-700 text-dark-500 dark:text-dark-400 px-2.5 py-0.5 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-dark-500 dark:text-dark-400">
            <i className="fas fa-search text-4xl mb-4 text-primary-400" />
            <p className="text-lg font-medium text-dark-900 dark:text-white">No articles found</p>
            <p className="text-sm mt-2 max-w-md mx-auto">
              {searchQuery
                ? `No articles matched "${searchQuery}". Try different keywords or select a different category.`
                : `No articles currently available in ${activeCategory}.`}
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors shadow-md"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ── Newsletter CTA ────────────────────────────────────── */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 p-8 md:p-12 text-center text-white shadow-xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Get Mental Wellness Insights Weekly</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Join thousands of professionals receiving expert-backed mental health tips, app updates, and exclusive clinical guides — every week.
          </p>
          <Link
            to="/#contact"
            className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-full hover:bg-primary-50 transition-colors shadow-lg"
          >
            Stay Updated →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
