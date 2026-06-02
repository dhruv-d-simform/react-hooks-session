import { useState, useEffect } from 'react';
import { UserIdPicker } from './components/UserIdPicker';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { UserCard } from './components/UserCard';
import type { User } from './components/UserCard';

export const fileUrl = '/src/slides/use-effect/demo/DataFetching.tsx';

export default function DataFetching() {
    const [userId, setUserId] = useState(1);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
            signal: controller.signal,
        })
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json() as Promise<User>;
            })
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err: Error) => {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => controller.abort();
    }, [userId]);

    return (
        <div className="space-y-4">
            <UserIdPicker active={userId} onSelect={setUserId} />

            <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-2.5 font-mono text-[11px]">
                <span className="text-zinc-500">useEffect deps: </span>
                <span className="text-indigo-300">[userId]</span>
                <span className="text-zinc-600">
                    {' '}
                    — re-fetches whenever userId changes
                </span>
            </div>

            {loading && <LoadingSpinner userId={userId} />}
            {error && <ErrorDisplay message={error} />}
            {!loading && !error && user && <UserCard user={user} />}

            <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-2.5">
                <p className="text-[10px] text-zinc-500">
                    🧹 <span className="text-zinc-400">Cleanup:</span> switching
                    user IDs rapidly cancels in-flight requests via{' '}
                    <span className="font-mono text-zinc-300">
                        controller.abort()
                    </span>
                </p>
            </div>
        </div>
    );
}
