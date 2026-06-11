"use client";

import { useState } from "react";

interface GoalInputProps {
  onSubmit: (goal: string) => void;
  loading: boolean;
  error?: string;
}

export default function GoalInput({ onSubmit, loading, error }: GoalInputProps) {
  const [goal, setGoal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim()) onSubmit(goal.trim());
  };

  const examples = ["알고리즘 공부 시작하기", "운동 루틴 만들기", "포트폴리오 작성하기"];
  const canSubmit = !!goal.trim() && !loading;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 bg-white">
      <div className="w-full max-w-[420px]">
        {/* Brand */}
        <div className="flex items-center gap-2 mb-12">
          <div className="w-6 h-6 rounded-md bg-[#0d1b3e] flex items-center justify-center shrink-0">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L10.5 4V8L6 11L1.5 8V4L6 1Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8fa3c0]">목표 분해기</span>
        </div>

        {/* Headline */}
        <div className="mb-10">
          <h1 className="font-bold text-[#0d1b3e] leading-[1.05] tracking-tight mb-3" style={{ fontSize: "2.6rem" }}>
            지금 뭐<br />하고 싶어?
          </h1>
          <p className="text-[15px] text-[#4d6180] leading-relaxed">
            목표를 입력하면 지금 당장 할 수 있는<br />5분짜리 행동으로 쪼개줄게
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="예: 알고리즘 공부 시작하기"
            rows={3}
            maxLength={500}
            className="input-focus w-full rounded-xl px-4 py-3.5 text-[15px] text-[#0d1b3e] placeholder-[#b0bfdb] bg-white border border-[#dde3ef] resize-none transition-all duration-150"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (goal.trim()) onSubmit(goal.trim());
              }
            }}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full py-[14px] rounded-xl text-[15px] font-semibold text-white bg-[#0d1b3e] hover:bg-[#162952] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                분석 중...
              </span>
            ) : "시작하기 →"}
          </button>
        </form>

        {/* Examples */}
        <div className="mt-8">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-[#b0bfdb] text-center mb-3">예시</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => setGoal(ex)}
                className="text-[13px] px-3.5 py-1.5 rounded-full border border-[#dde3ef] text-[#4d6180] hover:border-[#0d1b3e] hover:text-[#0d1b3e] transition-colors duration-150"
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
