'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleScroll();
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navWidth = isMobile ? '90%' : (scrolled ? '40%' : '60%');

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
        className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6 px-4 pointer-events-none"
      >
        <motion.nav
          initial={false}
          animate={{
            width: navWidth,
          }}
          transition={{ type: "spring", bounce: 0.15, duration: 0.8 }}
          className="pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full bg-white/40 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] overflow-hidden"
        >
          {/* Logo / Brand */}
          <Link href="/" className="font-bold text-lg md:text-xl text-black shrink-0 whitespace-nowrap">
            Sara Hotel
          </Link>

          {/* Desktop Nav */}
          <div 
            className="hidden md:flex items-center gap-1 text-black font-medium text-sm relative"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, index) => (
              <Link 
                key={link.name}
                href={link.href} 
                onMouseEnter={() => setHoveredIndex(index)}
                className={`relative px-4 py-2 transition-colors duration-300 z-10 ${hoveredIndex === index ? 'text-white' : 'text-black/80 hover:text-black'}`}
              >
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-black rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Admin Login Button */}
          <div className="hidden md:block shrink-0">
            <Link href="/admin/login">
              <Button className="bg-black text-white hover:bg-black/80 rounded-full px-6 py-2.5 h-auto text-sm font-medium">
                Admin Login
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Icon */}
          <button
            title="Menu"
            aria-label="Toggle menu"
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[6px] z-50 relative shrink-0 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-6 h-[2px] bg-black rounded-full block"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-6 h-[2px] bg-black rounded-full block"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-6 h-[2px] bg-black rounded-full block"
            />
          </button>
        </motion.nav>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-[2rem] p-8 z-40 flex flex-col items-center gap-6 md:hidden"
          >
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-black font-semibold text-xl hover:text-black/60">Home</Link>
            <Link href="/rooms" onClick={() => setMenuOpen(false)} className="text-black font-semibold text-xl hover:text-black/60">Rooms</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="text-black font-semibold text-xl hover:text-black/60">About</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="text-black font-semibold text-xl hover:text-black/60">Contact</Link>
            
            <Link href="/admin/login" onClick={() => setMenuOpen(false)} className="w-full">
              <Button className="bg-black text-white hover:bg-black/80 rounded-full px-8 py-6 text-lg mt-4 w-full">
                Admin Login
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;