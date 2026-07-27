import React, { useState } from 'react';
import { FileText, Download, CheckCircle, AlertTriangle, ArrowUpRight, Search, Printer, Share2 } from 'lucide-react';
import { LabReport } from '../types';
import { sampleLabReports } from '../data/mockData';

export const LabReportsScreen: React.FC = () => {
  const [reports, setReports] = useState<LabReport[]>(sampleLabReports);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeReport, setActiveReport] = useState<LabReport>(sampleLabReports[0]);

  const categories = ['All', 'CBC', 'Blood Sugar', 'Lipid Profile'];

  const filteredReports = reports.filter(
    (rep) => selectedCategory === 'All' || rep.category === selectedCategory
  );

  const handleDownload = (report: LabReport) => {
    // Generate printable/downloadable summary window
    const printContent = `
===================================================
MEDI-NOVA DIAGNOSTIC HEALTH LABS
DIGITAL PATIENT LAB REPORT
===================================================
Report Title: ${report.title}
Category: ${report.category}
Date: ${report.date}
Lab Center: ${report.labName}
Overall Status: ${report.overallStatus}

---------------------------------------------------
TEST PARAMETERS & BIOMARKERS
---------------------------------------------------
${report.parameters
  .map(
    (p) =>
      `${p.parameter.padEnd(28)} | ${p.value} ${p.unit || ''} | Ref: ${p.normalRange} | [${p.status}]`
  )
  .join('\n')}

===================================================
Verify digital signature at https://medinova.ai/verify
===================================================
`;
    const blob = new Blob([printContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.replace(/\s+/g, '_')}_MediNova_Report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 pb-24 px-4 max-w-5xl mx-auto pt-2">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 rounded-3xl p-6 text-white shadow-lg">
        <h1 className="text-2xl font-extrabold mb-1">Digital Lab Reports & Records</h1>
        <p className="text-xs text-emerald-100 max-w-md">
          Access your verified pathology results for CBC, Fasting Sugar, and Lipid profiles anytime with instant PDF download.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Layout: Reports List & Detailed Parameter Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Reports Navigation Sidebar */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Report Records ({filteredReports.length})
          </h2>

          <div className="space-y-2.5">
            {filteredReports.map((rep) => (
              <button
                key={rep.id}
                onClick={() => setActiveReport(rep)}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeReport.id === rep.id
                    ? 'bg-emerald-50/80 border-emerald-500 shadow-xs'
                    : 'bg-white border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-slate-900 truncate">{rep.title}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      rep.overallStatus === 'Normal'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {rep.overallStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{rep.date}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{rep.labName}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Report View Panel */}
        {activeReport && (
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 shadow-md space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  {activeReport.category}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">{activeReport.title}</h3>
                <p className="text-xs text-slate-500">
                  Report Date: <strong>{activeReport.date}</strong> • {activeReport.labName}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(activeReport)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Report</span>
                </button>
              </div>
            </div>

            {/* Parameter Table */}
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-3">
                Extracted Biomarker Analysis
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                      <th className="py-2.5 px-3 rounded-l-xl">Parameter</th>
                      <th className="py-2.5 px-3">Result Value</th>
                      <th className="py-2.5 px-3">Normal Range</th>
                      <th className="py-2.5 px-3 rounded-r-xl">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeReport.parameters.map((param, i) => (
                      <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-900">{param.parameter}</td>
                        <td className="py-3 px-3 font-extrabold text-slate-800">
                          {param.value} <span className="text-slate-400 font-normal">{param.unit}</span>
                        </td>
                        <td className="py-3 px-3 text-slate-500">{param.normalRange}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              param.status === 'Normal'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {param.status === 'Normal' ? (
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <AlertTriangle className="w-3 h-3 text-amber-600" />
                            )}
                            {param.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes if present */}
            {activeReport.parameters.some((p) => p.note) && (
              <div className="bg-sky-50 p-4 rounded-2xl border border-sky-100 text-xs space-y-1">
                <span className="font-bold text-sky-800">Clinical Interpretation Notes:</span>
                {activeReport.parameters
                  .filter((p) => p.note)
                  .map((p, idx) => (
                    <p key={idx} className="text-slate-700">
                      • <strong>{p.parameter}:</strong> {p.note}
                    </p>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
