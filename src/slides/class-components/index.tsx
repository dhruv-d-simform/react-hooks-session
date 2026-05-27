import SlideShell from '@/components/SlideShell';
import Info from './Info';
import Demo from './demo';

export default function ClassComponentsSlide() {
    return <SlideShell left={<Info />} right={<Demo />} />;
}
