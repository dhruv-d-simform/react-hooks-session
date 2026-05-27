import InfoHeader from '@/components/InfoHeader';
import SyntaxBlock from '@/components/SyntaxBlock';
import BulletList from '@/components/BulletList';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Hook"
                title="useContext"
                subtitle="Share data across the component tree without passing props at every level"
            />
            <SyntaxBlock>{`const value = useContext(MyContext)`}</SyntaxBlock>
            <BulletList
                items={[
                    { text: 'createContext() creates the context object with a default value' },
                    {
                        text: 'The Provider wraps the subtree that needs access — value flows down',
                        highlight: true,
                    },
                    { text: 'Any component in the tree can call useContext() — no prop drilling' },
                    { text: 'When provider value changes, all consumers re-render' },
                    { text: 'Wrap in a custom hook (useTheme, useUser) for better ergonomics + error safety' },
                    { text: 'Best for: theme, auth, locale, feature flags — not high-frequency updates' },
                ]}
            />
        </div>
    );
}
