import { useState, useOptimistic, useTransition } from 'react';
import OpenInVSCode from '@/components/OpenInVSCode';

export const fileUrl = '/src/slides/use-optimistic/demo/index.tsx';

interface Post {
    id: number;
    title: string;
    likes: number;
    liked: boolean;
}

const INITIAL_POSTS: Post[] = [
    {
        id: 1,
        title: "React 19 is here and it's incredible",
        likes: 142,
        liked: false,
    },
    {
        id: 2,
        title: 'Why useOptimistic changes everything',
        likes: 87,
        liked: false,
    },
    {
        id: 3,
        title: 'Building snappy UIs with optimistic updates',
        likes: 56,
        liked: false,
    },
];

async function toggleLikeOnServer(post: Post): Promise<Post> {
    await new Promise((r) => setTimeout(r, 1200));
    // ~20% chance of failure to demonstrate rollback
    if (Math.random() < 0.2) throw new Error('Server error');
    return {
        ...post,
        liked: !post.liked,
        likes: post.liked ? post.likes - 1 : post.likes + 1,
    };
}

function PostRow({
    post,
    onLike,
}: {
    post: Post & { optimisticLikes?: number; optimisticLiked?: boolean };
    onLike: (post: Post) => void;
}) {
    return (
        <div className="flex items-center justify-between bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3">
            <p className="text-xs text-zinc-300 flex-1 mr-4 leading-snug">
                {post.title}
            </p>
            <button
                onClick={() => onLike(post)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    post.liked
                        ? 'bg-pink-600/30 border-pink-600/50 text-pink-300'
                        : 'bg-zinc-700 border-zinc-600 text-zinc-400 hover:text-zinc-200'
                }`}
            >
                <span>{post.liked ? '❤️' : '🤍'}</span>
                <span className="font-mono">{post.likes}</span>
            </button>
        </div>
    );
}

export default function Demo() {
    const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
    const [status, setStatus] = useState<{
        id: number;
        result: 'ok' | 'err';
    } | null>(null);
    const [isPending, startTransition] = useTransition();

    const [optimisticPosts, updateOptimistic] = useOptimistic(
        posts,
        (current, { id, liked }: { id: number; liked: boolean }) =>
            current.map((p) =>
                p.id === id
                    ? { ...p, liked, likes: liked ? p.likes + 1 : p.likes - 1 }
                    : p
            )
    );

    const handleLike = (post: Post) => {
        setStatus(null);
        startTransition(async () => {
            updateOptimistic({ id: post.id, liked: !post.liked });
            try {
                const updated = await toggleLikeOnServer(post);
                setPosts((prev) =>
                    prev.map((p) => (p.id === post.id ? updated : p))
                );
                setStatus({ id: post.id, result: 'ok' });
            } catch {
                setStatus({ id: post.id, result: 'err' });
            }
        });
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Live Demo
                </p>
                <OpenInVSCode fileUrl={fileUrl} />
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
                <div className="flex items-center gap-2 bg-zinc-800/40 border border-zinc-700/30 rounded-lg px-3 py-2">
                    <div
                        className={`w-2 h-2 rounded-full ${isPending ? 'bg-amber-400 animate-pulse' : 'bg-zinc-600'}`}
                    />
                    <span className="text-[11px] text-zinc-500">
                        {isPending
                            ? 'Request in flight…'
                            : 'All synced with server'}
                    </span>
                </div>

                {status && (
                    <div
                        className={`rounded-lg px-3 py-2 text-[11px] border ${status.result === 'ok' ? 'bg-emerald-900/15 border-emerald-700/25 text-emerald-400' : 'bg-rose-900/15 border-rose-700/25 text-rose-400'}`}
                    >
                        {status.result === 'ok'
                            ? '✅ Server confirmed — real count updated'
                            : '❌ Server failed — optimistic update rolled back'}
                    </div>
                )}

                <div className="space-y-2">
                    {optimisticPosts.map((post) => (
                        <PostRow
                            key={post.id}
                            post={post}
                            onLike={handleLike}
                        />
                    ))}
                </div>

                <div className="bg-pink-900/15 border border-pink-700/25 rounded-lg p-3">
                    <p className="text-[11px] text-pink-300/80 leading-relaxed">
                        ✨ Like count updates instantly — no waiting for the
                        server. ~20% of requests "fail" to demo the automatic
                        rollback.
                    </p>
                </div>
            </div>
        </div>
    );
}
