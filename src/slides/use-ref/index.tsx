import SlideShell from '@/components/SlideShell';
import Info from './Info';
import Demo from './Demo';

export default function UseRefSlide() {
    return <SlideShell left={<Info />} right={<Demo />} />;
}
