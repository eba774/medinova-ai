import React, { useState } from 'react';
import { ScreenType, UserProfile, Appointment, Medicine } from './types';
import { initialUserProfile, sampleAppointments, sampleMedicines } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { DoctorAppointmentScreen } from './components/DoctorAppointmentScreen';
import { AISymptomCheckerScreen } from './components/AISymptomCheckerScreen';
import { VideoConsultationScreen } from './components/VideoConsultationScreen';
import { UploadReportScreen } from './components/UploadReportScreen';
import { LabReportsScreen } from './components/LabReportsScreen';
import { MedicineReminderScreen } from './components/MedicineReminderScreen';
import { HealthStatisticsScreen } from './components/HealthStatisticsScreen';
import { EmergencyScreen } from './components/EmergencyScreen';
import { ProfileScreen } from './components/ProfileScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [appointments, setAppointments] = useState<Appointment[]>(sampleAppointments);
  const [medicines, setMedicines] = useState<Medicine[]>(sampleMedicines);
  const [unreadNotifications] = useState(3);

  // Handlers
  const handleStartFromSplash = () => {
    setCurrentScreen('login');
  };

  const handleLoginSuccess = (loggedUser: UserProfile) => {
    setUser(loggedUser);
    setCurrentScreen('home');
  };

  const handleBookAppointment = (newAppointment: Appointment) => {
    setAppointments([newAppointment, ...appointments]);
  };

  const handleToggleMedicineTaken = (id: string) => {
    setMedicines(
      medicines.map((m) => (m.id === id ? { ...m, takenToday: !m.takenToday } : m))
    );
  };

  const handleAddMedicine = (newMed: Medicine) => {
    setMedicines([newMed, ...medicines]);
  };

  const handleDeleteMedicine = (id: string) => {
    setMedicines(medicines.filter((m) => m.id !== id));
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-sky-500 selection:text-white">
      {/* Top Navigation Header */}
      <Header
        currentScreen={currentScreen}
        user={user}
        onNavigate={setCurrentScreen}
        unreadNotifications={unreadNotifications}
      />

      {/* Screen Views */}
      <main className="min-h-[calc(100vh-64px)]">
        {currentScreen === 'splash' && <SplashScreen onStart={handleStartFromSplash} />}

        {currentScreen === 'login' && <LoginScreen onLoginSuccess={handleLoginSuccess} />}

        {currentScreen === 'home' && (
          <HomeScreen
            user={user}
            appointments={appointments}
            medicines={medicines}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'appointments' && (
          <DoctorAppointmentScreen onBookAppointment={handleBookAppointment} />
        )}

        {currentScreen === 'symptom-checker' && (
          <AISymptomCheckerScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'video-consultation' && (
          <VideoConsultationScreen appointments={appointments} />
        )}

        {currentScreen === 'upload-report' && <UploadReportScreen />}

        {currentScreen === 'lab-reports' && <LabReportsScreen />}

        {currentScreen === 'medicine-reminder' && (
          <MedicineReminderScreen
            medicines={medicines}
            onToggleTaken={handleToggleMedicineTaken}
            onAddMedicine={handleAddMedicine}
            onDeleteMedicine={handleDeleteMedicine}
          />
        )}

        {currentScreen === 'health-statistics' && <HealthStatisticsScreen />}

        {currentScreen === 'emergency' && <EmergencyScreen user={user} />}

        {currentScreen === 'profile' && (
          <ProfileScreen user={user} onLogout={handleLogout} onNavigate={setCurrentScreen} />
        )}
      </main>

      {/* Persistent Bottom Navigation */}
      <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  );
}
