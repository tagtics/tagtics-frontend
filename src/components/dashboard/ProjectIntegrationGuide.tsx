import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Project } from '@store/projectStore';

interface ProjectIntegrationGuideProps {
    project: Project;
}

export function ProjectIntegrationGuide({ project }: ProjectIntegrationGuideProps) {
    const [copiedKey, setCopiedKey] = useState(false);
    const [copiedInstall, setCopiedInstall] = useState(false);
    const [copiedInit, setCopiedInit] = useState(false);

    const copyToClipboard = (text: string, setFn: (val: boolean) => void) => {
        navigator.clipboard.writeText(text);
        setFn(true);
        setTimeout(() => setFn(false), 2000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Connect your Project</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Follow these steps to start collecting feedback.
                </p>
            </div>

            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-xl p-6 shadow-sm">
                <div className="space-y-6">
                    {/* 1. Get API Key */}
                    <div className="group flex gap-4">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">1</div>
                        <div className="flex-1 space-y-2">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Get your API Key</h4>
                            <div className="flex items-center gap-2">
                                <code className="flex-1 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-gray-600 dark:text-gray-400">
                                    {project.apiKey ? `${project.apiKey.slice(0, 10)}......................${project.apiKey.slice(-4)}` : 'pk_live_...'}
                                </code>
                                <button
                                    onClick={() => copyToClipboard(project.apiKey, setCopiedKey)}
                                    title="Copy API Key"
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    {copiedKey ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 2. Install Package */}
                    <div className="group flex gap-4">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">2</div>
                        <div className="flex-1 space-y-2">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Install Package</h4>
                            <div className="relative group/code">
                                <div className="absolute inset-y-0 left-0 w-1 bg-blue-500/50 rounded-l-lg opacity-0 group-hover/code:opacity-100 transition-opacity" />
                                <div className="bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 flex items-center justify-between">
                                    <code className="text-xs text-gray-600 dark:text-gray-400 font-mono">npm install tagtics-client</code>
                                    <button
                                        onClick={() => copyToClipboard('npm install tagtics-client', setCopiedInstall)}
                                        title="Copy Command"
                                        className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        {copiedInstall ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Initialize */}
                    <div className="group flex gap-4">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">3</div>
                        <div className="flex-1 space-y-2">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Initialize Tagtics</h4>
                            <div className="relative group/code">
                                <div className="bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-lg p-4">
                                    <button
                                        onClick={() => copyToClipboard(`import { Tagtics } from 'tagtics-client';\n\nTagtics.init({\n  apiKey: '${project.apiKey}'\n});`, setCopiedInit)}
                                        className="absolute top-3 right-3 p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-md text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        {copiedInit ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                    <pre className="text-[11px] text-gray-600 dark:text-gray-400 font-mono leading-relaxed whitespace-pre-wrap">
                                        {`import { Tagtics } from 'tagtics-client';

Tagtics.init({
  apiKey: 'YOUR_API_KEY'
});`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <a href="#" className="text-xs text-blue-500 hover:text-blue-400 font-medium transition-colors">
                    Read the full documentation &rarr;
                </a>
            </div>
        </div>
    );
}
