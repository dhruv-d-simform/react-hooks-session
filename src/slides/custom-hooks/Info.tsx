import InfoHeader from '@/components/InfoHeader';

const keyPoints = [
    {
        emoji: '🧩',
        title: "It's just a function",
        desc: 'A custom hook is nothing more than a function whose name starts with `use` and that calls other hooks. No new API, no special import — you already know how to write one.',
    },
    {
        emoji: '🔒',
        title: 'Shares logic, not state',
        desc: 'Each call to a custom hook gets its own isolated state. Two components calling useToggle() are completely independent — you reuse the behavior, never the data.',
    },
    {
        emoji: '📐',
        title: 'Rules of Hooks still apply',
        desc: 'Call them at the top level, only from React functions or other hooks. The `use` prefix is the signal that lets the linter enforce those rules for you.',
    },
];

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="The Payoff"
                badgeVariant="teal"
                title="Custom Hooks"
                subtitle="The promise from 2018, delivered. Bundle stateful logic into a reusable function and share it across components."
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Anatomy
                </p>
                <div className="text-sm space-y-1">
                    <p>
                        <span className="text-purple-400">function</span>{' '}
                        <span className="text-yellow-400">useToggle</span>
                        <span className="text-zinc-200">(</span>
                        <span className="text-orange-300">initial</span>
                        <span className="text-zinc-200">) {'{'}</span>
                    </p>
                    <p className="pl-4">
                        <span className="text-purple-400">const</span>{' '}
                        <span className="text-zinc-200">[</span>
                        <span className="text-indigo-300">on</span>
                        <span className="text-zinc-200">, </span>
                        <span className="text-emerald-400">setOn</span>
                        <span className="text-zinc-200">] = </span>
                        <span className="text-yellow-400">useState</span>
                        <span className="text-zinc-200">(</span>
                        <span className="text-orange-300">initial</span>
                        <span className="text-zinc-200">)</span>
                    </p>
                    <p className="pl-4">
                        <span className="text-purple-400">const</span>{' '}
                        <span className="text-emerald-400">toggle</span>
                        <span className="text-zinc-200"> = () =&gt; </span>
                        <span className="text-emerald-400">setOn</span>
                        <span className="text-zinc-200">(</span>
                        <span className="text-indigo-300">v</span>
                        <span className="text-zinc-200"> =&gt; !</span>
                        <span className="text-indigo-300">v</span>
                        <span className="text-zinc-200">)</span>
                    </p>
                    <p className="pl-4">
                        <span className="text-purple-400">return</span>{' '}
                        <span className="text-zinc-200">[</span>
                        <span className="text-indigo-300">on</span>
                        <span className="text-zinc-200">, </span>
                        <span className="text-emerald-400">toggle</span>
                        <span className="text-zinc-200">]</span>
                    </p>
                    <p>
                        <span className="text-zinc-200">{'}'}</span>
                    </p>
                </div>
                <p className="mt-3 text-[11px] text-zinc-500">
                    Built entirely out of built-in hooks — the only thing that
                    makes it &ldquo;custom&rdquo; is the{' '}
                    <span className="font-mono text-teal-300">use</span> prefix.
                </p>
            </div>

            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    What to know
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

            <div className="rounded-xl bg-teal-900/20 border border-teal-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-teal-400/70 mb-1.5">
                    Full circle
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                    Remember the &ldquo;Before Hooks&rdquo; pains — wrapper
                    hell, HOCs, render props? Custom hooks are Dan&rsquo;s
                    answer: reuse stateful logic{' '}
                    <span className="text-teal-300 font-semibold">
                        without sharing state
                    </span>{' '}
                    and without touching your component tree. Extract a hook to
                    reuse <em>behavior</em>, not just to shorten a component.
                </p>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 On the right:{' '}
                    <span className="font-semibold text-zinc-200">
                        Refactor
                    </span>{' '}
                    shows the <em>why</em> (extracting{' '}
                    <span className="font-mono text-teal-300">useFetch</span>),
                    then{' '}
                    <span className="font-semibold text-zinc-200">
                        useLocalStorage
                    </span>{' '}
                    and{' '}
                    <span className="font-semibold text-zinc-200">
                        Composed
                    </span>{' '}
                    show custom hooks composing other custom hooks — the real
                    power.
                </p>
            </div>
        </div>
    );
}
