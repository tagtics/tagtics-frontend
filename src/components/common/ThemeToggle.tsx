import { Sun, Moon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
    className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Sync with document state on mount
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newTheme = !isDark;

        // @ts-ignore - View Transition API is new
        if (!document.startViewTransition) {
            setIsDark(newTheme);
            if (newTheme) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return;
        }

        const x = e.clientX;
        const y = e.clientY;
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        // @ts-ignore
        const transition = document.startViewTransition(() => {
            setIsDark(newTheme);
            if (newTheme) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        });

        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: 500,
                    easing: "ease-in-out",
                    pseudoElement: "::view-transition-new(root)",
                }
            );
        });
    };

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "relative w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors",
                className
            )}
            aria-label="Toggle Theme"
        >
            <Sun className="absolute w-5 h-5 transition-all text-yellow-500 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute w-5 h-5 transition-all text-blue-500 dark:text-blue-400 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
        </button>
    );
}
