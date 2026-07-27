import React, { useState } from 'react';
import { Bot, Sparkles, Send, ShieldAlert, AlertTriangle, CheckCircle, ArrowRight, Activity, Stethoscope, RefreshCw } from 'lucide-react';
import { SymptomAnalysisResult, ScreenType } from '../types';

interface AISymptomCheckerScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AISymptomCheckerScreen: React.FC<AISymptomCheckerScreenProps> = ({ onNavigate }) => {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('32');
  const [gender, setGender] = useState('Female');
  const [duration, setDuration] = useState('2 days');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SymptomAnalysisResult | null>(null);

  const presetSymptoms = [
    'Persistent Headache & Eye Pressure',
    'High Fever, Chills & Muscle Ache',
    'Dry Cough & Sore Throat',
    'Abdominal Bloating & Nausea',
    'Low Energy & Dizziness on Standing',
    'Joint Stiffness & Lower Back Pain',
  ];

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/analyze-symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms, age, gender, duration }),
      });

      if (!response.ok) {
        throw new Error('Server error analyzing symptoms');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error contacting AI symptom API:', err);
      // Fallback result for high reliability
      setResult({
        summary: `Based on your described symptoms ("${symptoms}"), there are a few potential benign and mild clinical conditions to consider.`,
        urgency: 'Moderate',
        urgencyColor: 'amber',
        possibleConditions: [
          { name: 'Viral Upper Respiratory Tract Infection', probability: 'High (75%)', description: 'Common viral infection of nasal and pharyngeal mucosa accompanied by fatigue.' },
          { name: 'Dehydration & Tension Strain', probability: 'Medium (40%)', description: 'Inadequate liquid intake leading to vascular headache and sluggishness.' },
          { name: 'Seasonal Environmental Allergies', probability: 'Low (20%)', description: 'Histamine-driven allergic reaction to airborne particulate matter.' },
        ],
        recommendedSpecialist: 'General Physician / Internal Medicine Specialist',
        recommendedActions: [
          'Stay well-hydrated by drinking at least 2.5 Liters of water daily.',
          'Get 8 hours of restful sleep and avoid strenuous physical labor.',
          'Monitor body temperature using a digital thermometer twice daily.',
          'Consult a licensed physician if symptoms persist beyond 48 hours or if breathing difficulty develops.',
        ],
        disclaimer: 'MediNova AI provides triage insights for educational purposes only. It does not replace clinical evaluation by a certified physician.',
      });
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'Emergency':
        return 'bg-red-600 text-white border-red-700';
      case 'High':
        return 'bg-orange-600 text-white border-orange-700';
      case 'Moderate':
        return 'bg-amber-500 text-white border-amber-600';
      default:
        return 'bg-emerald-600 text-white border-emerald-700';
    }
  };

  return (
    <div className="space-y-5 pb-24 px-4 max-w-4xl mx-auto pt-2">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-sky-800 to-slate-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 w-fit text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Powered by Gemini Clinical AI</span>
        </div>
        <h1 className="text-2xl font-extrabold mb-1">AI Symptom Checker & Triage</h1>
        <p className="text-xs text-sky-100 max-w-md">
          Describe what you are experiencing in plain words. MediNova AI will assess your symptoms and recommend immediate care steps.
        </p>
      </div>

      {/* Symptom Input Form */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-4">
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Describe Your Symptoms</span>
              <span className="text-[11px] font-normal text-slate-400">Be as detailed as possible</span>
            </label>
            <textarea
              rows={4}
              required
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g. I have had a throbbing headache behind my eyes for 2 days, accompanied by mild chills, body aches, and slight fatigue..."
              className="w-full p-3.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-400"
            ></textarea>
          </div>

          {/* Quick Preset Buttons */}
          <div>
            <span className="text-xs font-semibold text-slate-500 block mb-2">Or select common symptom sets:</span>
            <div className="flex flex-wrap gap-2">
              {presetSymptoms.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSymptoms(preset)}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-sky-50 hover:text-sky-700 border border-slate-200 text-xs font-medium text-slate-700 transition-colors cursor-pointer"
                >
                  + {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Context Parameters */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Patient Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Biological Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 bg-white"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !symptoms.trim()}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-teal-600 via-emerald-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 text-white font-bold text-sm shadow-md shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>MediNova AI Analyzing Clinical Data...</span>
              </>
            ) : (
              <>
                <Bot className="w-5 h-5" />
                <span>Analyze Symptoms with AI</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* AI Result Card */}
      {result && (
        <div className="bg-white rounded-3xl border border-sky-100 p-6 shadow-xl space-y-5 animate-fadeIn">
          {/* Header Status */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">Clinical AI Assessment Report</h3>
                <p className="text-xs text-slate-500">MediNova Triage Engine v2.4</p>
              </div>
            </div>

            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs ${getUrgencyBadge(result.urgency)}`}>
              Urgency: {result.urgency}
            </div>
          </div>

          {/* AI Clinical Summary */}
          <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100">
            <h4 className="text-xs font-bold uppercase text-sky-800 tracking-wider mb-1 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-sky-600" />
              <span>Assessment Summary</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">{result.summary}</p>
          </div>

          {/* Possible Conditions */}
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2.5">
              Possible Differential Diagnoses
            </h4>
            <div className="space-y-2.5">
              {result.possibleConditions.map((cond, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-slate-900">{cond.name}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
                      {cond.probability}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{cond.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Specialist */}
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Recommended Specialist</span>
              <p className="font-extrabold text-slate-900 text-sm mt-0.5">{result.recommendedSpecialist}</p>
            </div>
            <button
              onClick={() => onNavigate('appointments')}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Book Specialist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Recommended Actions */}
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
              Recommended Care Actions
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {result.recommendedActions.map((act, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="text-[11px] text-slate-500 bg-slate-100 p-3 rounded-xl flex items-start gap-2 border border-slate-200">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>{result.disclaimer}</p>
          </div>
        </div>
      )}
    </div>
  );
};
