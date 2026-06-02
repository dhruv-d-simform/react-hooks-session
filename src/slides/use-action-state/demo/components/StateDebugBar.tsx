export function StateDebugBar({
    status,
    isPending,
}: {
    status: string;
    isPending: boolean;
}) {
    return (
        <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-2.5 font-mono text-[11px] flex items-center gap-2">
            <span className="text-pink-300">state.status</span>
            <span className="text-zinc-600">=</span>
            <span className="text-zinc-300">"{status}"</span>
            <span className="ml-auto text-indigo-300">
                isPending: {String(isPending)}
            </span>
        </div>
    );
}
