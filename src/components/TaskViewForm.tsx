import { FormEvent, useState } from "react";
import { Task } from "../types/task";

interface TaskProps {
    addTask: (task: Task) => void;
}

const defaultTaskState: Task = {
    id: "",
    name: "",
    creationDate: new Date(),
    priority: "low",
    tags: ["research"],
    description: "",
};

export const TaskViewForm = (props: TaskProps) => {
    const [task, setTask] = useState<Task>({
        ...defaultTaskState,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        props.addTask(task);

        (e.target as HTMLFormElement).reset();
        setTask({
            ...defaultTaskState,
        });
    };

    return (
        <form className="task-view-form" onSubmit={(e) => handleSubmit(e)}>
            <div>
                <h3>Название задачи</h3>
                <input
                    className="task-view-form__input-name"
                    name="name"
                    type="text"
                    onChange={(e) => {
                        setTask({
                            ...task,
                            name: e.target.value,
                        });
                    }}
                />
            </div>

            <div>
                <h3>Приоритет</h3>
                <select
                    className="task-view-form__select-priority"
                    name="priority"
                    onChange={(e) => {
                        setTask({
                            ...task,
                            priority: e.target.value,
                        });
                    }}
                >
                    <option value="low">low</option>
                    <option value="normal">normal</option>
                    <option value="high">high</option>
                </select>
            </div>

            <div>
                <h3>Отметки</h3>
                <select
                    className="tesk-edit-form__select-tags"
                    name="tags"
                    defaultValue={["research"]}
                    multiple
                    size={3}
                    onChange={(e) => {
                        const selectedTags: string[] = Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                        );

                        setTask({
                            ...task,
                            tags: selectedTags,
                        });
                    }}
                >
                    <option value="research">research</option>
                    <option value="design">design</option>
                    <option value="development">development</option>
                </select>
            </div>

            <div>
                <h3>Описание</h3>
                <textarea
                    name="description"
                    id=""
                    cols={30}
                    rows={10}
                    onChange={(e) => {
                        setTask({
                            ...task,
                            description: e.target.value,
                        });
                    }}
                ></textarea>
            </div>

            <button type="submit">Добавить задачу</button>
        </form>
    );
};
