import { use, Suspense, useState } from 'react';
import OpenInVSCode from '@/components/OpenInVSCode';

export const fileUrl = '/src/slides/use-hook/demo/index.tsx';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

function fetchPost(id: number): Promise<Post> {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
        (r) => r.json() as Promise<Post>
    );
}

function PostCard({ promise }: { promise: Promise<Post> }) {
    const post = use(promise);
    return (
        <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-semibold text-zinc-100 leading-snug capitalize">
                    {post.title}
                </p>
                <span className="text-[10px] font-mono text-pink-400 bg-pink-900/20 border border-pink-700/30 px-1.5 py-0.5 rounded shrink-0">
                    post #{post.id}
                </span>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
                {post.body}
            </p>
        </div>
    );
}

function LoadingCard() {
    return (
        <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-xl p-4 space-y-3 animate-pulse">
            <div className="h-3 bg-zinc-700 rounded w-3/4" />
            <div className="h-2 bg-zinc-800 rounded w-full" />
            <div className="h-2 bg-zinc-800 rounded w-5/6" />
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                <span className="text-[10px] text-zinc-600">Loading post…</span>
            </div>
        </div>
    );
}

export default function Demo() {
    const [postId, setPostId] = useState(1);
    const [promise, setPromise] = useState(() => fetchPost(postId));

    const loadPost = (id: number) => {
        setPostId(id);
        setPromise(fetchPost(id));
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
                <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-3 font-mono text-[11px] space-y-0.5">
                    <p className="text-zinc-500">
                        <span className="text-purple-400">const</span> post ={' '}
                        <span className="text-yellow-400">use</span>
                        (promise)
                    </p>
                    <p className="text-zinc-600">
                        {'// Suspense shows fallback while pending'}
                    </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                        Post ID
                    </span>
                    {[1, 2, 3, 4, 5].map((id) => (
                        <button
                            key={id}
                            onClick={() => loadPost(id)}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                                postId === id
                                    ? 'bg-pink-600 text-white'
                                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700'
                            }`}
                        >
                            {id}
                        </button>
                    ))}
                </div>

                <Suspense fallback={<LoadingCard />}>
                    <PostCard promise={promise} />
                </Suspense>

                <div className="bg-pink-900/15 border border-pink-700/25 rounded-lg p-3">
                    <p className="text-[11px] text-pink-300/80 leading-relaxed">
                        ✨ No <span className="font-mono">useEffect</span>,{' '}
                        <span className="font-mono">useState</span>, or loading
                        flags — <span className="font-mono">use()</span> +{' '}
                        <span className="font-mono">Suspense</span> handle it
                        all.
                    </p>
                </div>
            </div>
        </div>
    );
}
