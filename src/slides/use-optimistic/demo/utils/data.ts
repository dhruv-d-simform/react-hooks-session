export interface Post {
    id: number;
    title: string;
    likes: number;
    liked: boolean;
}

export const INITIAL_POSTS: Post[] = [
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

export async function toggleLikeOnServer(post: Post): Promise<Post> {
    await new Promise((r) => setTimeout(r, 1200));
    if (Math.random() < 0.2) throw new Error('Server error');
    return {
        ...post,
        liked: !post.liked,
        likes: post.liked ? post.likes - 1 : post.likes + 1,
    };
}
