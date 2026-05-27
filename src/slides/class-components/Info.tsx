import InfoHeader from '@/components/InfoHeader';
import BulletList from '@/components/BulletList';

const problems = [
    {
        emoji: '🔀',
        title: 'Scattered Logic',
        desc: 'Timer setup in componentDidMount, cleanup in componentWillUnmount — related code lives apart.',
    },
    {
        emoji: '♻️',
        title: 'Hard to Reuse',
        desc: 'Sharing stateful logic requires HOCs or render props — complex patterns for a simple goal.',
    },
    {
        emoji: '😵',
        title: '`this` Confusion',
        desc: '`this` binding is a constant source of bugs. Arrow functions or .bind() required everywhere.',
    },
    {
        emoji: '📦',
        title: 'Bloated Lifecycles',
        desc: 'Unrelated logic is forced into the same lifecycle methods, mixing concerns.',
    },
];

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Foundations"
                badgeVariant="amber"
                title="Class Components & Hooks"
                subtitle="Understanding the problem hooks were designed to solve"
            />

            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Problems with Classes
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                    {problems.map((p) => (
                        <div
                            key={p.title}
                            className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5"
                        >
                            <div className="flex items-center gap-2 mb-1.5">
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

            <BulletList
                label="How Hooks Fix This"
                items={[
                    {
                        text: 'Organize code by what it does, not by when it runs',
                        highlight: true,
                    },
                    {
                        text: 'useEffect co-locates setup + cleanup in one function',
                    },
                    {
                        text: 'Custom hooks extract reusable stateful logic cleanly',
                    },
                    { text: 'No class, no this — just functions and closures' },
                ]}
            />

            <div className="rounded-xl bg-indigo-900/20 border border-indigo-700/30 p-4">
                <p className="text-sm font-semibold text-indigo-300 mb-1">
                    The Core Insight
                </p>
                <p className="text-sm text-zinc-300">
                    Hooks let you split code based on{' '}
                    <span className="text-indigo-300 font-semibold">
                        what it does
                    </span>
                    , not{' '}
                    <span className="text-zinc-400 line-through">
                        when it runs
                    </span>
                    . Related logic stays together.
                </p>
            </div>
        </div>
    );
}
