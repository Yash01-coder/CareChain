import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import MyRecords from "./pages/MyRecords";
import UploadRecord from "./pages/UploadRecord";
import GrantAccess from "./pages/GrantAccess";
import DoctorDashboard from "./pages/DoctorDashboard";
import AuditTrail from "./pages/AuditTrail";

// ==========================
// ROUTE GUARD
// Phase 25 - block unauthenticated access
// ==========================
function ProtectedRoute({ children, allowedRole }) {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // Wrong role — send to their correct dashboard
    return user.role === "doctor"
      ? <Navigate to="/doctor-dashboard" replace />
      : <Navigate to="/patient" replace />;
  }

  return children;
}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* PATIENT ONLY */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-records"
          element={
            <ProtectedRoute allowedRole="patient">
              <MyRecords />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute allowedRole="patient">
              <UploadRecord />
            </ProtectedRoute>
          }
        />

        <Route
          path="/grant-access"
          element={
            <ProtectedRoute allowedRole="patient">
              <GrantAccess />
            </ProtectedRoute>
          }
        />

        {/* Phase 24/28 - Audit Trail */}
        <Route
          path="/audit-trail"
          element={
            <ProtectedRoute allowedRole="patient">
              <AuditTrail />
            </ProtectedRoute>
          }
        />

        {/* DOCTOR ONLY */}
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;