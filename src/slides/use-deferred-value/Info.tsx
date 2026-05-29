import InfoHeader from '@/components/InfoHeader';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Performance"
                badgeVariant="emerald"
                title="useDeferredValue"
                subtitle="Keep a stale copy of a value so expensive renders can lag behind urgent ones."
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Syntax
                </p>
                <p className="text-sm">
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-emerald-300">deferredQuery</span>
                    <span className="text-zinc-400"> = </span>
                    <span className="text-yellow-400">useDeferredValue</span>
                    <span className="text-zinc-200">(</span>
                    <span className="text-indigo-300">query</span>
                    <span className="text-zinc-200">)</span>
                </p>
                <div className="mt-3 space-y-1 text-[11px] text-zinc-500">
                    <p>
                        <span className="text-indigo-300">query</span> — updates
                        immediately (urgent)
                    </p>
                    <p>
                        <span className="text-emerald-300">deferredQuery</span>{' '}
                        — lags behind, used for the heavy render
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    How it works
                </p>
                <div className="space-y-2 text-xs">
                    <div className="flex gap-2 items-start">
                        <span className="text-zinc-600 w-4 shrink-0">1</span>
                        <p className="text-zinc-400">
                            User types — input re-renders immediately with the
                            new value
                        </p>
                    </div>
                    <div className="flex gap-2 items-start">
                        <span className="text-zinc-600 w-4 shrink-0">2</span>
                        <p className="text-zinc-400">
                            React tries to re-render the heavy list with the
                            deferred value in the background
                        </p>
                    </div>
                    <div className="flex gap-2 items-start">
                        <span className="text-zinc-600 w-4 shrink-0">3</span>
                        <p className="text-zinc-400">
                            If the user types again before the list finishes,
                            React discards the in-progress render and starts
                            fresh
                        </p>
                    </div>
                    <div className="flex gap-2 items-start">
                        <span className="text-zinc-600 w-4 shrink-0">4</span>
                        <p className="text-zinc-400">
                            The list shows stale results with reduced opacity as
                            a visual hint
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-indigo-900/15 border border-indigo-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400/70 mb-1.5">
                    vs useTransition
                </p>
                <div className="space-y-1.5 text-xs text-zinc-400">
                    <p>
                        <span className="font-mono text-zinc-300">
                            useTransition
                        </span>{' '}
                        — you control the state update (you own the setter)
                    </p>
                    <p>
                        <span className="font-mono text-zinc-300">
                            useDeferredValue
                        </span>{' '}
                        — value comes from outside (props, URL) — you can't wrap
                        the update in startTransition
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 Type in the search box — the input stays snappy while the
                    heavy list below it catches up, showing stale results with a
                    dimmed style.
                </p>
            </div>
        </div>
    );
}
