export function TooltipNote({ useLayout }: { useLayout: boolean }) {
    return (
        <p className="text-xs text-zinc-500 text-center">
            {useLayout ? (
                <>
                    <span className="font-mono text-amber-300">
                        useLayoutEffect
                    </span>{' '}
                    positions tooltip before paint — no flicker
                </>
            ) : (
                <>
                    <span className="font-mono text-indigo-300">useEffect</span>{' '}
                    positions after paint — watch for the jump on open
                </>
            )}
        </p>
    );
}
