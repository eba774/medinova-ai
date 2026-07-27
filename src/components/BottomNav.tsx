import React from 'react';
import { Home, Calendar, FileText, User, Bot } from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  if (currentScreen === 'splash' || currentScreen === 'login') {
    return null;
  }

  const navItems = [
    { id: 'home' as ScreenType, label: 'Home', icon: Home },
    { id: 'appointments' as ScreenType, label: 'Appointments', icon: Calendar },
    { id: 'symptom-checker' as ScreenType, label: 'AI Checker', icon: Bot, isSpecial: true },
    { id: 'lab-reports' as ScreenType, label: 'Reports', icon: FileText },
    { id: 'profile' as ScreenType, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-1.5 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentScreen === item.id ||
            (item.id === 'lab-reports' && currentScreen === 'upload-report') ||
            (item.id === 'appointments' && currentScreen === 'video-consultation');

          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative -top-4 flex flex-col items-center group"
              >
                <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-sky-600 via-teal-500 to-emerald-500 p-0.5 shadow-lg shadow-sky-500/30 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-emerald-400">
                    <Bot className="w-6 h-6 animate-bounce text-emerald-400" />
                  </div>
                </div>
                <span className="text-[10px] font-bold text-sky-700 mt-0.5">AI Checker</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-sky-600 font-bold' : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                )}
              </div>
              <span className="text-[11px] mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
