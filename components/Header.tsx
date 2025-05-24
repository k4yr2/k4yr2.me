import styles from '@/styles/Header.module.css';
import { HeaderLogo } from './HeaderLogo';
import HeaderNav from './HeaderNav';

export const Header = () => {
    return (
        <div className={styles.header}>
            <HeaderLogo />
            <HeaderNav />
        </div>
    );
}

export default Header;