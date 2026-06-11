import { useState, memo } from 'react';
import StatusBanner from '@/components/demo/StatusBanner';
import { TodoItem } from './components/TodoItem';
import { CounterBar } from './components/CounterBar';

export const fileUrl = '/src/slides/use-callback/demo/TodoListWithout.tsx';

const MemoizedTodoItem = memo(TodoItem);

export default function TodoListWithout() {
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState(['Buy groceries', 'Walk the dog']);

    const remove = (idx: number) =>
        setTodos((t) => t.filter((_, i) => i !== idx));

    return (
        <div className="space-y-3">
            <StatusBanner
                enabled={false}
                onMessage=""
                offMessage="❌ Inline function — new reference every render, child re-renders too"
            />
            <CounterBar
                count={count}
                onIncrement={() => setCount((c) => c + 1)}
            />
            <p className="text-[10px] uppercase tracking-wider text-zinc-500">
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
                        idx={idx}
                        instanceId={`item-${idx}`}
                        onRemove={remove}
                    />
                ))}
            </div>
            <p className="text-[11px] text-zinc-600">
                Increment the counter — children re-render every time because a
                new function is created.
            </p>
        </div>
    );
}
