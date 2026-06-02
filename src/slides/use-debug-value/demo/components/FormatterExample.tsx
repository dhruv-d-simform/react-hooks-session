export function FormatterExample({
    time,
}: {
    time: string;
}) {
    return (
        <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-3 font-mono text-[11px]">
            <p className="text-zinc-500 mb-1.5">Formatter overload example:</p>
            <p className="text-zinc-400">
                <span className="text-yellow-400">useDebugValue</span>
                (ts,{' '}
                <span className="text-zinc-300">
                    d =&gt; `Last seen: ${'${'}d.toLocaleTimeString(){'}'}`
                </span>
                )
            </p>
            <p className="text-purple-300 mt-1">→ "{time}"</p>
            <p className="text-zinc-600 text-[10px] mt-0.5">
                Formatter only runs when DevTools inspects the hook
            </p>
        </div>
    );
}
