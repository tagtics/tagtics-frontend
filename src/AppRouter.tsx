import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "./utils/LoadingFallback.tsx";

export function AppRouter() {
  const Home = lazy(() => import('./pages/Home.tsx'));
  const DashboardLayout = lazy(() => import('./layouts/DashboardLayout.tsx').then(module => ({ default: module.DashboardLayout })));
  const ProjectDetailLayout = lazy(() => import('./layouts/ProjectDetailLayout.tsx').then(module => ({ default: module.ProjectDetailLayout })));
  const Overview = lazy(() => import('./pages/dashboard/Overview.tsx'));
  const Projects = lazy(() => import('./pages/dashboard/Projects.tsx'));
  const ProjectFeedbacks = lazy(() => import('./pages/dashboard/ProjectFeedbacks.tsx'));
  const ProjectSettings = lazy(() => import('./pages/dashboard/ProjectSettings.tsx'));

  return <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="projects" element={<Projects />} />

          {/* Project Detail Routes with Sub-Navigation */}
          <Route path="projects/:projectId" element={<ProjectDetailLayout />}>
            <Route index element={<ProjectFeedbacks />} />
            <Route path="analytics" element={<div className="text-white">Analytics Coming Soon</div>} />
            <Route path="settings" element={<ProjectSettings />} />
          </Route>

          <Route path="settings" element={<div className="text-white">Settings</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>;
}