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
import { IconCheckmark } from "../../icons/IconCheckmark";
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
            return (_e: MouseEvent) => {
                deletePupil(pupil);
            };
        },
        handleOnDeleteTask = (task: Task) => {
            return (_e: MouseEvent) => {
                deleteTask(task);
            };
        };

    return (
        <article className={css}>
            <div className="Checklist__tableWrapper">
                <table className="Checklist__table">
                    <thead className="Checklist__header">
                        <tr>
                            <th className="Checklist__cell__types">
                                <div className="Checklist__types">
                                    Aufgaben / Name
                                </div>
                            </th>
                            {pupils?.map((pupil) => {
                                return (
                                    <th
                                        key={pupil.id}
                                        className="Checklist__cell__pupil"
                                    >
                                        <div className="Checklist__pupil">
                                            <span className="Checklist__pupil__name">
                                                {pupil.name}
                                            </span>
                                            <DeleteButton
                                                className="Checklist__deleteButton"
                                                title="Löschen"
                                                onClick={handleOnDeletePupil(
                                                    pupil
                                                )}
                                            ></DeleteButton>
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {tasks?.map((task) => {
                            return (
                                <tr key={task.id}>
                                    <th
                                        scope="row"
                                        className="Checklist__cell__task"
                                    >
                                        <div className="Checklist__task">
                                            {task.description}
                                            <DeleteButton
                                                className="Checklist__deleteButton"
                                                type="button"
                                                title="Löschen"
                                                onClick={handleOnDeleteTask(
                                                    task
                                                )}
                                            ></DeleteButton>
                                        </div>
                                    </th>
                                    {pupils?.map((pupil) => {
                                        const hasCompletedTask =
                                            pupilHasCompletedTheTask(
                                                task,
                                                pupil,
                                                completedTasks || []
                                            );

                                        return (
                                            <td key={pupil.id}>
                                                <div className="Checklist__taskCheck">
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                hasCompletedTask
                                                            }
                                                            onChange={handleOnChangeCompleted(
                                                                task,
                                                                pupil
                                                            )}
                                                        ></input>
                                                        <IconCheckmark
                                                            checked={
                                                                hasCompletedTask
                                                            }
                                                        ></IconCheckmark>
                                                    </label>
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="Checklist__actions">
                <AddItem
                    name="name"
                    label="Name hinzufügen"
                    onAddItem={handleOnAddPupil}
                ></AddItem>
                <AddItem
                    name="task"
                    label="Aufgabe hinzufügen"
                    onAddItem={handleOnAddTask}
                ></AddItem>
            </div>
        </article>
    );
};
