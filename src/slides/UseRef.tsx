import { useState, useEffect, useRef } from 'react';
import SlideWrapper from '@/components/SlideWrapper';

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

function DemoWithTabs({ onTabChange }: { onTabChange: (t: Tab) => void }) {
    const [tab, setTab] = useState<Tab>('focus');

    const handleTabChange = (t: Tab) => {
        setTab(t);
        onTabChange(t);
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-1 bg-zinc-800 p-1 rounded-lg">
                {(Object.keys(tabLabels) as Tab[]).map((t) => (
                    <button
                        key={t}
                        onClick={() => handleTabChange(t)}
                        className={`flex-1 py-1.5 text-[11px] rounded-md font-medium transition-colors ${
                            tab === t
                                ? 'bg-indigo-600 text-white'
                                : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                    >
                        {tabLabels[t]}
                    </button>
                ))}
            </div>
            {tab === 'focus' && <FocusDemo />}
            {tab === 'prevValue' && <PrevValueDemo />}
            {tab === 'renderCount' && <RenderCountDemo />}
        </div>
    );
}

export default function UseRefSlide() {
    const [activeTab, setActiveTab] = useState<Tab>('focus');

    return (
        <SlideWrapper
            badge="Hook"
            title="useRef"
            subtitle="A mutable box that persists across renders without causing re-renders"
            syntax={`const ref = useRef(initialValue)
// ref.current holds the value`}
            bullets={[
                {
                    text: 'ref.current is mutable — change it without triggering re-renders',
                    highlight: true,
                },
                {
                    text: 'Persists across renders — unlike a regular variable which resets',
                },
                {
                    text: 'Use case 1: Access DOM nodes directly (focus, scroll, measure)',
                },
                {
                    text: 'Use case 2: Store mutable values (timers, previous state, flags)',
                },
                {
                    text: 'During render, ref.current holds the value from the PREVIOUS render',
                },
                {
                    text: 'Updates are synchronous — no batching, no async scheduling',
                },
            ]}
            demo={<DemoWithTabs onTabChange={setActiveTab} />}
            code={codeSamples[activeTab]}
            codeTitle={`useRef — ${tabLabels[activeTab]}`}
        />
    );
}
