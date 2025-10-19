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
                        <th>
                            <div className="Checklist__types">
                                Aufgaben / Schüler
                            </div>
                        </th>
                        {pupils?.map((pupil) => {
                            return (
                                <th key={pupil.id}>
                                    <div className="Checklist__pupil">
                                        <DeleteButton
                                            title="Löschen"
                                            onClick={handleOnDeletePupil(pupil)}
                                        ></DeleteButton>
                                        <span className="Checklist__pupil__name">
                                            {pupil.name}
                                        </span>
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
                                <th scope="row">
                                    <div className="Checklist__task">
                                        {task.description}
                                        <DeleteButton
                                            type="button"
                                            title="Löschen"
                                            onClick={handleOnDeleteTask(task)}
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
                                        <td>
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

            <div className="Checklist__actions">
                <AddItem
                    label="Schüler hinzufügen"
                    placeholder="Name"
                    onAddItem={handleOnAddPupil}
                ></AddItem>
                <AddItem
                    label="Aufgabe hinzufügen"
                    placeholder="Beschreibung"
                    onAddItem={handleOnAddTask}
                ></AddItem>
            </div>
        </article>
    );
};
