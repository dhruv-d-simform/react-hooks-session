type BadgeVariant = 'indigo' | 'amber' | 'emerald' | 'purple' | 'teal';

interface Props {
    badge?: string;
    badgeVariant?: BadgeVariant;
    title: string;
    subtitle?: string;
    docsUrl?: string;
}

const badgeStyles: Record<BadgeVariant, string> = {
    indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    teal: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
};

export default function InfoHeader({
    badge,
    badgeVariant = 'indigo',
    title,
    subtitle,
    docsUrl,
}: Props) {
    return (
        <div className="mb-5">
            {badge && (
                <span
                    className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border mb-2.5 ${badgeStyles[badgeVariant]}`}
                >
                    {badge}
                </span>
            )}
            <h1 className="text-3xl font-black tracking-tight mb-1">
                {docsUrl ? (
                    <a
                        href={docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-indigo-300 hover:underline underline-offset-4"
                    >
                        {title}
                    </a>
                ) : (
                    title
                )}
            </h1>
            {subtitle && (
                <p className="text-zinc-400 text-sm leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
