import classNames from "classnames";
import type { FC } from "react";
import { IconClose } from "../../../icons/IconClose";
import "./DeleteButton.scss";

export interface DeleteButtonProps {}

export const DeleteButton: FC<
    DeleteButtonProps &
        React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >
> = ({ type = "button", className, children, ...rest }) => {
    const css = classNames({
        DeleteButton,
        className,
    });
    return (
        <button className={css} {...rest}>
            <IconClose></IconClose>
            {children}
        </button>
    );
};
