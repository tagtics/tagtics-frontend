import { DashboardHeader } from '@components/common/DashboardHeader';
import SEO from '@components/common/SEO';

export default function Subscription() {
    const breadcrumbItems = [
        { label: 'Dashboard', onClick: () => window.location.href = '/dashboard' },
        { label: 'Subscription', active: true }
    ];

    return (
        <div className="space-y-6">
            <SEO title="Subscription" description="Manage your subscription plan." />
            <DashboardHeader breadcrumbItems={breadcrumbItems} />
            <div className="p-8 rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none backdrop-blur-md text-center">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Subscription Management</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your plan and billing details here.</p>
                <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm inline-block">
                    Coming Soon
                </div>
            </div>
        </div>
    );
}
