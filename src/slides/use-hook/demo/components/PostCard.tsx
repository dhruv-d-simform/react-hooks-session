import type { Post } from '../utils/data';

export function PostCard({ post }: { post: Post }) {
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
