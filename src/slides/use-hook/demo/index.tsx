import { useState, Suspense } from 'react';
import DemoShell from '@/components/demo/DemoShell';
import InfoNote from '@/components/demo/InfoNote';
import { LoadingCard } from './components/LoadingCard';
import { PostIdPicker } from './components/PostIdPicker';
import { HookCallDisplay } from './components/HookCallDisplay';
import { fetchPost } from './utils/data';
import PostDisplay from './PostDisplay';

export const fileUrl = '/src/slides/use-hook/demo/index.tsx';

export default function Demo() {
    const [postId, setPostId] = useState(1);
    const [promise, setPromise] = useState(() => fetchPost(postId));

    const loadPost = (id: number) => {
        setPostId(id);
        setPromise(fetchPost(id));
    };

    return (
        <DemoShell fileUrl={fileUrl}>
            <HookCallDisplay />

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
