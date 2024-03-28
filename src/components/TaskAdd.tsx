import { FormEvent, useState } from "react";
import { Task } from "../types/task";
import { defaultTaskState } from "../constants/defaultTaskState";
import { useGlobalStore } from "../stores/globalStore";
import { TaskForm } from "./TaskForm";
import { BackButton } from "./BackButton";

export const TaskAdd = () => {
    const { addTask } = useGlobalStore();
    const [task, setTask] = useState<Task>(defaultTaskState);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        addTask(task);

        (e.target as HTMLFormElement).reset();
        setTask({
            ...defaultTaskState,
        });
    };

    return (
        <div className="task-add">
            <div className="task-add__buttons">
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
