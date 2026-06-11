import InfoHeader from '@/components/InfoHeader';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Effect"
                badgeVariant="indigo"
                title="useEffectEvent"
                docsUrl="https://react.dev/reference/react/useEffectEvent"
                subtitle="Read the latest props/state inside an effect without making them dependencies."
            />

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    The problem
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    An effect connects to a chat room and passes{' '}
                    <span className="font-mono text-zinc-300">theme</span> to
                    the connection callbacks. That forces{' '}
                    <span className="font-mono text-zinc-300">theme</span> into
                    the deps array — so every theme change triggers a reconnect,
                    even though the room didn't change.
                </p>
                <div className="font-mono text-[11px] bg-zinc-800/60 rounded-lg p-3 space-y-0.5">
                    <p className="text-zinc-500">
                        <span className="text-yellow-400">useEffect</span>
                        {'(() => {'}
                    </p>
                    <p className="pl-4 text-zinc-400">
                        {'connectToRoom(room, {'}
                    </p>
                    <p className="pl-8 text-zinc-400">
                        {'onConnect: () => log('}
                        <span className="text-rose-400">theme</span>
                        {'),'}
                    </p>
                    <p className="pl-4 text-zinc-400">{'})'}</p>
                    <p className="text-zinc-500">
                        {'}, [room, '}
                        <span className="text-rose-400">theme</span>
                        {'])'}{' '}
                        <span className="text-rose-400">
                            ← reconnects on theme change
                        </span>
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    The solution
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    Wrap the callbacks in{' '}
                    <span className="font-mono text-zinc-300">
                        useEffectEvent
                    </span>
                    . They always read the latest{' '}
                    <span className="font-mono text-zinc-300">theme</span> but
                    are never treated as dependencies.
                </p>
                <div className="font-mono text-[11px] bg-zinc-800/60 rounded-lg p-3 space-y-0.5">
                    <p>
                        <span className="text-purple-400">const</span>{' '}
                        <span className="text-emerald-400">onConnect</span>{' '}
                        <span className="text-zinc-500">=</span>{' '}
                        <span className="text-yellow-400">useEffectEvent</span>
                        {'(() => log(theme))'}
                    </p>
                    <p className="mt-2 text-zinc-500">
                        <span className="text-yellow-400">useEffect</span>
                        {'(() => {'}
                    </p>
                    <p className="pl-4 text-zinc-400">
                        {'connectToRoom(room, { '}
                        <span className="text-emerald-400">onConnect</span>
                        {' })'}
                    </p>
                    <p className="text-zinc-500">
                        {'}, [room])'}{' '}
                        <span className="text-emerald-400">
                            ← theme not a dep ✅
                        </span>
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-indigo-900/15 border border-indigo-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400/70 mb-1.5">
                    Pre-React 19 workaround
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    Sync the latest value into a ref via{' '}
                    <span className="font-mono text-zinc-300">
                        useLayoutEffect
                    </span>
                    , then read{' '}
                    <span className="font-mono text-zinc-300">ref.current</span>{' '}
                    inside the callbacks — refs are always fresh without being
                    deps.
                </p>
            </div>
        </div>
    );
}
