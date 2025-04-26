'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import QuoteBlock from '../ui/QuoteBlock';
import ChapterDivider from '../ui/ChapterDivider';
import ImageSection from '../ui/ImageSection';

interface BlogContentProps {
  content: string;
  slug: string;
}

// Helper function to convert markdown-style content to JSX
function formatContent(content: string, slug: string, theme: string) {
  // Apply the same styling to all blog posts
  return formatStylizedContent(content, theme);
}

// Renamed the primitive human formatter to a generic stylized formatter for all posts
function formatStylizedContent(content: string, theme: string) {
  const isLight = theme === 'light';
  
  // Split by sections - either chapters or major headings
  const splitPattern = /Chapter\s+|^##\s+/im;
  const hasSections = content.match(splitPattern);
  
  if (hasSections) {
    // For content with explicit chapter-like sections
    const parts = content.split(splitPattern);
    const intro = parts[0];
    
    // Process introduction which includes the quote if present
    const introContent = processIntroduction(intro);
    
    // Process remaining chapters/sections
    const sections = parts.slice(1).map((section, index) => {
      // Extract section title and content
      const titleMatch = section.match(/^(.*?)\n/);
      const title = titleMatch ? titleMatch[1].trim() : `Section ${index + 1}`;
      const sectionContent = section.replace(/^.*?\n/, '').trim();
      
      // Process the section content
      const formattedContent = processChapterContent(sectionContent);
      
      return (
        <React.Fragment key={`section-${index}`}>
          <ChapterDivider title={title} number={index} id={`section-${index}`} />
          {formattedContent}
        </React.Fragment>
      );
    });
    
    return (
      <>
        {introContent}
        {sections}
      </>
    );
  } else {
    // For content without explicit sections, process as a whole
    return (
      <>
        {processIntroduction(content)}
      </>
    );
  }
}

// Create separate formatter functions to avoid Hook rules issues
function formatRegularContent(content: string) {
  return content.split('\n\n').map((block, index) => {
    const trimmedBlock = block.trim();
    
    // Headings
    if (trimmedBlock.startsWith('##') && !trimmedBlock.startsWith('###')) {
      return (
        <motion.h2 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold mt-10 mb-5 text-primary"
        >
          {trimmedBlock.replace('## ', '')}
        </motion.h2>
      );
    }
    
    if (trimmedBlock.startsWith('###')) {
      return (
        <motion.h3 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl font-semibold mt-8 mb-4 text-primary"
        >
          {trimmedBlock.replace('### ', '')}
        </motion.h3>
      );
    }
    
    // Lists
    if (trimmedBlock.startsWith('*')) {
      return (
        <motion.ul 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="list-disc pl-6 mb-6 space-y-2"
        >
          {trimmedBlock.split('\n').map((item, i) => (
            <li key={i} className="text-theme">
              {item.replace('* ', '')}
            </li>
          ))}
        </motion.ul>
      );
    }
    
    // Numbered points
    if (trimmedBlock.match(/^\d\./)) {
      return (
        <motion.div 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <strong className="text-primary">{trimmedBlock.split('\n')[0]}</strong>
          <p className="text-theme mt-2">{trimmedBlock.split('\n')[1]}</p>
        </motion.div>
      );
    }
    
    // Code blocks
    if (trimmedBlock.startsWith('```')) {
      const code = trimmedBlock.replace(/```(.*)\n/, '').replace(/```$/, '');
      return (
        <motion.div 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <pre className="bg-theme/30 backdrop-blur-sm p-4 rounded-lg overflow-x-auto text-sm text-theme border border-primary/10">
            <code>{code}</code>
          </pre>
        </motion.div>
      );
    }
    
    // Blockquotes
    if (trimmedBlock.startsWith('>')) {
      return (
        <motion.blockquote 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="pl-4 border-l-4 border-primary italic my-6 text-lg text-theme"
        >
          {trimmedBlock.replace('> ', '')}
        </motion.blockquote>
      );
    }
    
    // Default paragraph
    return (
      <motion.p 
        key={index} 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mb-6 text-lg text-theme leading-relaxed"
      >
        {trimmedBlock}
      </motion.p>
    );
  });
}

// Process the introduction section of the AI blog
function processIntroduction(intro: string) {
  const lines = intro.split('\n\n');
  const title = lines[0].trim();
  const quoteLine = lines[1]?.trim() || '';
  const remainingContent = lines.slice(2).join('\n\n').trim();
  
  return (
    <>
      <motion.h1
        id="top"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold mb-10 text-center text-primary"
      >
        {title}
      </motion.h1>
      
      <QuoteBlock quote={quoteLine} author="Ali" />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl mx-auto mb-16"
      >
        <p className="text-lg text-theme leading-relaxed">
          {remainingContent}
        </p>
      </motion.div>
    </>
  );
}

// Process chapter content to enhance formatting
function processChapterContent(content: string) {
  const paragraphs = content.split('\n\n');
  
  return paragraphs.map((paragraph, index) => {
    if (!paragraph.trim()) return null;
    
    // Check if this is a subheading within a chapter
    if (paragraph.match(/^[A-Z][\w\s]+$/)) {
      return (
        <motion.h3
          key={`subhead-${index}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold mt-10 mb-6 text-primary"
        >
          {paragraph}
        </motion.h3>
      );
    }
    
    return (
      <motion.p
        key={`para-${index}`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mb-6 text-lg text-theme leading-relaxed max-w-3xl mx-auto"
      >
        {paragraph}
      </motion.p>
    );
  });
}

// Main component
const BlogContent: React.FC<BlogContentProps> = ({ content, slug }) => {
  const { theme } = useTheme();
  const [fullContent, setFullContent] = useState<React.ReactNode>([]);

  useEffect(() => {
    setFullContent(formatContent(content, slug, theme));
  }, [content, slug, theme]);

  return (
    <div className="max-w-4xl mx-auto px-4 pt-8 pb-16">
      {fullContent}
    </div>
  );
}

export default BlogContent; 