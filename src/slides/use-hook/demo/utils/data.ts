export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export function fetchPost(id: number): Promise<Post> {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
        (r) => r.json() as Promise<Post>
    );
}
