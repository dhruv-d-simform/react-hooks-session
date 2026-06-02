export function CompositionDiagram() {
    return (
        <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-2.5 font-mono text-[11px] leading-relaxed">
            <span className="text-yellow-400">useDebouncedSearch</span>
            <span className="text-zinc-500"> ──calls──&gt; </span>
            <span className="text-yellow-400">useDebounce</span>
            <span className="text-zinc-500"> + </span>
            <span className="text-yellow-400">useState</span>
            <span className="text-zinc-500"> / </span>
            <span className="text-yellow-400">useEffect</span>
        </div>
    );
}
