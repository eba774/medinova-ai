import React, { useState } from 'react';
import { Search, Star, Clock, MapPin, Calendar as CalendarIcon, Video, CheckCircle2, UserCheck, X, ShieldCheck, Filter } from 'lucide-react';
import { Doctor, Appointment } from '../types';
import { sampleDoctors } from '../data/mockData';

interface DoctorAppointmentScreenProps {
  onBookAppointment: (appointment: Appointment) => void;
}

export const DoctorAppointmentScreen: React.FC<DoctorAppointmentScreenProps> = ({ onBookAppointment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState('2026-07-28');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [consultationType, setConsultationType] = useState<'In-Person' | 'Video Call'>('Video Call');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const specialties = ['All', 'Cardiology', 'Neurology', 'General Medicine', 'Pediatrics', 'Dermatology', 'Orthopedics'];

  const filteredDoctors = sampleDoctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;

    const newApt: Appointment = {
      id: 'apt_' + Date.now(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorSpecialty: selectedDoctor.specialty,
      doctorAvatar: selectedDoctor.avatarUrl,
      hospital: selectedDoctor.hospital,
      date: bookingDate,
      time: bookingTime,
      type: consultationType,
      status: 'Upcoming',
      consultationFee: selectedDoctor.consultationFee,
      notes: bookingNotes,
    };

    onBookAppointment(newApt);
    setBookingSuccess(true);
  };

  return (
    <div className="space-y-5 pb-24 px-4 max-w-5xl mx-auto pt-2">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-600 to-teal-600 rounded-3xl p-6 text-white shadow-lg">
        <h1 className="text-2xl font-extrabold mb-1">Find & Book Specialist Doctors</h1>
        <p className="text-xs text-sky-100 max-w-lg">
          Connect with top-rated medical experts for instant video consultations or in-person hospital appointments.
        </p>

        {/* Search Input */}
        <div className="mt-4 relative max-w-xl">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctor name, specialty, or condition..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 font-medium text-sm border-0 focus:ring-2 focus:ring-sky-300 shadow-sm"
          />
        </div>
      </div>

      {/* Specialties Horizontal Pill Filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <Filter className="w-3.5 h-3.5 text-sky-600" />
          <span>Filter by Specialty:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedSpecialty === spec
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors List */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            Available Doctors ({filteredDoctors.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium">Verified Medical Licenses</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs hover:border-sky-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-3">
                  <img
                    src={doc.avatarUrl}
                    alt={doc.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-slate-900 truncate">{doc.name}</h3>
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-amber-800 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                        <span>{doc.rating}</span>
                        <span className="text-slate-400 text-[10px]">({doc.reviewsCount})</span>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-sky-600">{doc.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{doc.experienceYears} Years Experience</p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{doc.hospital}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-xl">
                  {doc.about}
                </p>

                <div className="flex items-center justify-between mt-3 text-xs pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-slate-600 font-medium">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Next: <strong className="text-emerald-700 font-bold">{doc.nextAvailable}</strong></span>
                  </div>
                  <div className="font-bold text-slate-900">
                    ${doc.consultationFee} <span className="text-[10px] font-normal text-slate-500">/ consult</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2">
                <button
                  onClick={() => {
                    setSelectedDoctor(doc);
                    setBookingSuccess(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingSuccess ? (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <img
                    src={selectedDoctor.avatarUrl}
                    alt={selectedDoctor.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{selectedDoctor.name}</h3>
                    <p className="text-xs text-sky-600 font-semibold">{selectedDoctor.specialty}</p>
                    <p className="text-xs text-slate-500">{selectedDoctor.hospital}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Consultation Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setConsultationType('Video Call')}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        consultationType === 'Video Call'
                          ? 'bg-sky-50 border-sky-600 text-sky-700'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <Video className="w-4 h-4 text-sky-600" />
                      <span>Video Consultation</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setConsultationType('In-Person')}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        consultationType === 'In-Person'
                          ? 'bg-sky-50 border-sky-600 text-sky-700'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <UserCheck className="w-4 h-4 text-sky-600" />
                      <span>In-Person Clinic Visit</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Date</label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Time Slot</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['09:30 AM', '10:15 AM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setBookingTime(slot)}
                        className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all ${
                          bookingTime === slot
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Reason for Visit / Symptoms</label>
                  <textarea
                    rows={2}
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    placeholder="Briefly describe your symptoms or reason for consult..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500"
                  ></textarea>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">Total Consultation Fee:</span>
                  <span className="font-extrabold text-slate-900 text-base">${selectedDoctor.consultationFee}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 text-white font-bold text-sm shadow-md hover:from-sky-500 hover:to-teal-500 transition-all cursor-pointer"
                >
                  Confirm & Pay ${selectedDoctor.consultationFee}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="text-xl font-extrabold text-slate-900">Appointment Confirmed!</h3>
                <p className="text-xs text-slate-600">
                  Your consultation with <strong>{selectedDoctor.name}</strong> has been successfully booked for{' '}
                  <span className="text-sky-600 font-bold">{bookingDate}</span> at{' '}
                  <span className="text-sky-600 font-bold">{bookingTime}</span>.
                </p>

                <div className="bg-sky-50 p-4 rounded-2xl border border-sky-100 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mode:</span>
                    <span className="font-bold text-slate-900">{consultationType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Doctor:</span>
                    <span className="font-bold text-slate-900">{selectedDoctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hospital:</span>
                    <span className="font-bold text-slate-900">{selectedDoctor.hospital}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
