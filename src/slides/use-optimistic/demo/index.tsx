import { useState, useOptimistic, useTransition } from 'react';
import DemoShell from '@/components/demo/DemoShell';
import InfoNote from '@/components/demo/InfoNote';
import { PostRow } from './components/PostRow';
import { SyncStatus } from './components/SyncStatus';
import { ServerStatus } from './components/ServerStatus';
import { INITIAL_POSTS, toggleLikeOnServer } from './utils/data';
import type { Post } from './utils/data';

export const fileUrl = '/src/slides/use-optimistic/demo/index.tsx';

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
        <DemoShell fileUrl={fileUrl}>
            <SyncStatus isPending={isPending} />
            <ServerStatus status={status} />

            <div className="space-y-2">
                {optimisticPosts.map((post) => (
                    <PostRow key={post.id} post={post} onLike={handleLike} />
                ))}
            </div>

            <InfoNote color="pink">
                ✨ Like count updates instantly — no waiting for the server.
                ~20% of requests "fail" to demo the automatic rollback.
            </InfoNote>
        </DemoShell>
    );
}
