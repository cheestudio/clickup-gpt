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
  const [listId, setListId] = useState("901401517250");

  const handleFormSubmit = async (taskDescription) => {
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
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProcessing(false);
    }
  }
  useEffect(() => {
    const createTask = async () => {
      if (!taskResponse) return;
      const listResponse = { ...taskResponse, listId: listId };
      const response = await fetch("/api/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listResponse }),
      });
      const data = await response.json();
      console.log(data);
      router.refresh();
    }
    createTask();
  }, [taskResponse, listId, router]);

  return (
    <div className="flex w-full max-w-2xl h-full flex-col items-center justify-start gap-10 mx-auto">
      <div className="w-full pt-24">

        <TaskForm
          onSubmit={handleFormSubmit}
          processing={processing}
          listId={listId}
          setListId={setListId}
        />

        {taskResponse && (
          <TaskDetails taskResponse={taskResponse} listId={listId} />
        )}

      </div>
    </div>
  );
}
