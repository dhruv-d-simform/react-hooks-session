export function DeferredSearchInput({
    query,
    deferredQuery,
    onChange,
}: {
    query: string;
    deferredQuery: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 flex items-center justify-between">
                <span>Search (try "React" or "Type")</span>
                <span className="normal-case font-normal text-zinc-600">
                    Input:{' '}
                    <span className="font-mono text-indigo-300">"{query}"</span>{' '}
                    • Deferred:{' '}
                    <span className="font-mono text-emerald-300">
                        "{deferredQuery}"
                    </span>
                </span>
            </label>
            <input
                value={query}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Type to filter…"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-600"
            />
        </div>
    );
}
