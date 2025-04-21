import React from 'react';
import Navigation from '@/components/Navigation';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostClient from '@/components/blog/BlogPostClient';
import BlogContent from '@/components/blog/BlogContent';
import Card from '@/components/Card';
import { posts } from '../posts/data';
import BackgroundEffect from '@/components/hero/effects/BackgroundEffect';
import { ThemeProvider } from '@/context/ThemeContext';

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) return null;

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blog/${post.slug}`;

  return (
    <ThemeProvider>
      <BlogPostContent post={post} shareUrl={shareUrl} />
    </ThemeProvider>
  );
}

function BlogPostContent({ post, shareUrl }: { post: typeof posts[0], shareUrl: string }) {
  return (
    <main className="min-h-screen bg-theme text-theme overflow-hidden">
      <Navigation />

      <BlogPostBackground />

      <article className="pt-24 pb-16 relative">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <BlogPostClient shareUrl={shareUrl} title={post.title}>
            <BlogPostHeader
              title={post.title}
              description={post.description}
              publishedDate={post.publishedDate}
              readTime={post.readTime}
              author={post.author}
              tags={post.tags}
              image={post.image}
            />

            <BlogContent content={post.content} />

            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6 text-primary">About the Author</h3>
              <Card variant="primary">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-start to-end p-1">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src="/images/me/ali.png"
                        alt={post.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{post.author}</h4>
                    <p className="opacity-80">
                      Product Owner and Design Leader with expertise in UX design, agile methodologies, and creative innovation.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </BlogPostClient>
        </div>
      </article>

      <footer className="bg-theme text-theme opacity-70 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Ali Al-Zuhairi. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

// This component handles different background styling based on theme
function BlogPostBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-theme-light dark:hidden z-0">
        <div className="absolute inset-0 bg-gray-50/80"></div>
      </div>

      <div className="absolute inset-0 bg-theme-dark hidden dark:block z-0">
        <BackgroundEffect type="gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/20 pointer-events-none"></div>
      </div>
    </>
  );
}
