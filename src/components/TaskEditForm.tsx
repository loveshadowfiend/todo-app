import { FormEvent, useState } from "react";
import { Task } from "../types/task";
import { useAppStore } from "../stores/AppStore";

export const TaskEditForm = () => {
    const { currentTask, editTask } = useAppStore();
    const [task, setTask] = useState<Task>(currentTask);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        editTask(task);
        useAppStore.setState({
            isEditActive: false,
            isTaskViewActive: true,
            currentTask: task,
        });
    };

    return (
        <div className="task-edit">
            <div className="task-edit__buttons">
                <button
                    className="task-edit__buttons-back"
                    onClick={() => {
                        useAppStore.setState({ isEditActive: false });
                    }}
                >
                    Назад
                </button>
            </div>
            <form
                className="task-edit__form container"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div>
                    <h3>НАЗВАНИЕ ЗАДАЧИ</h3>
                    <input
                        className="task-edit__form__input-name"
                        name="name"
                        type="text"
                        onChange={(e) => {
                            setTask({
                                ...task,
                                name: e.target.value,
                            });
                        }}
                        value={task.name}
                    />
                </div>

                <div>
                    <h3>ПРИОРИТЕТ</h3>
                    <select
                        className="task-edit__form__select-priority"
                        name="priority"
                        onChange={(e) => {
                            setTask({
                                ...task,
                                priority: e.target.value,
                            });
                        }}
                        value={task.priority}
                    >
                        <option value="low">low</option>
                        <option value="normal">normal</option>
                        <option value="high">high</option>
                    </select>
                </div>

                <div>
                    <h3>ОТМЕТКИ</h3>
                    <select
                        className="task-edit__form__select-tags"
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
                        value={task.tags}
                    >
                        <option value="research">research</option>
                        <option value="design">design</option>
                        <option value="development">development</option>
                    </select>
                </div>

                <div>
                    <h3>ОПИСАНИЕ</h3>
                    <textarea
                        className="task-edit__form__textarea-description"
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

                <button type="submit">Сохранить</button>
            </form>
        </div>
    );
};
