import { useState, useEffect, useRef } from 'react';
import CodeBlock from '@/components/CodeBlock';
import TabBar from '@/components/TabBar';

type Tab = 'focus' | 'prevValue' | 'renderCount';

function FocusDemo() {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="space-y-4">
            <input
                ref={inputRef}
                placeholder="I'm not focused yet..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <button
                onClick={() => inputRef.current?.focus()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors"
            >
                Focus Input
            </button>
            <p className="text-xs text-zinc-600">
                <code className="text-indigo-400">inputRef.current</code> is the
                actual DOM node. Clicking the button calls{' '}
                <code className="text-indigo-400">.focus()</code> on it
                directly.
            </p>
        </div>
    );
}

function PrevValueDemo() {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef<number>(count);
    const prevCount = prevCountRef.current;

    useEffect(() => {
        prevCountRef.current = count;
    });

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-800 rounded-xl p-4 text-center">
                    <p className="text-xs text-zinc-500 mb-1">Previous</p>
                    <p className="text-3xl font-black font-mono tabular-nums text-zinc-400">
                        {prevCount}
                    </p>
                </div>
                <div className="bg-zinc-800 rounded-xl p-4 text-center">
                    <p className="text-xs text-zinc-500 mb-1">Current</p>
                    <p className="text-3xl font-black font-mono tabular-nums text-indigo-300">
                        {count}
                    </p>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => setCount((c) => c - 1)}
                    className="flex-1 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-sm font-bold transition-colors"
                >
                    −
                </button>
                <button
                    onClick={() => setCount((c) => c + 1)}
                    className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold transition-colors"
                >
                    +
                </button>
            </div>
            <p className="text-xs text-zinc-600">
                Ref updates <em>after</em> render — so during render, it still
                holds the previous value.
            </p>
        </div>
    );
}

function RenderCountDemo() {
    const [value, setValue] = useState('');
    const renderCount = useRef(0);

    // Increment on every render — does not cause re-render
    renderCount.current++;

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-xs text-zinc-500 mb-1.5">
                    Type anything — the render count increments:
                </label>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Type here..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                />
            </div>
            <div className="flex items-center gap-3 bg-zinc-800 rounded-xl p-4">
                <span className="text-2xl">🔄</span>
                <div>
                    <p className="text-xs text-zinc-500">
                        Render count (via useRef)
                    </p>
                    <p className="text-2xl font-black font-mono text-amber-400">
                        {renderCount.current}
                    </p>
                </div>
            </div>
            <p className="text-xs text-zinc-600">
                Unlike <code className="text-indigo-400">useState</code>,
                updating <code className="text-indigo-400">ref.current</code>{' '}
                does NOT trigger a re-render. It's a mutable box.
            </p>
        </div>
    );
}

const codeSamples: Record<Tab, string> = {
    focus: `const inputRef = useRef<HTMLInputElement>(null)

// Attach ref to DOM element
<input ref={inputRef} />

// Access the DOM node directly
inputRef.current?.focus()
inputRef.current?.scrollIntoView()
inputRef.current?.value  // read without state`,

    prevValue: `function usePrevious<T>(value: T) {
  const ref = useRef<T>(value)
  const prev = ref.current  // captured before update

  useEffect(() => {
    ref.current = value  // update AFTER render
  })  // no deps — runs after every render

  return prev
}

// Usage
const prevCount = usePrevious(count)`,

    renderCount: `const renderCount = useRef(0)

function MyComponent() {
  // Runs synchronously during render — no re-render triggered
  renderCount.current++

  return <p>Rendered {renderCount.current} times</p>
}

// Key insight: ref.current mutation ≠ setState
// Mutation → immediate, no re-render
// setState → schedules a re-render`,
};

const tabLabels: Record<Tab, string> = {
    focus: 'DOM Access',
    prevValue: 'Previous Value',
    renderCount: 'Render Counter',
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('focus');

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
                    {activeTab === 'focus' && <FocusDemo />}
                    {activeTab === 'prevValue' && <PrevValueDemo />}
                    {activeTab === 'renderCount' && <RenderCountDemo />}
                </div>
            </div>
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Source</p>
                <CodeBlock code={codeSamples[activeTab]} title={`useRef — ${tabLabels[activeTab]}`} />
            </div>
        </div>
    );
}
