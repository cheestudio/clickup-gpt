"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { Button, Textarea, RadioGroup, Radio } from "@nextui-org/react";
import TaskForm from "./TaskForm";
import TaskDetails from "./TaskDetails";

export default function Home() {

  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [taskResponse, setTaskResponse] = useState(null);
  const [submitCompleted, setSetSubmitCompleted] = useState(false);
  const [listId, setListId] = useState("901401517250");

  const handleFormSubmit = async (taskDetails) => {
    setSetSubmitCompleted(false);
    setProcessing(true);
    try {
      const response = await fetch("/api/parse-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      const content = JSON.parse(data?.choices[0].message.content);
      const listResponse = { ...content, listId: listId, description: taskDetails.taskDescription };
      setTaskResponse(listResponse);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProcessing(false);
      setSetSubmitCompleted(true);
    }
  }


  useEffect(() => {
    const createTask = async () => {
      if (!taskResponse) return;
      const response = await fetch("/api/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskResponse }),
      });
      const data = await response.json();
    }
    createTask();
  }, [taskResponse]);

  return (
    <div className="flex w-full max-w-2xl h-full flex-col items-center justify-start gap-10 mx-auto">
      <div className="w-full pt-12 pb-12">

        <TaskForm
          onSubmit={handleFormSubmit}
          processing={processing}
          setSetSubmitCompleted={setSetSubmitCompleted}
          submitCompleted={submitCompleted}
          listId={listId}
          setListId={setListId}
        />

        {taskResponse && (
          <TaskDetails taskResponse={taskResponse} listId={listId} />
        )}

      </div>
      <div className="version absolute bottom-2 right-2 text-sm">v1.4</div>
    </div>
  );
}
