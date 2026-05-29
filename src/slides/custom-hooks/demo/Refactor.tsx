import { useState, useEffect } from 'react';

export const fileUrl = '/src/slides/custom-hooks/demo/Refactor.tsx';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

/**
 * The custom hook — all the tangled fetch logic (loading / error / data +
 * AbortController cleanup) extracted once, reusable everywhere.
 */
function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        fetch(url, { signal: controller.signal })
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json() as Promise<T>;
            })
            .then((d) => {
                setData(d);
                setLoading(false);
            })
            .catch((err: Error) => {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => controller.abort();
    }, [url]);

    return { data, loading, error };
}

const BEFORE = `function Profile({ id }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const c = new AbortController()
    setLoading(true); setError(null)
    fetch(url(id), { signal: c.signal })
      .then(r => r.json())
      .then(d => { setUser(d); setLoading(false) })
      .catch(e => { if (e.name !== 'AbortError') {
        setError(e.message); setLoading(false) } })
    return () => c.abort()
  }, [id])

  // ...render
}`;

const AFTER = `function Profile({ id }) {
  const { data: user, loading, error } =
    useFetch(url(id))

  // ...render
}`;

type View = 'before' | 'after';

export default function Refactor() {
    const [view, setView] = useState<View>('before');
    const [userId, setUserId] = useState(1);
    const {
        data: user,
        loading,
        error,
    } = useFetch<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-1 bg-zinc-800 p-1 rounded-lg">
                {(['before', 'after'] as View[]).map((v) => (
                    <button
                        key={v}
                        onClick={() => setView(v)}
                        className={`flex-1 py-1.5 text-xs rounded-md font-medium transition-colors ${
                            view === v
                                ? v === 'before'
                                    ? 'bg-amber-600/80 text-white'
                                    : 'bg-teal-600 text-white'
                                : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                    >
                        {v === 'before'
                            ? 'Before · inline logic'
                            : 'After · useFetch'}
                    </button>
                ))}
            </div>

            <pre
                className={`rounded-xl border p-3.5 font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre ${
                    view === 'before'
                        ? 'bg-amber-900/10 border-amber-700/30 text-amber-100/80'
                        : 'bg-teal-900/10 border-teal-700/30 text-teal-100/90'
                }`}
            >
                {view === 'before' ? BEFORE : AFTER}
            </pre>

            <p className="text-[11px] text-zinc-500 leading-relaxed">
                {view === 'before' ? (
                    <>
                        Every component that fetches re-implements the same four
                        moving parts. Multiply that across a codebase and the
                        bugs multiply too.
                    </>
                ) : (
                    <>
                        Same behavior, one line. The logic lives in{' '}
                        <span className="font-mono text-teal-300">
                            useFetch
                        </span>{' '}
                        — test it once, reuse it everywhere.
                    </>
                )}
            </p>

            <div className="border-t border-zinc-800 pt-4 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                        Live · powered by useFetch
                    </span>
                    {[1, 2, 3, 4, 5].map((id) => (
                        <button
                            key={id}
                            onClick={() => setUserId(id)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                                userId === id
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700'
                            }`}
                        >
                            {id}
                        </button>
                    ))}
                </div>

                {loading && (
                    <div className="flex items-center gap-3 py-2">
                        <div className="w-4 h-4 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
                        <span className="text-xs text-zinc-500">
                            Fetching user {userId}…
                        </span>
                    </div>
                )}

                {error && (
                    <div className="bg-rose-900/20 border border-rose-700/30 rounded-lg p-3">
                        <p className="text-xs text-rose-400">Error: {error}</p>
                    </div>
                )}

                {!loading && !error && user && (
                    <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-3.5 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                            {user.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-zinc-100 truncate">
                                {user.name}
                            </p>
                            <p className="text-xs text-zinc-400 truncate">
                                @{user.username} · {user.email}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
