const ACCENTS = [
    { key: 'teal', dot: 'bg-teal-500', ring: 'ring-teal-400' },
    { key: 'indigo', dot: 'bg-indigo-500', ring: 'ring-indigo-400' },
    { key: 'rose', dot: 'bg-rose-500', ring: 'ring-rose-400' },
    { key: 'amber', dot: 'bg-amber-500', ring: 'ring-amber-400' },
];

export function AccentPicker({
    accent,
    onChange,
}: {
    accent: string;
    onChange: (key: string) => void;
}) {
    return (
        <div>
            <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                Accent
            </label>
            <div className="flex gap-2">
                {ACCENTS.map((a) => (
                    <button
                        key={a.key}
                        onClick={() => onChange(a.key)}
                        className={`w-7 h-7 rounded-full ${a.dot} transition-all ${
                            accent === a.key
                                ? `ring-2 ring-offset-2 ring-offset-zinc-900 ${a.ring}`
                                : ''
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
