import type { FC } from "react";
import "./App.scss";
import { Checklist } from "./components/checklist/Checklist";

export interface AppProps {}

export const App: FC<AppProps> = ({}) => {
    return (
        <main>
            <Checklist></Checklist>
        </main>
    );
};
