import { THEMES } from '../utils/data';

export function ThemePicker({
    themeId,
    onSelect,
}: {
    themeId: string;
    onSelect: (id: string) => void;
}) {
    return (
        <div>
            <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-2">
                Switch theme
            </p>
            <div className="flex gap-2">
                {THEMES.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => onSelect(t.id)}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors border ${
                            themeId === t.id
                                ? 'bg-purple-600 border-purple-500 text-white'
                                : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200'
                        }`}
                    >
                        {t.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
