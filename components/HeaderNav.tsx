import styles from '@/styles/HeaderLogo.module.css';
import HeaderNavButton from './HeaderNavButton';

export const HeaderNav = () => {
    return (
        <nav className={styles.headerNav}>
            <div>
                <HeaderNavButton to="blog" />
                <HeaderNavButton to="about" />
                <HeaderNavButton to="projects" />
            </div>
        </nav>
    );
}

export default HeaderNav;