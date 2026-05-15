"use client";

import { useState } from "react";

interface GoalInputProps {
  onSubmit: (goal: string) => void;
  loading: boolean;
}

export default function GoalInput({ onSubmit, loading }: GoalInputProps) {
  const [goal, setGoal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim()) onSubmit(goal.trim());
  };

  const examples = ["알고리즘 공부 시작하기", "운동 루틴 만들기", "포트폴리오 작성하기"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 px-4">
      <div className="w-full max-w-lg">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">지금 뭐 하고 싶어?</h1>
          <p className="text-zinc-400 text-lg">목표를 입력하면 지금 당장 할 일 1개만 알려줄게</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="예: 알고리즘 공부 시작하기"
            className="w-full bg-zinc-900 text-white placeholder-zinc-500 border border-zinc-700 rounded-2xl px-5 py-4 text-lg resize-none focus:outline-none focus:border-violet-500 transition-colors"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (goal.trim()) onSubmit(goal.trim());
              }
            }}
          />
          <button
            type="submit"
            disabled={!goal.trim() || loading}
            className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold py-4 rounded-2xl text-lg transition-colors"
          >
            {loading ? "분석 중..." : "시작하기 →"}
          </button>
        </form>

        <div className="mt-8">
          <p className="text-zinc-600 text-sm mb-3 text-center">예시</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => setGoal(ex)}
                className="text-sm text-zinc-400 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
