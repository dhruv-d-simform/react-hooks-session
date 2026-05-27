import { useState, useEffect, useCallback, useRef } from 'react';
import CodeBlock from '@/components/CodeBlock';
import TabBar from '@/components/TabBar';

type Tab = 'localStorage' | 'debounce' | 'fetch';

// --- useLocalStorage ---

function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? (JSON.parse(stored) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setStoredValue = useCallback(
        (newValue: T | ((prev: T) => T)) => {
            setValue((prev) => {
                const next =
                    typeof newValue === 'function'
                        ? (newValue as (p: T) => T)(prev)
                        : newValue;
                try {
                    localStorage.setItem(key, JSON.stringify(next));
                } catch {
                    /* ignore */
                }
                return next;
            });
        },
        [key]
    );

    return [value, setStoredValue] as const;
}

function LocalStorageDemo() {
    const [name, setName] = useLocalStorage('hooks-demo-name', '');
    const [count, setCount] = useLocalStorage('hooks-demo-count', 0);

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-xs text-zinc-500 mb-1.5">
                    Name (persists to localStorage):
                </label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                />
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setCount((c) => c - 1)}
                    className="w-9 h-9 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-lg font-bold transition-colors"
                >
                    −
                </button>
                <span className="text-3xl font-black font-mono tabular-nums w-14 text-center">
                    {count}
                </span>
                <button
                    onClick={() => setCount((c) => c + 1)}
                    className="w-9 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-lg font-bold transition-colors"
                >
                    +
                </button>
            </div>
            <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3">
                <p className="text-xs text-amber-300 font-medium mb-1">
                    Try it:
                </p>
                <p className="text-xs text-amber-600">
                    Change the values, then refresh the page — they persist!
                </p>
            </div>
        </div>
    );
}

// --- useDebounce ---

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

function DebounceDemo() {
    const [input, setInput] = useState('');
    const [searchLog, setSearchLog] = useState<string[]>([]);
    const keystrokeCount = useRef(0);
    const searchCount = useRef(0);

    const debouncedInput = useDebounce(input, 500);

    useEffect(() => {
        if (!debouncedInput) return;
        searchCount.current++;
        setSearchLog((prev) => [
            `Search #${searchCount.current}: "${debouncedInput}"`,
            ...prev.slice(0, 4),
        ]);
    }, [debouncedInput]);

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-xs text-zinc-500 mb-1.5">
                    Search (debounced 500ms):
                </label>
                <input
                    value={input}
                    onChange={(e) => {
                        keystrokeCount.current++;
                        setInput(e.target.value);
                    }}
                    placeholder="Type quickly..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-800 rounded-lg p-3 text-center">
                    <p className="text-xs text-zinc-500 mb-1">Keystrokes</p>
                    <p className="text-2xl font-black text-zinc-300">
                        {keystrokeCount.current}
                    </p>
                </div>
                <div className="bg-zinc-800 rounded-lg p-3 text-center">
                    <p className="text-xs text-zinc-500 mb-1">
                        API calls fired
                    </p>
                    <p className="text-2xl font-black text-emerald-400">
                        {searchCount.current}
                    </p>
                </div>
            </div>
            <div className="bg-zinc-950 rounded-lg p-3 font-mono text-xs min-h-[80px]">
                {searchLog.length === 0 ? (
                    <p className="text-zinc-600">
                        Search log will appear here...
                    </p>
                ) : (
                    searchLog.map((l, i) => (
                        <p key={i} className="text-indigo-300">
                            {l}
                        </p>
                    ))
                )}
            </div>
        </div>
    );
}

// --- useFetch ---

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

function useFetch<T>(url: string) {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        setState({ data: null, loading: true, error: null });
        const controller = new AbortController();

        fetch(url, { signal: controller.signal })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json() as Promise<T>;
            })
            .then((data) => setState({ data, loading: false, error: null }))
            .catch((err: Error) => {
                if (err.name !== 'AbortError') {
                    setState({
                        data: null,
                        loading: false,
                        error: err.message,
                    });
                }
            });

        return () => controller.abort();
    }, [url]);

    return state;
}

interface User {
    id: number;
    name: string;
    email: string;
    company: { name: string };
}

function FetchDemo() {
    const [userId, setUserId] = useState(1);
    const {
        data: user,
        loading,
        error,
    } = useFetch<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-3">
                <label className="text-xs text-zinc-400">User ID:</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((id) => (
                        <button
                            key={id}
                            onClick={() => setUserId(id)}
                            className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                                userId === id
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                            }`}
                        >
                            {id}
                        </button>
                    ))}
                </div>
            </div>
            <div className="bg-zinc-800 rounded-xl p-4 min-h-[110px]">
                {loading && (
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <span className="animate-spin">⏳</span>
                        <span>Loading user {userId}...</span>
                    </div>
                )}
                {error && (
                    <p className="text-sm text-red-400">Error: {error}</p>
                )}
                {user && (
                    <div className="space-y-1">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-zinc-400">{user.email}</p>
                        <p className="text-xs text-zinc-500">
                            {user.company.name}
                        </p>
                    </div>
                )}
            </div>
            <p className="text-xs text-zinc-600">
                <code className="text-indigo-400">useFetch(url)</code>{' '}
                encapsulates loading/error/data state + fetch + cleanup —
                reusable anywhere.
            </p>
        </div>
    );
}

const codeSamples: Record<Tab, string> = {
    localStorage: `function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  const setStoredValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const next = typeof newValue === 'function'
        ? (newValue as (p: T) => T)(prev) : newValue
      localStorage.setItem(key, JSON.stringify(next))
      return next
    })
  }, [key])

  return [value, setStoredValue] as const
}

// Usage — same API as useState
const [name, setName] = useLocalStorage('user-name', '')`,

    debounce: `function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)  // cancel on next keystroke
  }, [value, delay])

  return debounced
}

// Usage — fires API call only 500ms after user stops typing
const debouncedQuery = useDebounce(query, 500)
useEffect(() => {
  if (debouncedQuery) searchAPI(debouncedQuery)
}, [debouncedQuery])`,

    fetch: `function useFetch<T>(url: string) {
  const [state, setState] = useState<{
    data: T | null; loading: boolean; error: string | null
  }>({ data: null, loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()
    setState({ data: null, loading: true, error: null })

    fetch(url, { signal: controller.signal })
      .then(res => res.json() as Promise<T>)
      .then(data => setState({ data, loading: false, error: null }))
      .catch(err => {
        if (err.name !== 'AbortError')
          setState({ data: null, loading: false, error: err.message })
      })

    return () => controller.abort()
  }, [url])

  return state
}

// Usage — clean, no boilerplate
const { data, loading, error } = useFetch<User>('/api/user/1')`,
};

const tabLabels: Record<Tab, string> = {
    localStorage: 'useLocalStorage',
    debounce: 'useDebounce',
    fetch: 'useFetch',
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('localStorage');

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
                    {activeTab === 'localStorage' && <LocalStorageDemo />}
                    {activeTab === 'debounce' && <DebounceDemo />}
                    {activeTab === 'fetch' && <FetchDemo />}
                </div>
            </div>
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Source</p>
                <CodeBlock code={codeSamples[activeTab]} title={tabLabels[activeTab]} />
            </div>
        </div>
    );
}
