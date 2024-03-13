import { useState } from "react";
import { Task } from "../types/task";
import { v4 as uuidv4 } from "uuid";
import { Priorities } from "./Priorities";
import { TaskViewForm } from "./TaskViewForm";
import { TaskCard } from "./TaskCard";
import { Tags } from "./Tags";

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

    const addTask = (task: Task) => {
        setTasks([
            ...tasks,
            {
                ...task,
                id: uuidv4().toString(),
            },
        ]);
    };

    const toggleOption = (option: string) => {
        const updatedOptions = new Map(options);
        const value: boolean = options.get(option) ?? false;

        updatedOptions.set(option, !value);

        setOptions(updatedOptions);
    };

    return (
        <div className="task-wrapper">
            <div className="container">
                <Priorities toggleOption={toggleOption} />
                <Tags toggleOption={toggleOption} />
            </div>
            <div className="container">
                <TaskViewForm addTask={addTask} />
                {tasks.map((task) => {
                    let toRender: boolean = true;

                    if (!options.get(task.priority)) {
                        toRender = false;
                    }

                    task.tags.forEach((element) => {
                        if (!options.get(element)) {
                            toRender = false;
                        }
                    });

                    return toRender ? (
                        <TaskCard key={task.id} task={task} />
                    ) : null;
                })}
            </div>
        </div>
    );
};
