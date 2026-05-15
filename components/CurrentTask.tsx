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
}

export default function CurrentTask({
  task,
  currentIndex,
  totalCount,
  goal,
  onComplete,
  onFail,
  loading,
}: CurrentTaskProps) {
  const progress = (currentIndex / totalCount) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 px-4">
      <div className="w-full max-w-lg">
        <div className="mb-6">
          <p className="text-zinc-500 text-sm mb-1">목표</p>
          <p className="text-zinc-300 font-medium">{goal}</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-zinc-500 mb-2">
            <span>진행도</span>
            <span>{currentIndex} / {totalCount}</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1.5">
            <div
              className="bg-violet-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full">
              지금 할 일
            </span>
            <span className="text-xs text-zinc-600">#{currentIndex + 1}</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-3">{task.title}</h2>
          <p className="text-zinc-400 text-base leading-relaxed">{task.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onFail}
            disabled={loading}
            className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-300 font-semibold py-4 rounded-2xl transition-colors"
          >
            {loading ? "..." : "못 했어 😔"}
          </button>
          <button
            onClick={onComplete}
            disabled={loading}
            className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold py-4 rounded-2xl transition-colors"
          >
            완료했어 ✓
          </button>
        </div>
      </div>
    </div>
  );
}
