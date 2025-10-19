import Dexie, { type EntityTable } from "dexie";

export interface Task {
    id: number;
    description: string;
}

export interface Pupil {
    id: number;
    name: string;
}

export interface PupilCompletedTask {
    id: number;
    pupilId: number;
    taskId: number;
}

export const db = new Dexie("ChecklistDatabase") as Dexie & {
    tasks: EntityTable<Task, "id">;
    pupils: EntityTable<Pupil, "id">;
    pupilCompletedTask: EntityTable<PupilCompletedTask, "id">;
};

db.version(1).stores({
    tasks: "++id, description",
    pupils: "++id, name",
    pupilCompletedTask: "++id, [pupilId+taskId]",
});

export function updateTaskForPupil(
    task: Task,
    pupil: Pupil,
    hasCompletedTask: boolean
) {
    if (!hasCompletedTask) {
        return db.pupilCompletedTask
            .where("[pupilId+taskId]")
            .equals([pupil.id, task.id])
            .delete();
    }
    return db.pupilCompletedTask.add({
        taskId: task.id,
        pupilId: pupil.id,
    });
}

export function pupilHasCompletedTheTask(
    task: Task,
    pupil: Pupil,
    completedTasks: PupilCompletedTask[]
): boolean {
    return !!completedTasks?.find(
        (completedTask) =>
            completedTask.taskId === task.id &&
            completedTask.pupilId === pupil.id
    );
}

export function deletePupil(pupil: Pupil) {
    return db.transaction(
        "rw",
        [db.pupils, db.pupilCompletedTask],
        async () => {
            await db.pupils.delete(pupil.id);
            await db.pupilCompletedTask
                .where("pupilId")
                .equals(pupil.id)
                .delete();
        }
    );
}
export function deleteTask(task: Task) {
    return db.transaction("rw", [db.tasks, db.pupilCompletedTask], async () => {
        await db.tasks.delete(task.id);
        await db.pupilCompletedTask.where("pupilId").equals(task.id).delete();
    });
}
