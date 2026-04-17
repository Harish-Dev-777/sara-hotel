'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ClickSpark from '@/components/ui/click-spark';
import Footer from '@/components/web/footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Diamond, MapPin, UserCheck, Sparkles, Clock } from 'lucide-react';

const features = [
  {
    title: "Elegant & Modern Rooms",
    icon: Sparkles,
    description: "Designed with impeccable taste, offering a sanctuary of calm and luxury."
  },
  {
    title: "Prime Location",
    icon: MapPin,
    description: "Situated in the heart of Chennai, placing you steps away from business and cultural hubs."
  },
  {
    title: "Personalized Guest Experience",
    icon: UserCheck,
    description: "Our dedicated staff anticipates your needs to ensure a flawless and memorable stay."
  },
  {
    title: "Premium Amenities",
    icon: Diamond,
    description: "From world-class dining to rejuvenating spa services, enjoy the absolute best we have to offer."
  },
  {
    title: "24/7 Support",
    icon: Clock,
    description: "Round-the-clock concierges and continuous room service directly at your fingertips."
  }
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
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function AboutPage() {
  return (
    <ClickSpark
      sparkColor="#1e293b"
      sparkSize={6}
      sparkRadius={20}
      sparkCount={6}
      duration={600}
    >
      <main className="min-h-screen pt-32 bg-[#FDFDFD] text-slate-900">
        
        {/* Intro Section */}
        <section className="max-w-4xl mx-auto px-6 mb-32 flex flex-col items-center text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
            >
                <span className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-xs font-bold tracking-widest uppercase mb-6">
                    About Us
                </span>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-center relative mb-8">
                    <span className="inline-block bg-gradient-to-r from-slate-900 via-slate-400 to-slate-900 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                        Redefining Hospitality
                    </span>
                    <br />
                    <span className="italic font-light text-slate-400">with Elegance</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
                    Sara Hotel was created with a simple vision - to offer more than just a place to stay. We bring together modern design, refined comfort, and personalized service to create an experience that feels both luxurious and deeply personal.
                </p>
            </motion.div>
        </section>

        {/* Story and Mission Section - Editorial Layout */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
                {/* Our Story */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-[1px] w-12 bg-slate-300" />
                        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400">Our Story</h2>
                    </div>
                    <p className="text-2xl md:text-3xl font-medium leading-normal text-slate-800">
                        What started as a passion for hospitality has grown into a destination loved by travelers seeking comfort, style, and authenticity. <br/><br/>
                        <span className="text-slate-400">Every corner of our hotel reflects attention to detail and a commitment to excellence.</span>
                    </p>
                </motion.div>

                {/* Mission */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="md:mt-24 p-8 md:p-12 bg-slate-50 rounded-[2.5rem] border border-slate-100"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-[1px] w-12 bg-emerald-300" />
                        <h2 className="text-sm font-bold tracking-widest uppercase text-emerald-600">Mission</h2>
                    </div>
                    <p className="text-xl md:text-2xl font-medium leading-relaxed text-slate-700 italic">
                        "To deliver exceptional guest experiences through thoughtful design, warm service, and world-class amenities."
                    </p>
                </motion.div>
            </div>
        </section>

        {/* Why Choose Us */}
        <section className="max-w-7xl mx-auto px-6 mb-40">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center mb-16 text-center"
            >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                    Why Choose Us
                </h2>
                <div className="h-1 w-20 bg-slate-200 rounded-full" />
            </motion.div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {features.map((feature, i) => (
                    <motion.div key={i} variants={itemVariants} className={i === features.length - 1 ? "lg:col-start-2" : ""}>
                        <Card className="h-full bg-white/50 backdrop-blur-sm border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[2rem] p-4">
                            <CardHeader>
                                <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
                                </div>
                                <CardTitle className="text-xl font-semibold text-slate-800">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-500 leading-relaxed">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </section>

        <Footer />
      </main>
    </ClickSpark>
  );
}
