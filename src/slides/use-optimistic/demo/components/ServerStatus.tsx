export function ServerStatus({
    status,
}: {
    status: { id: number; result: 'ok' | 'err' } | null;
}) {
    if (!status) return null;
    return (
        <div
            className={`rounded-lg px-3 py-2 text-[11px] border ${
                status.result === 'ok'
                    ? 'bg-emerald-900/15 border-emerald-700/25 text-emerald-400'
                    : 'bg-rose-900/15 border-rose-700/25 text-rose-400'
            }`}
        >
            {status.result === 'ok'
                ? '✅ Server confirmed — real count updated'
                : '❌ Server failed — optimistic update rolled back'}
        </div>
    );
}
