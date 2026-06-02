import { useActionState } from 'react';
import DemoShell from '@/components/demo/DemoShell';
import { StateDebugBar } from './components/StateDebugBar';
import { ErrorBanner } from './components/ErrorBanner';
import { ContactForm } from './components/ContactForm';
import { SuccessView } from './components/SuccessView';

export const fileUrl = '/src/slides/use-action-state/demo/index.tsx';

type FormState =
    | { status: 'idle' }
    | { status: 'error'; message: string }
    | { status: 'success'; name: string };

async function submitContact(
    _prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    await new Promise((r) => setTimeout(r, 1500));

    if (!name || !email || !message) {
        return { status: 'error', message: 'All fields are required.' };
    }
    if (!email.includes('@')) {
        return { status: 'error', message: 'Please enter a valid email.' };
    }

    return { status: 'success', name };
}

export default function Demo() {
    const [state, dispatch, isPending] = useActionState(submitContact, {
        status: 'idle',
    });

    if (state.status === 'success') {
        return <SuccessView name={state.name} />;
    }

    return (
        <DemoShell fileUrl={fileUrl}>
            <StateDebugBar status={state.status} isPending={isPending} />
            {state.status === 'error' && (
                <ErrorBanner message={state.message} />
            )}
            <ContactForm dispatch={dispatch} isPending={isPending} />
        </DemoShell>
    );
}
