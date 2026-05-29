import { useState, useEffect } from 'react';

export const fileUrl = '/src/slides/use-effect/demo/DataFetching.tsx';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    company: { name: string };
    phone: string;
}

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
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    User ID
                </span>
                {[1, 2, 3, 4, 5].map((id) => (
                    <button
                        key={id}
                        onClick={() => setUserId(id)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                            userId === id
                                ? 'bg-indigo-600 text-white'
                                : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700'
                        }`}
                    >
                        {id}
                    </button>
                ))}
            </div>

            <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-2.5 font-mono text-[11px]">
                <span className="text-zinc-500">useEffect deps: </span>
                <span className="text-indigo-300">[userId]</span>
                <span className="text-zinc-600">
                    {' '}
                    — re-fetches whenever userId changes
                </span>
            </div>

            {loading && (
                <div className="flex items-center gap-3 py-4">
                    <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
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
                <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-zinc-100">
                                {user.name}
                            </p>
                            <p className="text-xs text-zinc-400">
                                @{user.username}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-1.5 text-xs">
                        <div className="flex gap-2">
                            <span className="text-zinc-600 w-16">Email</span>
                            <span className="text-zinc-300">{user.email}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-zinc-600 w-16">Phone</span>
                            <span className="text-zinc-300">{user.phone}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-zinc-600 w-16">Company</span>
                            <span className="text-zinc-300">
                                {user.company.name}
                            </span>
                        </div>
                    </div>
                </div>
            )}

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
