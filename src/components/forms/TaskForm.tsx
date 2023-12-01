import React, { RefObject, SetStateAction, useRef, useState } from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { task } from '../../types/tasks';
import { formEventType, taskFormTypes } from '../../types/propsTypes';
import { getUniqueId } from '../../utils/utils';


 const TaskForm: React.FC<taskFormTypes> = ({ handleSubmitForm,edit,editId,titleValue,descriptionValue,priorityValue }) => {

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [priority, setPriority] = useState<"low" | "medium" | "high">(priorityValue ? priorityValue : "low");

    const handlePriority = (value: "low" | "medium" | "high") => {
      setPriority(value)
    }

    const handleSubmit = (e:formEventType ) => {
      if (titleRef?.current && descriptionRef?.current) {
        if (titleRef.current.value && descriptionRef.current.value) {
          const data: task = {
            id:editId || getUniqueId(),
            taskName: titleRef.current.value,
            taskDescription: descriptionRef.current.value,
            priorityLevel: priority,
            status:"in_progress"
          }
          handleSubmitForm(e, data,editId)
        }
      }
    }

    return (
      <div>
        <form onSubmit={handleSubmit} className=' grid grid-cols-1 gap-2' >
          <Input inputMode='text' ref={titleRef} required={true} placeholder='Task Title' name='title' defaultValue={titleValue} />
          <Input inputMode='text' ref={descriptionRef} required={true} placeholder='Enter Description about task' defaultValue={descriptionValue} />
          <Select required defaultValue={priorityValue} onValueChange={(value: "low" | "medium" | "high") => handlePriority(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='low'>LOW</SelectItem>
              <SelectItem value='medium'>MEDIUM</SelectItem>
              <SelectItem value='high'>HIGH</SelectItem>
            </SelectContent>
          </Select>
          <Button type='submit'>Submit</Button>
        </form>
      </div>
    )
  }

  export default TaskForm;