import React, { useState, useEffect } from 'react';
import { ShieldAlert, PhoneCall, MapPin, Navigation, AlertTriangle, CheckCircle2, Clock, Hospital as HospitalIcon, Phone, UserCheck, Volume2 } from 'lucide-react';
import { Hospital, UserProfile } from '../types';
import { sampleHospitals } from '../data/mockData';

interface EmergencyScreenProps {
  user: UserProfile;
}

export const EmergencyScreen: React.FC<EmergencyScreenProps> = ({ user }) => {
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [dispatchConfirmed, setDispatchConfirmed] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sosActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (sosActive && countdown === 0) {
      setDispatchConfirmed(true);
    }
    return () => clearInterval(timer);
  }, [sosActive, countdown]);

  const handleCancelSOS = () => {
    setSosActive(false);
    setCountdown(5);
    setDispatchConfirmed(false);
  };

  return (
    <div className="space-y-6 pb-24 px-4 max-w-4xl mx-auto pt-2">
      {/* Red Alert Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-700 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white w-fit text-xs font-bold mb-2">
          <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
          <span>24/7 Immediate Medical SOS Response</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black mb-1">Emergency SOS Portal</h1>
        <p className="text-xs text-rose-100 max-w-md">
          In a life-threatening crisis? Tap the SOS button below to alert local EMS responders, nearest ER trauma unit, and your emergency contact ({user.emergencyContact.name}).
        </p>
      </div>

      {/* Large SOS Button Area */}
      <div className="bg-white p-8 rounded-3xl border border-red-100 shadow-xl text-center space-y-4 relative overflow-hidden">
        {!sosActive ? (
          <div className="flex flex-col items-center">
            <button
              onClick={() => {
                setSosActive(true);
                setCountdown(5);
              }}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 text-white font-black text-2xl sm:text-3xl shadow-2xl shadow-red-600/50 flex flex-col items-center justify-center gap-1 border-4 border-white ring-8 ring-red-100 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            >
              <ShieldAlert className="w-12 h-12 sm:w-16 sm:h-16 group-hover:animate-bounce" />
              <span>TAP SOS</span>
            </button>
            <p className="text-xs text-slate-500 font-semibold mt-4">
              Press to trigger 5-second emergency dispatch broadcast
            </p>
          </div>
        ) : !dispatchConfirmed ? (
          <div className="py-6 space-y-4">
            <div className="w-24 h-24 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-4xl font-black animate-ping">
              {countdown}
            </div>
            <h3 className="text-xl font-black text-red-600">DISPATCHING EMERGENCY ALERT...</h3>
            <p className="text-xs text-slate-600">
              Locating your GPS coordinates & broadcasting to 911 dispatch and {user.emergencyContact.name}...
            </p>
            <button
              onClick={handleCancelSOS}
              className="px-6 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
            >
              Cancel SOS Broadcast
            </button>
          </div>
        ) : (
          <div className="py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-red-600">AMBULANCE & EMS DISPATCHED!</h3>
            <div className="bg-red-50 p-4 rounded-2xl border border-red-200 text-left text-xs space-y-1.5 text-red-900 font-medium">
              <p>• <strong>Nearest Hospital:</strong> MediNova Central Trauma Center (0.8 miles away)</p>
              <p>• <strong>Estimated Ambulance Arrival:</strong> 4 - 6 Minutes</p>
              <p>• <strong>Emergency Contact Alerted:</strong> {user.emergencyContact.name} ({user.emergencyContact.phone})</p>
              <p>• <strong>GPS Location Shared:</strong> 37.7749° N, 122.4194° W</p>
            </div>
            <button
              onClick={handleCancelSOS}
              className="px-6 py-2.5 rounded-2xl bg-slate-900 text-white font-bold text-xs"
            >
              Close SOS Alert
            </button>
          </div>
        )}

        {/* Quick Call Ambulance Button */}
        <div className="pt-2">
          <a
            href="tel:911"
            className="w-full py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <PhoneCall className="w-5 h-5 animate-pulse" />
            <span>Call Ambulance Directly (911)</span>
          </a>
        </div>
      </div>

      {/* Nearest Hospitals List */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <HospitalIcon className="w-4 h-4 text-sky-600" />
          <span>Nearest Emergency Hospitals</span>
        </h2>

        <div className="space-y-3">
          {sampleHospitals.map((hosp) => (
            <div
              key={hosp.id}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">{hosp.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    24/7 ER Open
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{hosp.address}</p>

                <div className="flex items-center gap-3 text-[11px] text-slate-600 font-semibold mt-1.5">
                  <span className="text-sky-600 font-bold">{hosp.distance}</span>
                  <span>• {hosp.traumaLevel}</span>
                  <span className="text-emerald-700 font-bold">• {hosp.bedAvailability}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`tel:${hosp.phone}`}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-sky-50 text-sky-700 font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call ER</span>
                </a>
                <button
                  onClick={() => alert(`Opening turn-by-turn navigation route to ${hosp.name}...`)}
                  className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact Card */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs space-y-2">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Designated Emergency Contact</h2>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">{user.emergencyContact.name}</h4>
            <p className="text-xs text-slate-500">{user.emergencyContact.relationship} • {user.emergencyContact.phone}</p>
          </div>
          <a
            href={`tel:${user.emergencyContact.phone}`}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200"
          >
            Call Contact
          </a>
        </div>
      </div>
    </div>
  );
};
