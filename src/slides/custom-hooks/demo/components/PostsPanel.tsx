import type { Post } from '../types';

export function PostsPanel({
    posts,
    loading,
    error,
}: {
    posts: Post[] | null;
    loading: boolean;
    error: string | null;
}) {
    return (
        <div className="rounded-xl bg-zinc-950/60 border border-zinc-800 p-4 min-h-[180px]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2.5">
                Latest posts
            </p>

            {loading && (
                <div className="space-y-3 animate-pulse">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="space-y-1.5">
                            <div className="h-3.5 w-2/3 rounded bg-zinc-800" />
                            <div className="h-3 w-full rounded bg-zinc-800/70" />
                        </div>
                    ))}
                </div>
            )}

            {!loading && error && (
                <p className="text-xs text-red-400">⚠️ {error}</p>
            )}

            {!loading && !error && posts && (
                <ul className="space-y-2.5">
                    {posts.slice(0, 3).map((p) => (
                        <li
                            key={p.id}
                            className="border-b border-zinc-800/60 pb-2 last:border-0 last:pb-0"
                        >
                            <p className="text-xs font-semibold text-zinc-200 truncate">
                                {p.title}
                            </p>
                            <p className="text-[11px] text-zinc-500 line-clamp-1">
                                {p.body}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
