import InfoHeader from '@/components/InfoHeader';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Performance"
                badgeVariant="emerald"
                title="useCallback"
                docsUrl="https://react.dev/reference/react/useCallback"
                subtitle="Cache a function reference between renders so memoized children don't re-render unnecessarily."
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Syntax
                </p>
                <p className="text-sm leading-relaxed">
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-emerald-300">handler</span>
                    <span className="text-zinc-400"> = </span>
                    <span className="text-yellow-400">useCallback</span>
                    <span className="text-zinc-200">{'(() => { … }, ['}</span>
                    <span className="text-indigo-300">deps</span>
                    <span className="text-zinc-200">])</span>
                </p>
                <div className="mt-3 text-[11px] text-zinc-500">
                    <p>
                        Returns the <em>same</em> function reference as long as
                        deps don't change
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Why it matters
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    Every render creates a{' '}
                    <span className="text-zinc-200 font-semibold">
                        new function reference
                    </span>
                    . If you pass that function to a child wrapped in{' '}
                    <span className="font-mono text-zinc-300">React.memo</span>,
                    the child always re-renders — the prop technically changed
                    (new reference, even if the logic is identical).
                </p>
                <div className="font-mono text-[11px] bg-zinc-800/60 rounded-lg p-3 space-y-1">
                    <p className="text-zinc-400">
                        <span className="text-zinc-500">
                            {'// Every render:'}
                        </span>
                    </p>
                    <p className="text-zinc-400">
                        onClick = () =&gt; ...{' '}
                        <span className="text-rose-400">
                            ← new ref each time
                        </span>
                    </p>
                    <p className="text-zinc-400 mt-1">
                        <span className="text-zinc-500">
                            {'// With useCallback([]):'}
                        </span>
                    </p>
                    <p className="text-zinc-400">
                        onClick = () =&gt; ...{' '}
                        <span className="text-emerald-400">
                            ← stable ref ✅
                        </span>
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-amber-900/15 border border-amber-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400/70 mb-1.5">
                    useCallback = useMemo for functions
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    <span className="font-mono text-zinc-300">
                        useCallback(fn, deps)
                    </span>{' '}
                    is exactly equivalent to{' '}
                    <span className="font-mono text-zinc-300">
                        useMemo(() =&gt; fn, deps)
                    </span>
                    . Same mechanism, just a convenience API for functions.
                </p>
            </div>

            <div className="rounded-xl bg-amber-900/15 border border-amber-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400/70 mb-1.5">
                    Requires React.memo on the child
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    <span className="font-mono text-zinc-300">useCallback</span>{' '}
                    only helps if the child that receives the callback is
                    wrapped in{' '}
                    <span className="font-mono text-zinc-300">React.memo</span>.
                    Without memo, the child re-renders regardless of whether the
                    function reference is stable.
                </p>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 The demo shows a parent counter and a memoized child.
                    Watch the child's render count — without{' '}
                    <span className="font-semibold text-zinc-200">
                        useCallback
                    </span>{' '}
                    it re-renders on every parent update.
                </p>
            </div>
        </div>
    );
}
