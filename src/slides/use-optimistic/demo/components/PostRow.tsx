import type { Post } from '../utils/data';

export function PostRow({
    post,
    onLike,
}: {
    post: Post;
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
