"use client";

import { useEffect, useState, useRef } from "react";

import { Input, Button, Textarea } from "@nextui-org/react";

export default function Home() {

  const inputRef = useRef(null);
  const [taskDescription, setTaskDescription] = useState("");
  const [processing, setProcessing] = useState(false);
  const [taskResponse, setTaskResponse] = useState(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const response = await fetch("/api/parse-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskDescription }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      const content = JSON.parse(data.choices[0].message.content);
      setTaskResponse(content);
      console.log(content);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProcessing(false);
      setTaskDescription('');
    }
  }
  useEffect(() => {
    const createTask = async () => {
      if(!taskResponse) return;
      const response = await fetch("/api/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskResponse }),
      });
      const data = await response.json();
      console.log(data);
    }
    createTask();
  }, [taskResponse]);

  return (
    <div className="flex w-full max-w-2xl h-full flex-col items-center justify-start gap-10 mx-auto">
      <div className="w-full pt-24">
        <form onSubmit={handleFormSubmit} className="grid gap-10 mb-10">
          <Textarea
            label="Enter your task description"
            labelPlacement="outside"
            placeholder="e.g. Send MAC Meeting Notes to Matt, due tomorrow, urgent"
            type="text"
            ref={inputRef}
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            disabled={processing}
          />
          <Button type="submit" isLoading={processing}>Create Task</Button>
        </form>

        <div>
          <p><strong>Task Description:</strong> {taskResponse?.task_description}</p>
          <p><strong>Due Date:</strong> {taskResponse?.due_date}</p>
          <p><strong>Priority:</strong> {taskResponse?.priority?.id}</p>
          <p><strong>Assignee:</strong> {taskResponse?.assignee?.id}</p>
          <p><strong>Client:</strong> {taskResponse?.client_name?.name}</p>
        </div>

      </div>
    </div>
  );
}
