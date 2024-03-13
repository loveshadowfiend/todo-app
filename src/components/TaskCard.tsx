import { Task } from "../types/task";

interface TaskProps {
    task: Task;
}

export const TaskCard = (props: TaskProps) => {
    return (
        <div className="task-card" id={props.task.id}>
            <a
                href=""
                onClick={(e) => {
                    e.preventDefault();
                }}
            >
                <h1 className="task-card__name">{props.task.name}</h1>
            </a>
            <p className="task-card__date">
                создано: {props.task.creationDate.toString()}
            </p>
            <p className="task-card__priority">
                приоритет: {props.task.priority}
            </p>
            <p className="task-card__tags">отметки: {props.task.tags}</p>
        </div>
    );
};
