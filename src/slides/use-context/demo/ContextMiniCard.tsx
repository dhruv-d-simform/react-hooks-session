import { useContext } from 'react';
import { ContextBadge } from './components/ContextBadge';
import { ThemeContext } from './ThemeContext';

export default function ContextMiniCard({
    title,
    body,
}: {
    title: string;
    body: string;
}) {
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
