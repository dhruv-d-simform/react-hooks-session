export function SearchInput({
    value,
    renderedValue,
    onChange,
}: {
    value: string;
    renderedValue: string;
    onChange: (value: string) => void;
}) {
    const isStale = value !== renderedValue;

    return (
        <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-zinc-500 block">
                Search 1000 items (try "neon", "falcon", "react")
            </label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Type fast to feel the difference…"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-600"
            />
            <div className="flex items-center gap-3 text-[10px] font-mono">
                <span className="text-zinc-500">
                    input: <span className="text-indigo-300">"{value}"</span>
                </span>
                <span className="text-zinc-500">
                    list rendered with:{' '}
                    <span
                        className={
                            isStale ? 'text-amber-300' : 'text-emerald-300'
                        }
                    >
                        "{renderedValue}"
                    </span>
                </span>
                {isStale && (
                    <span className="text-amber-400 animate-pulse">
                        ⏳ catching up…
                    </span>
                )}
            </div>
        </div>
    );
}
