'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function SuccessModal({ isOpen, onClose, title, message }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-[#dcdcdc] rounded-[3rem] p-10 md:p-12 shadow-2xl pointer-events-auto relative overflow-hidden text-center border-2 border-black"
            >
              {/* Decorative Gradient Background */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-black via-slate-500 to-black" />
              
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              {/* Success Icon Animation */}
              <div className="flex justify-center mb-8">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                    className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center relative"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Check className="w-12 h-12 text-white" strokeWidth={2.5} />
                    </motion.div>
                    
                    {/* Ring Pulse */}
                    <motion.div
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full border-2 border-slate-900"
                    />
                </motion.div>
              </div>

              {/* Text Content */}
              <h3 className="text-3xl font-bold tracking-tight text-black mb-4">
                {title}
              </h3>
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
                {message}
              </p>

              {/* Action Button */}
              <button
                onClick={onClose}
                className="w-full py-5 bg-black text-white rounded-full font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10"
              >
                Excellent
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
