import InfoHeader from '@/components/InfoHeader';
import SyntaxBlock from '@/components/SyntaxBlock';
import BulletList from '@/components/BulletList';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Hook"
                title="useReducer"
                subtitle="An alternative to useState for complex state logic — reducer pattern familiar from Redux"
            />
            <SyntaxBlock>{`const [state, dispatch] = useReducer(reducer, initialState)`}</SyntaxBlock>
            <BulletList
                items={[
                    { text: 'reducer(state, action) → newState — pure function, no side effects' },
                    {
                        text: 'dispatch(action) triggers the reducer and schedules a re-render',
                        highlight: true,
                    },
                    { text: 'Actions are plain objects — { type: "ACTION_NAME", ...payload }' },
                    { text: 'Prefer useReducer when: multiple sub-values, next state depends on previous' },
                    { text: 'Typed discriminated unions catch invalid actions at compile time' },
                    { text: 'Reducer can live outside the component — easy to test in isolation' },
                ]}
            />
        </div>
    );
}
