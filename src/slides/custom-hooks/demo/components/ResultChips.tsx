export function ResultChips({
    results,
    query,
}: {
    results: string[];
    query: string;
}) {
    return (
        <div className="flex flex-wrap gap-1.5 min-h-[2rem]">
            {results.length === 0 ? (
                <span className="text-xs text-zinc-600 italic">
                    no hooks match &ldquo;{query}&rdquo;
                </span>
            ) : (
                results.map((h) => (
                    <span
                        key={h}
                        className="text-[11px] font-mono px-2 py-1 rounded-md border bg-teal-500/10 text-teal-200 border-teal-500/30"
                    >
                        {h}
                    </span>
                ))
            )}
        </div>
    );
}
