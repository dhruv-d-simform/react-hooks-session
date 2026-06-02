import { createContext, useContext, useState } from 'react';
import { ContextBadge } from './components/ContextBadge';

export const fileUrl = '/src/slides/use-context/demo/WithContext.tsx';

type Theme = 'dark' | 'light';

const ThemeContext = createContext<{
    theme: Theme;
    toggle: () => void;
}>({ theme: 'dark', toggle: () => {} });

function MiniHeader() {
    const { theme, toggle } = useContext(ThemeContext);
    return (
        <div
            className={`flex items-center justify-between px-3 py-2 rounded-t-lg border-b ${
                theme === 'dark'
                    ? 'bg-zinc-800 border-zinc-700'
                    : 'bg-gray-100 border-gray-200'
            }`}
        >
            <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-indigo-400">⚡</span>
                <span
                    className={`text-xs font-semibold ${theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'}`}
                >
                    MyApp
                </span>
                <ContextBadge />
            </div>
            <button
                onClick={toggle}
                className={`text-[11px] px-2 py-1 rounded-md border transition-colors ${
                    theme === 'dark'
                        ? 'border-zinc-600 text-zinc-400 hover:text-zinc-200'
                        : 'border-gray-300 text-gray-600 hover:text-gray-800'
                }`}
            >
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
        </div>
    );
}

function MiniCard({ title, body }: { title: string; body: string }) {
    const { theme } = useContext(ThemeContext);
    return (
        <div
            className={`rounded-lg p-3 border ${
                theme === 'dark'
                    ? 'bg-zinc-800/60 border-zinc-700'
                    : 'bg-white border-gray-200 shadow-sm'
            }`}
        >
            <div className="flex items-start justify-between mb-1">
                <p
                    className={`text-xs font-semibold ${theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'}`}
                >
                    {title}
                </p>
                <ContextBadge />
            </div>
            <p
                className={`text-[11px] leading-relaxed ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}
            >
                {body}
            </p>
        </div>
    );
}

function MiniFooter() {
    const { theme } = useContext(ThemeContext);
    return (
        <div
            className={`flex items-center justify-between px-3 py-2 rounded-b-lg border-t ${
                theme === 'dark'
                    ? 'bg-zinc-800/40 border-zinc-700'
                    : 'bg-gray-50 border-gray-200'
            }`}
        >
            <span
                className={`text-[10px] ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}
            >
                © 2024 MyApp
            </span>
            <ContextBadge />
        </div>
    );
}

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
                    <MiniHeader />
                    <div
                        className={`p-3 space-y-2 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-50'}`}
                    >
                        <MiniCard
                            title="Dashboard"
                            body="Your weekly stats are looking great. Keep it up!"
                        />
                        <MiniCard
                            title="Recent Activity"
                            body="You completed 3 tasks and resolved 1 bug today."
                        />
                    </div>
                    <MiniFooter />
                </div>
            </ThemeContext.Provider>
        </div>
    );
}
