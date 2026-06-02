export default function StatusBanner({
    enabled,
    onMessage,
    offMessage,
}: {
    enabled: boolean;
    onMessage: string;
    offMessage: string;
}) {
    return (
        <div
            className={`rounded-lg p-2.5 border text-[11px] ${
                enabled
                    ? 'bg-emerald-900/15 border-emerald-700/25 text-emerald-400'
                    : 'bg-rose-900/15 border-rose-700/25 text-rose-400'
            }`}
        >
            {enabled ? onMessage : offMessage}
        </div>
    );
}
