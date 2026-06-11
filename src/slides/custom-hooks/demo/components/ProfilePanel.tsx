import type { User } from '../types';

export function ProfilePanel({
    user,
    loading,
    error,
}: {
    user: User | null;
    loading: boolean;
    error: string | null;
}) {
    return (
        <div className="rounded-xl bg-zinc-950/60 border border-zinc-800 p-4 min-h-[108px]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2.5">
                Profile
            </p>

            {loading && (
                <div className="space-y-2 animate-pulse">
                    <div className="h-4 w-40 rounded bg-zinc-800" />
                    <div className="h-3 w-56 rounded bg-zinc-800/70" />
                    <div className="h-3 w-48 rounded bg-zinc-800/70" />
                </div>
            )}

            {!loading && error && (
                <p className="text-xs text-red-400">⚠️ {error}</p>
            )}

            {!loading && !error && user && (
                <div className="space-y-1">
                    <p className="text-sm font-semibold text-zinc-100">
                        {user.name}
                    </p>
                    <p className="text-xs text-zinc-400">{user.email}</p>
                    <p className="text-xs text-zinc-500">
                        🏢 {user.company.name} · 📍 {user.address.city}
                    </p>
                </div>
            )}
        </div>
    );
}
