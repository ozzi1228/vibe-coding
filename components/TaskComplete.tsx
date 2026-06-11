"use client";

interface TaskCompleteProps {
  goal: string;
  onRestart: () => void;
}

export default function TaskComplete({ goal, onRestart }: TaskCompleteProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 bg-white">
      <div className="w-full max-w-[420px] text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#0d1b3e] flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 14L11.5 20L22 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <h2 className="font-bold text-[#0d1b3e] tracking-tight mb-2" style={{ fontSize: "2.2rem" }}>
          다 완료했어!
        </h2>
        <p className="text-[11px] font-semibold tracking-widest uppercase text-[#b0bfdb] mb-1.5">달성한 목표</p>
        <p className="text-[16px] font-semibold text-[#0d1b3e] mb-9">&ldquo;{goal}&rdquo;</p>

        <div className="rounded-xl border border-[#dde3ef] bg-[#f8f9fc] px-5 py-4 mb-7 text-left">
          <p className="text-[14px] text-[#4d6180] leading-relaxed">
            작은 행동들이 쌓여서 목표에 도달했어. 오늘 정말 잘했어.
          </p>
        </div>

        <button
          onClick={onRestart}
          className="w-full py-[14px] rounded-xl text-[15px] font-semibold text-white bg-[#0d1b3e] hover:bg-[#162952] transition-colors duration-150"
        >
          새 목표 시작하기
        </button>
      </div>
    </div>
  );
}
