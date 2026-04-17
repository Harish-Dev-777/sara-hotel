'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Lock, LogIn, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import ClickSpark from '@/components/ui/click-spark';
import { loginAction } from './actions';
import { useRouter } from 'next/navigation';
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const verifyCredentials = useMutation(api.auth.verifyCredentials);

  // Clear any existing session on mount
  useEffect(() => {
    sessionStorage.removeItem('sara_admin_auth');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await verifyCredentials({
        email: formData.email,
        password: formData.password
      });
      
      if (result.success) {
        sessionStorage.setItem('sara_admin_auth', 'true');
        router.push('/admin/dashboard');
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ClickSpark
      sparkColor="#000000"
      sparkSize={6}
      sparkRadius={20}
      sparkCount={6}
      duration={600}
    >
      <main className="min-h-screen bg-[#DCDCDC] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Abstract Background Design */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-black rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-black rounded-full blur-[120px]" />
        </div>

        <Link href="/" className="absolute top-10 left-10 z-[100]">
            <Button variant="outline" className="gap-2 border-black border-2 font-bold hover:bg-black hover:text-[#DCDCDC] transition-all rounded-full px-6 bg-transparent text-black">
                <ArrowLeft size={18} />
                Back to Home
            </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="w-full max-w-md"
        >
          {/* Brand/Logo Area */}
          <div className="flex flex-col items-center mb-10 text-center">
           
            <h1 className="text-4xl font-bold tracking-tight text-black mb-3">Admin Access</h1>
            <p className="text-black/60 font-medium tracking-tight">Secure login to manage bookings and guest information.</p>
          </div>

          {/* Login Card */}
          <div className="bg-[#e5e5e5] border-2 border-black p-8 md:p-10 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] relative">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-semibold flex items-center gap-2"
              >
                <ShieldAlert size={16} />
                {error}
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="flex items-center gap-2 text-black font-bold">
                  <Mail className="w-3.5 h-3.5 italic" /> Email Address
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@sarahotel.com" 
                  required 
                  className="bg-[#e5e5e5] border-2 border-black text-black placeholder:text-black/30 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all font-medium"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" title="Password" className="flex items-center gap-2 text-black font-bold">
                  <Lock className="w-3.5 h-3.5" /> Password
                </Label>
                <Input 
                  id="password" 
                  type="password" 
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  required 
                  className="bg-[#e5e5e5] border-2 border-black text-black placeholder:text-black/30 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-black/10"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? "Authenticating..." : "Login to Dashboard"}
                  <LogIn className={isSubmitting ? "animate-pulse" : "transition-transform group-hover:translate-x-1"} size={18} />
                </span>
              </button>
            </form>

            <div className="mt-8 flex items-center gap-3 px-4 py-3 bg-red-50/50 rounded-2xl border border-red-100/50">
                <ShieldAlert className="text-red-400 w-4 h-4 shrink-0" />
                <p className="text-xs text-red-900 font-medium leading-tight">
                    Authorized personnel only. All activities are monitored.
                </p>
            </div>
          </div>

          <p className="mt-10 text-center text-black/40 text-sm font-medium">
            © {new Date().getFullYear()} Sara Hotel Management
          </p>
        </motion.div>
      </main>
    </ClickSpark>
  );
}
