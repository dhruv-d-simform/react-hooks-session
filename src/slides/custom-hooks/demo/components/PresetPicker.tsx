import { PRESETS } from '../utils/presets';

export function PresetPicker({
    active,
    onSelect,
}: {
    active: number;
    onSelect: (seconds: number) => void;
}) {
    return (
        <div className="flex gap-1.5">
            {PRESETS.map((p) => (
                <button
                    key={p.seconds}
                    onClick={() => onSelect(p.seconds)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-colors ${
                        active === p.seconds
                            ? 'bg-teal-500/20 border-teal-500/40 text-teal-300'
                            : 'bg-zinc-800/60 border-zinc-700/50 text-zinc-400 hover:text-zinc-200'
                    }`}
                >
                    {p.label}
                </button>
            ))}
        </div>
    );
}
