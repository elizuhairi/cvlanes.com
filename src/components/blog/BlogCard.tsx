'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from 'next-share';
import Card from '@/components/Card';
import { useTheme } from '@/context/ThemeContext';

interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    description: string;
    image: string;
    publishedDate: string;
    readTime: string;
    tags: string[];
  };
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  const variant = index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'tertiary';
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';
  
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full w-full"
    >
      <Card variant={variant} className="overflow-hidden h-full w-full transform-gpu">
        <article className="group relative h-full flex flex-col">
          <Link href={`/blog/${post.slug}`} className="block flex-grow">
            <div className="relative h-52 -mx-8 -mt-8 mb-6 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 transform-gpu group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
              <motion.div 
                className={`absolute inset-0 ${
                  isLight 
                    ? 'bg-gradient-to-t from-gray-800/40 to-transparent' 
                    : 'bg-gradient-to-t from-black/80 to-transparent'
                }`}
                initial={{ opacity: 0.6 }}
                whileHover={{ opacity: 0.8 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.slice(0, 2).map((tag, idx) => (
                    <motion.span 
                      key={idx}
                      className={`px-2 py-1 ${
                        isLight 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-primary/20 text-primary'
                      } rounded-full text-xs backdrop-blur-sm`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2 text-primary group-hover:text-primary-hover transition-colors">{post.title}</h3>
              <p className={`${isLight ? 'text-gray-600' : 'text-theme opacity-70'} text-sm mb-3 flex items-center gap-4`}>
                <span>{post.publishedDate}</span>
                <span>•</span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  {post.readTime}
                </span>
              </p>
              <p className={`${isLight ? 'text-gray-700' : 'text-theme opacity-80'} line-clamp-2 mb-4 flex-grow`}>{post.description}</p>
              
              <div className="text-primary font-medium flex items-center mt-auto">
                <span className="group-hover:mr-1 transition-all duration-300">Read more</span>
                <motion.svg 
                  className="w-4 h-4 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  initial={{ x: 0 }}
                  animate={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </div>
            </div>
          </Link>
          
          <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <TwitterShareButton 
              url={`${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/blog/${post.slug}`}
              title={post.title}
            >
              <motion.div 
                className={`${isLight ? 'bg-white/70' : 'bg-theme/50'} backdrop-blur-sm p-2 rounded-full hover:bg-theme/70 transition-colors`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <TwitterIcon size={20} round />
              </motion.div>
            </TwitterShareButton>
            <LinkedinShareButton 
              url={`${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/blog/${post.slug}`}
              title={post.title}
            >
              <motion.div 
                className={`${isLight ? 'bg-white/70' : 'bg-theme/50'} backdrop-blur-sm p-2 rounded-full hover:bg-theme/70 transition-colors`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <LinkedinIcon size={20} round />
              </motion.div>
            </LinkedinShareButton>
          </div>
        </article>
      </Card>
    </motion.div>
  );
};

export default BlogCard; 