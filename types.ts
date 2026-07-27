export type ScreenType =
  | 'splash'
  | 'login'
  | 'home'
  | 'appointments'
  | 'symptom-checker'
  | 'video-consultation'
  | 'upload-report'
  | 'lab-reports'
  | 'medicine-reminder'
  | 'health-statistics'
  | 'emergency'
  | 'profile';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  bloodGroup: string;
  height: string;
  weight: string;
  allergies: string[];
  chronicConditions: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  healthId: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  hospital: string;
  consultationFee: number;
  avatarUrl: string;
  nextAvailable: string;
  about: string;
  availableDays: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  hospital: string;
  date: string;
  time: string;
  type: 'In-Person' | 'Video Call';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  consultationFee: number;
  notes?: string;
}

export interface SymptomAnalysisResult {
  summary: string;
  urgency: 'Low' | 'Moderate' | 'High' | 'Emergency';
  urgencyColor: string;
  possibleConditions: {
    name: string;
    probability: string;
    description: string;
  }[];
  recommendedSpecialist: string;
  recommendedActions: string[];
  disclaimer: string;
}

export interface LabParameter {
  parameter: string;
  value: string;
  unit?: string;
  normalRange: string;
  status: 'Normal' | 'Elevated' | 'Low' | 'High';
  note?: string;
}

export interface LabReport {
  id: string;
  title: string;
  category: 'CBC' | 'Blood Sugar' | 'Lipid Profile' | 'Thyroid' | 'Liver Function';
  date: string;
  labName: string;
  overallStatus: 'Normal' | 'Mild Deviation' | 'Requires Attention';
  parameters: LabParameter[];
  pdfUrl?: string;
}

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  time: string; // e.g., "08:00 AM"
  frequency: string; // "Once Daily", "Twice Daily", etc.
  foodInstruction: 'Before Meal' | 'After Meal' | 'With Food';
  takenToday: boolean;
  remainingPills: number;
  color: string;
}

export interface HealthVitalLog {
  date: string;
  systolicBP: number;
  diastolicBP: number;
  heartRate: number;
  bloodSugar: number; // mg/dL
  weight: number; // kg
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: string;
  phone: string;
  traumaLevel: string;
  bedAvailability: string;
  open24x7: boolean;
  rating: number;
}
