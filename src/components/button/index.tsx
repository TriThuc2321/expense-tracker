import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface Props {
    text: string;
    className: string | null;
    outline: boolean | null;
    children?: React.ReactNode;
    onClick: () => void;
}

const Button: React.FC<Props> = ({ text, onClick, outline = false, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={clsx({ [styles.button]: true, [styles.outline]: outline }, `${className}`)}
        >
            {text}
        </button>
    );
};

export default Button;