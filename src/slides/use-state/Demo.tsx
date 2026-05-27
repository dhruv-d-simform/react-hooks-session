import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import TabBar from '@/components/TabBar';

type Tab = 'counter' | 'input' | 'array';

function CounterDemo() {
    const [count, setCount] = useState(0);
    return (
        <div className="flex items-center gap-4">
            <button
                onClick={() => setCount((c) => c - 1)}
                className="w-10 h-10 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-xl font-bold transition-colors"
            >
                −
            </button>
            <span className="text-5xl font-black font-mono w-20 text-center tabular-nums">
                {count}
            </span>
            <button
                onClick={() => setCount((c) => c + 1)}
                className="w-10 h-10 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xl font-bold transition-colors"
            >
                +
            </button>
            <button
                onClick={() => setCount(0)}
                className="ml-2 px-3 py-1.5 text-xs rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors"
            >
                Reset
            </button>
        </div>
    );
}

function InputDemo() {
    const [name, setName] = useState('');
    const [dark, setDark] = useState(false);

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-xs text-zinc-500 mb-1.5">
                    Type your name:
                </label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
            </div>
            {name && (
                <div className="bg-indigo-900/30 border border-indigo-700/40 rounded-lg px-4 py-3 text-sm">
                    Hello,{' '}
                    <span className="font-semibold text-indigo-300">
                        {name}
                    </span>
                    ! 👋
                </div>
            )}
            <div className="flex items-center gap-3 pt-1">
                <button
                    onClick={() => setDark((d) => !d)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${dark ? 'bg-indigo-600' : 'bg-zinc-700'}`}
                >
                    <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${dark ? 'translate-x-5' : ''}`}
                    />
                </button>
                <span className="text-sm text-zinc-300">
                    Dark mode: {dark ? 'on' : 'off'}
                </span>
            </div>
        </div>
    );
}

function ArrayDemo() {
    const [items, setItems] = useState<string[]>([
        'Learn React',
        'Master Hooks',
    ]);
    const [input, setInput] = useState('');

    const add = () => {
        if (!input.trim()) return;
        setItems((prev) => [...prev, input.trim()]);
        setInput('');
    };

    const remove = (i: number) =>
        setItems((prev) => prev.filter((_, idx) => idx !== i));

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && add()}
                    placeholder="Add item..."
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                />
                <button
                    onClick={add}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors"
                >
                    Add
                </button>
            </div>
            <ul className="space-y-1.5">
                {items.map((item, i) => (
                    <li
                        key={i}
                        className="flex items-center justify-between bg-zinc-800 rounded-lg px-3 py-2"
                    >
                        <span className="text-sm">{item}</span>
                        <button
                            onClick={() => remove(i)}
                            className="text-zinc-500 hover:text-red-400 transition-colors text-xs"
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
            <p className="text-xs text-zinc-600">
                Spread to add:{' '}
                <code className="text-indigo-400">[...prev, item]</code>
                {'  '}Filter to remove:{' '}
                <code className="text-indigo-400">prev.filter(...)</code>
            </p>
        </div>
    );
}

const codeSamples: Record<Tab, string> = {
    counter: `const [count, setCount] = useState(0)

// Functional update — safe when new state depends on old
setCount(c => c + 1)
setCount(c => c - 1)
setCount(0)  // reset to initial value`,

    input: `const [name, setName] = useState('')
const [dark, setDark] = useState(false)

// Controlled input — React owns the value
<input value={name} onChange={e => setName(e.target.value)} />

// Toggle boolean with functional update
setDark(d => !d)`,

    array: `const [items, setItems] = useState<string[]>(['Learn React'])

// ✅ Correct — always create a new array reference
setItems(prev => [...prev, newItem])              // add
setItems(prev => prev.filter((_, i) => i !== idx)) // remove

// ❌ Wrong — mutating state directly won't trigger re-render
items.push(newItem)`,
};

const tabLabels: Record<Tab, string> = {
    counter: 'Counter',
    input: 'Input & Toggle',
    array: 'Arrays',
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('counter');

    return (
        <div className="p-6 space-y-6">
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Live Demo</p>
                <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
                    <TabBar
                        tabs={tabLabels}
                        active={activeTab}
                        onSelect={(v) => setActiveTab(v as Tab)}
                    />
                    {activeTab === 'counter' && <CounterDemo />}
                    {activeTab === 'input' && <InputDemo />}
                    {activeTab === 'array' && <ArrayDemo />}
                </div>
            </div>
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Source</p>
                <CodeBlock code={codeSamples[activeTab]} title={`useState — ${tabLabels[activeTab]}`} />
            </div>
        </div>
    );
}
