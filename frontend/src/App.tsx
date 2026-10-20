import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import CareerDna from "./pages/CareerDna";
import Dashboard from "./pages/Dashboard";
import CareerExplorer from "./pages/CareerExplorer";
import CareerDetail from "./pages/CareerDetail";
import Roadmap from "./pages/Roadmap";
import Colleges from "./pages/Colleges";
import Scholarships from "./pages/Scholarships";
import Profile from "./pages/Profile";
import { getToken } from "./api/client";

function RequireAuth({ children }: { children: JSX.Element }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  useEffect(() => setAuthed(!!getToken()), []);
  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto rounded-xl bg-brand-600 animate-pulse" />
          <p className="mt-4 text-sm font-semibold text-slate-500">Checking your session...</p>
        </div>
      </div>
    );
  }
  return authed ? children : <Navigate to="/login" replace />;
}



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/onboarding" element={<RequireAuth><Onboarding /></RequireAuth>} />
        <Route path="/career-dna" element={<RequireAuth><CareerDna /></RequireAuth>} />
        <Route path="/assessment" element={<Navigate to="/career-dna" replace />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/careers" element={<RequireAuth><CareerExplorer /></RequireAuth>} />
        <Route path="/careers/:slug" element={<RequireAuth><CareerDetail /></RequireAuth>} />
        <Route path="/roadmap" element={<RequireAuth><Roadmap /></RequireAuth>} />
        <Route path="/degree-guidance" element={<Navigate to="/career-dna?stage=ug" replace />} />
        <Route path="/colleges" element={<RequireAuth><Colleges /></RequireAuth>} />
        <Route path="/scholarships" element={<RequireAuth><Scholarships /></RequireAuth>} />
        <Route path="/advisor" element={<Navigate to="/career-dna?stage=ug" replace />} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />

      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
