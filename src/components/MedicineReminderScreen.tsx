import React, { useState } from 'react';
import { Pill, Plus, CheckCircle2, Clock, Calendar, AlertCircle, Trash2, X, Sparkles } from 'lucide-react';
import { Medicine } from '../types';

interface MedicineReminderScreenProps {
  medicines: Medicine[];
  onToggleTaken: (id: string) => void;
  onAddMedicine: (medicine: Medicine) => void;
  onDeleteMedicine: (id: string) => void;
}

export const MedicineReminderScreen: React.FC<MedicineReminderScreenProps> = ({
  medicines,
  onToggleTaken,
  onAddMedicine,
  onDeleteMedicine,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('1 Tablet');
  const [time, setTime] = useState('09:00 AM');
  const [frequency, setFrequency] = useState('Once Daily');
  const [foodInstruction, setFoodInstruction] = useState<'After Meal' | 'Before Meal' | 'With Food'>('After Meal');

  const takenCount = medicines.filter((m) => m.takenToday).length;
  const progressPercent = medicines.length > 0 ? Math.round((takenCount / medicines.length) * 100) : 0;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMed: Medicine = {
      id: 'med_' + Date.now(),
      name,
      dosage,
      time,
      frequency,
      foodInstruction,
      takenToday: false,
      remainingPills: 30,
      color: 'sky',
    };

    onAddMedicine(newMed);
    setName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-5 pb-24 px-4 max-w-4xl mx-auto pt-2">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-sky-800 to-slate-900 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold mb-1">Medicine Reminders</h1>
          <p className="text-xs text-sky-100 max-w-md">
            Never miss a dose. Track your daily prescription schedule with intelligent notification alerts.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Reminder</span>
        </button>
      </div>

      {/* Today's Progress Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-md space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-800">Today's Adherence Score</span>
          <span className="text-emerald-600">{takenCount} of {medicines.length} Dose(s) Taken ({progressPercent}%)</span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-sky-500 to-emerald-500 h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Medicines List */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Scheduled Dose Timings</h2>

        <div className="space-y-3">
          {medicines.map((med) => (
            <div
              key={med.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                med.takenToday
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-white border-slate-100 hover:border-sky-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => onToggleTaken(med.id)}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-transform cursor-pointer active:scale-95 ${
                    med.takenToday
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-400 hover:bg-sky-100 hover:text-sky-600'
                  }`}
                >
                  <CheckCircle2 className="w-6 h-6" />
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-bold text-sm truncate ${
                        med.takenToday ? 'text-slate-500 line-through' : 'text-slate-900'
                      }`}
                    >
                      {med.name}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                      {med.dosage}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-sky-600" /> {med.time}
                    </span>
                    <span>• {med.frequency}</span>
                    <span>• {med.foodInstruction}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDeleteMedicine(med.id)}
                  className="p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Delete Reminder"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Reminder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative space-y-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-slate-900">Add New Medicine Reminder</h3>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Medicine Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Amoxicillin, Lisinopril..."
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    required
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="e.g. 500mg or 1 Tablet"
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dose Time</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="08:00 AM"
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 bg-white"
                >
                  <option value="Once Daily">Once Daily</option>
                  <option value="Twice Daily">Twice Daily</option>
                  <option value="Three Times Daily">Three Times Daily</option>
                  <option value="As Needed (PRN)">As Needed (PRN)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Food Instruction</label>
                <select
                  value={foodInstruction}
                  onChange={(e: any) => setFoodInstruction(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 bg-white"
                >
                  <option value="After Meal">After Meal</option>
                  <option value="Before Meal">Before Meal</option>
                  <option value="With Food">With Food</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Save Reminder
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
