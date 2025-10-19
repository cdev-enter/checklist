import classNames from "classnames";
import { useLiveQuery } from "dexie-react-hooks";
import type { ChangeEvent, FC, MouseEvent } from "react";
import {
    db,
    deletePupil,
    deleteTask,
    pupilHasCompletedTheTask,
    updateTaskForPupil,
    type Pupil,
    type Task,
} from "../../db/db";
import { DeleteButton } from "../buttons/delete-button/DeleteButton";
import { AddItem } from "./AddItem";
import "./Checklist.scss";

export interface ChecklistProps {}

export const Checklist: FC<ChecklistProps> = ({}) => {
    const css = classNames({ Checklist: true }),
        pupils = useLiveQuery(() => db.pupils.toArray()),
        tasks = useLiveQuery(() => db.tasks.toArray()),
        completedTasks = useLiveQuery(() => db.pupilCompletedTask.toArray()),
        handleOnAddPupil = (value: string): void => {
            db.pupils.add({ name: value });
        },
        handleOnAddTask = (value: string): void => {
            db.tasks.add({ description: value });
        },
        handleOnChangeCompleted = (task: Task, pupil: Pupil) => {
            return (e: ChangeEvent<HTMLInputElement>) => {
                const completed = e.target.checked;
                updateTaskForPupil(task, pupil, completed);
            };
        },
        handleOnDeletePupil = (pupil: Pupil) => {
            return (e: MouseEvent) => {
                deletePupil(pupil);
            };
        },
        handleOnDeleteTask = (task: Task) => {
            return (e: MouseEvent) => {
                deleteTask(task);
            };
        };

    return (
        <article className={css}>
            <table className="Checklist__table">
                <thead className="Checklist__header">
                    <tr>
                        <th className="Checklist__types">Aufgaben / Schüler</th>
                        {pupils?.map((pupil) => {
                            return (
                                <th key={pupil.id} className="Checklist__pupil">
                                    <span className="Checklist__pupil__name">
                                        {pupil.name}
                                    </span>
                                    <DeleteButton
                                        title="Löschen"
                                        onClick={handleOnDeletePupil(pupil)}
                                    ></DeleteButton>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tasks?.map((task) => {
                        return (
                            <tr key={task.id}>
                                <th scope="row" className="Checklist__task">
                                    {task.description}
                                    <DeleteButton
                                        type="button"
                                        title="Löschen"
                                        onClick={handleOnDeleteTask(task)}
                                    ></DeleteButton>
                                </th>
                                {pupils?.map((pupil) => {
                                    const hasCompletedTask =
                                        pupilHasCompletedTheTask(
                                            task,
                                            pupil,
                                            completedTasks || []
                                        );

                                    return (
                                        <td className="Checklist__taskCheck">
                                            <input
                                                type="checkbox"
                                                checked={hasCompletedTask}
                                                onChange={handleOnChangeCompleted(
                                                    task,
                                                    pupil
                                                )}
                                            ></input>
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="Checklist__actions">
                <AddItem
                    label="Schüler hinzufügen"
                    onAddItem={handleOnAddPupil}
                ></AddItem>
                <AddItem
                    label="Aufgabe hinzufügen"
                    onAddItem={handleOnAddTask}
                ></AddItem>
            </div>
        </article>
    );
};
