import { use } from 'react';
import { PostCard } from './components/PostCard';
import type { Post } from './utils/data';

export default function PostDisplay({ promise }: { promise: Promise<Post> }) {
    const post = use(promise);
    return <PostCard post={post} />;
}
