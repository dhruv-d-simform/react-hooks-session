import { useState, useEffect } from 'react';
import { UserPicker } from './components/UserPicker';
import { ProfilePanel } from './components/ProfilePanel';
import { PostsPanel } from './components/PostsPanel';
import type { User, Post } from './types';

const API = 'https://jsonplaceholder.typicode.com';

export default function UserExplorer() {
    const [userId, setUserId] = useState(1);

    const [user, setUser] = useState<User | null>(null);
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState<string | null>(null);

    const [posts, setPosts] = useState<Post[] | null>(null);
    const [postsLoading, setPostsLoading] = useState(true);
    const [postsError, setPostsError] = useState<string | null>(null);

    // Fetch the user's profile whenever userId changes
    useEffect(() => {
        const controller = new AbortController();

        fetch(`${API}/users/${userId}`, { signal: controller.signal })
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json() as Promise<User>;
            })
            .then((data) => {
                setUser(data);
                setUserLoading(false);
            })
            .catch((err: Error) => {
                if (err.name !== 'AbortError') {
                    setUserError(err.message);
                    setUserLoading(false);
                }
            });

        return () => controller.abort();
    }, [userId]);

    // Fetch the user's posts whenever userId changes — same dance again
    useEffect(() => {
        const controller = new AbortController();

        fetch(`${API}/posts?userId=${userId}`, { signal: controller.signal })
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json() as Promise<Post[]>;
            })
            .then((data) => {
                setPosts(data);
                setPostsLoading(false);
            })
            .catch((err: Error) => {
                if (err.name !== 'AbortError') {
                    setPostsError(err.message);
                    setPostsLoading(false);
                }
            });

        return () => controller.abort();
    }, [userId]);

    const selectUser = (id: number) => {
        setUserId(id);
        // reset both fetch state machines by hand — forget one and the UI lies
        setUser(null);
        setUserLoading(true);
        setUserError(null);
        setPosts(null);
        setPostsLoading(true);
        setPostsError(null);
    };

    return (
        <div className="space-y-4">
            <UserPicker active={userId} onSelect={selectUser} />

            <ProfilePanel user={user} loading={userLoading} error={userError} />

            <PostsPanel
                posts={posts}
                loading={postsLoading}
                error={postsError}
            />
        </div>
    );
}
