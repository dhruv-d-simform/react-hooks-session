/* eslint-disable react-hooks/purity -- deliberate busy-wait to simulate a slow render */
export function SlowCard({ title, meta }: { title: string; meta: string }) {
    // Each card burns ~2ms — slow per component so concurrent
    // rendering can yield between cards during a transition.
    const start = performance.now();
    while (performance.now() - start < 2);

    return (
        <div className="flex items-center justify-between bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2">
            <p className="text-xs text-zinc-300">{title}</p>
            <span className="text-[10px] text-zinc-600 shrink-0 ml-3">
                {meta}
            </span>
        </div>
    );
}
