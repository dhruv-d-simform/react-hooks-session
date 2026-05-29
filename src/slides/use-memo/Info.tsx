import InfoHeader from '@/components/InfoHeader';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Performance"
                badgeVariant="emerald"
                title="useMemo"
                subtitle="Cache an expensive computation between renders — only recompute when its inputs change."
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Syntax
                </p>
                <p className="text-sm leading-relaxed">
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-emerald-300">result</span>
                    <span className="text-zinc-400"> = </span>
                    <span className="text-yellow-400">useMemo</span>
                    <span className="text-zinc-200">
                        (() =&gt; expensiveCalc(a, b), [
                    </span>
                    <span className="text-indigo-300">a, b</span>
                    <span className="text-zinc-200">])</span>
                </p>
                <div className="mt-3 space-y-1 text-[11px] text-zinc-500">
                    <p>Returns the cached value on every render</p>
                    <p>
                        Recomputes only when{' '}
                        <span className="text-indigo-300">a</span> or{' '}
                        <span className="text-indigo-300">b</span> changes
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    What counts as "expensive"?
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    Console-time it. If it takes more than ~1ms, it's worth
                    memoizing. Common cases:
                </p>
                <ul className="space-y-1.5 text-xs text-zinc-400">
                    <li>→ Filtering or sorting a large array (1k+ items)</li>
                    <li>→ Complex mathematical transformations</li>
                    <li>→ Creating derived data structures</li>
                </ul>
            </div>

            <div className="rounded-xl bg-amber-900/15 border border-amber-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400/70 mb-1.5">
                    Don't over-memoize
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    Memoization has overhead — comparing deps on every render.
                    For cheap operations, the comparison costs more than just
                    recomputing. Profile first; optimize second.
                </p>
            </div>

            <div className="rounded-xl bg-indigo-900/15 border border-indigo-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400/70 mb-1.5">
                    Key insight
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed">
                    Without{' '}
                    <span className="font-mono text-emerald-400">useMemo</span>,
                    your expensive function runs on{' '}
                    <span className="text-zinc-100 font-semibold">
                        every single render
                    </span>{' '}
                    — even when a completely unrelated piece of state changes.
                </p>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 The demo filters 5 000 items. Change the{' '}
                    <span className="font-semibold text-zinc-200">Name</span>{' '}
                    field (unrelated to filter) and watch the computation count
                    — without useMemo it runs every time, with useMemo it
                    doesn't.
                </p>
            </div>
        </div>
    );
}
