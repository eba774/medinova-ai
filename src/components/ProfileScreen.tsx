import React, { useState } from 'react';
import { User, Mail, Phone, Heart, Shield, Settings, LogOut, QrCode, FileText, CheckCircle2, ChevronRight, Edit3 } from 'lucide-react';
import { UserProfile, ScreenType } from '../types';

interface ProfileScreenProps {
  user: UserProfile;
  onLogout: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout, onNavigate }) => {
  const [showQR, setShowQR] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);

  return (
    <div className="space-y-5 pb-24 px-4 max-w-4xl mx-auto pt-2">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-sky-700 via-teal-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-400 to-emerald-400 p-0.5 shadow-lg shrink-0">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-extrabold text-xl text-emerald-400">
              {user.name.split(' ').map((n) => n[0]).join('')}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl font-extrabold text-white">{user.name}</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Verified
              </span>
            </div>
            <p className="text-xs text-sky-200 mt-0.5">{user.email}</p>
            <p className="text-[11px] text-slate-300 mt-1 font-mono">Health ID: {user.healthId}</p>
          </div>
        </div>

        <button
          onClick={() => setShowQR(!showQR)}
          className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white flex items-center gap-2 transition-colors cursor-pointer"
        >
          <QrCode className="w-4 h-4 text-emerald-400" />
          <span>{showQR ? 'Hide Digital Pass' : 'Show Digital Health Pass'}</span>
        </button>
      </div>

      {/* Digital Health Pass QR Box */}
      {showQR && (
        <div className="bg-white p-6 rounded-3xl border border-sky-200 shadow-xl text-center space-y-3 animate-fadeIn">
          <div className="w-44 h-44 bg-slate-900 rounded-2xl p-3 mx-auto flex items-center justify-center text-white border-4 border-emerald-400 shadow-md">
            {/* Styled Simulated QR Code SVG */}
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <rect x="5" y="5" width="30" height="30" rx="4" strokeWidth="4" />
              <rect x="13" y="13" width="14" height="14" fill="currentColor" />
              <rect x="65" y="5" width="30" height="30" rx="4" strokeWidth="4" />
              <rect x="73" y="13" width="14" height="14" fill="currentColor" />
              <rect x="5" y="65" width="30" height="30" rx="4" strokeWidth="4" />
              <rect x="13" y="73" width="14" height="14" fill="currentColor" />
              <path d="M45 10 h10 M45 20 h10 M45 30 h10 M10 45 v10 M20 45 v10 M30 45 v10" strokeWidth="3" />
              <path d="M65 45 h25 M75 55 h15 M65 65 h10 M85 65 h10 M45 75 v20 M55 65 v30" strokeWidth="3" />
            </svg>
          </div>
          <p className="text-xs font-bold text-slate-800">Scan at Hospitals & Clinics for Instant Medical Record Access</p>
          <p className="text-[11px] text-slate-500">256-Bit Encrypted Health Key: {user.healthId}</p>
        </div>
      )}

      {/* Personal Bio Data Grid */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-4">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Personal Health Information</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-slate-400 block mb-0.5">Age & Gender</span>
            <span className="font-bold text-slate-900">{user.age} Yrs • {user.gender}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-slate-400 block mb-0.5">Blood Group</span>
            <span className="font-extrabold text-rose-600">{user.bloodGroup}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-slate-400 block mb-0.5">Height & Weight</span>
            <span className="font-bold text-slate-900">{user.height} • {user.weight}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-slate-400 block mb-0.5">Mobile Phone</span>
            <span className="font-bold text-slate-900">{user.phone}</span>
          </div>
        </div>
      </div>

      {/* Medical History Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-3">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Medical History & Allergies</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-red-50 p-3.5 rounded-2xl border border-red-100">
            <span className="font-bold text-red-800 block mb-1">Known Allergies</span>
            <div className="flex flex-wrap gap-1.5">
              {user.allergies.map((all, i) => (
                <span key={i} className="px-2.5 py-0.5 bg-red-100 text-red-900 rounded-md font-bold">
                  ⚠️ {all}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-sky-50 p-3.5 rounded-2xl border border-sky-100">
            <span className="font-bold text-sky-800 block mb-1">Chronic Conditions</span>
            <div className="flex flex-wrap gap-1.5">
              {user.chronicConditions.map((cond, i) => (
                <span key={i} className="px-2.5 py-0.5 bg-sky-100 text-sky-900 rounded-md font-bold">
                  🩺 {cond}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* App Settings */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-4">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Account Settings & Security</h2>

        <div className="space-y-3 text-xs font-semibold text-slate-800">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
            <span>Push Notifications & Medication Reminders</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
            <span>Automatic Emergency SOS Location Broadcast</span>
            <input
              type="checkbox"
              checked={emergencyAlerts}
              onChange={() => setEmergencyAlerts(!emergencyAlerts)}
              className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-colors cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out of MediNova AI</span>
      </button>
    </div>
  );
};
