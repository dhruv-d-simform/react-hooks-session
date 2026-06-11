import InfoHeader from '@/components/InfoHeader';

const steps = [
    {
        emoji: '🏭',
        title: 'Create',
        code: 'createContext(defaultValue)',
        desc: 'Create a context object. The default is only used if a component has no matching Provider above it.',
    },
    {
        emoji: '📦',
        title: 'Provide',
        code: '<Context.Provider value={...}>',
        desc: 'Wrap the part of the tree that needs access. Any component inside can now read the value.',
    },
    {
        emoji: '📖',
        title: 'Consume',
        code: 'const value = useContext(Context)',
        desc: 'Read the nearest Provider value. When the Provider re-renders with a new value, every consumer re-renders too.',
    },
];

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Context"
                badgeVariant="indigo"
                title="useContext"
                docsUrl="https://react.dev/reference/react/useContext"
                subtitle="Share values anywhere in the tree — no prop drilling required."
            />

            <div className="rounded-xl bg-rose-900/15 border border-rose-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-rose-400/70 mb-2">
                    The problem it solves
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed mb-2">
                    Prop drilling — passing props through several layers just so
                    a deeply-nested component can read them.
                </p>
                <div className="font-mono text-[11px] space-y-0.5">
                    <p className="text-zinc-300">
                        App{' '}
                        <span className="text-rose-400">
                            theme=&#123;theme&#125;
                        </span>
                    </p>
                    <p className="text-zinc-500 pl-3">
                        └ Layout{' '}
                        <span className="text-rose-400">
                            theme=&#123;theme&#125;
                        </span>
                    </p>
                    <p className="text-zinc-600 pl-6">
                        └ Sidebar{' '}
                        <span className="text-rose-400">
                            theme=&#123;theme&#125;
                        </span>
                    </p>
                    <p className="text-zinc-700 pl-9">
                        └ NavLink{' '}
                        <span className="text-rose-400">
                            theme=&#123;theme&#125;
                        </span>{' '}
                        👈 finally used here
                    </p>
                </div>
            </div>

            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    3 steps to use context
                </p>
                <div className="space-y-2.5">
                    {steps.map((s, i) => (
                        <div
                            key={s.title}
                            className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-mono text-zinc-600">
                                    0{i + 1}
                                </span>
                                <span className="text-base">{s.emoji}</span>
                                <span className="font-semibold text-xs">
                                    {s.title}
                                </span>
                                <code className="ml-auto text-[10px] font-mono text-indigo-300 bg-indigo-900/20 px-1.5 py-0.5 rounded">
                                    {s.code}
                                </code>
                            </div>
                            <p className="text-xs text-zinc-500 leading-relaxed">
                                {s.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-xl bg-amber-900/15 border border-amber-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400/70 mb-1.5">
                    When NOT to use context
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    Context is not a replacement for all prop passing. Use it
                    for truly global values — theme, current user, locale. For
                    data that only a few components share, props are simpler and
                    more explicit.
                </p>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 Flip between{' '}
                    <span className="font-semibold text-zinc-200">
                        useContext
                    </span>{' '}
                    and{' '}
                    <span className="font-semibold text-zinc-200">
                        Prop Drilling
                    </span>{' '}
                    on the right to see the same theme toggle with and without
                    context.
                </p>
            </div>
        </div>
    );
}
