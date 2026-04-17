'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ClickSpark from '@/components/ui/click-spark';
import Footer from '@/components/web/footer';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

import Link from 'next/link';
import { rooms } from '@/data/rooms';

export default function RoomsPage() {
  return (
    <ClickSpark
      sparkColor="#1e293b"
      sparkSize={6}
      sparkRadius={20}
      sparkCount={6}
      duration={600}
    >
      <main className="min-h-screen pt-32 bg-background text-black">
        
        {/* Header Section */}
        <section className="max-w-4xl mx-auto px-6 mb-24 flex flex-col items-center text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex flex-col items-center"
            >
                <span className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-xs font-bold tracking-widest uppercase mb-6">
                    Our Rooms
                </span>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-center relative mb-6">
                    <span className="inline-block bg-gradient-to-r from-black via-slate-500 to-black bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                        Find Your Perfect Room
                    </span>
                </h1>
                <p className="text-lg md:text-2xl text-slate-400 font-light italic max-w-2xl">
                    Designed for comfort. Crafted for luxury.
                </p>
            </motion.div>
        </section>

        {/* Room Listings Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32 flex flex-col gap-24 lg:gap-32">
            {rooms.map((room, index) => {
                const isEven = index % 2 === 0;

                return (
                    <div 
                        key={index} 
                        className={cn(
                            "flex flex-col gap-10 lg:gap-16 items-center",
                            isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                        )}
                    >
                        <Link href={`/rooms/${room.id}`} className="w-full lg:w-1/2 block">
                            <motion.div 
                                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="relative group rounded-[2rem] overflow-hidden"
                                style={{ aspectRatio: '4/3' }}
                            >
                                <Image
                                    src={room.image}
                                    alt={room.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                                    <div className="w-12 h-12 rounded-full bg-white/20 border border-white/40 flex items-center justify-center backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <ArrowRight className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-white font-bold text-sm tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                        View Details
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                            </motion.div>
                        </Link>

                        {/* Content Half */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="w-full lg:w-1/2 flex flex-col"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                                {room.title}
                            </h2>
                            <p className="text-lg text-black/60 font-medium leading-relaxed mb-8 max-w-lg">
                                {room.description}
                            </p>

                            {/* Features Grid */}
                            <ul className="grid grid-cols-2 gap-4 mb-10">
                                {room.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm font-semibold text-black/70">
                                        <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center border border-black/10">
                                            <Check className="w-3 h-3 text-black" strokeWidth={3} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Pricing & CTA */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-8 border-t border-slate-100">
                                <div>
                                    <span className="text-xs font-bold tracking-widest text-slate-400 uppercase block mb-1">
                                        Starting From
                                    </span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-slate-800 font-bold text-2xl">₹</span>
                                        <span className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter">
                                            {room.price}
                                        </span>
                                        <span className="text-slate-400 font-medium">/night</span>
                                    </div>
                                </div>
                                
                                <Link 
                                    href={`/contact?room=${room.id}`}
                                    className="sm:ml-auto group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Book Now
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                );
            })}
        </section>

        <Footer />
      </main>
    </ClickSpark>
  );
}
