import InfoHeader from '@/components/InfoHeader';

const keyPoints = [
    {
        emoji: '🧠',
        title: 'Component Memory',
        desc: "useState gives a component a value that survives re-renders. Unlike a local variable, it's remembered between calls to your component function.",
    },
    {
        emoji: '📸',
        title: 'State is a Snapshot',
        desc: "When you call setState, you're not mutating a variable — you're asking React to re-render with a new snapshot. The current render's state is frozen.",
    },
    {
        emoji: '🔄',
        title: 'Updates Trigger Re-renders',
        desc: 'Every time you call the setter, React schedules a new render. The component function runs again with the new value.',
    },
];

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="State"
                badgeVariant="indigo"
                title="useState"
                subtitle="Add memory to your components. The most fundamental hook in React."
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Syntax
                </p>
                <p className="text-sm">
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-zinc-200">[</span>
                    <span className="text-indigo-300">value</span>
                    <span className="text-zinc-200">, </span>
                    <span className="text-emerald-400">setValue</span>
                    <span className="text-zinc-200">] = </span>
                    <span className="text-yellow-400">useState</span>
                    <span className="text-zinc-200">(</span>
                    <span className="text-orange-300">initialValue</span>
                    <span className="text-zinc-200">)</span>
                </p>
                <div className="mt-3 space-y-1 text-[11px] text-zinc-500">
                    <p>
                        <span className="text-indigo-300">value</span> — the
                        current state, read during this render
                    </p>
                    <p>
                        <span className="text-emerald-400">setValue</span> —
                        call this to update state &amp; trigger a re-render
                    </p>
                    <p>
                        <span className="text-orange-300">initialValue</span> —
                        only used on the very first render
                    </p>
                </div>
            </div>

            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    How it works
                </p>
                <div className="space-y-2.5">
                    {keyPoints.map((p, i) => (
                        <div
                            key={p.title}
                            className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5"
                        >
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[10px] font-mono text-zinc-600">
                                    0{i + 1}
                                </span>
                                <span className="text-lg">{p.emoji}</span>
                                <span className="font-semibold text-xs">
                                    {p.title}
                                </span>
                            </div>
                            <p className="text-xs text-zinc-500 leading-relaxed">
                                {p.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-xl bg-indigo-900/20 border border-indigo-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400/70 mb-1.5">
                    Golden rule
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                    When new state depends on old state, use the{' '}
                    <span className="font-mono text-indigo-300">
                        functional update
                    </span>{' '}
                    form:{' '}
                    <span className="font-mono text-indigo-300">
                        setValue(prev =&gt; prev + 1)
                    </span>
                    . This avoids stale closure bugs when updates are batched.
                </p>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 Try the{' '}
                    <span className="font-semibold text-zinc-200">
                        Card Builder
                    </span>{' '}
                    on the right — edit inputs and watch the live preview
                    update. Then flip to{' '}
                    <span className="font-semibold text-zinc-200">
                        Functional Update
                    </span>{' '}
                    to see the batching pitfall in action.
                </p>
            </div>
        </div>
    );
}
