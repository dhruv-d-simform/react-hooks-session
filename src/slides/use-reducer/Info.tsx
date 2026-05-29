import InfoHeader from '@/components/InfoHeader';

const keyPoints = [
    {
        emoji: '📋',
        title: 'One State, Many Transitions',
        desc: 'useReducer centralises all state transitions into a single pure function — the reducer. Every update goes through it, making changes predictable and traceable.',
    },
    {
        emoji: '🏷️',
        title: 'Named Actions',
        desc: "Instead of calling three different setters, you dispatch a named action: dispatch({ type: 'ADD_ITEM', product }). The intent is clear from the name.",
    },
    {
        emoji: '🧪',
        title: 'Pure & Testable',
        desc: 'A reducer is just a function: (state, action) => newState. You can unit-test every state transition without rendering anything.',
    },
];

const vsItems = [
    {
        label: 'useState',
        when: 'Simple, independent values — a toggle, a counter, a text input',
        color: 'text-indigo-300',
    },
    {
        label: 'useReducer',
        when: 'Complex objects, multiple related fields, or transitions that depend on the current state',
        color: 'text-emerald-300',
    },
];

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="State"
                badgeVariant="indigo"
                title="useReducer"
                subtitle="Manage complex state with explicit actions instead of scattered setters."
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Syntax
                </p>
                <p className="text-sm leading-relaxed">
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-zinc-200">[</span>
                    <span className="text-indigo-300">state</span>
                    <span className="text-zinc-200">, </span>
                    <span className="text-emerald-400">dispatch</span>
                    <span className="text-zinc-200">] = </span>
                    <span className="text-yellow-400">useReducer</span>
                    <span className="text-zinc-200">(</span>
                    <span className="text-orange-300">reducer</span>
                    <span className="text-zinc-400">,</span>{' '}
                    <span className="text-sky-300">initialState</span>
                    <span className="text-zinc-200">)</span>
                </p>
                <div className="mt-3 space-y-1 text-[11px] text-zinc-500">
                    <p>
                        <span className="text-orange-300">reducer</span> —{' '}
                        <span className="font-mono">
                            (state, action) =&gt; newState
                        </span>
                        , a pure function
                    </p>
                    <p>
                        <span className="text-sky-300">initialState</span> — the
                        starting value, same as{' '}
                        <span className="font-mono">useState</span>
                    </p>
                    <p>
                        <span className="text-emerald-400">dispatch</span> —
                        call with an action object to trigger a transition
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

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    useState vs useReducer
                </p>
                <div className="space-y-2">
                    {vsItems.map((item) => (
                        <div
                            key={item.label}
                            className="flex gap-3 items-start"
                        >
                            <span
                                className={`font-mono text-xs font-bold ${item.color} w-24 shrink-0`}
                            >
                                {item.label}
                            </span>
                            <p className="text-xs text-zinc-500 leading-relaxed">
                                {item.when}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-xl bg-indigo-900/20 border border-indigo-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400/70 mb-1.5">
                    Mental model
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                    Think of your state as a{' '}
                    <span className="text-indigo-300 font-semibold">
                        bank account
                    </span>{' '}
                    and your reducer as the{' '}
                    <span className="text-indigo-300 font-semibold">
                        transaction ledger
                    </span>
                    . You never set the balance directly — you submit a
                    transaction and the ledger computes the new balance.
                </p>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 Use the{' '}
                    <span className="font-semibold text-zinc-200">
                        Shopping Cart
                    </span>{' '}
                    on the right to dispatch actions and watch the reducer
                    compute the new state.
                </p>
            </div>
        </div>
    );
}
