import SlideShell from '@/components/SlideShell';
import Info from './Info';
import Demo from './demo';

export default function UseTransitionSlide() {
    return <SlideShell left={<Info />} right={<Demo />} />;
}
