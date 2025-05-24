"use client";
import styles from '@/styles/HeaderNavButton.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const HeaderNavButton = ({ to } :  HeaderNavButtonProps) => {
    const pathname = usePathname();
    const isActive = pathname === `/${to}`;

    const href = `/${to}`;
    const text = to[0].toUpperCase() + to.slice(1).toLowerCase();

    return (
        <Link href={href} className={`${styles.headerNavButton} ${isActive ? styles.active : ''}`}>
            {text}
        </Link>
    );
}

export default HeaderNavButton;

export type HeaderNavButtonProps = {
    to: string;
};
