// TaskForm.js or TaskForm.tsx if using TypeScript
import { useEffect, useReducer, useRef, useState } from 'react';
import { Button, Textarea, RadioGroup, Radio } from '@nextui-org/react';

const TaskForm = ({ onSubmit, processing, listId, setListId, submitCompleted, setSetSubmitCompleted }) => {
  const taskInfoRef = useRef(null);
  const taskDescripRef = useRef(null);
  const [taskInfo, setTaskInfo] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleFormSubmit = (e) => {
    setSetSubmitCompleted(false);
    const taskDetails = {
      taskInfo: taskInfo,
      taskDescription: taskDescription,
    }
    e.preventDefault();
    onSubmit(taskDetails);


  };


  useEffect(() => {
    if (submitCompleted) {
      taskInfoRef.current.value = "";
      taskDescripRef.current.value = "";
      setTaskInfo("");
      setTaskDescription("");
    }
  }, [submitCompleted])

  return (
    <form onSubmit={handleFormSubmit} className="grid gap-5 mb-10">
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
          isDisabled={processing}
          isRequired
        />
        <p className="mt-2 italic mb-1"><small>e.g. Send Meeting Notes, High Priority, due tomorrow, for Chee, is billable</small></p>
        <p className="mb-8 italic"><small><strong>Task details can also be shorthand:</strong> &quot;Send Meeting Notes high tomorrow chee billable&quot;</small></p>
        <Textarea
          label="Task Description (optional)"
          ref={taskDescripRef}
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          isDisabled={processing}
        />
        <p className="mt-2 italic mb-0"><small>Optional text to go into the body of the task</small></p>
      </div>
      <Button type="submit" isLoading={processing}>Create Task</Button>
    </form>
  );
};

export default TaskForm;
