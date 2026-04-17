'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Lock, LogIn, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ClickSpark from '@/components/ui/click-spark';
import { loginAction } from './actions';

export default function AdminLoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const loginData = new FormData();
    loginData.append('email', formData.email);
    loginData.append('password', formData.password);

    try {
      const result = await loginAction(loginData);
      
      if (result.success) {
        console.log('Login successful');
        // Simulate redirect
        alert('Login successful! Redirecting to dashboard...');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ClickSpark
      sparkColor="#1e293b"
      sparkSize={6}
      sparkRadius={20}
      sparkCount={6}
      duration={600}
    >
      <main className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Abstract Background Design */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-100 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-50 rounded-full blur-[120px]" />
        </div>

        <Link 
            href="/" 
            className="absolute top-10 left-10 flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-medium group"
        >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {/* Brand/Logo Area */}
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 rounded-3xl bg-slate-900 flex items-center justify-center mb-6 shadow-xl shadow-slate-900/20 rotate-3">
                <Lock className="text-white w-8 h-8" strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-3">Admin Access</h1>
            <p className="text-slate-500 font-medium">Secure login to manage bookings and guest information.</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 relative">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="flex items-center gap-2 text-slate-500">
                  <Mail className="w-3.5 h-3.5" /> Email Address
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@sarahotel.com" 
                  required 
                  className="bg-slate-50 border-slate-100 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" title="Password" className="flex items-center gap-2 text-slate-500">
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
                  className="bg-slate-50 border-slate-100 focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-slate-900/10"
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

          <p className="mt-10 text-center text-slate-400 text-sm font-medium">
            © {new Date().getFullYear()} Sara Hotel Management
          </p>
        </motion.div>
      </main>
    </ClickSpark>
  );
}
