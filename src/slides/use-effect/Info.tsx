import InfoHeader from '@/components/InfoHeader';
import SyntaxBlock from '@/components/SyntaxBlock';
import BulletList from '@/components/BulletList';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Hook"
                title="useEffect"
                subtitle="Synchronize a component with an external system — runs after the render is committed to the screen"
            />
            <SyntaxBlock>{`useEffect(() => {
  // side effect
  return () => { /* cleanup */ }
}, [dependencies])`}</SyntaxBlock>
            <BulletList
                items={[
                    { text: 'Runs after the browser has painted — non-blocking' },
                    {
                        text: 'The cleanup function runs before the next effect and on unmount',
                        highlight: true,
                    },
                    { text: '[] — runs once after mount (equiv. componentDidMount)' },
                    { text: '[dep] — runs whenever dep changes (reactive to dependencies)' },
                    { text: 'No array — runs after every render (rarely what you want)' },
                    { text: 'Return an AbortController to cancel fetch on cleanup' },
                ]}
            />
        </div>
    );
}
