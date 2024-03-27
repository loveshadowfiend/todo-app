import { FormEvent, useState } from "react";
import { Task } from "../types/task";
import { defaultTaskState } from "../constants/defaultTaskState";
import { useGlobalStore } from "../stores/globalStore";
import { TaskForm } from "./TaskForm";

export const TaskAddForm = () => {
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
                <button
                    className="task-add__buttons-back"
                    onClick={() => {
                        useGlobalStore.setState({ isAddTaskActive: false });
                    }}
                >
                    Назад
                </button>
            </div>
            <TaskForm
                task={task}
                setTask={setTask}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};
