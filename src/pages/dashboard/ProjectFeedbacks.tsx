import { useParams } from 'react-router-dom';
import { MOCK_PROJECTS, MOCK_FEEDBACKS } from '../../data/mock';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function ProjectFeedbacks() {
    const { projectId } = useParams();

    const project = MOCK_PROJECTS.find(p => p.id === projectId);
    const feedbacks = MOCK_FEEDBACKS.filter(f => f.projectId === projectId);

    if (!project) {
        return <div className="text-white">Project not found</div>;
    }

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

    return (
        <div className="space-y-4">
            {/* Feedback List */}
            {feedbacks.length === 0 ? (
                <div className="p-12 text-center text-gray-400 border border-white/10 rounded-xl bg-white/5">
                    No feedback found for this project yet.
                </div>
            ) : (
                <div className="space-y-3">
                    {feedbacks.map((item) => (
                        <div
                            key={item.id}
                            className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all cursor-pointer group"
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
                                    <p className="text-white text-sm font-medium mb-2 group-hover:text-blue-400 transition-colors">{item.content}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        <span>Element: <code className="text-blue-400 bg-black/30 px-1.5 py-0.5 rounded">{item.element}</code></span>
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
