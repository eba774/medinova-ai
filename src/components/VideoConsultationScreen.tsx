import React, { useState, useEffect } from 'react';
import { Video, Mic, MicOff, Camera, CameraOff, PhoneOff, MessageSquare, Sparkles, User, FileText, CheckCircle2, ShieldCheck, Share2 } from 'lucide-react';
import { Appointment } from '../types';

interface VideoConsultationScreenProps {
  appointments: Appointment[];
}

export const VideoConsultationScreen: React.FC<VideoConsultationScreenProps> = ({ appointments }) => {
  const [activeCallAppointment, setActiveCallAppointment] = useState<Appointment | null>(null);
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callEnded, setCallEnded] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState<string[]>([
    'Dr. Marcus Vance joined the secure video consultation room.',
    'Doctor: "Hello Sarah, I see your recent heart rate logs look stable at 72 bpm."',
    'Patient: "Yes doctor, I felt slight tightness yesterday evening after exercise."',
    'Doctor: "Understood. I will issue a mild prophylactic magnesium supplement and keep an eye on your lipid levels."',
  ]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeCallAppointment && !callEnded) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [activeCallAppointment, callEnded]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallEnded(true);
  };

  const videoAppointments = appointments.filter((a) => a.type === 'Video Call' || true);

  return (
    <div className="space-y-5 pb-24 px-4 max-w-5xl mx-auto pt-2">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-700 via-indigo-800 to-slate-900 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 w-fit text-xs font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>HD Encrypted Telehealth Portal</span>
        </div>
        <h1 className="text-2xl font-extrabold mb-1">Video Consultations</h1>
        <p className="text-xs text-sky-100 max-w-md">
          Join high-definition virtual consultations with board-certified doctors, complete with live AI medical transcription.
        </p>
      </div>

      {/* Active Call Modal / Fullscreen Simulator */}
      {activeCallAppointment ? (
        <div className="bg-slate-950 rounded-3xl p-4 sm:p-6 text-white shadow-2xl relative border border-slate-800 space-y-4">
          {!callEnded ? (
            <div>
              {/* Call Bar Info */}
              <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-800 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
                  <span className="font-bold text-sm text-white">LIVE CONSULTATION</span>
                  <span className="text-xs text-slate-400 font-mono">[{formatTimer(callDuration)}]</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Clinical Scribe Active</span>
                </div>
              </div>

              {/* Main Video Screen Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Main Doctor Video Frame */}
                <div className="md:col-span-2 relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <img
                    src={activeCallAppointment.doctorAvatar}
                    alt={activeCallAppointment.doctorName}
                    className="w-full h-full object-cover filter brightness-95"
                  />
                  {/* Doctor Overlay */}
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>{activeCallAppointment.doctorName} ({activeCallAppointment.doctorSpecialty})</span>
                  </div>

                  {/* Patient Self PIP Box */}
                  <div className="absolute bottom-4 right-4 w-28 sm:w-36 h-36 rounded-2xl overflow-hidden border-2 border-sky-500 bg-slate-800 shadow-xl">
                    {cameraActive ? (
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                        alt="Patient Self View"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-900 text-xs">
                        <User className="w-6 h-6 mb-1" />
                        <span>Cam Off</span>
                      </div>
                    )}
                    <div className="absolute bottom-1.5 left-1.5 bg-slate-900/80 px-1.5 py-0.5 rounded text-[10px] font-bold">
                      You
                    </div>
                  </div>
                </div>

                {/* AI Live Transcription Sidebar */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between h-80 sm:h-96 text-xs">
                  <div>
                    <h3 className="font-bold text-sky-400 text-xs mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Live AI Scribe Consultation Log</span>
                    </h3>

                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {liveTranscript.map((line, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/50 leading-relaxed text-slate-300">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                    Auto-summarizing clinical notes for electronic medical records.
                  </div>
                </div>
              </div>

              {/* Call Controls Bar */}
              <div className="flex items-center justify-center gap-4 mt-6 bg-slate-900 py-3.5 px-6 rounded-2xl border border-slate-800 max-w-md mx-auto">
                {/* Mute Mic */}
                <button
                  onClick={() => setMicActive(!micActive)}
                  className={`p-3.5 rounded-full transition-colors cursor-pointer ${
                    micActive ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-500 text-white'
                  }`}
                  title={micActive ? 'Mute Mic' : 'Unmute Mic'}
                >
                  {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>

                {/* Camera Toggle */}
                <button
                  onClick={() => setCameraActive(!cameraActive)}
                  className={`p-3.5 rounded-full transition-colors cursor-pointer ${
                    cameraActive ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-500 text-white'
                  }`}
                  title={cameraActive ? 'Turn Off Camera' : 'Turn On Camera'}
                >
                  {cameraActive ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                </button>

                {/* End Call */}
                <button
                  onClick={handleEndCall}
                  className="p-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition-transform active:scale-95 cursor-pointer"
                  title="End Consultation"
                >
                  <PhoneOff className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            /* Post Consultation Summary Card */
            <div className="text-center py-8 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-xl font-extrabold text-white">Consultation Ended</h3>
              <p className="text-xs text-slate-300">
                Your session with <strong>{activeCallAppointment.doctorName}</strong> duration was{' '}
                <span className="font-mono text-emerald-400">{formatTimer(callDuration || 245)}</span>.
              </p>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-left text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-sky-400 border-b border-slate-800 pb-2">
                  <FileText className="w-4 h-4" />
                  <span>AI Generated Clinical Summary</span>
                </div>
                <p className="text-slate-300">
                  • Continue low-sodium diet and hydration.
                  <br />• Recommended magnesium glycinate supplement (200mg nightly).
                  <br />• Re-check blood pressure log in 14 days.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => alert('Digital E-Prescription PDF downloaded to your device!')}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                >
                  Download E-Prescription
                </button>
                <button
                  onClick={() => {
                    setActiveCallAppointment(null);
                    setCallEnded(false);
                  }}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Upcoming Video Appointments List */
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Upcoming Video Sessions</h2>

          {videoAppointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white p-5 rounded-3xl border border-slate-100 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-sky-200 transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={apt.doctorAvatar}
                  alt={apt.doctorName}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900">{apt.doctorName}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Confirmed
                    </span>
                  </div>
                  <p className="text-xs text-sky-600 font-semibold">{apt.doctorSpecialty}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{apt.hospital}</p>
                  <p className="text-xs text-slate-700 font-bold mt-1">
                    🗓️ {apt.date} at {apt.time}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                <button
                  onClick={() => {
                    setActiveCallAppointment(apt);
                    setCallEnded(false);
                  }}
                  className="py-3 px-5 rounded-2xl bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white font-bold text-xs shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Video Call</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
