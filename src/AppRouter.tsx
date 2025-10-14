import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "./utils/LoadingFallback.tsx";

export function AppRouter() {
  const Home = lazy(() => import('./pages/Home.tsx'));
  const Dashboard = lazy(() => import('./pages/Dashboard.tsx'));
  return <BrowserRouter
    future={{
      v7_startTransition: true,
    }}
  >
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense >
  </BrowserRouter>;
}