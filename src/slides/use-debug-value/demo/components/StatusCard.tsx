export function StatusCard({
    labeled,
    isOnline,
}: {
    labeled: boolean;
    isOnline: boolean;
}) {
    return (
        <div
            className={`bg-zinc-800/60 border rounded-xl p-4 space-y-3 ${labeled ? 'border-emerald-700/30' : 'border-rose-700/20'}`}
        >
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {labeled ? 'With useDebugValue' : 'Without useDebugValue'}
                </span>
                <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${labeled ? 'text-emerald-400 bg-emerald-900/20 border-emerald-700/30' : 'text-rose-400 bg-rose-900/20 border-rose-700/30'}`}
                >
                    {labeled ? '✅' : '❌'}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <span
                    className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-zinc-600'}`}
                />
                <span className="text-sm text-zinc-300">
                    {isOnline ? 'You are online' : 'You are offline'}
                </span>
            </div>

            <div className="bg-zinc-900 rounded-lg p-3 font-mono text-[11px] space-y-1.5">
                <p className="text-zinc-500">DevTools → Components panel:</p>
                <div className="pl-3 space-y-0.5">
                    <p className="text-zinc-400">▸ StatusCard</p>
                    <p className="pl-4 text-zinc-500">
                        useOnlineStatus
                        {labeled ? (
                            <span className="text-emerald-300">
                                {' '}
                                → "Online ✓"
                            </span>
                        ) : (
                            <span className="text-zinc-600"> → true</span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
