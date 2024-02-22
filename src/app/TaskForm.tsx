// TaskForm.js or TaskForm.tsx if using TypeScript
import { useRef, useState } from 'react';
import { Button, Textarea, RadioGroup, Radio } from '@nextui-org/react';

const TaskForm = ({ onSubmit, processing, listId, setListId }) => {
  const [taskDescription, setTaskDescription] = useState("");
  const inputRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskDescription);
    inputRef.current.value = "";
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
      <Textarea
        label="Enter your task description"
        placeholder="e.g. Send MAC Meeting Notes to Matt, due tomorrow, urgent"
        ref={inputRef}
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        disabled={processing}
      />
      <Button type="submit" isLoading={processing}>Create Task</Button>
    </form>
  );
};

export default TaskForm;
