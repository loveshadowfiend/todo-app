import React, { FormEvent } from "react";
import { Task } from "../types/task";

interface TaskFormProps {
    task: Task;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setTask: React.Dispatch<React.SetStateAction<Task>>;
}

export const TaskForm = (props: TaskFormProps) => {
    return (
        <form
            className="task-form container"
            onSubmit={(e) => props.handleSubmit(e)}
        >
            <div>
                <h3>НАЗВАНИЕ ЗАДАЧИ</h3>
                <input
                    className="task-form__input-name"
                    name="name"
                    type="text"
                    onChange={(e) => {
                        props.setTask({
                            ...props.task,
                            name: e.target.value,
                        });
                    }}
                />
            </div>

            <div>
                <h3>ПРИОРИТЕТ</h3>
                <select
                    className="task-form__select-priority"
                    name="priority"
                    onChange={(e) => {
                        props.setTask({
                            ...props.task,
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
                    className="task-form__select-tags"
                    name="tags"
                    defaultValue={["research"]}
                    multiple
                    size={3}
                    onChange={(e) => {
                        const selectedTags: string[] = Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                        );

                        props.setTask({
                            ...props.task,
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
                    className="task-form__textarea-description"
                    name="description"
                    id=""
                    cols={30}
                    rows={10}
                    onChange={(e) => {
                        props.setTask({
                            ...props.task,
                            description: e.target.value,
                        });
                    }}
                ></textarea>
            </div>

            <button className="task-form__submit-button" type="submit">
                Сохранить
            </button>
        </form>
    );
};
