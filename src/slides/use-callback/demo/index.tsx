import { useState, useCallback, memo } from 'react';
import TabBar from '@/components/TabBar';
import DemoShell from '@/components/demo/DemoShell';
import StatusBanner from '@/components/demo/StatusBanner';
import { TodoItem } from './components/TodoItem';
import { CounterBar } from './components/CounterBar';

export const fileUrl = '/src/slides/use-callback/demo/index.tsx';

type Tab = 'with' | 'without';

const TAB_LABELS: Record<Tab, string> = {
    with: 'With useCallback ✅',
    without: 'Without useCallback ❌',
};

const MemoizedTodoItem = memo(TodoItem);

function TodoList({ useCallbackEnabled }: { useCallbackEnabled: boolean }) {
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState(['Buy groceries', 'Walk the dog']);

    const stableRemove = useCallback(
        (idx: number) => setTodos((t) => t.filter((_, i) => i !== idx)),
        []
    );
    const unstableRemove = (idx: number) =>
        setTodos((t) => t.filter((_, i) => i !== idx));

    return (
        <div className="space-y-3">
            <StatusBanner
                enabled={useCallbackEnabled}
                onMessage="✅ useCallback([]) — stable function reference, child skips re-render"
                offMessage="❌ Inline function — new reference every render, child re-renders too"
            />
            <CounterBar
                count={count}
                onIncrement={() => setCount((c) => c + 1)}
            />
            <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                Memoized children{' '}
                <span className="normal-case">— render count shown in badge</span>
            </p>
            <div className="space-y-2">
                {todos.map((todo, idx) => (
                    <MemoizedTodoItem
                        key={todo}
                        text={todo}
                        instanceId={`item-${idx}`}
                        onRemove={
                            useCallbackEnabled
                                ? () => stableRemove(idx)
                                : () => unstableRemove(idx)
                        }
                    />
                ))}
            </div>
            <p className="text-[11px] text-zinc-600">
                {useCallbackEnabled
                    ? 'Increment the counter — children stay at ×1 because the callback reference is stable.'
                    : 'Increment the counter — children re-render every time because a new function is created.'}
            </p>
        </div>
    );
}

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('with');

    return (
        <DemoShell fileUrl={fileUrl}>
            <TabBar
                tabs={TAB_LABELS}
                active={activeTab}
                onSelect={(v) => setActiveTab(v as Tab)}
            />
            <TodoList key={activeTab} useCallbackEnabled={activeTab === 'with'} />
        </DemoShell>
    );
}
