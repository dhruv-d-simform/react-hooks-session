import { useState, useMemo, useRef } from 'react';
import TabBar from '@/components/TabBar';
import OpenInVSCode from '@/components/OpenInVSCode';

export const fileUrl = '/src/slides/use-memo/demo/index.tsx';

type Tab = 'with' | 'without';

const TAB_LABELS: Record<Tab, string> = {
    with: 'With useMemo ✅',
    without: 'Without useMemo ❌',
};

const ITEMS = Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
    category: ['React', 'TypeScript', 'CSS', 'Node.js', 'Testing'][i % 5],
}));

function expensiveFilter(items: typeof ITEMS, query: string) {
    // Simulate expensive work
    const start = performance.now();
    while (performance.now() - start < 8) {} // artificial 8ms delay
    return items.filter(
        (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
    );
}

function FilterDemo({ memoized }: { memoized: boolean }) {
    const [query, setQuery] = useState('');
    const [name, setName] = useState('');
    const computeCount = useRef(0);

    const filtered = memoized
        ? // eslint-disable-next-line react-hooks/rules-of-hooks
          useMemo(() => {
              computeCount.current++;
              return expensiveFilter(ITEMS, query);
          }, [query])
        : (() => {
              computeCount.current++;
              return expensiveFilter(ITEMS, query);
          })();

    return (
        <div className="space-y-3">
            <div
                className={`rounded-lg p-2.5 border text-[11px] ${memoized ? 'bg-emerald-900/15 border-emerald-700/25 text-emerald-400' : 'bg-rose-900/15 border-rose-700/25 text-rose-400'}`}
            >
                {memoized
                    ? '✅ useMemo([query]) — compute only when query changes'
                    : '❌ No memo — recomputes on every render, including unrelated state changes'}
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                        Filter (try "React")
                    </label>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search items…"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-600"
                    />
                </div>
                <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                        Name (unrelated)
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Type here…"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-600"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2">
                <span className="text-xs text-zinc-500">
                    Showing{' '}
                    <span className="font-mono text-zinc-300">
                        {filtered.length}
                    </span>{' '}
                    / 5 000 items
                </span>
                <span className="text-xs font-mono text-zinc-500">
                    computations:{' '}
                    <span
                        className={
                            memoized ? 'text-emerald-400' : 'text-rose-400'
                        }
                    >
                        {computeCount.current}
                    </span>
                </span>
            </div>

            <div className="bg-zinc-800/40 rounded-lg overflow-hidden max-h-36 overflow-y-auto slide-scroll">
                {filtered.slice(0, 20).map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-800/50 last:border-0"
                    >
                        <span className="text-xs text-zinc-300">
                            {item.name}
                        </span>
                        <span className="text-[10px] text-zinc-600">
                            {item.category}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('with');

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Live Demo
                </p>
                <OpenInVSCode fileUrl={fileUrl} />
            </div>
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
                <TabBar
                    tabs={TAB_LABELS}
                    active={activeTab}
                    onSelect={(v) => setActiveTab(v as Tab)}
                />
                <FilterDemo key={activeTab} memoized={activeTab === 'with'} />
            </div>
        </div>
    );
}
