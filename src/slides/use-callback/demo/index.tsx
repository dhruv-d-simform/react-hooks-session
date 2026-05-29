import { useState, useCallback, memo, useRef } from 'react';
import TabBar from '@/components/TabBar';
import OpenInVSCode from '@/components/OpenInVSCode';

export const fileUrl = '/src/slides/use-callback/demo/index.tsx';

type Tab = 'with' | 'without';

const TAB_LABELS: Record<Tab, string> = {
    with: 'With useCallback ✅',
    without: 'Without useCallback ❌',
};

const MemoizedTodoItem = memo(function TodoItem({
    text,
    onRemove,
    instanceId,
}: {
    text: string;
    onRemove: () => void;
    instanceId: string;
}) {
    const renderCount = useRef(0);
    renderCount.current++;

    return (
        <div className="flex items-center justify-between bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-300">{text}</span>
                <span className="text-[9px] font-mono text-zinc-600">
                    ({instanceId})
                </span>
            </div>
            <div className="flex items-center gap-2">
                <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full border ${
                        renderCount.current > 1
                            ? 'text-rose-400 bg-rose-900/30 border-rose-700/30'
                            : 'text-emerald-400 bg-emerald-900/30 border-emerald-700/30'
                    }`}
                >
                    ×{renderCount.current}
                </span>
                <button
                    onClick={onRemove}
                    className="text-zinc-600 hover:text-rose-400 text-xs transition-colors"
                >
                    ✕
                </button>
            </div>
        </div>
    );
});

function TodoList({ useCallbackEnabled }: { useCallbackEnabled: boolean }) {
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState(['Buy groceries', 'Walk the dog']);

    const removeWithCallback = useCallback(
        (idx: number) => setTodos((t) => t.filter((_, i) => i !== idx)),
        []
    );
    const removeWithout = (idx: number) =>
        setTodos((t) => t.filter((_, i) => i !== idx));

    return (
        <div className="space-y-3">
            <div
                className={`rounded-lg p-2.5 border text-[11px] ${useCallbackEnabled ? 'bg-emerald-900/15 border-emerald-700/25 text-emerald-400' : 'bg-rose-900/15 border-rose-700/25 text-rose-400'}`}
            >
                {useCallbackEnabled
                    ? '✅ useCallback([]) — stable function reference, child skips re-render'
                    : '❌ Inline function — new reference every render, child re-renders too'}
            </div>

            <div className="flex items-center justify-between bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2">
                <span className="text-xs text-zinc-400">
                    Parent counter:{' '}
                    <span className="font-mono text-zinc-200">{count}</span>
                </span>
                <button
                    onClick={() => setCount((c) => c + 1)}
                    className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white transition-colors"
                >
                    +1 (causes parent re-render)
                </button>
            </div>

            <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-2">
                    Memoized children{' '}
                    <span className="normal-case">
                        — render count shown in badge
                    </span>
                </p>
                <div className="space-y-2">
                    {todos.map((todo, idx) => (
                        <MemoizedTodoItem
                            key={todo}
                            text={todo}
                            instanceId={`item-${idx}`}
                            onRemove={
                                useCallbackEnabled
                                    ? () => removeWithCallback(idx)
                                    : () => removeWithout(idx)
                            }
                        />
                    ))}
                </div>
            </div>

            <p className="text-[11px] text-zinc-600">
                {useCallbackEnabled
                    ? 'Increment the counter and watch — children stay at ×1 because the callback reference is stable.'
                    : 'Increment the counter and watch — children re-render every time because a new function is created.'}
            </p>
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
                <TodoList
                    key={activeTab}
                    useCallbackEnabled={activeTab === 'with'}
                />
            </div>
        </div>
    );
}
