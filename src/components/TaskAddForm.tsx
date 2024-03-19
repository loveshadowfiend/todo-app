import { FormEvent, useState } from "react";
import { Task } from "../types/task";

interface TaskProps {
    addTask: (task: Task) => void;
    setIsAddActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultTaskState: Task = {
    id: "",
    name: "",
    creationDate: new Date().toLocaleString(),
    priority: "low",
    tags: ["research"],
    description: "",
};

export const TaskAddForm = (props: TaskProps) => {
    const [task, setTask] = useState<Task>(defaultTaskState);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        props.addTask(task);

        (e.target as HTMLFormElement).reset();
        setTask({
            ...defaultTaskState,
        });
    };

    return (
        <>
            <div className="task-add__buttons">
                <button
                    className="task-add__buttons-back"
                    onClick={() => {
                        props.setIsAddActive(false);
                    }}
                >
                    Назад
                </button>
            </div>
            <form
                className="task-add__form container"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div>
                    <h3>НАЗВАНИЕ ЗАДАЧИ</h3>
                    <input
                        className="task-add__form__input-name"
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
                    <h3>ПРИОРИТЕТ</h3>
                    <select
                        className="task-add__form__select-priority"
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
                    <h3>ОТМЕТКИ</h3>
                    <select
                        className="task-add__form__select-tags"
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
                    <h3>ОПИСАНИЕ</h3>
                    <textarea
                        className="task-add__form__textarea-description"
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

                <button className="task-add__form__submit-button" type="submit">
                    Сохранить
                </button>
            </form>
        </>
    );
};
