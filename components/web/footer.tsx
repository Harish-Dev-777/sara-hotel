'use client';

import React from 'react';
import { footerData } from '@/data/footer';

export const Footer = () => {
    return (
        <footer className="relative bg-background pt-32 pb-8 overflow-hidden border-t border-black/10">
            {/* Top Container */}
            <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col lg:flex-row justify-between gap-16 lg:gap-32 mb-20">
                
                {/* Left Side: Brand, Bio & Copyright */}
                <div className="max-w-md flex flex-col justify-between h-full min-h-[250px]">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2.5">
                            {/* A sleek minimal monogram */}
                            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-serif text-sm font-bold">
                                S
                            </div>
                            <span className="text-xl font-bold tracking-tight text-black font-serif uppercase">
                                sara hotel
                            </span>
                        </div>
                        
                        <p className="text-slate-500 text-sm leading-[1.8] font-medium">
                            {footerData.about}
                        </p>
                    </div>

                    <div className="mt-16 lg:mt-0">
                        <p className="text-xs text-slate-400 font-medium leading-relaxed">
                            {footerData.bottomLine}
                        </p>
                    </div>
                </div>

                {/* Right Side: Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 sm:gap-16 lg:gap-24">
                    {footerData.columns.map((col, i) => (
                        <div key={i} className="flex flex-col gap-6 lg:gap-8">
                            <h4 className="text-sm font-semibold text-slate-400">
                                {col.title}
                            </h4>
                            <ul className="flex flex-col gap-4">
                                {col.links.map((link, j) => (
                                    <li key={j}>
                                        <a href={link.href} className="text-sm font-medium text-slate-700 hover:text-black transition-colors">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Giant Monolithic Bottom Text */}
            <div className="w-full flex justify-center pointer-events-none select-none overflow-hidden translate-y-[15%] px-4">
                <span className="text-[14vw] leading-[0.8] font-bold tracking-tight whitespace-nowrap font-sans bg-gradient-to-b from-black/20 to-black/5 bg-clip-text text-transparent">
                    SARA HOTEL
                </span>
            </div>
        </footer>
    );
};

export default Footer;
