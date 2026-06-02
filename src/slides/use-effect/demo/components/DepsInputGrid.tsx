export function DepsInputGrid({
    name,
    count,
    onNameChange,
    onCountChange,
}: {
    name: string;
    count: number;
    onNameChange: (value: string) => void;
    onCountChange: (value: number) => void;
}) {
    return (
        <div className="grid grid-cols-2 gap-2">
            <div>
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                    Name
                </label>
                <input
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-indigo-500 transition-colors"
                />
            </div>
            <div>
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                    Count
                </label>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onCountChange(count - 1)}
                        className="w-9 h-9 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-lg font-bold transition-colors"
                    >
                        −
                    </button>
                    <span className="text-xl font-black font-mono text-zinc-100 w-8 text-center tabular-nums">
                        {count}
                    </span>
                    <button
                        onClick={() => onCountChange(count + 1)}
                        className="w-9 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-lg font-bold transition-colors"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}
