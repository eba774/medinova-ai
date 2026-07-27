import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity, Heart, Droplet, Scale, Plus, Sparkles, TrendingDown, TrendingUp, X } from 'lucide-react';
import { HealthVitalLog } from '../types';
import { sampleVitalLogs } from '../data/mockData';

export const HealthStatisticsScreen: React.FC = () => {
  const [logs, setLogs] = useState<HealthVitalLog[]>(sampleVitalLogs);
  const [showLogModal, setShowLogModal] = useState(false);
  const [activeMetric, setActiveMetric] = useState<'bp' | 'heart' | 'sugar'>('bp');

  // New Vital Form State
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);
  const [heartRate, setHeartRate] = useState(72);
  const [bloodSugar, setBloodSugar] = useState(95);
  const [weight, setWeight] = useState(64);

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: HealthVitalLog = {
      date: 'Today',
      systolicBP: Number(systolic),
      diastolicBP: Number(diastolic),
      heartRate: Number(heartRate),
      bloodSugar: Number(bloodSugar),
      weight: Number(weight),
    };

    setLogs([...logs.slice(1), newLog]);
    setShowLogModal(false);
  };

  const latestLog = logs[logs.length - 1];

  return (
    <div className="space-y-5 pb-24 px-4 max-w-5xl mx-auto pt-2">
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-700 via-teal-800 to-slate-900 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold mb-1">Health Statistics & Vitals</h1>
          <p className="text-xs text-sky-100 max-w-md">
            Track weekly trends for Blood Pressure, Heart Rate, and Blood Glucose with AI physiological analytics.
          </p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Vitals</span>
        </button>
      </div>

      {/* Four Vital Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* Blood Pressure Card */}
        <div
          onClick={() => setActiveMetric('bp')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeMetric === 'bp'
              ? 'bg-sky-50/90 border-sky-500 shadow-xs'
              : 'bg-white border-slate-100 hover:border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold text-slate-700">Blood Pressure</span>
            <Activity className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl font-black text-slate-900">
            {latestLog.systolicBP}/{latestLog.diastolicBP}{' '}
            <span className="text-xs font-normal text-slate-500">mmHg</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Optimal Range</span>
          </div>
        </div>

        {/* Heart Rate Card */}
        <div
          onClick={() => setActiveMetric('heart')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeMetric === 'heart'
              ? 'bg-rose-50/90 border-rose-400 shadow-xs'
              : 'bg-white border-slate-100 hover:border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold text-slate-700">Heart Rate</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-100" />
          </div>
          <div className="text-xl font-black text-slate-900">
            {latestLog.heartRate} <span className="text-xs font-normal text-slate-500">bpm</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Resting Normal</span>
          </div>
        </div>

        {/* Blood Sugar Card */}
        <div
          onClick={() => setActiveMetric('sugar')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeMetric === 'sugar'
              ? 'bg-amber-50/90 border-amber-400 shadow-xs'
              : 'bg-white border-slate-100 hover:border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold text-slate-700">Blood Glucose</span>
            <Droplet className="w-4 h-4 text-amber-500 fill-amber-100" />
          </div>
          <div className="text-xl font-black text-slate-900">
            {latestLog.bloodSugar} <span className="text-xs font-normal text-slate-500">mg/dL</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Fasting Ideal</span>
          </div>
        </div>

        {/* Weight & BMI Card */}
        <div className="p-4 rounded-2xl bg-white border border-slate-100">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold text-slate-700">Weight & BMI</span>
            <Scale className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl font-black text-slate-900">
            {latestLog.weight} <span className="text-xs font-normal text-slate-500">kg</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
            <span>BMI 22.4 (Healthy)</span>
          </div>
        </div>
      </div>

      {/* Recharts Analytics Graph Box */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              {activeMetric === 'bp' && 'Blood Pressure Trend (Systolic / Diastolic)'}
              {activeMetric === 'heart' && 'Heart Rate Trend (BPM)'}
              {activeMetric === 'sugar' && 'Blood Glucose Level Trend (mg/dL)'}
            </h3>
            <p className="text-xs text-slate-500">7-Day Continuous Monitoring History</p>
          </div>

          {/* Metric Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveMetric('bp')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeMetric === 'bp' ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-500'
              }`}
            >
              BP
            </button>
            <button
              onClick={() => setActiveMetric('heart')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeMetric === 'heart' ? 'bg-white text-rose-600 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Heart
            </button>
            <button
              onClick={() => setActiveMetric('sugar')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeMetric === 'sugar' ? 'bg-white text-amber-600 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Sugar
            </button>
          </div>
        </div>

        {/* Chart View */}
        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={logs} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="roseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  color: '#fff',
                  border: 'none',
                  fontSize: '12px',
                }}
              />

              {activeMetric === 'bp' && (
                <>
                  <Area
                    type="monotone"
                    dataKey="systolicBP"
                    name="Systolic"
                    stroke="#0284c7"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#skyGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="diastolicBP"
                    name="Diastolic"
                    stroke="#0d9488"
                    strokeWidth={2}
                    fillOpacity={0}
                  />
                </>
              )}

              {activeMetric === 'heart' && (
                <Area
                  type="monotone"
                  dataKey="heartRate"
                  name="Heart Rate (BPM)"
                  stroke="#f43f5e"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#roseGrad)"
                />
              )}

              {activeMetric === 'sugar' && (
                <Area
                  type="monotone"
                  dataKey="bloodSugar"
                  name="Glucose (mg/dL)"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#amberGrad)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative space-y-4">
            <button
              onClick={() => setShowLogModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-slate-900">Log Fresh Vital Measurement</h3>

            <form onSubmit={handleAddLog} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Systolic BP</label>
                  <input
                    type="number"
                    value={systolic}
                    onChange={(e) => setSystolic(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Diastolic BP</label>
                  <input
                    type="number"
                    value={diastolic}
                    onChange={(e) => setDiastolic(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    value={heartRate}
                    onChange={(e) => setHeartRate(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Blood Sugar (mg/dL)</label>
                  <input
                    type="number"
                    value={bloodSugar}
                    onChange={(e) => setBloodSugar(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
              >
                Save Vital Log
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
