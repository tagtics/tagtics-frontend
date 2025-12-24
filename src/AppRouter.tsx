import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "@utils/LoadingFallback";

export function AppRouter() {
  const Home = lazy(() => import('@pages/Home'));
  const DashboardLayout = lazy(() => import('@layouts/DashboardLayout').then(module => ({ default: module.DashboardLayout })));
  const ProjectDetailLayout = lazy(() => import('@layouts/ProjectDetailLayout').then(module => ({ default: module.ProjectDetailLayout })));
  const Overview = lazy(() => import('@pages/dashboard/Overview'));
  const Projects = lazy(() => import('@pages/dashboard/Projects'));
  const ProjectFeedbacks = lazy(() => import('@pages/dashboard/ProjectFeedbacks'));
  const ProjectSettings = lazy(() => import('@pages/dashboard/ProjectSettings'));
  const Settings = lazy(() => import('@pages/dashboard/Settings'));
  const Subscription = lazy(() => import('@pages/dashboard/Subscription'));

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

          <Route path="settings" element={<Settings />} />
          <Route path="subscription" element={<Subscription />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>;
}