import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { LoadingFallback } from "@utils/LoadingFallback";

import { routeLoaders } from "@/config/routeLoaders";


export const router = createBrowserRouter(
  createRoutesFromElements(
    // Global Suspense wrapper via Layout or just wrapping the root
    // Since createBrowserRouter doesn't support a simple wrapper like BrowserRouter does, 
    // we attach Suspense to the element prop or use a Root layout.
    // However, clean migration suggests keeping structure.
    // Let's create a Root element that handles the Suspense.
    <Route element={<RootLayout />}>
        <Route path="/" lazy={routeLoaders.Home} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" lazy={routeLoaders.DashboardLayout}>
          <Route index lazy={routeLoaders.Overview} />
          <Route path="projects" lazy={routeLoaders.Projects} />

          {/* Project Detail Routes with Sub-Navigation */}
          <Route path="projects/:projectId" lazy={routeLoaders.ProjectDetailLayout}>
            <Route index lazy={routeLoaders.ProjectFeedbacks} />
            <Route path="analytics" element={
              <div className="p-8 rounded-2xl border border-gray-100 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-sm dark:shadow-none backdrop-blur-md text-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Analytics</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Detailed insights coming soon.</p>
              </div>
            } />
            <Route path="settings" lazy={routeLoaders.ProjectSettings} />
          </Route>

          <Route path="settings" lazy={routeLoaders.Settings} />
          <Route path="subscription" lazy={routeLoaders.Subscription} />
        </Route>

        {/* Documentation Routes */}
        <Route path="docs" lazy={routeLoaders.DocsLayout}>
          <Route index element={<Navigate to="overview/intro" replace />} />
          <Route path="overview" element={<Navigate to="intro" replace />} />
          <Route path="overview/:section" lazy={routeLoaders.DocsOverview} />
          <Route path="implementation" element={<Navigate to="overview" replace />} />
          <Route path="implementation/:framework" lazy={routeLoaders.DocsImplementation} />
        </Route>

        <Route path="*" lazy={routeLoaders.NotFound} />
        <Route path="/500" lazy={routeLoaders.ServerError} />
    </Route>
  ),
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    }
  }
);

import { Outlet } from "react-router-dom";
import { Toaster } from 'sonner';
import { GlobalProgressBar } from "@components/common/GlobalProgressBar";

function RootLayout() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <GlobalProgressBar />
      <Outlet />
      <Toaster position="bottom-right" theme="dark" richColors />
    </Suspense>
  );
}