import React, { useEffect } from 'react';
import { HeartPulse, Bot, Sparkles, ArrowRight, ShieldCheck, Stethoscope } from 'lucide-react';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  useEffect(() => {
    // Optional smooth timer if user wants auto transition after 3s
    const timer = setTimeout(() => {
      // onStart();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onStart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-sky-950 to-teal-950 flex flex-col items-center justify-between p-6 text-white relative overflow-hidden select-none">
      {/* Background Subtle Decorative Blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Bar Badge */}
      <div className="w-full flex justify-between items-center z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-emerald-300">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Next-Gen Medical Intelligence</span>
        </div>
        <button
          onClick={onStart}
          className="text-xs text-sky-200 hover:text-white font-medium underline underline-offset-4"
        >
          Skip to App
        </button>
      </div>

      {/* Center Branding Content */}
      <div className="flex flex-col items-center text-center z-10 max-w-md my-auto">
        {/* Logo Graphic */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-sky-400 to-emerald-400 blur-xl opacity-50 animate-pulse"></div>
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-sky-600 via-teal-500 to-emerald-500 p-1 relative shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center relative overflow-hidden">
              <HeartPulse className="w-14 h-14 text-emerald-400 animate-pulse" />
              <div className="absolute top-2 right-2">
                <Bot className="w-5 h-5 text-sky-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Name & Tagline */}
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-2">
          Medi<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Nova AI</span>
        </h1>
        
        <p className="text-lg font-medium text-sky-200 mb-6 tracking-wide">
          Your Smart Healthcare Assistant
        </p>

        <p className="text-sm text-slate-300 max-w-xs leading-relaxed mb-8">
          24/7 AI-powered triage, instant doctor booking, lab report analysis, video consultations, and personal emergency SOS response.
        </p>

        {/* Feature Highlights Pills */}
        <div className="grid grid-cols-2 gap-2.5 w-full mb-8 text-xs font-medium">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200">
            <Stethoscope className="w-4 h-4 text-sky-400 shrink-0" />
            <span>AI Symptom Checker</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Instant Video Doctors</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onStart}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-slate-950 font-bold text-base shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer group"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-400 z-10 py-2">
        <p>HIPAA Compliant & Clinical Grade Security • v2.4 AI</p>
      </div>
    </div>
  );
};
