import classNames from "classnames";
import { useState, type ChangeEvent, type FC, type KeyboardEvent } from "react";
import "./AddItem.scss";
export interface AddItemProps {
    label: React.ReactNode;
    placeholder?: string;
    onAddItem?: (value: string) => void;
}

export const AddItem: FC<AddItemProps> = ({
    label,
    placeholder,
    onAddItem,
}) => {
    const [value, setValue] = useState(""),
        css = classNames({
            AddItem: true,
        }),
        handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        },
        handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                onAddItem?.(value);
                setValue("");
            }
        };

    return (
        <label className={css}>
            <span>{label}</span>
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
            ></input>
        </label>
    );
};
