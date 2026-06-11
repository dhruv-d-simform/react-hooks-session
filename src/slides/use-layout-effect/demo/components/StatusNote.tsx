export function StatusNote({ variant }: { variant: 'effect' | 'layout' }) {
    return (
        <div
            className={`rounded-lg p-3 text-[11px] leading-relaxed border ${
                variant === 'layout'
                    ? 'bg-emerald-900/15 border-emerald-700/25 text-emerald-400'
                    : 'bg-amber-900/15 border-amber-700/25 text-amber-400'
            }`}
        >
            {variant === 'layout' ? (
                <>
                    ✅ Tooltip appears directly at the correct position —
                    measurement happened before paint.
                </>
            ) : (
                <>
                    ⚠️ Tooltip briefly flickers at{' '}
                    <span className="font-mono">top:0 left:0</span> before
                    jumping to correct position.
                </>
            )}
        </div>
    );
}
