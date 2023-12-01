export type task = {
    id:string,
    taskName:string,
    taskDescription?:string | "",
    priorityLevel : "low" | "medium" | "high",
    status:"in_progress" | "completed"
}

export type useTasksType = {
    tasks : Array<task> | [],
    setTasks : (tasks:Array<task>)=>void,
 }