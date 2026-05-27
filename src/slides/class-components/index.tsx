import SlideShell from '@/components/SlideShell';
import Info from './Info';
import Demo from './Demo';

export default function ClassComponentsSlide() {
    return <SlideShell left={<Info />} right={<Demo />} />;
}
