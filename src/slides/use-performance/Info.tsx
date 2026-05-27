import InfoHeader from '@/components/InfoHeader';
import SyntaxBlock from '@/components/SyntaxBlock';
import BulletList from '@/components/BulletList';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Performance"
                title="useMemo & useCallback"
                subtitle="Skip expensive recalculations and prevent unnecessary child re-renders between renders"
            />
            <SyntaxBlock>{`useMemo(() => expensiveCalc(), [dep])
useCallback(() => handler(), [dep])`}</SyntaxBlock>
            <BulletList
                items={[
                    {
                        text: 'useMemo caches a computed value — recalculates only when deps change',
                        highlight: true,
                    },
                    {
                        text: 'useCallback caches a function reference — same identity between renders',
                        highlight: true,
                    },
                    { text: "React.memo skips re-rendering if props haven't changed by reference" },
                    { text: 'useCallback + React.memo = stable function props that memo can bail out on' },
                    { text: "⚠️ Don't over-optimize — profile first, add memo where you measure slowness" },
                    { text: 'Empty deps [] → value/function created once, never changes' },
                ]}
            />
        </div>
    );
}
