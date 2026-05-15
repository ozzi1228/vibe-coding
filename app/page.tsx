"use client";

import { useState } from "react";
import GoalInput from "@/components/GoalInput";
import CurrentTask from "@/components/CurrentTask";
import TaskComplete from "@/components/TaskComplete";

interface Task {
  id: number;
  title: string;
  description: string;
}

type Phase = "input" | "task" | "complete";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("input");
  const [goal, setGoal] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleGoalSubmit = async (inputGoal: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/decompose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: inputGoal }),
      });
      const data = await res.json();
      setGoal(inputGoal);
      setTasks(data.tasks);
      setCurrentIndex(0);
      setPhase("task");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    if (currentIndex + 1 >= tasks.length) {
      setPhase("complete");
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleFail = async () => {
    const currentTask = tasks[currentIndex];
    setLoading(true);
    try {
      const res = await fetch("/api/redecompose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: currentTask.title,
          description: currentTask.description,
        }),
      });
      const data = await res.json();

      const newTasks = [
        ...tasks.slice(0, currentIndex),
        ...data.tasks,
        ...tasks.slice(currentIndex + 1),
      ];
      setTasks(newTasks);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setPhase("input");
    setGoal("");
    setTasks([]);
    setCurrentIndex(0);
  };

  if (phase === "input") {
    return <GoalInput onSubmit={handleGoalSubmit} loading={loading} />;
  }

  if (phase === "complete") {
    return <TaskComplete goal={goal} onRestart={handleRestart} />;
  }

  return (
    <CurrentTask
      task={tasks[currentIndex]}
      currentIndex={currentIndex}
      totalCount={tasks.length}
      goal={goal}
      onComplete={handleComplete}
      onFail={handleFail}
      loading={loading}
    />
  );
}
