export function ErrorDisplay({ message }: { message: string }) {
    return (
        <div className="bg-rose-900/20 border border-rose-700/30 rounded-lg p-3">
            <p className="text-xs text-rose-400">Error: {message}</p>
        </div>
    );
}
