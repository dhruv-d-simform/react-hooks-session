import { DrillBadge } from './DrillBadge';
import { DrillMiniCard } from './DrillMiniCard';

type Theme = 'dark' | 'light';

export function DrillMiniContent({ theme }: { theme: Theme }) {
    return (
        <div
            className={`p-3 space-y-2 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-50'}`}
        >
            <div className="flex justify-end mb-1">
                <DrillBadge prop="theme →" />
            </div>
            <DrillMiniCard
                theme={theme}
                title="Dashboard"
                body="Your weekly stats are looking great. Keep it up!"
            />
            <DrillMiniCard
                theme={theme}
                title="Recent Activity"
                body="You completed 3 tasks and resolved 1 bug today."
            />
        </div>
    );
}
