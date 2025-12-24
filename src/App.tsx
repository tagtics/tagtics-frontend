import { useEffect } from 'react';
import { AppRouter } from './AppRouter';
import Tagtics from 'tagtics-client';

export function App() {
    useEffect(() => {
        // Global Initialization
        Tagtics.init({
            apiKey: 'TEST_KEY',
            includePaths: ['^/$'],  // Only home page
            privacyNotice: 'Custom privacy notice for testing',
            serializeChildDepth: 2,
            // testingMode: true,
        });

        return () => {
            Tagtics.destroy();
        };
    }, []);

    return (
        <AppRouter />
    );
}