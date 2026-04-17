'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const images = [
  { 
    src: '/room-images/presidential-suite-room.png', 
    alt: 'Presidential Suite', 
    className: 'md:col-span-2 md:row-span-2' 
  },
  { 
    src: '/room-images/suite-room.png', 
    alt: 'Luxury Suite', 
    className: 'md:col-span-1 md:row-span-1' 
  },
  { 
    src: '/room-images/family-room.png', 
    alt: 'Family Room', 
    className: 'md:col-span-1 md:row-span-1' 
  },
  { 
    src: '/room-images/delax-room.png', 
    alt: 'Deluxe Room', 
    className: 'md:col-span-1 md:row-span-1' 
  },
  { 
    src: '/room-images/junior-suite-room.png', 
    alt: 'Junior Suite', 
    className: 'md:col-span-1 md:row-span-1' 
  },
  { 
    src: '/room-images/superior-room.png', 
    alt: 'Superior Room', 
    className: 'md:col-span-2 md:row-span-1' 
  },
  { 
    src: '/room-images/standard-room.png', 
    alt: 'Standard Room', 
    className: 'md:col-span-1 md:row-span-1' 
  },
  { 
    src: '/room-images/garden-view-room.png', 
    alt: 'Garden View Room', 
    className: 'md:col-span-1 md:row-span-1' 
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const Gallery = () => {
  return (
    <section className="py-24 bg-[#FDFDFD] border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-xs font-bold tracking-widest uppercase">
            Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center relative">
            <span className="inline-block bg-gradient-to-r from-slate-900 via-slate-400 to-slate-900 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              A Glimpse Into Your Stay
            </span>
          </h2>
          <p className="text-slate-500 mt-2 text-center max-w-xl text-lg">
            Explore the elegance of our spaces - from luxurious rooms to serene outdoor experiences.
          </p>
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[220px]"
      >
        {images.map((image, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className={cn(
              "relative overflow-hidden flex rounded-3xl bg-slate-100 group cursor-pointer",
              image.className
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Minimalist Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl flex items-end p-6 md:p-8">
                <span className="text-white font-medium text-lg md:text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {image.alt}
                </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Gallery;
