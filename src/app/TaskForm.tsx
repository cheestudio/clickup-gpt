// TaskForm.js or TaskForm.tsx if using TypeScript
import { useReducer, useRef, useState } from 'react';
import { Button, Textarea, RadioGroup, Radio } from '@nextui-org/react';

const TaskForm = ({ onSubmit, processing, listId, setListId }) => {
  const taskInfoRef = useRef(null);
  const taskDescripRef = useRef(null);
  const [taskInfo, setTaskInfo] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  // const formReducer = (state, event) => {

  // }

  // const [formState, formDispatch] = useReducer(formReducer, {
  //   taskInfo: "",
  //   taskDescription: "",
  // });

  const handleFormSubmit = (e) => {
    const taskDetails = {
      taskInfo: taskInfo,
      taskDescription: taskDescription,
    }
    e.preventDefault();
    onSubmit(taskDetails);
    taskInfoRef.current.value = "";
    taskDescripRef.current.value = "";
    setTaskInfo("");
    setTaskDescription("");
  };

  return (
    <form onSubmit={handleFormSubmit} className="grid gap-10 mb-10">
      <RadioGroup
        label="Task Queue"
        orientation="horizontal"
        value={listId}
        onValueChange={setListId}
      >
        <Radio value="901401517250">Lars</Radio>
        <Radio value="901401517405">Matt</Radio>
      </RadioGroup>
      <div>
        <Textarea
          label="Task Details"
          ref={taskInfoRef}
          value={taskInfo}
          onChange={(e) => setTaskInfo(e.target.value)}
          disabled={processing}
          isRequired
        />
        <p className="mt-3 italic mb-1"><small>e.g. Send Meeting Notes, High Priority, due tomorrow, for Chee, is billable</small></p>
        <p className="mb-5 italic"><small><strong>Task details can also be shorthand:</strong> &quot;Send Meeting Notes high tomorrow chee billable&quot;</small></p>
        <Textarea
          label="Task Description (optional)"
          ref={taskDescripRef}
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          disabled={processing}
        />
        <p className="mt-3 italic mb-1"><small>Optional text to go into the body of the task</small></p>
      </div>
      <Button type="submit" isLoading={processing}>Create Task</Button>
    </form>
  );
};

export default TaskForm;
