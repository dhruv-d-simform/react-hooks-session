import { DrillBadge } from './DrillBadge';

type Theme = 'dark' | 'light';

export function DrillMiniCard({
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
