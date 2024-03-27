import { useGlobalStore } from "../stores/globalStore";
import { Task } from "../types/task";

export const TaskCard = (props: { task: Task }) => {
    return (
        <div className="task-card container" id={props.task.id}>
            <a
                href=""
                onClick={(e) => {
                    e.preventDefault();

                    useGlobalStore.setState({
                        currentTask: props.task,
                        isTaskViewActive: true,
                    });
                }}
            >
                <h1 className="task-card__name">{props.task.name}</h1>
            </a>
            <p className="task-card__date">
                создано: {props.task.creationDate.toLocaleString()}
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
