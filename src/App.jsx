import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Layout } from './components/Layout.jsx';
import { Login, Signup } from './pages/Auth.jsx';
import {
  Dashboard,
  StudyHub,
  Pomodoro,
  BookLibrary,
  BudgetCalculator,
  AttendanceCalculator,
  CgpaCalculator,
  TodoList,
  EventsClubs,
  Transport,
  CampusMap,
  LostFound,
  EmergencySupport,
  Reviews,
  StudentAssistant,
  Planner,
  PackingChecklist,
  FoodGuide,
  TeamFinder,
} from './pages/Pages.jsx';

function readUser() {
  try {
    return JSON.parse(localStorage.getItem('ssk-current-user'));
  } catch {
    return null;
  }
}

export default function App() {
  const [user, setUser] = useState(readUser);

  function handleLogin(nextUser) {
    localStorage.setItem('ssk-current-user', JSON.stringify(nextUser));
    setUser(nextUser);
  }

  function handleLogout() {
    localStorage.removeItem('ssk-current-user');
    setUser(null);
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} />
      <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup onSignup={handleLogin} />} />
      <Route element={user ? <Layout user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />}>
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/study" element={<StudyHub />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/books" element={<BookLibrary />} />
        <Route path="/budget" element={<BudgetCalculator />} />
        <Route path="/attendance" element={<AttendanceCalculator />} />
        <Route path="/cgpa" element={<CgpaCalculator />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/events" element={<EventsClubs />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/campus" element={<CampusMap />} />
        <Route path="/lost-found" element={<LostFound />} />
        <Route path="/emergency" element={<EmergencySupport />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/assistant" element={<StudentAssistant />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/packing" element={<PackingChecklist />} />
        <Route path="/food" element={<FoodGuide />} />
        <Route path="/team-finder" element={<TeamFinder />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
