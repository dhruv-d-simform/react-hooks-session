export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

export function UserResult({
    loading,
    error,
    user,
    userId,
}: {
    loading: boolean;
    error: string | null;
    user: User | null;
    userId: number;
}) {
    if (loading)
        return (
            <div className="flex items-center gap-3 py-2">
                <div className="w-4 h-4 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
                <span className="text-xs text-zinc-500">
                    Fetching user {userId}…
                </span>
            </div>
        );

    if (error)
        return (
            <div className="bg-rose-900/20 border border-rose-700/30 rounded-lg p-3">
                <p className="text-xs text-rose-400">Error: {error}</p>
            </div>
        );

    if (!user) return null;

    return (
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
    );
}
