import InfoHeader from '@/components/InfoHeader';
import SyntaxBlock from '@/components/SyntaxBlock';
import BulletList from '@/components/BulletList';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Hook"
                title="useState"
                subtitle="Adds local state to a functional component — React remembers it between renders"
            />
            <SyntaxBlock>{`const [state, setState] = useState(initialValue)`}</SyntaxBlock>
            <BulletList
                items={[
                    { text: 'Returns [currentValue, updaterFn] — array destructuring names them anything' },
                    { text: 'Calling setState schedules a re-render with the updated value' },
                    {
                        text: 'Use functional update setState(prev => ...) when new state depends on previous',
                        highlight: true,
                    },
                    { text: 'Multiple useState calls are independent — one per logical piece of state' },
                    { text: 'Arrays/objects: always return a new reference — never mutate in-place' },
                ]}
            />
        </div>
    );
}
