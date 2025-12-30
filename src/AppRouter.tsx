import { Routes, Route, Navigate } from "react-router-dom";
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
  const NotFound = lazy(() => import('@pages/errors/NotFound'));
  const ServerError = lazy(() => import('@pages/errors/ServerError'));

  // Docs Imports
  const DocsLayout = lazy(() => import('@layouts/DocsLayout').then(module => ({ default: module.DocsLayout })));
  const DocsOverview = lazy(() => import('@pages/docs/Overview'));
  const DocsImplementation = lazy(() => import('@pages/docs/Implementation'));

  return (
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
            <Route path="analytics" element={
              <div className="p-8 rounded-2xl border border-gray-100 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-sm dark:shadow-none backdrop-blur-md text-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Analytics</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Detailed insights coming soon.</p>
              </div>
            } />
            <Route path="settings" element={<ProjectSettings />} />
          </Route>

          <Route path="settings" element={<Settings />} />
          <Route path="subscription" element={<Subscription />} />
        </Route>

        {/* Documentation Routes */}
        <Route path="docs" element={<DocsLayout />}>
          <Route index element={<Navigate to="overview/intro" replace />} />
          <Route path="overview" element={<Navigate to="intro" replace />} />
          <Route path="overview/:section" element={<DocsOverview />} />
          <Route path="implementation" element={<Navigate to="overview" replace />} />
          <Route path="implementation/:framework" element={<DocsImplementation />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/500" element={<ServerError />} />
      </Routes>
    </Suspense>
  );
}