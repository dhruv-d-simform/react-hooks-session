export function DrillBadge({ prop }: { prop: string }) {
    return (
        <span className="text-[9px] font-mono bg-rose-900/30 text-rose-400 border border-rose-700/30 px-1.5 py-0.5 rounded">
            prop: {prop}
        </span>
    );
}
