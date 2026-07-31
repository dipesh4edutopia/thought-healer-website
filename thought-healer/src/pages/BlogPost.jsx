import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { getBlogBySlug, blogs } from '../data/blogs';
import BlogImage from '../components/BlogImage';


// ── Reading Progress Bar ─────────────────────────────────────────────────────
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      setProgress(height > 0 ? Math.round((scrolled / height) * 100) : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-dark-200 dark:bg-dark-700">
      <div
        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// ── FAQ Accordion ────────────────────────────────────────────────────────────
const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-dark-100 dark:border-dark-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center justify-between p-5 bg-white dark:bg-dark-800 hover:bg-dark-50 dark:hover:bg-dark-750 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-dark-900 dark:text-white pr-4">{question}</span>
        <i className={`fas fa-chevron-down text-primary-500 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

// ── Category color map ───────────────────────────────────────────────────────
const categoryColors = {
  ThoughtPro: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  MiniMinds:  'bg-orange-500/20 text-orange-400 border-orange-500/30',
  HerMind:    'bg-pink-500/20 text-pink-400 border-pink-500/30',
  LES:        'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

// ── Product CTA Banner Data Map ──────────────────────────────────────────────
const productCtas = {
  HerMind: {
    name: 'HerMind',
    icon: 'fa-spa',
    gradient: 'from-pink-600 via-rose-500 to-purple-600',
    title: 'Take the First Step with HerMind',
    description: 'HerMind is a specialized mental health platform for women — mood tracking, hormonal wellness insights, CBT exercises, and licensed female therapists.',
    buttonText: 'Start Free HerMind Assessment →',
    buttonUrl: '/hermind',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.hermind',
    buttonTextColor: 'text-pink-600',
  },
  MiniMinds: {
    name: 'MiniMinds',
    icon: 'fa-child',
    gradient: 'from-amber-600 via-orange-500 to-rose-600',
    title: 'Support Your Child with MiniMinds',
    description: 'MiniMinds provides developmental tracking, behavioral guidance, and pediatric mental health support for parents and educators.',
    buttonText: 'Explore MiniMinds for Kids →',
    buttonUrl: '/miniminds',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.syneptlabs.miniminds',
    buttonTextColor: 'text-orange-600',
  },
  LES: {
    name: 'LES',
    icon: 'fa-graduation-cap',
    gradient: 'from-purple-600 via-indigo-500 to-blue-600',
    title: 'Empower Learning with LES',
    description: 'Structured, evidence-based support for ADHD, Dyslexia, Dysgraphia, and learning differences.',
    buttonText: 'Explore LES Platform →',
    buttonUrl: '/les',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.syneptlabs.lesapp',
    buttonTextColor: 'text-purple-600',
  },
  ThoughtPro: {
    name: 'ThoughtPro',
    icon: 'fa-brain',
    gradient: 'from-primary-600 via-primary-500 to-secondary-600',
    title: 'Take the First Step with ThoughtPro',
    description: 'ThoughtPro is a digital mental health platform built for working professionals — stress monitoring, mood tracking, licensed therapists, and personalized wellness plans.',
    buttonText: 'Start Free Wellbeing Assessment →',
    buttonUrl: '/thoughtpro',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.thoughtpro',
    buttonTextColor: 'text-primary-600',
  },
};

// ── Main Component ───────────────────────────────────────────────────────────
const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const blog = getBlogBySlug(slug);

  useEffect(() => {
    if (!blog) navigate('/blog', { replace: true });
    window.scrollTo(0, 0);
  }, [blog, navigate]);

  if (!blog) return null;

  const currentCta = productCtas[blog.app] || productCtas[blog.category] || productCtas.ThoughtPro;


  // Related posts (same category, excluding current)
  const related = blogs.filter((b) => b.category === blog.category && b.slug !== slug).slice(0, 3);

  // Article JSON-LD schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: `https://thoughthealer.org${blog.image}`,
    datePublished: blog.date,
    dateModified: blog.date,
    author: {
      '@type': 'Organization',
      name: 'ThoughtHealer Team',
      url: 'https://thoughthealer.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ThoughtHealer',
      logo: { '@type': 'ImageObject', url: 'https://thoughthealer.org/favicon.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://thoughthealer.org/blog/${blog.slug}` },
    keywords: blog.tags.join(', '),
    ...(blog.faq && {
      '@type': ['Article', 'FAQPage'],
      mainEntity: blog.faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    }),
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900">
      <ReadingProgress />
      <SEOHead
        title={`${blog.title} | ThoughtHealer Blog`}
        description={blog.excerpt}
        canonical={`https://thoughthealer.org/blog/${blog.slug}`}
        ogType="article"
        schema={articleSchema}
      />
      <Header />

      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <div className="relative pt-20 min-h-[420px] md:min-h-[500px] flex items-end bg-gradient-to-br from-[#0a1628] via-[#1a2340] to-[#0f172a] overflow-hidden">
        {/* Background custom vector illustration */}
        <div className="absolute inset-0 w-full h-full opacity-35 pointer-events-none">
          <BlogImage src="" alt="" slug={blog.slug} category={blog.category} aspect="h-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-secondary-500/10 blur-3xl pointer-events-none" />



        <div className="relative z-10 container mx-auto px-4 md:px-6 pb-12 pt-32">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-dark-400 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary-400 transition-colors">Home</Link>
            <i className="fas fa-chevron-right text-xs" />
            <Link to="/blog" className="hover:text-primary-400 transition-colors">Blog</Link>
            <i className="fas fa-chevron-right text-xs" />
            <span className="text-dark-300 truncate max-w-[200px]">{blog.shortTitle || blog.title}</span>
          </nav>

          {/* Category + reading time */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[blog.category]}`}>
              {blog.category}
            </span>
            <span className="text-dark-400 text-sm flex items-center gap-1.5">
              <i className="fas fa-clock text-xs" /> {blog.readTime}
            </span>
            <span className="text-dark-400 text-sm flex items-center gap-1.5">
              <i className="fas fa-calendar-alt text-xs" /> {blog.dateFormatted}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight max-w-4xl">
            {blog.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3 mt-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm">TH</div>
            <div>
              <p className="text-white font-medium text-sm">{blog.author}</p>
              <p className="text-dark-400 text-xs">{blog.authorRole}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Article Content ──────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {blog.tags.map((tag) => (
              <span key={tag} className="text-xs bg-dark-100 dark:bg-dark-800 text-dark-500 dark:text-dark-400 px-3 py-1 rounded-full border border-dark-200 dark:border-dark-700">
                #{tag}
              </span>
            ))}
          </div>

          {/* Blog content rendered from HTML */}
          <div
            className="blog-content prose-custom"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* ── Disclaimer ───────────────────────────────────────── */}
          <div className="mt-10 p-4 bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 rounded-xl text-sm text-dark-500 dark:text-dark-400 italic">
            <i className="fas fa-info-circle text-primary-400 mr-2" />
            This article is for informational purposes only and does not constitute medical or psychological advice. If you are experiencing a mental health crisis, please contact a qualified mental health professional or emergency services.
          </div>

          {/* ── Product App CTA ───────────────────────────────────── */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl">
            <div className={`bg-gradient-to-br ${currentCta.gradient} p-8 md:p-10 text-white text-center`}>
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/20">
                <i className={`fas ${currentCta.icon} text-2xl text-white`} />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">{currentCta.title}</h2>
              <p className="text-white/90 mb-6 max-w-lg mx-auto leading-relaxed">
                {currentCta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to={currentCta.buttonUrl}
                  className={`bg-white ${currentCta.buttonTextColor} font-semibold px-8 py-3 rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl`}
                >
                  {currentCta.buttonText}
                </Link>
                <a
                  href={currentCta.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 border border-white/30 text-white font-medium px-8 py-3 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  <i className="fab fa-google-play text-lg" />
                  <span>Download {currentCta.name} App</span>
                </a>
              </div>
            </div>
          </div>


          {/* ── FAQ Section ───────────────────────────────────────── */}
          {blog.faq && blog.faq.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-dark-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {blog.faq.map((item, i) => (
                  <FaqItem key={i} question={item.question} answer={item.answer} />
                ))}
              </div>
            </div>
          )}

          {/* ── Share ─────────────────────────────────────────────── */}
          <div className="mt-14 pt-8 border-t border-dark-100 dark:border-dark-700">
            <p className="text-sm font-semibold text-dark-500 dark:text-dark-400 mb-3">Share this article</p>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent('https://thoughthealer.org/blog/' + blog.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Twitter"
                className="w-10 h-10 rounded-full bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 flex items-center justify-center text-dark-500 dark:text-dark-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all"
              >
                <i className="fab fa-twitter text-sm" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://thoughthealer.org/blog/' + blog.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="w-10 h-10 rounded-full bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 flex items-center justify-center text-dark-500 dark:text-dark-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all"
              >
                <i className="fab fa-linkedin-in text-sm" />
              </a>
              <button
                onClick={() => navigator.clipboard?.writeText('https://thoughthealer.org/blog/' + blog.slug)}
                aria-label="Copy link"
                className="w-10 h-10 rounded-full bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 flex items-center justify-center text-dark-500 dark:text-dark-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all"
              >
                <i className="fas fa-link text-sm" />
              </button>
            </div>
          </div>

          {/* ── Back to Blog ──────────────────────────────────────── */}
          <div className="mt-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary-500 dark:text-primary-400 font-medium hover:gap-3 transition-all"
            >
              <i className="fas fa-arrow-left text-sm" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>

      {/* ── Related Posts ────────────────────────────────────────── */}
      {related.length > 0 && (
        <div className="bg-dark-50 dark:bg-dark-800/50 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-display font-bold text-dark-900 dark:text-white mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
                  <div className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden border border-dark-100 dark:border-dark-700 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="h-40 overflow-hidden">
                      <BlogImage
                        src={post.image}
                        alt={post.title}
                        slug={post.slug}
                        category={post.category}
                        aspect="h-40"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-primary-500 font-medium mb-1">{post.category} · {post.readTime}</p>
                      <h3 className="font-semibold text-dark-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;
