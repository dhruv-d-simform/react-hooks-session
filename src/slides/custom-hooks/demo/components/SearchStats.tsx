export function SearchStats({
    searchCount,
    resultCount,
}: {
    searchCount: number;
    resultCount: number;
}) {
    return (
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <span>
                keystrokes don&rsquo;t fire searches — debounced searches run:{' '}
                <span className="text-teal-400">{searchCount}</span>
            </span>
            <span className="bg-zinc-800 px-2 py-0.5 rounded-full">
                {resultCount} match{resultCount === 1 ? '' : 'es'}
            </span>
        </div>
    );
}
