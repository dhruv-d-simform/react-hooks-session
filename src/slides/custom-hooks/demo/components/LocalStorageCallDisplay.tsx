export function LocalStorageCallDisplay({
    storageKey,
}: {
    storageKey: string;
}) {
    return (
        <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-2.5 font-mono text-[11px]">
            <span className="text-purple-400">const</span>{' '}
            <span className="text-zinc-200">[</span>
            <span className="text-indigo-300">name</span>
            <span className="text-zinc-200">, </span>
            <span className="text-emerald-400">setName</span>
            <span className="text-zinc-200">] = </span>
            <span className="text-yellow-400">useLocalStorage</span>
            <span className="text-zinc-200">(</span>
            <span className="text-orange-300">'{storageKey}'</span>
            <span className="text-zinc-200">, …)</span>
        </div>
    );
}
