import { useSearchParams, useParams } from 'react-router-dom';
import { MOCK_PROJECTS, MOCK_FEEDBACKS } from '../../data/mock';
import { AlertCircle, CheckCircle, Clock, Layers } from 'lucide-react';
import SEO from '../../components/common/SEO';

export default function ProjectFeedbacks() {
    const { projectId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedComponent = searchParams.get('component');

    const project = MOCK_PROJECTS.find(p => p.id === projectId);
    const feedbacks = MOCK_FEEDBACKS.filter(f => f.projectId === projectId);

    if (!project) {
        return <div className="text-white">Project not found</div>;
    }

    // Group feedbacks by component
    const groupedFeedbacks = feedbacks.reduce((acc, feedback) => {
        const componentName = feedback.component || 'Uncategorized';
        if (!acc[componentName]) {
            acc[componentName] = [];
        }
        acc[componentName].push(feedback);
        return acc;
    }, {} as Record<string, typeof feedbacks>);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'bug': return <AlertCircle className="w-3 h-3 text-red-400" />;
            case 'feature': return <CheckCircle className="w-3 h-3 text-blue-400" />;
            default: return <Clock className="w-3 h-3 text-gray-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'in-progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            default: return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
        }
    };



    const currentFeedbacks = selectedComponent
        ? groupedFeedbacks[selectedComponent]
        : [];

    return (
        <div className="space-y-6">
            <SEO title="Project Feedbacks" description="View and manage user feedback for your project." />
            <h1 className="sr-only">Project Feedbacks</h1>
            {!selectedComponent ? (
                // Groups View
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(groupedFeedbacks).map(([componentName, items]) => {
                        const bugCount = items.filter(i => i.type === 'bug').length;
                        const featureCount = items.filter(i => i.type === 'feature').length;

                        return (
                            <div
                                key={componentName}
                                onClick={() => setSearchParams({ component: componentName })}
                                className="p-6 rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none backdrop-blur-md hover:bg-gray-50 dark:hover:bg-white/10 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30 transition-colors">
                                        <Layers className="w-5 h-5" />
                                    </div>
                                    <div className="text-xs text-gray-400 font-medium px-2 py-1 rounded-full bg-white/5 border border-white/5">
                                        {items.length} items
                                    </div>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {componentName}
                                </h3>
                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                    {bugCount > 0 && (
                                        <span className="flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                            {bugCount} Bugs
                                        </span>
                                    )}
                                    {featureCount > 0 && (
                                        <span className="flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                            {featureCount} Features
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                // Details View
                <div className="space-y-3">
                    {currentFeedbacks.map((item) => (
                        <div
                            key={item.id}
                            className="p-4 rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none backdrop-blur-md hover:bg-gray-50 dark:hover:bg-white/10 transition-all cursor-pointer group"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        {getTypeIcon(item.type)}
                                        <span className="text-xs text-gray-400 capitalize">{item.type}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border capitalize ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                        <span className="text-xs text-gray-500 ml-auto">{new Date(item.timestamp).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-gray-900 dark:text-white text-sm font-medium mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.content}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        <span>Element: <code className="text-blue-500 dark:text-blue-400 bg-gray-100 dark:bg-black/30 px-1.5 py-0.5 rounded">{item.element}</code></span>
                                        <span className="truncate">Path: {item.path}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
