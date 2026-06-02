import { useState } from 'react';
import { DrillBadge } from './components/DrillBadge';

export const fileUrl = '/src/slides/use-context/demo/PropDrilling.tsx';

type Theme = 'dark' | 'light';

function MiniFooter({ theme }: { theme: Theme }) {
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
            <DrillBadge prop="theme" />
        </div>
    );
}

function MiniCard({
    title,
    body,
    theme,
}: {
    title: string;
    body: string;
    theme: Theme;
}) {
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
                <DrillBadge prop="theme" />
            </div>
            <p
                className={`text-[11px] leading-relaxed ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}
            >
                {body}
            </p>
        </div>
    );
}

function MiniContent({ theme }: { theme: Theme }) {
    return (
        <div
            className={`p-3 space-y-2 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-50'}`}
        >
            <div className="flex justify-end mb-1">
                <DrillBadge prop="theme →" />
            </div>
            <MiniCard
                theme={theme}
                title="Dashboard"
                body="Your weekly stats are looking great. Keep it up!"
            />
            <MiniCard
                theme={theme}
                title="Recent Activity"
                body="You completed 3 tasks and resolved 1 bug today."
            />
        </div>
    );
}

function MiniHeader({
    theme,
    onToggle,
}: {
    theme: Theme;
    onToggle: () => void;
}) {
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
                <DrillBadge prop="theme, onToggle" />
            </div>
            <button
                onClick={onToggle}
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

export default function PropDrilling() {
    const [theme, setTheme] = useState<Theme>('dark');

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <DrillBadge prop="theme, onToggle" />
                <p className="text-[10px] text-zinc-600">
                    passed manually at every level
                </p>
            </div>
            <div className="rounded-lg overflow-hidden border border-zinc-700/50">
                <MiniHeader
                    theme={theme}
                    onToggle={() =>
                        setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
                    }
                />
                <MiniContent theme={theme} />
                <MiniFooter theme={theme} />
            </div>
            <div className="bg-rose-900/10 border border-rose-700/20 rounded-lg p-2.5">
                <p className="text-[10px] text-rose-400/80 leading-relaxed">
                    ⚠️ Every component must accept and forward{' '}
                    <span className="font-mono">theme</span> as a prop — even if
                    it doesn't use it directly.
                </p>
            </div>
        </div>
    );
}
