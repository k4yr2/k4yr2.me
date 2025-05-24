import styles from '@/styles/HeaderLogo.module.css';

export const HeaderNav = () => {
    return (
        <nav className={styles.headerNav}>
            <div>
                <a href="/blog" className="hover:text-gray-400">Blog</a>
                <a href="/about" className="hover:text-gray-400">About</a>
                <a href="/projects" className="hover:text-gray-400">Projects</a>
            </div>
        </nav>
    );
}

export default HeaderNav;