export function RefLiveDisplay({
    intervalActive,
    elapsed,
}: {
    intervalActive: boolean;
    elapsed: number;
}) {
    return (
        <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-3 font-mono text-[11px] space-y-1.5">
            <p className="text-zinc-500">
                <span className="text-purple-400">const</span>{' '}
                <span className="text-amber-300">intervalRef</span> ={' '}
                <span className="text-yellow-400">useRef</span>(
                <span className="text-orange-300">null</span>)
            </p>
            <p className="text-zinc-500">
                <span className="text-amber-300">intervalRef</span>.current ={' '}
                <span className="text-zinc-300">
                    {intervalActive ? 'setInterval(...)' : 'null'}
                </span>
                <span className="text-zinc-600 ml-2">
                    ← live value, no re-render
                </span>
            </p>
            <p className="text-zinc-500">
                <span className="text-indigo-300">elapsed</span> ={' '}
                <span className="text-zinc-300">{elapsed}</span>
                <span className="text-zinc-600 ml-2">
                    ← state, causes re-render
                </span>
            </p>
        </div>
    );
}
