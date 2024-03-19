import { Task } from "../types/task";

interface TaskViewProps {
    task: Task;
    deleteTask: (task: Task) => void;
    setIsTaskViewActive: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskView = (props: TaskViewProps) => {
    return (
        <div className="task-view">
            <div className="task-view__buttons">
                <button
                    className="task-view__buttons-back"
                    onClick={() => {
                        props.setIsTaskViewActive(false);
                    }}
                >
                    Назад
                </button>
                <button
                    className="task-view__buttons-edit"
                    onClick={() => {
                        props.setIsTaskViewActive(false);
                        props.setIsEditActive(true);
                    }}
                >
                    Редактировать
                </button>
                <button
                    className="task-view__buttons-delete"
                    onClick={() => {
                        props.deleteTask(props.task);
                    }}
                >
                    Удалить
                </button>
            </div>

            <div className="task-view__card container">
                <div className="task-view__card__row">
                    <h3>НАЗВАНИЕ ЗАДАЧИ</h3>
                    <p>{props.task.name}</p>
                </div>

                <div className="task-view__card__row">
                    <h3>ДАТА СОЗДАИНЯ</h3>
                    <p>{props.task.creationDate.toString()}</p>
                </div>

                <div className="task-view__card__row">
                    <h3>ПРИОРИТЕТ</h3>
                    <p>{props.task.priority}</p>
                </div>

                <div className="task-view__card__row">
                    <h3>ОТМЕТКИ</h3>
                    <p>{props.task.tags.join(" ")}</p>
                </div>

                <div className="task-view__card__row">
                    <h3>ОПИСАНИЕ</h3>
                    <p>{props.task.description}</p>
                </div>
            </div>
        </div>
    );
};
