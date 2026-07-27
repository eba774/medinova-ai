import React from 'react';
import { ShieldAlert, Bell, HeartPulse, User } from 'lucide-react';
import { ScreenType, UserProfile } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  user: UserProfile;
  onNavigate: (screen: ScreenType) => void;
  unreadNotifications: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  user,
  onNavigate,
  unreadNotifications,
}) => {
  if (currentScreen === 'splash' || currentScreen === 'login') {
    return null;
  }

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'MediNova AI';
      case 'appointments':
        return 'Doctor Appointments';
      case 'symptom-checker':
        return 'AI Symptom Checker';
      case 'video-consultation':
        return 'Video Consultation';
      case 'upload-report':
        return 'Upload Medical Report';
      case 'lab-reports':
        return 'Lab Test Reports';
      case 'medicine-reminder':
        return 'Medicine Reminders';
      case 'health-statistics':
        return 'Health Statistics';
      case 'emergency':
        return 'Emergency SOS';
      case 'profile':
        return 'User Profile & Health ID';
      default:
        return 'MediNova AI';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sky-100 px-4 py-3 shadow-xs transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand / Title */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 via-teal-500 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-slate-900">
                  {currentScreen === 'home' ? 'MediNova' : getScreenTitle()}
                </span>
                {currentScreen === 'home' && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold border border-emerald-200">
                    AI Active
                  </span>
                )}
              </div>
              {currentScreen === 'home' && (
                <p className="text-xs text-slate-500 font-medium">Hello, {user.name.split(' ')[0]} 👋</p>
              )}
            </div>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Emergency SOS Quick Button */}
          {currentScreen !== 'emergency' && (
            <button
              onClick={() => onNavigate('emergency')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-semibold text-xs border border-red-200 transition-colors shadow-xs active:scale-95"
            >
              <ShieldAlert className="w-4 h-4 text-red-600 animate-pulse" />
              <span className="hidden sm:inline">Emergency</span> SOS
            </button>
          )}

          {/* Notifications Button */}
          <button
            onClick={() => alert('Notifications:\n• Upcoming appointment with Dr. Marcus Vance today at 03:30 PM\n• Time to take Atorvastatin 10mg at 08:00 PM\n• New Lab Report uploaded: Complete Blood Count')}
            className="relative p-2 rounded-xl text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            )}
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => onNavigate('profile')}
            className={`w-9 h-9 rounded-full border-2 p-0.5 transition-all ${
              currentScreen === 'profile'
                ? 'border-sky-600 ring-2 ring-sky-200'
                : 'border-slate-200 hover:border-sky-400'
            }`}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-sky-100 to-teal-100 flex items-center justify-center text-sky-700 font-bold text-xs">
              {user.name.split(' ').map((n) => n[0]).join('')}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
