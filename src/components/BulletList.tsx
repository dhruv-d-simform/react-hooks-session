interface Bullet {
    text: string;
    highlight?: boolean;
}

interface Props {
    items: Bullet[];
    label?: string;
}

export default function BulletList({ items, label = 'Key Points' }: Props) {
    return (
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                {label}
            </p>
            <ul className="flex flex-col gap-2.5">
                {items.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                        <span className="text-indigo-400 shrink-0 mt-0.5 text-xs">
                            ▸
                        </span>
                        <span
                            className={`text-sm leading-snug ${b.highlight ? 'text-zinc-100 font-medium' : 'text-zinc-300'}`}
                        >
                            {b.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
