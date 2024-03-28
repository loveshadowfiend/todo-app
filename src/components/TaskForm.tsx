import React, { FormEvent, useState } from "react";
import { Task } from "../types/task";
import { useGlobalStore } from "../stores/globalStore";

interface TaskFormProps {
    task: Task;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setTask: React.Dispatch<React.SetStateAction<Task>>;
}

export const TaskForm = (props: TaskFormProps) => {
    const { isEditActive, currentTask } = useGlobalStore();
    const [isNameDirty, setIsNameDirty] = useState<boolean>(false);

    return (
        <form
            className="task-form container"
            onSubmit={(e) => {
                if (props.task.name == "") {
                    e.preventDefault();
                    setIsNameDirty(true);
                } else {
                    props.handleSubmit(e);
                }
            }}
        >
            <div className="task-form__row">
                <h3>НАЗВАНИЕ ЗАДАЧИ</h3>
                <input
                    className="task-form__input-name"
                    name="name"
                    type="text"
                    onChange={(e) => {
                        setIsNameDirty(false);
                        props.setTask({
                            ...props.task,
                            name: e.target.value,
                        });
                    }}
                    onBlur={() => {
                        if (props.task.name.length === 0) {
                            setIsNameDirty(true);
                        } else {
                            setIsNameDirty(false);
                        }
                    }}
                    defaultValue={isEditActive ? currentTask.name : ""}
                />
                {isNameDirty && (
                    <p className="task-form__error">Введите название</p>
                )}
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
                    defaultValue={currentTask.priority}
                >
                    <option value="low">low</option>
                    <option value="normal">normal</option>
                    <option value="high">high</option>
                </select>
            </div>

            <div className="task-form__row">
                <h3>ОТМЕТКИ</h3>
                <select
                    className="task-form__select-tags"
                    name="tags"
                    defaultValue={
                        isEditActive ? currentTask.tags : ["research"]
                    }
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

            <div className="task-form__row">
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
                    defaultValue={isEditActive ? currentTask.description : ""}
                ></textarea>
            </div>

            <button className="task-form__submit-button" type="submit">
                Сохранить
            </button>
        </form>
    );
};
