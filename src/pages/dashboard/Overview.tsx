import { useState, useEffect } from 'react';
import { MOCK_PROJECTS, MOCK_FEEDBACKS } from '../../data/mock';
import { Activity, CheckCircle, FolderKanban, MessageSquare, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

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

    useEffect(() => {
        // Delay rendering chart to allow container layout to settle
        const timer = setTimeout(() => setIsMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const totalProjects = MOCK_PROJECTS.length;
    const totalFeedback = MOCK_FEEDBACKS.length;
    const resolvedFeedback = MOCK_FEEDBACKS.filter(f => f.status === 'resolved').length;

    const stats = [
        { label: 'Total Projects', value: totalProjects, icon: FolderKanban, color: 'text-blue-400', from: 'from-blue-500/20', to: 'to-blue-600/5' },
        { label: 'Total Feedback', value: totalFeedback, icon: MessageSquare, color: 'text-purple-400', from: 'from-purple-500/20', to: 'to-purple-600/5' },
        { label: 'Resolved', value: resolvedFeedback, icon: CheckCircle, color: 'text-green-400', from: 'from-green-500/20', to: 'to-green-600/5' },
        { label: 'Pending', value: totalFeedback - resolvedFeedback, icon: Activity, color: 'text-orange-400', from: 'from-orange-500/20', to: 'to-orange-600/5' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Dashboard</h1>
                    <p className="text-gray-400">Welcome back to your command center.</p>
                </div>
                <div className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                    Last updated: Just now
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative p-4 rounded-2xl border border-white/10 bg-gradient-to-br ${stat.from} ${stat.to} backdrop-blur-md overflow-hidden group`}
                    >
                        {/* Hover Glow */}
                        <div className={`absolute -right-4 -top-4 w-20 h-20 bg-current opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform ${stat.color}`} />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`p-2 rounded-xl bg-black/20 backdrop-blur-sm`}>
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <TrendingUp className={`w-3 h-3 ${stat.color} opacity-50`} />
                            </div>
                            <div className={`text-2xl font-bold text-white mb-0.5`}>{stat.value}</div>
                            <div className="text-gray-400 font-medium text-xs">{stat.label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Chart Section */}
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-5 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-white">Feedback Activity</h2>
                    <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-gray-400 outline-none">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                    </select>
                </div>

                <div className="h-[220px] w-full">
                    {isMounted && (
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={trendData}>
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
                                <XAxis
                                    dataKey="name"
                                    stroke="#666"
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#666"
                                    tickLine={false}
                                    axisLine={false}
                                    dx={-10}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="active"
                                    stroke="#60A5FA"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorActive)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="resolved"
                                    stroke="#4ADE80"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorResolved)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
