"use client";

interface TaskCompleteProps {
  goal: string;
  onRestart: () => void;
}

export default function TaskComplete({ goal, onRestart }: TaskCompleteProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 px-4">
      <div className="w-full max-w-lg text-center">
        <div className="text-7xl mb-6">🎉</div>
        <h2 className="text-3xl font-bold text-white mb-3">다 완료했어!</h2>
        <p className="text-zinc-400 text-lg mb-2">목표 달성</p>
        <p className="text-violet-400 font-medium text-xl mb-10">"{goal}"</p>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 mb-8 text-left">
          <p className="text-zinc-300 text-sm leading-relaxed">
            작은 행동들이 쌓여서 목표에 도달했어. 오늘 정말 잘했어! 🙌
          </p>
        </div>

        <button
          onClick={onRestart}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-4 rounded-2xl text-lg transition-colors"
        >
          새 목표 시작하기
        </button>
      </div>
    </div>
  );
}
