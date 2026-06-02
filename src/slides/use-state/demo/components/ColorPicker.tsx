import { COLORS } from '../utils/colors';

export function ColorPicker({
    colorIdx,
    onChange,
}: {
    colorIdx: number;
    onChange: (i: number) => void;
}) {
    return (
        <div>
            <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                Avatar Color
            </label>
            <div className="flex gap-2">
                {COLORS.map((c, i) => (
                    <button
                        key={c.label}
                        onClick={() => onChange(i)}
                        className={`w-7 h-7 rounded-full ${c.bg} transition-all ${
                            colorIdx === i
                                ? `ring-2 ring-offset-2 ring-offset-zinc-900 ${c.ring}`
                                : ''
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
