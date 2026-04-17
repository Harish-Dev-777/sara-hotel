'use client';

import Hero from '@/components/web/hero'
import Stats from '@/components/web/stats'
import ClickSpark from '@/components/ui/click-spark'
import Gallery from '@/components/web/gallery'
import CTA from '@/components/web/cta'
import Footer from '@/components/web/footer'
import { StaggerTestimonials } from '@/components/web/stagger-testimonials'
import { motion } from 'framer-motion'

const page = () => {
  return (
    <ClickSpark
      sparkColor='#000'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <main className="bg-background">
        <Hero/>
        <Stats/>
        
        {/* Testimonials Section */}
        <section className="py-24 overflow-hidden border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-4"
            >
              <span className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-xs font-bold tracking-widest uppercase">
                💬 Testimonials
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center relative">
                <span className="inline-block bg-gradient-to-r from-black via-slate-500 to-black bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  Stories from Our Guests
                </span>
              </h2>
            </motion.div>
          </div>
          
          <div className="w-full">
            <StaggerTestimonials />
          </div>
        </section>

        <Gallery/>
        <CTA/>
        <Footer/>
      </main>
    </ClickSpark>
  )
}

export default page