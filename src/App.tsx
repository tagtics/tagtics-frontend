import { useEffect } from 'react';
import { AppRouter } from '@/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import Tagtics from 'tagtics-client';

import { Toaster } from 'sonner';

export function App() {
    useEffect(() => {
        // Global Initialization
        Tagtics.init({
            apiKey: 'TEST_KEY',
            includePaths: ['^/$'],  // Only home page
            privacyNotice: 'Custom privacy notice for testing',
            serializeChildDepth: 2,
            testingMode: true,
        });

        return () => {
            Tagtics.destroy();
        };
    }, []);

    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <ErrorBoundary>
                <AppRouter />
            </ErrorBoundary>
            <Toaster position="bottom-right" theme="dark" richColors />
        </BrowserRouter>
    );
}