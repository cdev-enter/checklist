import classNames from "classnames";
import { useState, type ChangeEvent, type FC, type KeyboardEvent } from "react";
import "./AddItem.scss";
export interface AddItemProps {
    name: string;
    label: string;
    onAddItem?: (value: string) => void;
}

export const AddItem: FC<AddItemProps> = ({ name, label, onAddItem }) => {
    const [value, setValue] = useState(""),
        css = classNames({
            AddItem: true,
        }),
        handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        },
        handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                triggerUpdate();
            }
        },
        handleOnBlur = () => {
            triggerUpdate();
        },
        triggerUpdate = () => {
            const v = (value || "").trim();
            if (v.length === 0) {
                return;
            }
            onAddItem?.(value);
            setValue("");
        };

    return (
        <label className={css}>
            <input
                name={name}
                type="text"
                value={value}
                placeholder={label}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
                onBlur={handleOnBlur}
                enterKeyHint="enter"
            ></input>
        </label>
    );
};
