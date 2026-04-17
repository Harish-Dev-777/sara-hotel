'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CountUp = ({ end, decimals = 0, duration = 2 }: { end: number, decimals?: number, duration?: number }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            // 60fps assumption
            const totalFrames = duration * 60;
            let frame = 0;
            
            const timer = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                // ease out expo
                const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                
                const current = end * easeOut;
                
                if (frame >= totalFrames) {
                    clearInterval(timer);
                    setCount(end);
                } else {
                    setCount(current);
                }
            }, 1000 / 60);
            
            return () => clearInterval(timer);
        }
    }, [isInView, end, duration]);

    return <span ref={ref}>{count.toFixed(decimals)}</span>;
};

const Stats = () => {
    return (
        <section className="bg-background py-20 px-6 sm:px-10 lg:px-20 border-t border-slate-100">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                
                {/* Shiny Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center mb-16 relative">
                        <span className="inline-block bg-gradient-to-r from-black via-slate-500 to-black bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                            Trusted by Travelers Worldwide
                        </span>
                    </h2>
                </motion.div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full mb-16">
                    {/* Stat 1 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="flex flex-col items-center justify-center p-8 bg-black rounded-3xl shadow-2xl border border-white/10"
                    >
                        <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                            <CountUp end={4.8} decimals={1} duration={2} /><span className="text-3xl text-slate-400">/5</span>
                        </div>
                        <div className="text-slate-400 font-medium text-center uppercase tracking-widest text-xs">Average Rating</div>
                    </motion.div>

                    {/* Stat 2 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col items-center justify-center p-8 bg-black rounded-3xl shadow-2xl border border-white/10"
                    >
                        <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                            <CountUp end={500} duration={2} /><span className="text-white/50">+</span>
                        </div>
                        <div className="text-slate-400 font-medium text-center uppercase tracking-widest text-xs">Happy Guests</div>
                    </motion.div>

                    {/* Stat 3 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col items-center justify-center p-8 bg-black rounded-3xl shadow-2xl border border-white/10"
                    >
                        <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                            <CountUp end={25} duration={2.5} /><span className="text-white/50">+</span>
                        </div>
                        <div className="text-slate-400 font-medium text-center uppercase tracking-widest text-xs">Guests Countries</div>
                    </motion.div>

                    {/* Stat 4 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col items-center justify-center p-8 bg-black rounded-3xl shadow-2xl border border-white/10"
                    >
                        <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                            <CountUp end={5} duration={1.5} /><span className="text-white/50">+</span>
                        </div>
                        <div className="text-slate-400 font-medium text-center uppercase tracking-widest text-xs">Years of Excellence</div>
                    </motion.div>
                </div>

                {/* Footer / Logos Line */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-8 flex items-center justify-center text-center"
                >
                    <p className="text-sm md:text-base font-medium text-slate-400 max-w-lg mx-auto tracking-widest uppercase">
                        Featured in leading travel platforms & luxury lifestyle magazines
                    </p>
                </motion.div>
                
            </div>
        </section>
    );
};

export default Stats;
