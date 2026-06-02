import { useContext } from 'react';
import { ContextBadge } from './components/ContextBadge';
import { ThemeContext } from './ThemeContext';

export default function ContextMiniFooter() {
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
