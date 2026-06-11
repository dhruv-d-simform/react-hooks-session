export type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: { name: string };
    address: { city: string };
};

export type Post = {
    id: number;
    title: string;
    body: string;
};
