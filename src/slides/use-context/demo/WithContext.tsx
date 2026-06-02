import { useState } from 'react';
import { ThemeContext } from './ThemeContext';
import type { Theme } from './ThemeContext';
import ContextMiniHeader from './ContextMiniHeader';
import ContextMiniCard from './ContextMiniCard';
import ContextMiniFooter from './ContextMiniFooter';

export const fileUrl = '/src/slides/use-context/demo/WithContext.tsx';

export default function WithContext() {
    const [theme, setTheme] = useState<Theme>('dark');

    return (
        <div className="space-y-3">
            <p className="text-[10px] text-zinc-600">
                All components read from{' '}
                <span className="font-mono text-indigo-400">ThemeContext</span>{' '}
                — no props passed between them.
            </p>
            <ThemeContext.Provider
                value={{
                    theme,
                    toggle: () =>
                        setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
                }}
            >
                <div className="rounded-lg overflow-hidden border border-zinc-700/50">
                    <ContextMiniHeader />
                    <div
                        className={`p-3 space-y-2 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-50'}`}
                    >
                        <ContextMiniCard
                            title="Dashboard"
                            body="Your weekly stats are looking great. Keep it up!"
                        />
                        <ContextMiniCard
                            title="Recent Activity"
                            body="You completed 3 tasks and resolved 1 bug today."
                        />
                    </div>
                    <ContextMiniFooter />
                </div>
            </ThemeContext.Provider>
        </div>
    );
}
