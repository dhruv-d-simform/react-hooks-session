import { useState, useMemo, useCallback, memo, useRef } from 'react';
import SlideWrapper from '@/components/SlideWrapper';

type Tab = 'memo' | 'callback';

// --- useMemo demo ---

function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function MemoDemo() {
    const [n, setN] = useState(30);
    const [unrelated, setUnrelated] = useState(0);

    const result = useMemo(() => {
        const start = performance.now();
        const val = fibonacci(n);
        const duration = (performance.now() - start).toFixed(2);
        return { val, duration };
    }, [n]);

    return (
        <div className="space-y-4">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-zinc-400">
                        fibonacci(
                        <span className="text-indigo-300 font-mono font-bold">
                            {n}
                        </span>
                        )
                    </label>
                    <span className="text-xs text-zinc-500">
                        Computed in{' '}
                        <span className="text-amber-400 font-mono">
                            {result.duration}ms
                        </span>
                    </span>
                </div>
                <input
                    type="range"
                    min={1}
                    max={40}
                    value={n}
                    onChange={(e) => setN(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-zinc-600 mt-0.5">
                    <span>1</span>
                    <span>40</span>
                </div>
            </div>
            <div className="bg-zinc-800 rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-500 mb-1">Result</p>
                <p className="text-2xl font-black font-mono text-indigo-300 break-all">
                    {result.val}
                </p>
            </div>
            <div className="flex items-center justify-between bg-zinc-800/50 rounded-lg p-3">
                <div>
                    <p className="text-xs text-zinc-400">Unrelated state</p>
                    <p className="text-xs text-zinc-600">
                        Changing this does NOT re-run fibonacci
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setUnrelated((c) => c + 1)}
                        className="px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-xs transition-colors"
                    >
                        Trigger re-render #{unrelated}
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- useCallback demo ---

const ExpensiveChild = memo(function ExpensiveChild({
    label,
    onClick,
}: {
    label: string;
    onClick: () => void;
}) {
    const renders = useRef(0);
    renders.current++;

    return (
        <div className="flex items-center justify-between bg-zinc-800 rounded-lg px-3 py-2">
            <span className="text-sm">{label}</span>
            <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-600">
                    renders: {renders.current}
                </span>
                <button
                    onClick={onClick}
                    className="px-2.5 py-1 bg-indigo-600/50 hover:bg-indigo-600 rounded text-xs transition-colors"
                >
                    Click
                </button>
            </div>
        </div>
    );
});

function CallbackDemo() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    const stableHandler = useCallback(() => {
        setCount((c) => c + 1);
    }, []);

    const unstableHandler = () => {
        setCount((c) => c + 1);
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-xs text-zinc-500 mb-1.5">
                    Type here to trigger re-renders:
                </label>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type to cause re-renders..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                />
            </div>
            <div className="space-y-2">
                <div>
                    <p className="text-xs text-red-400 mb-1.5">
                        ❌ Without useCallback — new function every render:
                    </p>
                    <ExpensiveChild
                        label="Unstable handler"
                        onClick={unstableHandler}
                    />
                </div>
                <div>
                    <p className="text-xs text-emerald-400 mb-1.5">
                        ✅ With useCallback — same reference, React.memo works:
                    </p>
                    <ExpensiveChild
                        label="Stable handler"
                        onClick={stableHandler}
                    />
                </div>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-3">
                <p className="text-xs text-zinc-500">
                    Counter:{' '}
                    <span className="text-indigo-300 font-mono font-bold">
                        {count}
                    </span>{' '}
                    (incremented by both buttons)
                </p>
            </div>
        </div>
    );
}

const codeSamples: Record<Tab, string> = {
    memo: `// Recalculates only when 'n' changes
const result = useMemo(() => {
  return fibonacci(n)   // expensive computation
}, [n])

// ✅ Typing in an unrelated input doesn't re-run fibonacci
// ❌ Without useMemo: re-runs on EVERY render

// Also useful for derived data
const sortedList = useMemo(
  () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
  [items]
)`,

    callback: `// Memoizes the function — same reference between renders
const handleClick = useCallback(() => {
  setCount(c => c + 1)
}, [])  // empty deps — function never recreated

// Why it matters: React.memo compares props by reference
const Child = memo(({ onClick }) => {
  // Only re-renders if onClick reference changes
  return <button onClick={onClick}>Click</button>
})

// Without useCallback: onClick is a new function each render
// → React.memo can't bail out → Child re-renders every time`,
};

const tabLabels: Record<Tab, string> = {
    memo: 'useMemo',
    callback: 'useCallback',
};

function DemoWithTabs({ onTabChange }: { onTabChange: (t: Tab) => void }) {
    const [tab, setTab] = useState<Tab>('memo');

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
                        className={`flex-1 py-1.5 text-xs rounded-md font-medium transition-colors ${
                            tab === t
                                ? 'bg-indigo-600 text-white'
                                : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                    >
                        {tabLabels[t]}
                    </button>
                ))}
            </div>
            {tab === 'memo' && <MemoDemo />}
            {tab === 'callback' && <CallbackDemo />}
        </div>
    );
}

export default function UsePerformanceSlide() {
    const [activeTab, setActiveTab] = useState<Tab>('memo');

    return (
        <SlideWrapper
            badge="Performance"
            title="useMemo & useCallback"
            subtitle="Skip expensive recalculations and prevent unnecessary child re-renders between renders"
            syntax={`useMemo(() => expensiveCalc(), [dep])
useCallback(() => handler(), [dep])`}
            bullets={[
                {
                    text: 'useMemo caches a computed value — recalculates only when deps change',
                    highlight: true,
                },
                {
                    text: 'useCallback caches a function reference — same identity between renders',
                    highlight: true,
                },
                {
                    text: "React.memo skips re-rendering if props haven't changed by reference",
                },
                {
                    text: 'useCallback + React.memo = stable function props that memo can bail out on',
                },
                {
                    text: "⚠️ Don't over-optimize — profile first, add memo where you measure slowness",
                },
                {
                    text: 'Empty deps [] → value/function created once, never changes',
                },
            ]}
            demo={<DemoWithTabs onTabChange={setActiveTab} />}
            code={codeSamples[activeTab]}
            codeTitle={tabLabels[activeTab]}
        />
    );
}
