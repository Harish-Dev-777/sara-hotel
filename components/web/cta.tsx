'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const CTA = () => {
    return (
        <section className="pb-24 pt-12 px-6 relative z-20">
            <div className="max-w-5xl mx-auto py-20 md:py-24 relative overflow-hidden bg-black text-white rounded-[2.5rem] shadow-2xl">
                {/* Ambient Background Glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-slate-800/30 blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-slate-900/30 blur-[100px]" />
                </div>

                <div className="max-w-3xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                        className="flex flex-col items-center"
                    >
                        <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-slate-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                            Reserve Now
                        </span>
                        
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
                            Ready to Experience <br className="hidden md:block" />
                            <span className="italic font-normal text-slate-400">True Luxury?</span>
                        </h2>
                        
                        <p className="text-base md:text-lg text-slate-400 mb-10 max-w-xl mx-auto font-medium">
                            Book your stay today and discover a new standard of comfort and elegance.
                        </p>
                        
                        <Link href="/contact" className="contents">
                            <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold text-base md:text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]">
                                <span className="relative z-10 flex items-center gap-2">
                                    Book Your Stay
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
