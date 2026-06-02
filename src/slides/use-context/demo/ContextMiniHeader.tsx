import { useContext } from 'react';
import { ContextBadge } from './components/ContextBadge';
import { ThemeContext } from './ThemeContext';

export default function ContextMiniHeader() {
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
