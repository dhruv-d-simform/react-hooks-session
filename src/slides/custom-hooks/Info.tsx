import InfoHeader from '@/components/InfoHeader';

const keyPoints = [
    {
        emoji: '🧩',
        title: "It's just a function",
        desc: 'A function whose name starts with `use` and that calls other hooks. No new API, no registration, nothing to import from React — you already know how to write one.',
    },
    {
        emoji: '🪆',
        title: 'Hooks compose, like components',
        desc: 'Components solved composition for UI: build small ones, assemble big ones. Custom hooks do the exact same thing for logic — useCountdown can be built on useInterval, which is built on useEffect.',
    },
    {
        emoji: '🔒',
        title: 'Shares logic, not state',
        desc: 'Every call to a custom hook gets its own isolated state. Two components calling the same hook are completely independent — you reuse the behavior, never the data.',
    },
];

const layers = [
    {
        label: '<FocusTimer />',
        note: 'component — composes hooks',
        color: 'text-sky-300',
        pad: 'pl-0',
    },
    {
        label: 'useCountdown()',
        note: 'custom hook — composes a custom hook',
        color: 'text-teal-300',
        pad: 'pl-5',
    },
    {
        label: 'useInterval()',
        note: 'custom hook — composes built-ins',
        color: 'text-teal-300',
        pad: 'pl-10',
    },
    {
        label: 'useState · useEffect',
        note: 'built-in hooks',
        color: 'text-purple-300',
        pad: 'pl-[60px]',
    },
];

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="The Payoff"
                badgeVariant="teal"
                title="Custom Hooks"
                subtitle="Everything so far leads here. Hooks aren't just APIs — they're building blocks. And building blocks are for composing."
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Composition, all the way down
                </p>
                <div className="font-mono text-sm space-y-1.5">
                    {layers.map((l) => (
                        <div
                            key={l.label}
                            className={`flex items-baseline gap-2.5 ${l.pad}`}
                        >
                            <span className="text-zinc-600">↳</span>
                            <span className={`${l.color} font-semibold`}>
                                {l.label}
                            </span>
                            <span className="text-[10px] text-zinc-600 font-sans">
                                {l.note}
                            </span>
                        </div>
                    ))}
                </div>
                <p className="mt-3 text-[11px] text-zinc-500 leading-relaxed">
                    The same idea that made components powerful — small pieces
                    assembled into bigger ones — now applies to{' '}
                    <span className="text-zinc-300">stateful logic</span>.
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
                    hell, HOCs, render props? This is the answer. Reuse stateful
                    logic{' '}
                    <span className="text-teal-300 font-semibold">
                        without sharing state
                    </span>{' '}
                    and without touching the component tree. Components compose
                    the UI; hooks compose the logic behind it.
                </p>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 On the right: a working Focus Timer. The UI is fine — the
                    component behind it is a tangle of{' '}
                    <span className="font-mono text-purple-300">useState</span>{' '}
                    and{' '}
                    <span className="font-mono text-purple-300">useEffect</span>
                    . We&rsquo;ll refactor it into custom hooks,{' '}
                    <span className="text-zinc-200 font-semibold">live</span>.
                </p>
            </div>
        </div>
    );
}
