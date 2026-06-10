const sections = [
    {
        icon: '🧩',
        title: 'Patterns',
        desc: 'Proven approaches for clean, composable, reusable stateful logic with built-in and custom hooks',
    },
    {
        icon: '⚠️',
        title: 'Pitfalls',
        desc: 'Stale closures, infinite loops, missing dependencies — the traps and how to sidestep them',
    },
    {
        icon: '⚡',
        title: 'Power',
        desc: 'Advanced composition, custom hooks, and patterns that make your components truly scale',
    },
];

export default function Intro() {
    return (
        <div className="flex flex-col items-center justify-center h-full px-12 text-center">
            <div className="mb-8">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4 text-3xl">
                    ⚛
                </div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-indigo-400 px-3 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                    React Session
                </span>
            </div>

            <h1 className="text-6xl font-black tracking-tight mb-3 bg-linear-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                React Hooks
            </h1>
            <p className="text-2xl font-semibold mb-3 bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Patterns, Pitfalls &amp; Power
            </p>
            <p className="text-sm text-zinc-500 mb-12">
                Deep dive into React's hook system — <span className="font-bold text-zinc-400">use </span>them right, avoid the
                traps, unlock their full potential
            </p>

            <div className="grid grid-cols-3 gap-4 text-left max-w-3xl w-full">
                {sections.map((s) => (
                    <div
                        key={s.title}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
                    >
                        <span className="text-2xl mb-3 block">{s.icon}</span>
                        <h3 className="font-semibold mb-1.5 text-sm">
                            {s.title}
                        </h3>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                            {s.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
