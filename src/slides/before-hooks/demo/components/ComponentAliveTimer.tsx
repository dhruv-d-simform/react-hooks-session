export function ComponentAliveTimer({
    seconds,
    description,
}: {
    seconds: number;
    description: string;
}) {
    return (
        <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg p-4 space-y-1">
            <p className="text-xs text-zinc-400">
                ⏱ Component alive:{' '}
                <span className="font-mono text-indigo-300 font-semibold">
                    {seconds}s
                </span>
            </p>
            <p className="text-xs text-zinc-600">{description}</p>
        </div>
    );
}
