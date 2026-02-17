import React from 'react';

/** Maps a default-exported module to { Component } for React Router's lazy prop */
const lazyDefault = (importFn: () => Promise<{ default: React.ComponentType<any> }>) =>
  () => importFn().then(m => ({ Component: m.default }));

/** Maps a named export to { Component } for React Router's lazy prop */
const lazyNamed = <T extends Record<string, any>>(importFn: () => Promise<T>, name: keyof T) =>
  () => importFn().then(m => ({ Component: m[name] }));

const rawLoaders = {
  Home: lazyDefault(() => import('@pages/Home')),
  DashboardLayout: lazyNamed(() => import('@layouts/DashboardLayout'), 'DashboardLayout'),
  ProjectDetailLayout: lazyNamed(() => import('@layouts/ProjectDetailLayout'), 'ProjectDetailLayout'),
  Overview: lazyDefault(() => import('@pages/dashboard/Overview')),
  Projects: lazyDefault(() => import('@pages/dashboard/Projects')),
  ProjectFeedbacks: lazyDefault(() => import('@pages/dashboard/ProjectFeedbacks')),
  ProjectSettings: lazyDefault(() => import('@pages/dashboard/ProjectSettings')),
  Settings: lazyDefault(() => import('@pages/dashboard/Settings')),
  Subscription: lazyDefault(() => import('@pages/dashboard/Subscription')),
  NotFound: lazyDefault(() => import('@pages/errors/NotFound')),
  ServerError: lazyDefault(() => import('@pages/errors/ServerError')),
  
  // Docs
  DocsLayout: lazyNamed(() => import('@layouts/DocsLayout'), 'DocsLayout'),
  DocsOverview: lazyDefault(() => import('@pages/docs/Overview')),
  DocsImplementation: lazyDefault(() => import('@pages/docs/Implementation')),
};

export type RouteLoaderKey = keyof typeof rawLoaders;

const promiseCache: Partial<Record<RouteLoaderKey, Promise<any>>> = {};

/**
 * Enhanced route loader that:
 * 1. Caches the promise so it's only created once
 * 2. Can be manually triggered (prefetched)
 */
export const routeLoaders = (Object.keys(rawLoaders) as RouteLoaderKey[]).reduce((acc, key) => {
  acc[key] = () => {
    if (!promiseCache[key]) {
      promiseCache[key] = rawLoaders[key]();
    }
    return promiseCache[key]!;
  };
  return acc;
}, {} as Record<RouteLoaderKey, () => Promise<any>>);

export const prefetchRoute = (key: RouteLoaderKey) => {
  if (!promiseCache[key]) {
    promiseCache[key] = rawLoaders[key]();
  }
};




