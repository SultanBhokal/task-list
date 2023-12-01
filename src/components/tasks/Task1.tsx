import { useTasks } from '../../store/zustandStore'
import React, { useMemo, useState } from 'react'
import PopoverCard from '../cards/PopoverCard';
import { task } from '../../types/tasks';
import TaskForm from '../forms/TaskForm';
import Card2 from '../cards/Card2';
import { formEventType } from '../../types/propsTypes';
import { gradients, sortByPriority, sortByStatus } from "../../utils/utils";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '../ui/menubar';
import { Checkbox } from '../ui/checkbox';
import { RadioGroupItem, RadioGroup } from "../ui/radio-group";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

function Task1() {
  const [open, setOpen] = useState<boolean>(false);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const { tasks, setTasks } = useTasks((state) => state);
  const [sortPriority, setSortPriority] = useState<"asc" | "desc" | "none">("none");
  const [sortStatus, setSortStatus] = useState<"asc" | "desc" | "none">("none");
  const [filteredTask, setFilteredTask] = useState<Array<task> | []>(tasks);
  let grInd = 0;

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>, data: task) => {
    e.preventDefault();
    const newTasks: Array<task> = [...tasks, data];
    localStorage.setItem("user_tasks", JSON.stringify(newTasks))
    setFilteredTask(newTasks);
    setTasks(newTasks);
    if (addOpen) {
      setAddOpen(false)
    }
    if (open) {
      setOpen(false)
    }
  }

  const handleEdit = (e: formEventType, data: task, id?: string) => {
    e.preventDefault();
    const editedTasks = filteredTask.map((task) => {
      if (task.id === id) {
        return data
      }
      return task
    })
    console.log(data)
    localStorage.setItem("user_tasks", JSON.stringify(editedTasks));
    setFilteredTask(editedTasks);
    setTasks(editedTasks);
  }

  const handleDelete = (id: string) => {
    const newFilteredTasks = filteredTask?.filter(task => task.id !== id);
    setFilteredTask(newFilteredTasks);
    localStorage.setItem("user_tasks", JSON.stringify(newFilteredTasks));
    setTasks(newFilteredTasks);
  }

  const handleStatus = (id: string, value: "in_progress" | "completed") => {
    const newFilteredTasks = filteredTask.map(task => {
      if (task.id === id) {
        const modifiedTask: task = {
          ...task,
          status: value
        }
        return modifiedTask
      }
      return task
    });

    localStorage.setItem("user_tasks", JSON.stringify(newFilteredTasks));
    setFilteredTask(newFilteredTasks);
    setTasks(newFilteredTasks);
  }

  const handleStatusSort = () => {
    if(sortStatus === "none"){
      setSortStatus("asc")
    }
    if(sortStatus === "asc"){
      setSortStatus("desc")
    }
    if(sortStatus === "desc"){
      setSortStatus("none")
    }
    setSortPriority("none")
  }

  const handlePrioritySort = () => {
    if(sortPriority === "none"){
      setSortPriority("asc")
    }
    if(sortPriority === "asc"){
      setSortPriority("desc")
    }
    if(sortPriority === "desc"){
      setSortPriority("none")
    }
    setSortStatus("none")
  }

  const sortedTasks = useMemo(()=>{
    if(sortPriority !== "none"){
      return sortByPriority(filteredTask,sortPriority);
    }
    if(sortStatus !== "none"){
      return sortByStatus(filteredTask,sortStatus)
    }
    return filteredTask
  },[sortStatus,sortPriority,filteredTask])



  return (
    <div className=' z-50 h-11/12 w-11/12 bg-opacity-80 bg-neutral-800  rounded-3xl overflow-scroll pe-4 px-4'>
      <section className=' w-full min-h-max grid grid-cols-3 justify-items-center pt-2 pb-2 relative mb-10'>
        <div className='px-2 py-2 flex gap-2 items-center'>
          <label>Add New Task</label>
          <PopoverCard open={addOpen} setOpen={setAddOpen} triggerComponent={
            <span className="inline-block border border-primary-foreground text-primary-foreground hover:bg-primary hover:border-primary rounded-lg  px-6 py-2 transition duration-300 ease-in-out cursor-pointer">
              +
            </span>
          }
            triggerContent={<TaskForm handleSubmitForm={handleSubmitForm} />}
          />
        </div>
        <div>
          TASKS
        </div>
        <div className=' flex gap-2'>
          <h3>
            Sort By :
          </h3>
          <div className=' grid grid-cols-2 gap-4 border border-gray-500 bg-neutral-900 text-white place-items-center px-3 self-start py-2'>
            <div className=' flex items-center gap-2 cursor-pointer transition-transform hover:scale-90' onClick={handleStatusSort}>
              <p>Status</p>
              {
                sortStatus === "asc" && <FontAwesomeIcon icon={faSortUp} />
              }
              {
                sortStatus === "desc" && <FontAwesomeIcon icon={faSortDown} />
              }
            </div>
            <div className=' flex items-center gap-2 cursor-pointer transition-transform hover:scale-90' onClick={handlePrioritySort}>
              <p>Priority</p>
              {
                sortPriority === "asc" && <FontAwesomeIcon icon={faSortUp} />
              }
              {
                sortPriority === "desc" && <FontAwesomeIcon icon={faSortDown} />
              }
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse"></div>
      </section>
      {
        filteredTask?.length === 0
        &&
        <section className=' h-full flex items-center justify-center'>
          <PopoverCard open={open} setOpen={setOpen} triggerComponent={
            <span className="inline-block border border-primary-foreground text-primary-foreground hover:bg-primary hover:border-primary rounded-lg  px-6 py-2 transition duration-300 ease-in-out cursor-pointer">
              +
            </span>
          }
            triggerContent={<TaskForm handleSubmitForm={handleSubmitForm} />}

          />
        </section>
      }
      <section className=' h-full w-full pl-2 grid grid-rows-2 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center '>
        {

          sortedTasks.map((task, ind) => {
            grInd += 1
            if (grInd >= gradients.length) {
              grInd = 0;
            }
            return (
              <Card2 key={task.id} handleStatus={handleStatus} status={task.status} title={task.taskName} description={task.taskDescription} priorityLevel={task.priorityLevel} handleEdit={handleEdit} handleDelete={handleDelete} id={task.id} bgGradient={gradients[grInd]} />
            )
          }
          )}
      </section>

    </div>
  )
}

export default Task1