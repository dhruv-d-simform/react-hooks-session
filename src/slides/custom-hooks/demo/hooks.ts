// Live-refactor cheat sheet — NOT imported anywhere.
// Copy these into UserExplorer.tsx during the session.
// See the bottom for what UserExplorer collapses into.

import { useState, useEffect } from 'react';
import type { Post, User } from './types';

const API = 'https://jsonplaceholder.typicode.com';

// ── Layer 1: built directly on useState + useEffect ──────────────────

export function useFetch<T>(url: string) {
    // The result remembers which url it belongs to. If it doesn't match
    // the current url, we're loading — no manual setLoading bookkeeping.
    const [res, setRes] = useState<{
        url: string;
        data: T | null;
        error: string | null;
    } | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        fetch(url, { signal: controller.signal })
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json() as Promise<T>;
            })
            .then((data) => setRes({ url, data, error: null }))
            .catch((err: Error) => {
                if (err.name !== 'AbortError') {
                    setRes({ url, data: null, error: err.message });
                }
            });

        return () => controller.abort();
    }, [url]);

    const stale = res === null || res.url !== url;
    return {
        data: stale ? null : res.data,
        error: stale ? null : res.error,
        loading: stale,
    };
}

// ── Layer 2: hooks composed out of useFetch ──────────────────────────

export function useUser(id: number) {
    return useFetch<User>(`${API}/users/${id}`);
}

export function usePosts(userId: number) {
    return useFetch<Post[]>(`${API}/posts?userId=${userId}`);
}

// ── What UserExplorer collapses into ─────────────────────────────────
//
// export default function UserExplorer() {
//     const [userId, setUserId] = useState(1);
//
//     const user = useUser(userId);
//     const posts = usePosts(userId);
//
//     return (
//         <div className="space-y-4">
//             <UserPicker active={userId} onSelect={setUserId} />
//
//             <ProfilePanel
//                 user={user.data}
//                 loading={user.loading}
//                 error={user.error}
//             />
//
//             <PostsPanel
//                 posts={posts.data}
//                 loading={posts.loading}
//                 error={posts.error}
//             />
//         </div>
//     );
// }
