export function ErrorBanner({ message }: { message: string }) {
    return (
        <div className="bg-rose-900/20 border border-rose-700/30 rounded-lg px-3 py-2">
            <p className="text-xs text-rose-400">{message}</p>
        </div>
    );
}
