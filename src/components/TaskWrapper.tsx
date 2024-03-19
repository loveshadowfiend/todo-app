import { useEffect, useState } from "react";
import { Task } from "../types/task";
import { v4 as uuidv4 } from "uuid";
import { Priorities } from "./Priorities";
import { Tags } from "./Tags";
import { TaskAddForm } from "./TaskAddForm";
import { Tasks } from "./Tasks";
import { TaskView } from "./TaskView";
import { TaskEditForm } from "./TaskEditForm";
import { useUpdateEffect } from "react-use";

const defaultTaskState: Task = {
    id: "not set",
    name: "not set",
    creationDate: new Date().toLocaleString(),
    priority: "low",
    tags: ["research"],
    description: "if you see this - something went wrong :/",
};

export const TaskWrapper = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [options, setOptions] = useState<Map<string, boolean>>(
        new Map<string, boolean>([
            ["sortDateAsc", true],
            ["sortDateDesc", false],

            ["low", true],
            ["normal", true],
            ["high", true],

            ["research", true],
            ["development", true],
            ["design", true],
        ])
    );
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [isAddTaskActive, setIsAddTaskActive] = useState<boolean>(false);
    const [isTaskViewActive, setIsTaskViewActive] = useState<boolean>(false);
    const [isEditActive, setIsEditActive] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const tasksPerPage = 15;

    useEffect(() => {
        // load tasks from local storage
        const localStorageData: string = localStorage.getItem("tasks") ?? "";

        if (localStorageData.length > 0) {
            setTasks(JSON.parse(localStorageData));
        }

        // infinite scroll
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!loading) return;

        console.log("loading");

        setPage((prevPage) => prevPage + 1);
        setLoading(false);
    }, [loading]);

    useUpdateEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleScroll = () => {
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;

        const scrollHeight =
            (document.documentElement &&
                document.documentElement.scrollHeight) ||
            document.body.scrollHeight;

        const clientHeight =
            document.documentElement.clientHeight || window.innerHeight;

        const scrolledToBottom =
            Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom && !loading) {
            setLoading(true);
        }
    };

    const addTask = (task: Task) => {
        setTasks([
            ...tasks,
            {
                ...task,
                id: uuidv4().toString(),
            },
        ]);

        setIsAddTaskActive(false);
    };

    const editTask = (updatedTask: Task) => {
        const updatedTasks = tasks.map((task) => {
            return task.id == updatedTask.id ? updatedTask : task;
        });

        setTasks(updatedTasks);
        setCurrentTask(updatedTask);

        setIsEditActive(false);
        setIsTaskViewActive(true);
    };

    const toggleOption = (option: string) => {
        const updatedOptions = new Map(options);
        const value: boolean = options.get(option) ?? false;

        updatedOptions.set(option, !value);

        setOptions(updatedOptions);
    };

    const deleteTask = (deletedTask: Task) => {
        const updatedTasks = tasks.filter((task) => {
            return task.id != deletedTask.id;
        });

        setTasks(updatedTasks);
        setCurrentTask(defaultTaskState);
        setIsTaskViewActive(false);
    };

    return (
        <>
            {!isAddTaskActive && !isEditActive && !isTaskViewActive && (
                <div className="task-board">
                    <div className="task-board__options container">
                        <Priorities toggleOption={toggleOption} />
                        <Tags toggleOption={toggleOption} />
                    </div>
                    <div className="task-board__tasks">
                        <button
                            className="task-board__tasks__add-task-button"
                            onClick={() => setIsAddTaskActive(true)}
                        >
                            Добавить задачу
                        </button>
                        <Tasks
                            key="1"
                            tasks={tasks.slice(0, page * tasksPerPage - 1)}
                            options={options}
                            setCurrentTask={setCurrentTask}
                            setIsTaskViewActive={setIsTaskViewActive}
                        />
                    </div>
                </div>
            )}

            {isAddTaskActive && (
                <div className="task-add">
                    <TaskAddForm
                        addTask={addTask}
                        setIsAddActive={setIsAddTaskActive}
                    />
                </div>
            )}

            {isTaskViewActive && (
                <TaskView
                    task={currentTask ?? defaultTaskState}
                    deleteTask={deleteTask}
                    setIsTaskViewActive={setIsTaskViewActive}
                    setIsEditActive={setIsEditActive}
                />
            )}

            {isEditActive && (
                <div className="task-edit">
                    <TaskEditForm
                        task={currentTask ?? defaultTaskState}
                        editTask={editTask}
                        setIsEditActive={setIsEditActive}
                    />
                </div>
            )}
        </>
    );
};
