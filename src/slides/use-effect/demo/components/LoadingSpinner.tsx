export function LoadingSpinner({ userId }: { userId: number }) {
    return (
        <div className="flex items-center gap-3 py-4">
            <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
            <span className="text-xs text-zinc-500">
                Fetching user {userId}…
            </span>
        </div>
    );
}
