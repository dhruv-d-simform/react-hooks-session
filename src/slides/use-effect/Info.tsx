import InfoHeader from '@/components/InfoHeader';

const deps = [
    {
        form: 'useEffect(() => { … })',
        label: 'No array',
        when: 'After every render',
        color: 'text-rose-300',
        bg: 'bg-rose-900/15 border-rose-700/25',
        note: 'Rarely what you want — easy to cause infinite loops.',
    },
    {
        form: 'useEffect(() => { … }, [])',
        label: 'Empty array',
        when: 'Once after mount',
        color: 'text-emerald-300',
        bg: 'bg-emerald-900/15 border-emerald-700/25',
        note: 'Set up a subscription, fetch initial data — clean up on unmount.',
    },
    {
        form: 'useEffect(() => { … }, [x, y])',
        label: 'With values',
        when: 'When x or y changes',
        color: 'text-indigo-300',
        bg: 'bg-indigo-900/15 border-indigo-700/25',
        note: 'Re-run the effect when its dependencies change.',
    },
];

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Effect · Escape Hatch"
                badgeVariant="indigo"
                title="useEffect"
                docsUrl="https://react.dev/reference/react/useEffect"
                subtitle="Synchronise your component with something outside React — APIs, timers, subscriptions."
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Syntax
                </p>
                <div className="text-sm space-y-0.5">
                    <p>
                        <span className="text-yellow-400">useEffect</span>
                        <span className="text-zinc-200">(() =&gt; {'{'}</span>
                    </p>
                    <p className="pl-4 text-zinc-500">
                        <span className="text-zinc-400">
                            {'// '}side effect
                        </span>
                    </p>
                    <p className="pl-4">
                        <span className="text-purple-400">return</span>{' '}
                        <span className="text-zinc-200">() =&gt; {'{'}</span>
                        <span className="text-zinc-500"> {'// '}cleanup</span>
                        <span className="text-zinc-200">{' }'}</span>
                    </p>
                    <p>
                        <span className="text-zinc-200">
                            {'}'}, [
                            <span className="text-indigo-300">deps</span>])
                        </span>
                    </p>
                </div>
                <div className="mt-3 space-y-1 text-[11px] text-zinc-500">
                    <p>
                        Cleanup runs before the effect re-fires and on unmount
                    </p>
                    <p>
                        Effect runs <span className="text-zinc-300">after</span>{' '}
                        React paints the screen
                    </p>
                </div>
            </div>

            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    The dependency array — 3 forms
                </p>
                <div className="space-y-2">
                    {deps.map((d) => (
                        <div
                            key={d.label}
                            className={`rounded-xl border p-3 ${d.bg}`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <code
                                    className={`text-[10px] font-mono ${d.color}`}
                                >
                                    {d.label}
                                </code>
                                <span
                                    className={`text-[10px] font-semibold ${d.color}`}
                                >
                                    {d.when}
                                </span>
                            </div>
                            <p className="text-[11px] text-zinc-500 leading-relaxed">
                                {d.note}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-xl bg-amber-900/15 border border-amber-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400/70 mb-1.5">
                    Common mistakes
                </p>
                <ul className="space-y-1.5 text-xs text-zinc-400">
                    <li>
                        ⚠️ <span className="text-zinc-300">Missing deps</span> —
                        your effect reads stale values
                    </li>
                    <li>
                        ⚠️ <span className="text-zinc-300">Object in deps</span>{' '}
                        — a new object is created every render, causing infinite
                        re-runs
                    </li>
                    <li>
                        ⚠️ <span className="text-zinc-300">No cleanup</span> —
                        leaked subscriptions and timers on unmount
                    </li>
                </ul>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉{' '}
                    <span className="font-semibold text-zinc-200">
                        Data Fetching
                    </span>{' '}
                    shows a real fetch with cleanup via{' '}
                    <span className="font-mono">AbortController</span>.{' '}
                    <span className="font-semibold text-zinc-200">
                        Deps Explorer
                    </span>{' '}
                    shows the 3 array forms live.
                </p>
            </div>
        </div>
    );
}
