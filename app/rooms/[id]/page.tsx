'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getRoomById } from '@/data/rooms';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ClickSpark from '@/components/ui/click-spark';
import Footer from '@/components/web/footer';
import { 
    Users, 
    BedDouble, 
    Maximize2, 
    Eye, 
    Check, 
    ArrowLeft,
    ChevronRight,
    Wifi,
    Wind,
    Tv,
    Coffee,
    ShieldCheck,
    Utensils
} from 'lucide-react';
import Link from 'next/link';

export default function RoomDetailPage() {
    const params = useParams();
    const router = useRouter();
    const room = getRoomById(params.id as string);

    if (!room) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Room Not Found</h1>
                    <Link href="/rooms" className="text-slate-600 hover:text-black underline transition-colors">
                        Return to Rooms
                    </Link>
                </div>
            </div>
        );
    }

    const detailItems = [
        { label: "Guests", value: room.details.guests, icon: Users },
        { label: "Bed", value: room.details.bed, icon: BedDouble },
        { label: "Size", value: room.details.size, icon: Maximize2 },
        { label: "View", value: room.details.view, icon: Eye },
    ];

    return (
        <ClickSpark
            sparkColor="#1e293b"
            sparkSize={6}
            sparkRadius={20}
            sparkCount={6}
            duration={600}
        >
            <main className="min-h-screen bg-[#FDFDFD] text-slate-900 overflow-x-hidden">
                
                {/* Back Button & Breadcrumbs */}
                <div className="fixed top-24 left-6 z-50 hidden lg:block">
                     <button 
                        onClick={() => router.back()}
                        className="p-3 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm hover:scale-110 transition-transform group"
                     >
                        <ArrowLeft className="w-5 h-5 text-slate-700 group-hover:text-black" />
                     </button>
                </div>

                {/* Hero Feature Image */}
                <section className="relative w-full h-[60vh] md:h-[75vh] min-h-[500px]">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={room.image}
                            alt={room.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-7xl mx-auto flex flex-col items-start gap-4"
                        >
                            <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-widest uppercase">
                                Exclusive Stay
                            </span>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white">
                                {room.title}
                            </h1>
                        </motion.div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
                    
                    {/* Left & Middle Column (Details & Info) */}
                    <div className="lg:col-span-2 flex flex-col">
                        
                        {/* Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                            {detailItems.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-3 text-center"
                                >
                                    <item.icon className="w-6 h-6 text-slate-400" strokeWidth={1.5} />
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                                        <p className="text-sm font-semibold text-slate-900">{item.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Long Description */}
                        <div className="flex flex-col gap-8 mb-20">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Experience Excellence</h2>
                            <p className="text-xl text-slate-500 leading-relaxed font-medium">
                                {room.longDescription}
                            </p>
                        </div>

                        {/* Amenities Grid */}
                        <div className="flex flex-col gap-10">
                            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                Room Amenities
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
                                {room.amenities.map((amenity, i) => (
                                    <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-50">
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-slate-900" />
                                        </div>
                                        <span className="text-base font-semibold text-slate-700">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Sticky Booking Sidebar) */}
                    <div className="lg:sticky lg:top-32 flex flex-col gap-6">
                        <div className="p-8 md:p-10 rounded-[2.5rem] bg-black text-white shadow-2xl relative overflow-hidden">
                            {/* Accent Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800/20 blur-3xl rounded-full" />
                            
                            <div className="relative z-10 flex flex-col">
                                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4 block">Reservation Details</span>
                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-slate-400 font-bold text-2xl">₹</span>
                                    <span className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter">
                                        {room.price}
                                    </span>
                                    <span className="text-slate-400 font-medium">/night</span>
                                </div>

                                <div className="flex flex-col gap-4 mb-10">
                                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                                        <span className="text-slate-400 text-sm">Check-in</span>
                                        <span className="text-sm font-semibold">12:00 PM</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                                        <span className="text-slate-400 text-sm">Check-out</span>
                                        <span className="text-sm font-semibold">11:00 AM</span>
                                    </div>
                                </div>

                                <Link href={`/contact?room=${room.id}`} className="w-full">
                                    <button className="w-full group relative inline-flex items-center justify-center gap-2 px-8 py-5 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                                        <span className="relative z-10 flex items-center gap-2">
                                            Book Now
                                            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                        </span>
                                    </button>
                                </Link>
                                
                                <p className="mt-6 text-center text-xs text-slate-500 font-medium">Free cancellation up to 24 hours before check-in.</p>
                            </div>
                        </div>

                        {/* Support Card */}
                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col gap-4">
                            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Need Assistance?</h4>
                            <p className="text-slate-500 text-sm">Our world-class concierge is available 24/7 to assist with your reservation.</p>
                            <a href="tel:+919025937745" className="text-black font-bold text-sm hover:underline">+91 9025937745</a>
                        </div>
                    </div>

                </section>

                <Footer />
            </main>
        </ClickSpark>
    );
}
