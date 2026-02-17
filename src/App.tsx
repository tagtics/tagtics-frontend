import { useEffect } from 'react';
import 'nprogress/nprogress.css';
import { router } from '@/AppRouter';
import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import Tagtics from 'tagtics-client';



export function App() {
    useEffect(() => {
        // Global Initialization
        Tagtics.init({
            apiKey: 'TEST_KEY',
            privacyNotice: 'Custom privacy notice for testing',
            serializeChildDepth: 2,
            testingMode: true,
        });

        return () => {
            Tagtics.destroy();
        };
    }, []);

    return (
        <ErrorBoundary>
            <RouterProvider router={router} />
        </ErrorBoundary>
    );
}