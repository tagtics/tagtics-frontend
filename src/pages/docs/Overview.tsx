
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Zap,
    Shield,
    MousePointer2,
    Smartphone,
    Code2,
    Database,
    Layout,
    Box,
    Globe,
    Cpu,
    CheckCircle2
} from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};


function FeatureCard({ icon: Icon, title, description, badge }: { icon: any, title: string, description: string, badge?: string }) {
    return (
        <motion.div
            variants={item}
            className="group p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 shadow-sm hover:shadow-md dark:shadow-none hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-4 h-4" />
                </div>
                {badge && (
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                        {badge}
                    </span>
                )}
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}

function TechStackCard({ title, items, icon: Icon }: { title: string, items: string[], icon: any }) {
    return (
        <motion.div
            variants={item}
            className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5"
        >
            <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white">
                    <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">{title}</h3>
            </div>
            <div className="space-y-1.5">
                {items.map((tech) => (
                    <div key={tech} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500/80" />
                        <span>{tech}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

function OnThisPage({ sections }: { sections: { id: string, label: string }[] }) {
    return (
        <aside className="hidden xl:block sticky top-6 h-fit">
            <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3 px-2">
                    On This Page
                </h4>
                <ul className="space-y-0.5">
                    {sections.map((section) => (
                        <li key={section.id}>
                            <a
                                href={`#${section.id}`}
                                className="block px-2 py-1 text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-white/5"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                {section.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default function Overview() {
    const { section } = useParams();

    const renderContent = () => {
        switch (section) {
            case 'features':
                return (
                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_200px] gap-6 items-start">
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-3">
                                    Features
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                                    Comprehensive tools designed to make feedback collection seamless and actionable.
                                </p>
                            </div>

                            <section id="client-features" className="scroll-mt-24">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-blue-500" />
                                    Client Features
                                </h2>
                                <motion.div
                                    variants={container}
                                    initial="hidden"
                                    animate="show"
                                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                                >
                                    <FeatureCard
                                        icon={Layout}
                                        title="Premium Glassmorphism UI"
                                        description="A stunning, modern dark theme feedback widget with blur effects that feels premium."
                                        badge="v2.0"
                                    />
                                    <FeatureCard
                                        icon={MousePointer2}
                                        title="Smart Element Picker"
                                        description="Intelligent DOM element selection with precise hover highlighting and breadcrumb paths."
                                    />
                                    <FeatureCard
                                        icon={Shield}
                                        title="Visibility Control"
                                        description="Granular control over where the widget appears using Regex-based include/exclude paths."
                                    />
                                    <FeatureCard
                                        icon={Smartphone}
                                        title="Auto SPA Support"
                                        description="Automatically detects route changes in React, Vue, and other single-page applications."
                                    />
                                </motion.div>
                            </section>

                            <section id="dashboard-features" className="scroll-mt-24">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Layout className="w-5 h-5 text-purple-500" />
                                    Dashboard Features
                                </h2>
                                <motion.div
                                    variants={container}
                                    initial="hidden"
                                    animate="show"
                                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                                >
                                    <FeatureCard
                                        icon={Zap}
                                        title="Batch Sync Engine"
                                        description="A background queue intelligently batches and syncs user feedback every 30 seconds, significantly reducing database calls compared to per-request writes."
                                    />
                                    <FeatureCard
                                        icon={Box}
                                        title="Project Management"
                                        description="Organize feedback across multiple projects and domains efficiently."
                                    />
                                </motion.div>
                            </section>
                        </div>
                        <OnThisPage sections={[
                            { id: 'client-features', label: 'Client Features' },
                            { id: 'dashboard-features', label: 'Dashboard Features' }
                        ]} />
                    </div>
                );

            case 'tech-stack':
                return (
                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_200px] gap-6 items-start">
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-3xl font-bold mb-3">Tech Stack</h1>
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                                    Built on the bleeding edge of modern web development for performance and scale.
                                </p>
                            </div>

                            <motion.div
                                variants={container}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                <div id="frontend" className="scroll-mt-24">
                                    <TechStackCard
                                        title="Frontend Architecture"
                                        icon={Code2}
                                        items={[
                                            "React 18 with TypeScript",
                                            "Zustand State Management",
                                            "Tailwind CSS + Glassmorphism",
                                            "Framer Motion Animations",
                                            "Radix UI Primitives"
                                        ]}
                                    />
                                </div>
                                <div id="backend" className="scroll-mt-24">
                                    <TechStackCard
                                        title="Backend & Infrastructure"
                                        icon={Database}
                                        items={[
                                            "Supabase (PostgreSQL)",
                                            "Row-Level Security (RLS)",
                                            "Edge Functions",
                                            "Real-time Subscriptions",
                                            "Redis Cache"
                                        ]}
                                    />
                                </div>
                                <div id="sdk" className="scroll-mt-24">
                                    <TechStackCard
                                        title="Client SDK"
                                        icon={Cpu}
                                        items={[
                                            "Framework Agnostic Core",
                                            "Zero-Dependency Architecture",
                                            "Native DOM API Integration",
                                            "Shadow DOM Isolation",
                                            "TypeScript Native"
                                        ]}
                                    />
                                </div>
                            </motion.div>
                        </div>
                        <OnThisPage sections={[
                            { id: 'frontend', label: 'Frontend' },
                            { id: 'backend', label: 'Backend' },
                            { id: 'sdk', label: 'Client SDK' }
                        ]} />
                    </div>
                );

            case 'intro':
            default:
                return (
                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_200px] gap-6 items-start">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent">
                                    Documentation
                                </h1>
                                <p className="text-lg font-light text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Tagtics is a plug-and-play, framework-agnostic tool that lets developers tag UI elements to collect user feedback and generate real-time analytics. It helps teams understand how users interact with their interfaces — without altering existing codebases. Perfect for improving UX with minimal integration.
                                </p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-1 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20"
                            >
                                <div className="p-5 rounded-xl bg-white/50 dark:bg-black/40 backdrop-blur-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                            <Zap className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">
                                                Why Tagtics?
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                                Traditional feedback forms are disconnected from the UI. Users say "the button is broken",
                                                but developers need to know <em>which</em> button, on <em>which</em> page, and with <em>what</em> state.
                                                Tagtics solves this by anchoring feedback to the DOM.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <div id="quick-start" className="grid grid-cols-1 md:grid-cols-2 gap-3 scroll-mt-24">
                                <FeatureCard
                                    icon={MousePointer2}
                                    title="Point & Click"
                                    description="Users simply hover and click the element they want to give feedback on."
                                />
                                <FeatureCard
                                    icon={Code2}
                                    title="Developer Ready"
                                    description="Get the exact component name, class, and computed styles automatically."
                                />
                            </div>
                        </div>
                        <OnThisPage sections={[
                            { id: 'quick-start', label: 'Quick Start' }
                        ]} />
                    </div>
                );
        }
    };

    return (
        <div className="animate-fade-in w-full">
            {renderContent()}
        </div>
    );
}
