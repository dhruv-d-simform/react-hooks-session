import InfoHeader from '@/components/InfoHeader';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="React 19 · New"
                badgeVariant="purple"
                title="useOptimistic"
                docsUrl="https://react.dev/reference/react/useOptimistic"
                subtitle="Update the UI instantly while a server request is in flight — roll back automatically on failure."
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Syntax
                </p>
                <div className="text-sm space-y-0.5">
                    <p>
                        <span className="text-purple-400">const</span>{' '}
                        <span className="text-zinc-200">[</span>
                        <span className="text-pink-300">optimistic</span>
                        <span className="text-zinc-400">, </span>
                        <span className="text-emerald-400">addOptimistic</span>
                        <span className="text-zinc-200">]</span>
                    </p>
                    <p>
                        {'  '}
                        <span className="text-zinc-400">=</span>{' '}
                        <span className="text-yellow-400">useOptimistic</span>
                        <span className="text-zinc-200">(</span>
                        <span className="text-indigo-300">serverState</span>
                        <span className="text-zinc-400">,</span>
                    </p>
                    <p className="pl-4">
                        <span className="text-zinc-300">
                            (current, optimisticValue) =&gt; newState
                        </span>
                    </p>
                    <p>
                        <span className="text-zinc-200">)</span>
                    </p>
                </div>
                <div className="mt-3 space-y-1 text-[11px] text-zinc-500">
                    <p>
                        <span className="text-pink-300">optimistic</span> — the
                        UI value (may be ahead of server)
                    </p>
                    <p>
                        When the transition completes,{' '}
                        <span className="text-pink-300">optimistic</span> snaps
                        back to{' '}
                        <span className="text-indigo-300">serverState</span>
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    The pattern
                </p>
                <div className="space-y-2 text-xs">
                    {[
                        {
                            n: '1',
                            text: 'User clicks Like',
                            color: 'text-zinc-400',
                        },
                        {
                            n: '2',
                            text: 'addOptimistic(+1) — UI immediately shows +1',
                            color: 'text-emerald-400',
                        },
                        {
                            n: '3',
                            text: 'Async action starts (server request in flight)',
                            color: 'text-zinc-400',
                        },
                        {
                            n: '4a',
                            text: 'Success → server confirms, optimistic snaps to real value',
                            color: 'text-emerald-400',
                        },
                        {
                            n: '4b',
                            text: 'Failure → error boundary catches, optimistic reverts',
                            color: 'text-rose-400',
                        },
                    ].map(({ n, text, color }) => (
                        <div key={n} className="flex gap-2">
                            <span className="text-[10px] font-mono text-zinc-600 w-5 shrink-0">
                                {n}
                            </span>
                            <span className={color}>{text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-xl bg-indigo-900/15 border border-indigo-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400/70 mb-1.5">
                    Must be inside a transition
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    <span className="font-mono text-zinc-300">
                        addOptimistic
                    </span>{' '}
                    must be called inside{' '}
                    <span className="font-mono text-zinc-300">
                        startTransition
                    </span>{' '}
                    or a form action. React needs to know when the "real" update
                    is coming.
                </p>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 Click Like — the counter updates instantly. Occasionally
                    the server "fails" and the count rolls back to show what a
                    real error would look like.
                </p>
            </div>
        </div>
    );
}
