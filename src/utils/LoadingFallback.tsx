import NProgress from 'nprogress';
import React, { useEffect } from 'react';

export const LoadingFallback: React.FC = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);
  // We render null because NProgress handles the visual indication
  return null;
}