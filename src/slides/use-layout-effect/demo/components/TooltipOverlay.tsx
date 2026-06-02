export function TooltipOverlay({
    style,
    tipRef,
}: {
    style: React.CSSProperties;
    tipRef: React.Ref<HTMLDivElement>;
}) {
    return (
        <div
            ref={tipRef}
            className="absolute z-10 bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-xs text-zinc-200 whitespace-nowrap shadow-lg pointer-events-none"
            style={style}
        >
            I'm positioned dynamically 📍
        </div>
    );
}
