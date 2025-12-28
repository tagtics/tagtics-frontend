import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

function CodeBlock({ code, language = 'javascript' }: { code: string, language?: string }) {
    const [copied, setCopied] = useState(false);
    const { isDark } = useTheme();

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1e1e1e] min-w-[300px] max-w-full w-fit">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1.5 rounded-md bg-white/90 dark:bg-black/80 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10 border border-gray-200 dark:border-white/10 shadow-sm"
                title="Copy to clipboard"
            >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <SyntaxHighlighter
                language={language}
                style={isDark ? vscDarkPlus : ghcolors}
                customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    padding: '0.75rem 1rem',
                    background: 'transparent',
                    fontSize: '0.875rem',
                    lineHeight: '1.4'
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}

export default function Implementation() {
    const { framework } = useParams();

    const getSnippet = () => {
        switch (framework) {
            case 'react':
                return `import { useEffect } from 'react';
import Tagtics from 'tagtics-client';

function App() {
  useEffect(() => {
    Tagtics.init({ apiKey: 'YOUR_API_KEY' });
    return () => Tagtics.destroy();
  }, []);

  return <YourApp />;
}`;
            case 'vue':
                return `import { onMounted, onUnmounted } from 'vue';
import Tagtics from 'tagtics-client';

export default {
  setup() {
    onMounted(() => {
      Tagtics.init({
        apiKey: 'YOUR_API_KEY'
      });
    });

    onUnmounted(() => {
      Tagtics.destroy();
    });
  }
}`;
            case 'angular':
                return `import { Component, OnInit, OnDestroy } from '@angular/core';
import Tagtics from 'tagtics-client';

@Component({...})
export class AppComponent implements OnInit, OnDestroy {
  ngOnInit() {
    Tagtics.init({
      apiKey: 'YOUR_API_KEY'
    });
  }

  ngOnDestroy() {
    Tagtics.destroy();
  }
}`;
            case 'svelte':
                return `<script>
  import { onMount, onDestroy } from 'svelte';
  import Tagtics from 'tagtics-client';

  onMount(() => {
    Tagtics.init({ apiKey: 'YOUR_API_KEY' });
  });

  onDestroy(() => {
    Tagtics.destroy();
  });
</script>`;
            case 'solid':
                return `import { onMount, onCleanup } from 'solid-js';
import Tagtics from 'tagtics-client';

function App() {
  onMount(() => {
    Tagtics.init({ apiKey: 'YOUR_API_KEY' });
  });

  onCleanup(() => {
    Tagtics.destroy();
  });

  return <YourApp />;
}`;
            case 'script':
            default:
                return `<!-- Include via CDN (example) -->
<script src="https://cdn.tagtics.online/client.js"></script>
<script>
  // Ensure the DOM is loaded
  window.addEventListener('DOMContentLoaded', () => {
    if (window.Tagtics) {
      window.Tagtics.init({
        apiKey: "YOUR_API_KEY"
      });
    }
  });
</script>`;
        }
    };

    const getTitle = () => {
        switch (framework) {
            case 'react': return 'React / Next.js Integration';
            case 'angular': return 'Angular Integration';
            case 'vue': return 'Vue 3 Integration';
            case 'svelte': return 'Svelte Integration';
            case 'solid': return 'Solid.js Integration';
            case 'script': return 'Vanilla JS / HTML';
            default: return 'Initialization Options';
        }
    };

    if (framework === 'overview') {
        return (
            <div className="animate-fade-in">
                <div className="mb-4">
                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded-full">
                        Overview
                    </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                    Client Overview
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Configure the Tagtics client for precise control over visibility and behavior.
                </p>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Installation</h2>
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                        Install the package via npm for any JavaScript framework.
                    </p>
                    <div className="mb-4">
                        <CodeBlock code="npm install tagtics-client" language="bash" />
                    </div>
                    <a
                        href="https://www.npmjs.com/package/tagtics-client"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        View on npm &rarr;
                    </a>
                </section>

                <section className="space-y-3 mb-10">
                    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-white/10">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 dark:bg-white/5">
                                <tr>
                                    <th className="p-3 font-medium text-gray-900 dark:text-white">Option</th>
                                    <th className="p-3 font-medium text-gray-900 dark:text-white">Type</th>
                                    <th className="p-3 font-medium text-gray-900 dark:text-white">Default</th>
                                    <th className="p-3 font-medium text-gray-900 dark:text-white">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-white/10 dark:text-gray-400 text-gray-600">
                                <tr>
                                    <td className="p-3 font-mono">apiKey</td>
                                    <td className="p-3 font-mono text-purple-400">string</td>
                                    <td className="p-3 font-mono">-</td>
                                    <td className="p-3"><strong>Required.</strong> Your project API key from the dashboard.</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono">includePaths</td>
                                    <td className="p-3 font-mono text-purple-400">string[]</td>
                                    <td className="p-3 font-mono">undefined</td>
                                    <td className="p-3">Regex patterns. Show widget <strong>ONLY</strong> on matching paths.</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono">excludePaths</td>
                                    <td className="p-3 font-mono text-purple-400">string[]</td>
                                    <td className="p-3 font-mono">undefined</td>
                                    <td className="p-3">Regex patterns. <strong>HIDE</strong> widget on matching paths.</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono">logoUrl</td>
                                    <td className="p-3 font-mono text-purple-400">string</td>
                                    <td className="p-3 font-mono">undefined</td>
                                    <td className="p-3">Custom logo URL to replace the default icon.</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono">privacyNotice</td>
                                    <td className="p-3 font-mono text-purple-400">string</td>
                                    <td className="p-3 font-mono">Default</td>
                                    <td className="p-3">Custom privacy notice text shown during feedback.</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono">serializeChildDepth</td>
                                    <td className="p-3 font-mono text-purple-400">number</td>
                                    <td className="p-3 font-mono">0</td>
                                    <td className="p-3">Depth of child elements to capture when selecting.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Path Control Logic</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <li><strong>SPA Support:</strong> Tagtics automatically detects route changes in React, Vue, Angular, etc.</li>
                            <li><strong>Mutually Exclusive:</strong> Use either <code>includePaths</code> OR <code>excludePaths</code>, not both.</li>
                            <li><strong>Regex:</strong> Paths are matched using Regex. E.g., <code>'.*dashboard.*'</code> matches any path containing 'dashboard'.</li>
                        </ul>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-4 mt-8">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl">
                        <h4 className="font-semibold text-sm text-blue-800 dark:text-blue-200 mb-1">Keyboard Shortcuts</h4>
                        <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                            <li><strong>Enter:</strong> Submit feedback</li>
                            <li><strong>Escape:</strong> Cancel / Close</li>
                            <li><strong>Ctrl+R:</strong> Reload page</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800 rounded-xl">
                        <h4 className="font-semibold text-sm text-purple-800 dark:text-purple-200 mb-1">Features</h4>
                        <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
                            <li>Glassmorphism UI</li>
                            <li>Smart SVG Element Picker</li>
                            <li>Auto Route Detection</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="mb-4">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                    Implementation Guide
                </span>
            </div>

            <h1 className="mb-4 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{getTitle()}</h1>

            <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
                Integrate Tagtics using modern lifecycle hooks. The client automatically handles route changes for you.
            </p>

            <div className="space-y-8">
                {framework === 'script' && (
                    <section>
                        <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">1. Installation</h2>
                        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                            Add the script tag to your HTML.
                        </p>
                    </section>
                )}

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{framework === 'script' ? '2. Initialization' : 'Initialization'}</h2>
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                        Call <code>init</code> when your app mounts and <code>destroy</code> when it unmounts to prevent memory leaks.
                    </p>
                    <CodeBlock code={getSnippet()} language={framework === 'script' ? 'html' : 'javascript'} />
                </section>
            </div>
        </div>
    );
}
