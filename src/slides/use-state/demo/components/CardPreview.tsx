import { COLORS } from '../utils/colors';

export function CardPreview({
    name,
    role,
    colorIdx,
    isActive,
}: {
    name: string;
    role: string;
    colorIdx: number;
    isActive: boolean;
}) {
    const color = COLORS[colorIdx];
    return (
        <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
                Live Preview
            </p>
            <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-4 flex items-center gap-4">
                <div
                    className={`w-12 h-12 rounded-full ${color.bg} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                >
                    {name.charAt(0).toUpperCase() || '?'}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-zinc-100 truncate">
                            {name || 'Enter a name'}
                        </p>
                        {isActive && (
                            <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                        )}
                    </div>
                    <p className="text-xs text-zinc-400 truncate">
                        {role || 'Enter a role'}
                    </p>
                </div>
            </div>
        </div>
    );
}
