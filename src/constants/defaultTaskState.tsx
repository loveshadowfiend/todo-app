import { Task } from "../types/task";

export const defaultTaskState: Task = {
    id: "not set",
    name: "not set",
    creationDate: new Date(),
    priority: "low",
    tags: ["research"],
    description: "",
};
