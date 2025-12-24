import { useState, useEffect } from 'react';

import SEO from "@components/common/SEO";
import { MOCK_PROJECTS, MOCK_FEEDBACKS } from '@data/mock';
import { Activity, CheckCircle, FolderKanban, MessageSquare, TrendingUp, ExternalLink, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardHeader } from '@components/common/DashboardHeader';
import { cn } from '@utils/cn';

const trendData = [
    { name: 'Mon', active: 4, resolved: 2 },
    { name: 'Tue', active: 3, resolved: 5 },
    { name: 'Wed', active: 7, resolved: 3 },
    { name: 'Thu', active: 5, resolved: 8 },
    { name: 'Fri', active: 8, resolved: 4 },
    { name: 'Sat', active: 2, resolved: 3 },
    { name: 'Sun', active: 4, resolved: 4 },
];

export default function Overview() {
    const [isMounted, setIsMounted] = useState(false);
    const [activePopup, setActivePopup] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // --- DATA LOGIC ---
    const totalProjects = MOCK_PROJECTS.length;
    const totalFeedback = MOCK_FEEDBACKS.length;
    const resolvedFeedbacks = MOCK_FEEDBACKS.filter(f => f.status === 'resolved');
    const resolvedCount = resolvedFeedbacks.length;
    const pendingFeedbacks = MOCK_FEEDBACKS.filter(f => f.status !== 'resolved');
    const pendingCount = pendingFeedbacks.length;

    // Derived Lists for Popups
    const topProjects = MOCK_PROJECTS.slice(0, 3);
    const topPending = pendingFeedbacks.slice(0, 3);
    const topRecent = MOCK_FEEDBACKS.slice(0, 3); // Most recent total
    const topResolved = resolvedFeedbacks.slice(0, 3); // Most recent resolved

    // Recent Activity Feed (Derived from MOCK_FEEDBACKS)
    const recentActivity = MOCK_FEEDBACKS.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5).map(f => {
        let action = 'New report';
        let target = f.component || f.path;

        if (f.status === 'resolved') action = 'Issue resolved';
        if (f.type === 'feature') action = 'New feature request';
        if (f.type === 'design') action = 'Design feedback';

        // Calculate relative time (simplified)
        const date = new Date(f.timestamp);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        let time = `${diffInHours}h ago`;
        if (diffInHours < 1) time = 'Just now';
        if (diffInHours > 24) time = `${Math.floor(diffInHours / 24)}d ago`;

        return {
            id: f.id,
            action,
            target,
            time,
            type: f.type
        };
    });


    const stats = [
        {
            label: 'Total Projects',
            value: totalProjects,
            icon: FolderKanban,
            color: 'text-blue-500 dark:text-blue-400',
            bg: 'bg-blue-50 dark:bg-blue-500/10',
            border: 'border-blue-200 dark:border-blue-500/20',
            details: topProjects.map(p => ({ label: p.name, sub: p.url }))
        },
        {
            label: 'Total Feedback',
            value: totalFeedback,
            icon: MessageSquare,
            color: 'text-purple-600 dark:text-purple-400',
            bg: 'bg-purple-50 dark:bg-purple-500/10',
            border: 'border-purple-200 dark:border-purple-500/20',
            details: topRecent.map(f => ({ label: f.content, sub: f.component || f.path }))
        },
        {
            label: 'Resolved',
            value: resolvedCount,
            icon: CheckCircle,
            color: 'text-green-600 dark:text-green-400',
            bg: 'bg-green-50 dark:bg-green-500/10',
            border: 'border-green-200 dark:border-green-500/20',
            details: topResolved.map(f => ({ label: f.content, sub: f.component || f.path }))
        },
        {
            label: 'Pending Issues',
            value: pendingCount,
            icon: Activity,
            color: 'text-orange-600 dark:text-orange-400',
            bg: 'bg-orange-50 dark:bg-orange-500/10',
            border: 'border-orange-200 dark:border-orange-500/20',
            details: topPending.map(f => ({ label: f.content, sub: f.component || f.path }))
        },
    ];

    const breadcrumbItems = [
        { label: 'Dashboard', active: true }
    ];

    const handleStatClick = (label: string) => {
        if (activePopup === label) {
            setActivePopup(null);
        } else {
            setActivePopup(label);
        }
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col space-y-4 overflow-visible">
            <SEO title="Dashboard" description="Overview of your projects and recent feedback activity." />
            <h1 className="sr-only">Dashboard Overview</h1>
            {/* Header */}
            <div className="flex-none z-30 relative">
                <DashboardHeader breadcrumbItems={breadcrumbItems} />
            </div>

            {/* Stats Grid - High Z-Index for Popups */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-none relative z-20">
                {stats.map((stat) => (
                    <motion.div
                        key={stat.label}
                        onMouseEnter={() => setActivePopup(stat.label)}
                        onMouseLeave={() => setActivePopup(null)}
                        onClick={() => handleStatClick(stat.label)}
                        className={cn(
                            "relative p-3 rounded-xl border bg-white dark:bg-black/40 border-gray-100 dark:border-white/10 shadow-sm dark:shadow-none backdrop-blur-md overflow-visible group transition-all cursor-pointer border-l-4",
                            stat.color.replace(/text-/g, 'border-l-'),
                            "hover:shadow-md dark:hover:bg-opacity-50"
                        )}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={cn("p-1.5 rounded-lg bg-white/50 dark:bg-black/20")}>
                                    <stat.icon className={cn("w-4 h-4", stat.color)} />
                                </div>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">{stat.label}</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                        </div>

                        {/* Interactive Popup Details - High Z-Index to overlap charts */}
                        <AnimatePresence>
                            {activePopup === stat.label && stat.details && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                    className="absolute top-full left-0 right-0 mt-2 p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl z-50 w-full min-w-[200px]"
                                >
                                    <div className="space-y-2">
                                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Recent</div>
                                        {stat.details.map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between group/item p-1.5 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                                                <div className="flex flex-col overflow-hidden">
                                                    <span className="text-xs font-semibold text-gray-800 dark:text-white truncate">{item.label}</span>
                                                    <span className="text-[10px] text-gray-500 truncate">{item.sub}</span>
                                                </div>
                                                <ExternalLink className="w-3 h-3 text-gray-400 dark:text-gray-600 group-hover/item:text-blue-500 dark:group-hover/item:text-blue-400" />
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Split - Lower Z-Index */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-0 relative z-10 text-gray-900 dark:text-white">
                {/* Left Chart Section */}
                <div className="md:col-span-2 p-5 rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-black/40 shadow-sm dark:shadow-none backdrop-blur-md flex flex-col">
                    <div className="flex items-center justify-between mb-4 flex-none">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                            Activity Trend
                        </h2>
                        <select className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-2 py-1 text-xs text-gray-600 dark:text-gray-400 outline-none">
                            <option>Last 7 days</option>
                        </select>
                    </div>
                    <div className="flex-1 min-h-0 w-full relative -z-10">
                        {/* Recharts responsive container sometimes causes z-index issues, explicit low z-index here */}
                        {isMounted && (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="currentColor" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} dy={10} className="text-gray-500 dark:text-gray-400" />
                                    <YAxis stroke="currentColor" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} className="text-gray-500 dark:text-gray-400" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--tooltip-bg, #000)', border: '1px solid var(--tooltip-border, rgba(255,255,255,0.1))', borderRadius: '12px', zIndex: 100 }}
                                        itemStyle={{ color: 'var(--tooltip-text, #fff)' }}
                                    />
                                    <Area type="monotone" dataKey="active" stroke="#60A5FA" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
                                    <Area type="monotone" dataKey="resolved" stroke="#4ADE80" strokeWidth={3} fillOpacity={1} fill="url(#colorResolved)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Right Activity Feed */}
                <div className="p-5 rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-black/40 shadow-sm dark:shadow-none backdrop-blur-md flex flex-col">
                    <div className="flex items-center justify-between mb-4 flex-none">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <Clock className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                            Recent Activity
                        </h2>
                        <button className="text-xs text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">View All</button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex gap-3 items-start group">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-white/5 shrink-0">
                                    <Activity className="w-3 h-3" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {activity.action}
                                    </div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{activity.target}</span>
                                        <span className="text-[10px] text-gray-400 dark:text-gray-500">{activity.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
