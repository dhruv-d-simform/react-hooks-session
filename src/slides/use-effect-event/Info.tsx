import InfoHeader from '@/components/InfoHeader';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Effect"
                badgeVariant="indigo"
                title="useEffectEvent"
                subtitle="Read the latest props/state inside an effect without making them dependencies."
            />

            <div className="rounded-xl bg-amber-900/15 border border-amber-700/30 p-3.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400/70 mb-1">
                    Status
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    <span className="font-mono text-amber-300">
                        useEffectEvent
                    </span>{' '}
                    is not yet in stable React. It's available experimentally
                    and expected in a future release. The demo below shows the
                    problem it solves and the ref-based workaround used today.
                </p>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    The problem
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    An effect that connects to a chat room needs{' '}
                    <span className="font-mono text-zinc-300">roomId</span> in
                    its deps. But if it also reads{' '}
                    <span className="font-mono text-zinc-300">theme</span> to
                    log a message, adding{' '}
                    <span className="font-mono text-zinc-300">theme</span> to
                    deps causes the room to reconnect every time the theme
                    changes — which is wrong.
                </p>
                <div className="font-mono text-[11px] bg-zinc-800/60 rounded-lg p-3 space-y-0.5">
                    <p className="text-zinc-500">
                        <span className="text-yellow-400">useEffect</span>
                        {'(() => {'}
                    </p>
                    <p className="pl-4 text-zinc-300">
                        connect(roomId){' '}
                        <span className="text-zinc-600">// want this dep</span>
                    </p>
                    <p className="pl-4 text-zinc-500">
                        log(theme){' '}
                        <span className="text-rose-400">
                            // don't want theme as dep!
                        </span>
                    </p>
                    <p className="text-zinc-500">
                        {'}, [roomId, theme])'}{' '}
                        <span className="text-rose-400">
                            ← reconnects on theme change
                        </span>
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    The solution (future API)
                </p>
                <div className="font-mono text-[11px] bg-zinc-800/60 rounded-lg p-3 space-y-0.5">
                    <p>
                        <span className="text-purple-400">const</span>{' '}
                        <span className="text-emerald-400">onLog</span>{' '}
                        <span className="text-zinc-500">=</span>{' '}
                        <span className="text-yellow-400">useEffectEvent</span>
                        {'(() => {'}
                    </p>
                    <p className="pl-4 text-zinc-300">
                        log(theme){' '}
                        <span className="text-zinc-600">
                            // always reads latest theme
                        </span>
                    </p>
                    <p className="text-zinc-500">{'})'}</p>
                    <p className="mt-2 text-zinc-500">
                        <span className="text-yellow-400">useEffect</span>
                        {'(() => {'}
                    </p>
                    <p className="pl-4 text-zinc-300">connect(roomId)</p>
                    <p className="pl-4 text-zinc-300">
                        <span className="text-emerald-400">onLog</span>()
                    </p>
                    <p className="text-zinc-500">
                        {'}, [roomId])'}{' '}
                        <span className="text-emerald-400">
                            ← theme not a dep ✅
                        </span>
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-indigo-900/15 border border-indigo-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400/70 mb-1.5">
                    Today's workaround
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    Use a ref to hold the latest value. Read{' '}
                    <span className="font-mono text-zinc-300">
                        latestTheme.current
                    </span>{' '}
                    inside the effect — refs are always fresh without being
                    deps.
                </p>
            </div>
        </div>
    );
}
