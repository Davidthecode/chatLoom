'use client';

import { AiOutlineBars } from 'react-icons/ai';
import {useMobileNavContext} from '@/app/state/navbar/mobileNavProvider';

export default function NavbarMobile () {
    const {isMobile, setIsMobile} = useMobileNavContext();
    const handleNavMobile = () => {
        setIsMobile(!isMobile);
    };

    return (
        <div>
            <AiOutlineBars size='1.2rem' onClick={handleNavMobile}/>
        </div>
    )
};