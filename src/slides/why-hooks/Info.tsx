import InfoHeader from '@/components/InfoHeader';

const problems = [
    {
        emoji: '🔀',
        title: 'Scattered Logic',
        desc: 'Related code (timer setup + cleanup) is split across componentDidMount and componentWillUnmount.',
    },
    {
        emoji: '♻️',
        title: 'Hard to Reuse',
        desc: 'To reuse stateful logic, you need complex patterns like HOCs or render props.',
    },
    {
        emoji: '😵',
        title: '`this` Confusion',
        desc: '`this` binding is a source of bugs. Arrow functions or .bind() required everywhere.',
    },
    {
        emoji: '📦',
        title: 'Bloated Components',
        desc: 'Unrelated logic is forced together in the same lifecycle methods.',
    },
];

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Motivation"
                badgeVariant="amber"
                title="Why Hooks?"
                subtitle="Three problems with class components that hooks solve elegantly"
            />
            <div className="grid grid-cols-2 gap-3">
                {problems.map((p) => (
                    <div
                        key={p.title}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
                    >
                        <div className="flex items-center gap-2.5 mb-2">
                            <span className="text-xl">{p.emoji}</span>
                            <span className="font-semibold text-sm">
                                {p.title}
                            </span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            {p.desc}
                        </p>
                    </div>
                ))}
            </div>
            <div className="bg-indigo-900/20 border border-indigo-700/30 rounded-xl p-4">
                <p className="text-sm font-semibold text-indigo-300 mb-1">
                    The Core Insight
                </p>
                <p className="text-sm text-zinc-300">
                    Hooks let you organize code by{' '}
                    <span className="text-indigo-300 font-semibold">
                        what it does
                    </span>
                    , not by{' '}
                    <span className="text-zinc-400 line-through">
                        when it runs
                    </span>
                    . Related logic stays together.
                </p>
            </div>
        </div>
    );
}
