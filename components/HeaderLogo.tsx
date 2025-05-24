import styles from '@/styles/HeaderLogo.module.css';
import { Chivo_Mono } from 'next/font/google';

const rubik = Chivo_Mono({ subsets: ['latin'], weight: '700' });

export const HeaderLogo = () => {
    return (
        <div className={[styles.headerLogo, rubik.className].join(' ')}>
            K4YR2
        </div>
    );
}