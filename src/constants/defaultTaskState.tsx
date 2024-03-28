import { Task } from "../types/task";

export const defaultTaskState: Task = {
    id: "",
    name: "",
    creationDate: new Date(),
    priority: "low",
    tags: ["research"],
    description: "",
};
