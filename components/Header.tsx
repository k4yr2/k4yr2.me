import styles from '@/styles/Header.module.css';
import { HeaderLogo } from './HeaderLogo';

export const Header = () => {
    return (
        <div className={styles.header}>
            <HeaderLogo />
        </div>
    );
}

export default Header;