import styles from '@/styles/HeaderLogo.module.css';
import { Chivo_Mono } from 'next/font/google';

const rubik = Chivo_Mono({ subsets: ['latin'], weight: '700' });

export const HeaderLogo = () => {
    return (
        <a href='/' className={[styles.headerLogo, rubik.className].join(' ')}>
            <span className={styles.charK}>K</span>
            <span className={styles.char4}>4</span>
            <span className={styles.charY}>Y</span>
            <span className={styles.charR}>R</span>
            <span className={styles.char2}>2</span>
        </a>
    );
}