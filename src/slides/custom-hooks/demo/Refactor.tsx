import { useState, useEffect } from 'react';
import { ViewToggle } from './components/ViewToggle';
import { CodeBlock } from './components/CodeBlock';
import { UserResult } from './components/UserResult';
import { UserIdPicker } from './components/UserIdPicker';
import type { User } from './components/UserResult';

export const fileUrl = '/src/slides/custom-hooks/demo/Refactor.tsx';

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
            <ViewToggle view={view} onSelect={setView} />
            <CodeBlock code={view === 'before' ? BEFORE : AFTER} view={view} />

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
                <UserIdPicker active={userId} onSelect={setUserId} />
                <UserResult
                    loading={loading}
                    error={error}
                    user={user}
                    userId={userId}
                />
            </div>
        </div>
    );
}
