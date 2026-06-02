import { use, Suspense, useState } from 'react';
import DemoShell from '@/components/demo/DemoShell';
import InfoNote from '@/components/demo/InfoNote';
import { PostCard } from './components/PostCard';
import { LoadingCard } from './components/LoadingCard';
import { PostIdPicker } from './components/PostIdPicker';
import { fetchPost } from './utils/data';
import type { Post } from './utils/data';

export const fileUrl = '/src/slides/use-hook/demo/index.tsx';

function PostDisplay({ promise }: { promise: Promise<Post> }) {
    const post = use(promise);
    return <PostCard post={post} />;
}

export default function Demo() {
    const [postId, setPostId] = useState(1);
    const [promise, setPromise] = useState(() => fetchPost(postId));

    const loadPost = (id: number) => {
        setPostId(id);
        setPromise(fetchPost(id));
    };

    return (
        <DemoShell fileUrl={fileUrl}>
            <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-3 font-mono text-[11px] space-y-0.5">
                <p className="text-zinc-500">
                    <span className="text-purple-400">const</span> post ={' '}
                    <span className="text-yellow-400">use</span>(promise)
                </p>
                <p className="text-zinc-600">
                    {'// Suspense shows fallback while pending'}
                </p>
            </div>

            <PostIdPicker active={postId} onSelect={loadPost} />

            <Suspense fallback={<LoadingCard />}>
                <PostDisplay promise={promise} />
            </Suspense>

            <InfoNote color="pink">
                ✨ No <span className="font-mono">useEffect</span>,{' '}
                <span className="font-mono">useState</span>, or loading flags —{' '}
                <span className="font-mono">use()</span> +{' '}
                <span className="font-mono">Suspense</span> handle it all.
            </InfoNote>
        </DemoShell>
    );
}
