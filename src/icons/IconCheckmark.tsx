import classNames from "classnames";
import type { FC } from "react";
import "./IconCheckmark.scss";

export interface IconCheckMarkProps {
    className?: string;
    checked?: boolean;
}

export const IconCheckmark: FC<IconCheckMarkProps> = ({
    className,
    checked,
}) => {
    const css = classNames(
        { IconCheckmark: true, "IconCheckmark--checked": checked },
        className
    );
    return (
        <i className={css}>
            <svg
                width="800px"
                height="800px"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g
                        transform="translate(-258.000000, -1037.000000)"
                        fill="#000000"
                    >
                        <path
                            d="M280.393,1047.43 L273.461,1059.44 C273.41,1059.59 273.335,1059.73 273.213,1059.84 C272.81,1060.22 272.177,1060.2 271.8,1059.8 L267.228,1055.58 C266.85,1055.18 266.871,1054.54 267.274,1054.17 C267.677,1053.79 268.31,1053.81 268.688,1054.21 L272.266,1057.51 L278.661,1046.43 C278.937,1045.96 279.548,1045.79 280.027,1046.07 C280.505,1046.34 280.669,1046.96 280.393,1047.43 L280.393,1047.43 Z M286,1037 L262,1037 C259.791,1037 258,1038.79 258,1041 L258,1065 C258,1067.21 259.791,1069 262,1069 L286,1069 C288.209,1069 290,1067.21 290,1065 L290,1041 C290,1038.79 288.209,1037 286,1037 L286,1037 Z"
                            id="checkmark-square"
                        ></path>
                    </g>
                </g>
            </svg>
        </i>
    );
};
