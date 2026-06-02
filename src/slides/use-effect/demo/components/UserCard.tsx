export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    company: { name: string };
    phone: string;
}

export function UserCard({ user }: { user: User }) {
    return (
        <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {user.name.charAt(0)}
                </div>
                <div>
                    <p className="text-sm font-semibold text-zinc-100">
                        {user.name}
                    </p>
                    <p className="text-xs text-zinc-400">@{user.username}</p>
                </div>
            </div>
            <div className="space-y-1.5 text-xs">
                <div className="flex gap-2">
                    <span className="text-zinc-600 w-16">Email</span>
                    <span className="text-zinc-300">{user.email}</span>
                </div>
                <div className="flex gap-2">
                    <span className="text-zinc-600 w-16">Phone</span>
                    <span className="text-zinc-300">{user.phone}</span>
                </div>
                <div className="flex gap-2">
                    <span className="text-zinc-600 w-16">Company</span>
                    <span className="text-zinc-300">{user.company.name}</span>
                </div>
            </div>
        </div>
    );
}
