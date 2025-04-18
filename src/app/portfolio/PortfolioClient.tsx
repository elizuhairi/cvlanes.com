'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

interface PortfolioItem {
  title: string;
  type: string;
  desc: string;
  link: string;
  gradient: string;
  photo?: {
    url: string;
    author?: {
      name: string;
      username: string;
      link: string;
    };
  };
}

interface Props {
  items: PortfolioItem[];
}

export default function PortfolioClient({ items }: Props) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Navigation />

      <section className="min-h-screen pt-24">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="max-w-4xl mx-auto mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold mb-6"
            >
              Portfolio
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-300"
            >
              Exploring my journey through design leadership, team collaboration, and professional growth.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <Link href={item.link} className="block">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-1/2 h-64 md:h-96">
                        {item.photo ? (
                          <>
                            <Image
                              src={item.photo.url}
                              alt={item.title}
                              fill
                              className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                            {item.photo.author && (
                              <div className="absolute bottom-2 right-2 text-xs text-white/70">
                                Photo by{' '}
                                <a
                                  href={item.photo.author.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-white"
                                >
                                  {item.photo.author.name}
                                </a>
                                {' '}on{' '}
                                <a
                                  href="https://unsplash.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-white"
                                >
                                  Unsplash
                                </a>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <span className="text-gray-600">Image unavailable</span>
                          </div>
                        )}
                      </div>
                      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <span className={`text-sm font-medium bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-4`}>
                          {item.type}
                        </span>
                        <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-300 mb-6">
                          {item.desc}
                        </p>
                        <span className="inline-flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                          Learn more
                          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <footer className="bg-black/40 text-gray-400 py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Ali Al-Zuhairi. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}