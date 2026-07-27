import React from 'react';
import {
  Calendar,
  Bot,
  Video,
  FileText,
  UploadCloud,
  Pill,
  Activity,
  ShieldAlert,
  ArrowRight,
  Clock,
  Heart,
  Droplet,
  ChevronRight,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import { ScreenType, UserProfile, Appointment, Medicine } from '../types';

interface HomeScreenProps {
  user: UserProfile;
  appointments: Appointment[];
  medicines: Medicine[];
  onNavigate: (screen: ScreenType) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  appointments,
  medicines,
  onNavigate,
}) => {
  const upcomingAppointment = appointments.find((a) => a.status === 'Upcoming');
  const pendingMedicines = medicines.filter((m) => !m.takenToday);

  // 8 Feature Cards as requested
  const featureCards = [
    {
      id: 'appointments' as ScreenType,
      title: 'Book Appointment',
      subtitle: 'Top specialists & clinics',
      icon: Calendar,
      gradient: 'from-sky-500 to-blue-600',
      badge: '100+ Doctors',
    },
    {
      id: 'symptom-checker' as ScreenType,
      title: 'AI Symptom Checker',
      subtitle: 'Instant clinical triage',
      icon: Bot,
      gradient: 'from-teal-500 to-emerald-600',
      badge: 'Gemini AI',
      highlight: true,
    },
    {
      id: 'video-consultation' as ScreenType,
      title: 'Video Consultation',
      subtitle: 'Live HD tele-consult',
      icon: Video,
      gradient: 'from-indigo-500 to-sky-600',
      badge: 'Live',
    },
    {
      id: 'lab-reports' as ScreenType,
      title: 'Lab Reports',
      subtitle: 'CBC, Sugar & Lipid tests',
      icon: FileText,
      gradient: 'from-emerald-500 to-teal-600',
      badge: 'Digitized',
    },
    {
      id: 'upload-report' as ScreenType,
      title: 'Upload Reports',
      subtitle: 'AI report explanation',
      icon: UploadCloud,
      gradient: 'from-cyan-500 to-blue-600',
      badge: 'PDF / Image',
    },
    {
      id: 'medicine-reminder' as ScreenType,
      title: 'Medicine Reminder',
      subtitle: 'Dose tracker & alerts',
      icon: Pill,
      gradient: 'from-blue-500 to-teal-600',
      badge: `${pendingMedicines.length} Due`,
    },
    {
      id: 'health-statistics' as ScreenType,
      title: 'Health Statistics',
      subtitle: 'BP, Glucose & Heart rate',
      icon: Activity,
      gradient: 'from-emerald-600 to-emerald-500',
      badge: 'Analytics',
    },
    {
      id: 'emergency' as ScreenType,
      title: 'Emergency Help',
      subtitle: 'SOS siren & ambulance',
      icon: ShieldAlert,
      gradient: 'from-red-500 to-rose-600',
      badge: '24/7 SOS',
      emergency: true,
    },
  ];

  return (
    <div className="space-y-6 pb-24 px-4 max-w-5xl mx-auto pt-2">
      {/* Smart AI Health Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-teal-950 text-white p-6 shadow-xl overflow-hidden border border-sky-800/40">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Smart Health Companion</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Feeling unwell today?
            </h1>
            <p className="text-sm text-sky-200/90 leading-relaxed">
              Describe your symptoms to MediNova AI for an instant clinical assessment and specialist doctor recommendations.
            </p>
          </div>

          <button
            onClick={() => onNavigate('symptom-checker')}
            className="shrink-0 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <Bot className="w-5 h-5 text-slate-950" />
            <span>Check Symptoms Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Vitals Summary Bar */}
      <div className="grid grid-cols-3 gap-3">
        <div
          onClick={() => onNavigate('health-statistics')}
          className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs hover:border-sky-200 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold text-slate-600">Heart Rate</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-100 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-slate-900">72 <span className="text-xs font-normal text-slate-500">bpm</span></div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Optimal</div>
        </div>

        <div
          onClick={() => onNavigate('health-statistics')}
          className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs hover:border-sky-200 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold text-slate-600">Blood Pressure</span>
            <Activity className="w-4 h-4 text-sky-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-slate-900">120/80 <span className="text-xs font-normal text-slate-500">mmHg</span></div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Normal</div>
        </div>

        <div
          onClick={() => onNavigate('health-statistics')}
          className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs hover:border-sky-200 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold text-slate-600">Blood Sugar</span>
            <Droplet className="w-4 h-4 text-amber-500 fill-amber-100 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-slate-900">95 <span className="text-xs font-normal text-slate-500">mg/dL</span></div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Fasting Normal</div>
        </div>
      </div>

      {/* Eight Feature Cards Grid as requested */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-sky-600" />
            <span>Healthcare Services</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">8 Core Features</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className={`relative flex flex-col justify-between p-4 rounded-2xl text-left transition-all duration-200 border cursor-pointer group hover:shadow-md ${
                  card.emergency
                    ? 'bg-red-50/70 border-red-200 hover:border-red-400'
                    : card.highlight
                    ? 'bg-emerald-50/70 border-emerald-200 hover:border-emerald-400'
                    : 'bg-white border-slate-100 hover:border-sky-300'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${card.gradient} text-white flex items-center justify-center shadow-md shadow-sky-500/10 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      card.emergency
                        ? 'bg-red-600 text-white animate-pulse'
                        : card.highlight
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {card.badge}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{card.subtitle}</p>
                </div>

                {/* Corner Chevron */}
                <div className="mt-3 flex items-center justify-end">
                  <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-sky-600 group-hover:text-white text-slate-400 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming Appointment & Active Reminder Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Upcoming Appointment */}
        {upcomingAppointment ? (
          <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
                Next Appointment
              </span>
              <button
                onClick={() => onNavigate('appointments')}
                className="text-xs font-semibold text-sky-600 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <img
                src={upcomingAppointment.doctorAvatar}
                alt={upcomingAppointment.doctorName}
                className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900">{upcomingAppointment.doctorName}</h4>
                <p className="text-xs text-sky-600 font-medium">{upcomingAppointment.doctorSpecialty}</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{upcomingAppointment.date} • {upcomingAppointment.time}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => onNavigate('video-consultation')}
                className="flex-1 py-2 px-3 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Join Consultation</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900">No Upcoming Appointments</h4>
              <p className="text-xs text-slate-500">Book top certified specialists near you.</p>
            </div>
            <button
              onClick={() => onNavigate('appointments')}
              className="px-3.5 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 transition-colors"
            >
              Book Doctor
            </button>
          </div>
        )}

        {/* Medicine Reminder Quick Widget */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100 flex items-center gap-1">
              <Pill className="w-3 h-3 text-teal-600" />
              <span>Medicine Schedule</span>
            </span>
            <button
              onClick={() => onNavigate('medicine-reminder')}
              className="text-xs font-semibold text-teal-600 hover:underline"
            >
              Manage
            </button>
          </div>

          {pendingMedicines.length > 0 ? (
            <div className="space-y-2 my-1">
              {pendingMedicines.slice(0, 2).map((med) => (
                <div key={med.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{med.name}</span> ({med.dosage})
                    <span className="text-slate-500 block text-[11px]">{med.time} • {med.foodInstruction}</span>
                  </div>
                  <button
                    onClick={() => onNavigate('medicine-reminder')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors"
                  >
                    Take
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-3 text-center text-xs text-emerald-700 font-medium">
              🎉 All today's medications marked as taken!
            </div>
          )}

          <div className="text-[11px] text-slate-400 mt-1">
            Next pill alert set for 08:00 PM tonight.
          </div>
        </div>
      </div>
    </div>
  );
};
