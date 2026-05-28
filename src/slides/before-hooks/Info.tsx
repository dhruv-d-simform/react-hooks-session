import InfoHeader from '@/components/InfoHeader';

const pains = [
    {
        emoji: '🪆',
        title: 'Wrapper Hell',
        desc: 'Sharing stateful logic meant HOCs, render props, and provider chains 5+ levels deep in the React DevTools.',
    },
    {
        emoji: '📦',
        title: 'Scattered Lifecycles',
        desc: 'Related code (timer start + clear, subscribe + unsubscribe) was split across `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.',
    },
    {
        emoji: '😵',
        title: '`this` Confusion',
        desc: 'You had to `.bind(this)` every method. Classes broke minifiers, broke hot reload, and confused even seasoned devs.',
    },
];

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Where it all started"
                badgeVariant="amber"
                title="Before Hooks"
                subtitle="You've been writing hooks since day one. Here's the world they were born into."
            />

            <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                <div className="aspect-video">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/dpw9EHDh2bM"
                        title="React Today and Tomorrow — Dan Abramov, React Conf 2018"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
                <div className="px-3.5 py-2.5 border-t border-zinc-800">
                    <p className="text-[11px] text-zinc-400">
                        <span className="font-semibold text-zinc-200">
                            Oct 25, 2018 · React Conf
                        </span>{' '}
                        — Dan Abramov walks on stage and announces hooks. This
                        is the talk that gave you{' '}
                        <span className="font-mono text-indigo-300">
                            useState
                        </span>
                        .
                    </p>
                </div>
            </div>

            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    The 3 pains hooks were built to kill
                </p>
                <div className="space-y-2.5">
                    {pains.map((p, i) => (
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
                    Dan's core insight
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                    Hooks let you organize code by{' '}
                    <span className="text-indigo-300 font-semibold">
                        what it does
                    </span>
                    , not{' '}
                    <span className="text-zinc-400 line-through">
                        when it runs
                    </span>
                    . And the real payoff —{' '}
                    <span className="text-indigo-300 font-semibold">
                        custom hooks
                    </span>{' '}
                    — let you share logic between components without sharing
                    state.
                </p>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 Flip the tab on the right to{' '}
                    <span className="font-semibold text-zinc-200">
                        Pre-2018 (Class)
                    </span>{' '}
                    to see what writing the same counter used to look like.
                </p>
            </div>
        </div>
    );
}
