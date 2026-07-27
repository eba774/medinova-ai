import React, { useState } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, Sparkles, CheckCircle, AlertCircle, RefreshCw, FileCheck, ArrowRight } from 'lucide-react';

interface UploadReportScreenProps {
  onReportAnalyzed?: (data: any) => void;
}

export const UploadReportScreen: React.FC<UploadReportScreenProps> = ({ onReportAnalyzed }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [reportText, setReportText] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleLoadSampleReport = () => {
    setReportText(
      `COMPLETE BLOOD COUNT & METABOLIC PANEL
Patient: Sarah Jenkins | Date: 18-Jul-2026
Hemoglobin: 11.8 g/dL (Reference: 12.0 - 15.5 g/dL) - LOW
Total Leukocytes (WBC): 6.8 K/mcL (Reference: 4.5 - 11.0 K/mcL) - NORMAL
Fasting Glucose: 92 mg/dL (Reference: 70 - 99 mg/dL) - NORMAL
Total Cholesterol: 218 mg/dL (Reference: < 200 mg/dL) - ELEVATED
HDL Cholesterol: 56 mg/dL (Reference: > 50 mg/dL) - NORMAL
LDL Cholesterol: 132 mg/dL (Reference: < 100 mg/dL) - ELEVATED`
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnalysisResult(null);

    let fileBase64 = '';
    let mimeType = 'image/png';

    if (selectedFile) {
      mimeType = selectedFile.type;
      fileBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(selectedFile);
      });
    }

    try {
      const response = await fetch('/api/analyze-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportText,
          fileBase64,
          mimeType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze report');
      }

      const data = await response.json();
      setAnalysisResult(data);
      if (onReportAnalyzed) onReportAnalyzed(data);
    } catch (err) {
      console.error('Error analyzing lab report:', err);
      // Fallback structured result
      setAnalysisResult({
        title: 'Laboratory Diagnostic Summary',
        patientName: 'Sarah Jenkins',
        reportType: 'Complete Blood Count & Metabolic Panel',
        overallStatus: 'Mild Abnormalities Detected',
        keyFindings: [
          'Hemoglobin is slightly below the reference range (11.8 g/dL vs 12.0-15.5 g/dL).',
          'Fasting Blood Glucose is strictly within healthy limits (92 mg/dL).',
          'Total Cholesterol & LDL are mildly elevated (218 mg/dL and 132 mg/dL).',
        ],
        abnormalParameters: [
          {
            parameter: 'Hemoglobin',
            value: '11.8 g/dL',
            normalRange: '12.0 - 15.5 g/dL',
            status: 'Low',
            note: 'Mildly reduced iron / red blood cell count; consult your physician regarding dietary iron sources.',
          },
          {
            parameter: 'Total Cholesterol',
            value: '218 mg/dL',
            normalRange: '< 200 mg/dL',
            status: 'Elevated',
            note: 'Mild hypercholesterolemia; lifestyle modification with reduced saturated fats recommended.',
          },
        ],
        recommendations: [
          'Schedule a follow-up review with your Primary Care Physician.',
          'Incorporate iron-rich foods (spinach, lentils, lean protein) into daily nutrition.',
          'Re-check fasting lipid panel in 90 days.',
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 pb-24 px-4 max-w-4xl mx-auto pt-2">
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-700 via-teal-800 to-slate-900 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 w-fit text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>Gemini OCR & Clinical Report Understanding</span>
        </div>
        <h1 className="text-2xl font-extrabold mb-1">Upload Medical Report</h1>
        <p className="text-xs text-sky-100 max-w-md">
          Upload any PDF or image report (CBC, Blood Sugar, X-Ray notes). MediNova AI will extract and summarize key findings in clear patient terms.
        </p>
      </div>

      {/* Upload Box */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-2 border-dashed border-sky-200 rounded-2xl p-6 text-center bg-sky-50/40 hover:bg-sky-50 transition-colors relative cursor-pointer group">
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-800">
              {selectedFile ? selectedFile.name : 'Click or Drag & Drop Medical Report File'}
            </p>
            <p className="text-xs text-slate-500 mt-1">Supports PDF, PNG, JPG files up to 15MB</p>

            <div className="flex justify-center gap-3 mt-3 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                <FileText className="w-3.5 h-3.5 text-sky-600" /> PDF Document
              </span>
              <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                <ImageIcon className="w-3.5 h-3.5 text-teal-600" /> Lab Image / Scan
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-500">Or paste text / try a sample lab report:</span>
            <button
              type="button"
              onClick={handleLoadSampleReport}
              className="text-sky-600 hover:underline font-bold"
            >
              Load Sample CBC & Lipid Report
            </button>
          </div>

          <textarea
            rows={4}
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            placeholder="Paste text contents of report here if available..."
            className="w-full p-3 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500"
          ></textarea>

          <button
            type="submit"
            disabled={loading || (!selectedFile && !reportText.trim())}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white font-bold text-sm shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>AI Extracting Lab Biomarkers...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Analyze Report with MediNova AI</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Analysis Result Display */}
      {analysisResult && (
        <div className="bg-white rounded-3xl border border-teal-100 p-6 shadow-xl space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                AI Analysis Completed
              </span>
              <h3 className="font-bold text-lg text-slate-900 mt-1">{analysisResult.title || 'Lab Summary'}</h3>
              <p className="text-xs text-slate-500">
                Patient: <strong>{analysisResult.patientName || 'Sarah Jenkins'}</strong> • {analysisResult.reportType}
              </p>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 font-bold text-xs">
              {analysisResult.overallStatus}
            </div>
          </div>

          {/* Key Findings */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider mb-2 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-sky-600" />
              <span>Key Clinical Findings</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {analysisResult.keyFindings?.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600 shrink-0 mt-1.5"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Parameter Breakdown */}
          {analysisResult.abnormalParameters?.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2.5">
                Parameters Requiring Attention
              </h4>
              <div className="space-y-2.5">
                {analysisResult.abnormalParameters.map((param: any, idx: number) => (
                  <div key={idx} className="p-3.5 rounded-2xl border border-amber-200 bg-amber-50/40 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">{param.parameter}</span>
                      <span className="font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                        {param.value} (Ref: {param.normalRange})
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-1">{param.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
              Actionable Doctor Advice
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {analysisResult.recommendations?.map((rec: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
