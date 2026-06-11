"use client";

interface Task {
  id: number;
  title: string;
  description: string;
}

interface CurrentTaskProps {
  task: Task;
  currentIndex: number;
  totalCount: number;
  goal: string;
  onComplete: () => void;
  onFail: () => void;
  loading: boolean;
  error?: string;
}

export default function CurrentTask({
  task,
  currentIndex,
  totalCount,
  goal,
  onComplete,
  onFail,
  loading,
  error,
}: CurrentTaskProps) {
  const progress = ((currentIndex + 1) / totalCount) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 bg-white">
      <div className="w-full max-w-[420px]">
        {/* Goal context */}
        <div className="mb-7">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-[#b0bfdb] mb-1.5">목표</p>
          <p className="text-sm text-[#4d6180] font-medium">{goal}</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[12px] text-[#b0bfdb]">진행도</span>
            <span className="text-[12px] font-semibold text-[#0d1b3e] tabular-nums">
              {currentIndex + 1} / {totalCount}
            </span>
          </div>
          <div className="w-full h-[2px] bg-[#eef1f7] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0d1b3e] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Task card */}
        <div className="rounded-2xl border border-[#dde3ef] bg-[#f8f9fc] p-6 mb-3">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#0d1b3e] text-white">
              지금 할 일
            </span>
            <span className="text-[12px] text-[#b0bfdb]">#{currentIndex + 1}</span>
          </div>
          <h2 className="font-bold text-[#0d1b3e] leading-tight tracking-tight mb-2.5" style={{ fontSize: "1.5rem" }}>
            {task.title}
          </h2>
          <p className="text-[14px] text-[#4d6180] leading-relaxed">{task.description}</p>
        </div>

        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

        <p className="text-[12px] text-[#b0bfdb] text-center mb-4">못 하겠으면 더 작게 쪼개줄게</p>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onFail}
            disabled={loading}
            className="py-[13px] rounded-xl text-[15px] font-semibold text-[#4d6180] border border-[#dde3ef] hover:bg-[#f4f6fb] hover:text-[#0d1b3e] hover:border-[#b0bfdb] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {loading ? "..." : "못 했어"}
          </button>
          <button
            onClick={onComplete}
            disabled={loading}
            className="py-[13px] rounded-xl text-[15px] font-semibold text-white bg-[#0d1b3e] hover:bg-[#162952] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
          >
            완료했어 ✓
          </button>
        </div>
      </div>
    </div>
  );
}
