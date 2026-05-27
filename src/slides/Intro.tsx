export default function Intro() {
    const hooks = [
        'useState',
        'useEffect',
        'useContext',
        'useRef',
        'useReducer',
        'useMemo',
        'useCallback',
    ];

    const sections = [
        {
            icon: '🏗️',
            title: 'The Problem',
            desc: 'Class components: verbose, logic scattered across lifecycle methods, hard to reuse',
        },
        {
            icon: '🪝',
            title: 'The Hooks',
            desc: 'useState, useEffect, useContext, useRef, useReducer, useMemo, useCallback',
        },
        {
            icon: '🔧',
            title: 'Custom Hooks',
            desc: 'Extract and share stateful logic across components cleanly',
        },
    ];

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
            <p className="text-lg text-zinc-400 mb-2">
                Writing cleaner, reusable, stateful logic in functional
                components
            </p>
            <p className="text-sm text-zinc-600 mb-10">
                Introduced in React 16.8 — Feb 2019
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {hooks.map((h) => (
                    <span
                        key={h}
                        className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-900/40 text-indigo-300 border border-indigo-700/40"
                    >
                        {h}
                    </span>
                ))}
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700">
                    + custom hooks
                </span>
            </div>

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
