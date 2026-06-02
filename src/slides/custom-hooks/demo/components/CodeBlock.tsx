export function CodeBlock({
    code,
    view,
}: {
    code: string;
    view: 'before' | 'after';
}) {
    return (
        <pre
            className={`rounded-xl border p-3.5 font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre ${
                view === 'before'
                    ? 'bg-amber-900/10 border-amber-700/30 text-amber-100/80'
                    : 'bg-teal-900/10 border-teal-700/30 text-teal-100/90'
            }`}
        >
            {code}
        </pre>
    );
}
