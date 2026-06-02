export function StatusNote({ useLayout }: { useLayout: boolean }) {
    return (
        <div
            className={`rounded-lg p-3 text-[11px] leading-relaxed border ${
                useLayout
                    ? 'bg-emerald-900/15 border-emerald-700/25 text-emerald-400'
                    : 'bg-amber-900/15 border-amber-700/25 text-amber-400'
            }`}
        >
            {useLayout ? (
                <>
                    ✅ Tooltip appears directly at the correct position —
                    measurement happened before paint.
                </>
            ) : (
                <>
                    ⚠️ Tooltip briefly flickers at{' '}
                    <span className="font-mono">top:0 left:0</span> before
                    jumping to correct position. Slow connections make this very
                    noticeable.
                </>
            )}
        </div>
    );
}
