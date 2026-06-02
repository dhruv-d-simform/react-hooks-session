export function FilterInputs({
    query,
    name,
    onQueryChange,
    onNameChange,
}: {
    query: string;
    name: string;
    onQueryChange: (v: string) => void;
    onNameChange: (v: string) => void;
}) {
    return (
        <div className="grid grid-cols-2 gap-2">
            <div>
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                    Filter (try "React")
                </label>
                <input
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder="Search items…"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-600"
                />
            </div>
            <div>
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                    Name (unrelated)
                </label>
                <input
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    placeholder="Type here…"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-600"
                />
            </div>
        </div>
    );
}
