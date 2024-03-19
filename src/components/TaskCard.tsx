import { Task } from "../types/task";

interface TaskProps {
    task: Task;
    setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>;
    setIsTaskViewActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskCard = (props: TaskProps) => {
    return (
        <div className="task-card container" id={props.task.id}>
            <a
                href=""
                onClick={(e) => {
                    e.preventDefault();

                    props.setCurrentTask(props.task);
                    props.setIsTaskViewActive(true);
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
            <p className="task-card__tags">
                отметки: {props.task.tags.join(", ")}
            </p>
        </div>
    );
};
