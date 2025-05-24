export const HeaderNavButton = ({ to } :  HeaderNavButtonProps) => {
    const href = `/${to}`;
    const text = to[0].toUpperCase() + to.slice(1).toLowerCase();

    return (
        <a href={href}>{text}</a>
    );
}

export default HeaderNavButton;

export type HeaderNavButtonProps = {
    to: string;
};
