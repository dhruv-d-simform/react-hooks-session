import InfoHeader from '@/components/InfoHeader';
import SyntaxBlock from '@/components/SyntaxBlock';
import BulletList from '@/components/BulletList';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Hook"
                title="useRef"
                subtitle="A mutable box that persists across renders without causing re-renders"
            />
            <SyntaxBlock>{`const ref = useRef(initialValue)
// ref.current holds the value`}</SyntaxBlock>
            <BulletList
                items={[
                    {
                        text: 'ref.current is mutable — change it without triggering re-renders',
                        highlight: true,
                    },
                    { text: 'Persists across renders — unlike a regular variable which resets' },
                    { text: 'Use case 1: Access DOM nodes directly (focus, scroll, measure)' },
                    { text: 'Use case 2: Store mutable values (timers, previous state, flags)' },
                    { text: 'During render, ref.current holds the value from the PREVIOUS render' },
                    { text: 'Updates are synchronous — no batching, no async scheduling' },
                ]}
            />
        </div>
    );
}
