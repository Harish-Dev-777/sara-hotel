'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import ClickSpark from '@/components/ui/click-spark';
import Footer from '@/components/web/footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { rooms } from '@/data/rooms';
import SuccessModal from '@/components/web/success-modal';
import { Mail, Phone, MapPin, Send, User, Users, Bed, MessageSquare } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

function ContactForm() {
  const searchParams = useSearchParams();
  const roomParam = searchParams.get('room');
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize with query param if it exists, otherwise empty string
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    roomtype: roomParam || '',
    guests: '',
    message: ''
  });

  // Auto-focus name field on mount
  useEffect(() => {
    if (nameInputRef.current) {
        nameInputRef.current.focus();
    }
  }, []);

  // Force sync if roomParam changes (e.g. user navigates between rooms)
  useEffect(() => {
    if (roomParam) {
        const matchedRoom = rooms.find(r => r.id === roomParam);
        if (matchedRoom) {
            setFormData(prev => ({ ...prev, roomtype: matchedRoom.id }));
        }
    }
  }, [roomParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    
    // Sanitize phone input: Allow only digits, +, -, and spaces
    if (id === 'phone') {
        const sanitized = value.replace(/[^\d+\-\s]/g, '');
        setFormData(prev => ({ ...prev, [id]: sanitized }));
        return;
    }

    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const createBooking = useMutation(api.bookings.create);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    console.log("Submitting formData:", formData);

    try {
      const result = await createBooking({
        name: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        roomType: formData.roomtype,
        guests: formData.guests,
        message: formData.message,
      });

      console.log("Mutation result:", result);

      setIsSubmitting(false);
      setIsModalOpen(true);
      // Reset the form fields
      setFormData({
        fullname: '',
        email: '',
        phone: '',
        roomtype: '',
        guests: '',
        message: ''
      });
    } catch (error: any) {
      console.error("Failed to submit booking:", error);
      setIsSubmitting(false);
      setError(error?.message || "Something went wrong. Please try again.");
    }
  };

  const contactOptions = [
    {
      title: "Address",
      content: "Chennai, Tamil Nadu",
      icon: MapPin,
      sub: "Visit our sanctuary"
    },
    {
      title: "Phone",
      content: "+91 9025946625",
      icon: Phone,
      sub: "Speak with our concierge"
    },
    {
      title: "Email",
      content: "stay@sarahotel.com",
      icon: Mail,
      sub: "Drop us a line"
    }
  ];

  return (
    <ClickSpark
      sparkColor="#1e293b"
      sparkSize={6}
      sparkRadius={20}
      sparkCount={6}
      duration={600}
    >
      <main className="min-h-screen pt-32 bg-background text-black overflow-x-hidden">
        
        {/* Header Section */}
        <section className="max-w-4xl mx-auto px-6 mb-24 flex flex-col items-center text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex flex-col items-center"
            >
                <span className="px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-black/60 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
                    Connect With Us
                </span>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-center relative max-w-3xl">
                    <span className="inline-block bg-gradient-to-r from-black via-slate-500 to-black bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                        Let’s Plan Your Perfect Stay
                    </span>
                </h1>
            </motion.div>
        </section>

        {/* Info Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactOptions.map((option, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-[2rem] bg-black text-white border border-white/10 flex flex-col items-center text-center gap-4 group hover:scale-[1.02] transition-all duration-500 shadow-2xl"
                    >
                        <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <option.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-1">{option.title}</h3>
                            <p className="text-lg font-bold text-white">{option.content}</p>
                            <p className="text-sm text-white/40 font-medium">{option.sub}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* Contact Form Section */}
        <section className="max-w-7xl mx-auto px-6 mb-40">
            <div className="grid lg:grid-cols-5 gap-16 items-start">
                
                {/* Visual Accent Column */}
                <div className="lg:col-span-2 hidden lg:flex flex-col gap-8">
                    <div className="aspect-[4/5] rounded-[3rem] bg-black relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 to-transparent z-10" />
                        <img 
                            src="/room-images/presidential-suite-room.png" 
                            alt="Luxury Stay" 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute bottom-10 left-10 z-20 text-white max-w-xs">
                            <h4 className="text-3xl font-bold tracking-tight mb-2">Dedicated to your comfort.</h4>
                            <p className="text-white/80 font-medium">Every inquiry is handled with the outmost care by our concierge team.</p>
                        </div>
                    </div>
                </div>

                {/* Form Column */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-3 bg-[#e5e5e5] p-8 md:p-12 rounded-[3.5rem] border-2 border-black shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]"
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label htmlFor="fullname" className="flex items-center gap-2">
                                    <User className="w-3.5 h-3.5" /> Full Name*
                                </Label>
                                <Input id="fullname" ref={nameInputRef} value={formData.fullname} onChange={handleChange} placeholder="Your Name" required className="bg-[#e5e5e5] border-2 border-black/20 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0 transition-all" />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5" /> Email Address
                                </Label>
                                <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="123@example.com" className="bg-[#e5e5e5] border-2 border-black/20 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0 transition-all" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label htmlFor="phone" className="flex items-center gap-2">
                                    <Phone className="w-3.5 h-3.5" /> Phone Number*
                                </Label>
                                <Input id="phone" value={formData.phone} onChange={handleChange} placeholder="+91 00000 00000" required className="bg-[#e5e5e5] border-2 border-black/20 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0 transition-all" />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="roomtype" className="flex items-center gap-2">
                                    <Bed className="w-3.5 h-3.5" /> Room Type*
                                </Label>
                                <Select 
                                    key={roomParam}
                                    value={formData.roomtype} 
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, roomtype: value }))}
                                >
                                    <SelectTrigger className="h-12 w-full rounded-2xl border-2 border-black/20 bg-[#e5e5e5] px-4 py-2 text-sm focus:ring-0 focus:ring-offset-0 focus:border-black transition-all">
                                        <SelectValue placeholder="Select Room Type" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-2 border-black bg-[#e5e5e5] shadow-2xl overflow-hidden">
                                        {rooms.map(room => (
                                            <SelectItem key={room.id} value={room.id} className="cursor-pointer hover:bg-black/5 transition-colors">
                                                {room.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="guests" className="flex items-center gap-2">
                                <Users className="w-3.5 h-3.5" /> Number of Guests*
                            </Label>
                            <Input id="guests" type="number" min="1" max="10" value={formData.guests} onChange={handleChange} placeholder="e.g. 2" required className="bg-[#e5e5e5] border-2 border-black/20 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0 transition-all" />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="message" className="flex items-center gap-2">
                                <MessageSquare className="w-3.5 h-3.5" /> Message*
                            </Label>
                            <Textarea id="message" value={formData.message} onChange={handleChange} placeholder="How can we make your stay extraordinary?" required className="bg-[#e5e5e5] border-2 border-black/20 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0 transition-all min-h-[150px]" />
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-4 group relative inline-flex items-center justify-center gap-2 px-8 py-5 bg-black text-white rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {isSubmitting ? "Sending..." : "Send Message"}
                                <Send className={isSubmitting ? "animate-pulse" : "transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"} size={18} />
                            </span>
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>

        <Footer />

        <SuccessModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Booking Confirmed"
          message="Your room is booked, we will contact you shortly to finalize your stay."
        />
      </main>
    </ClickSpark>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-slate-400">
            <p className="animate-pulse font-medium tracking-widest uppercase">Preparing Concierge Dashboard...</p>
        </div>
    }>
        <ContactForm />
    </Suspense>
  );
}
