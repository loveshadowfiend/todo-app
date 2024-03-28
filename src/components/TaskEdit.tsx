import { FormEvent, useState } from "react";
import { Task } from "../types/task";
import { useGlobalStore } from "../stores/globalStore";
import { TaskForm } from "./TaskForm";
import { BackButton } from "./BackButton";

export const TaskEdit = () => {
    const { currentTask, editTask } = useGlobalStore();
    const [task, setTask] = useState<Task>(currentTask);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        editTask(task);
        useGlobalStore.setState({
            isEditActive: false,
            isTaskViewActive: true,
            currentTask: task,
        });
    };

    return (
        <div className="task-edit">
            <div className="task-edit__buttons">
                <BackButton />
            </div>
            <TaskForm
                task={task}
                setTask={setTask}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};
