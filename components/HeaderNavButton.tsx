import Link from 'next/link';

export const HeaderNavButton = ({ to } :  HeaderNavButtonProps) => {
    const href = `/${to}`;
    const text = to[0].toUpperCase() + to.slice(1).toLowerCase();

    return (
        <Link href={href}>{text}</Link>
    );
}

export default HeaderNavButton;

export type HeaderNavButtonProps = {
    to: string;
};
