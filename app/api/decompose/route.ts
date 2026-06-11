import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

interface Task {
  title: string;
  description: string;
}

function isValidTaskArray(data: unknown): data is Task[] {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every(
      (t) =>
        t !== null &&
        typeof t === "object" &&
        typeof (t as Task).title === "string" &&
        (t as Task).title.trim().length > 0 &&
        typeof (t as Task).description === "string"
    )
  );
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "서버 설정 오류" }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.goal !== "string" || !body.goal.trim()) {
    return NextResponse.json({ error: "goal 필드가 필요합니다" }, { status: 400 });
  }

  // 입력 길이 제한 — 과도한 토큰 소비 방지
  const goal = body.goal.trim().slice(0, 500);

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(`사용자의 목표를 실행 가능한 작은 단계로 분해해줘.
각 단계는 5분 이내로 완료 가능한 아주 구체적인 행동이어야 해.
반드시 JSON 배열만 반환하고 다른 텍스트는 포함하지 마.

목표: "${goal}"

형식:
[
  { "id": 1, "title": "단계 제목", "description": "구체적인 행동 설명" },
  ...
]

최대 6단계까지만 생성해.`);

    const text = result.response.text();
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "AI 응답 처리에 실패했습니다" }, { status: 500 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch {
      return NextResponse.json({ error: "AI 응답 처리에 실패했습니다" }, { status: 500 });
    }

    if (!isValidTaskArray(parsed)) {
      return NextResponse.json({ error: "AI 응답 형식이 올바르지 않습니다" }, { status: 500 });
    }

    // AI가 반환한 필드 외 추가 데이터 제거 + 필드 길이 제한
    const tasks = parsed.map((t, i) => ({
      id: i + 1,
      title: t.title.trim().slice(0, 200),
      description: t.description.trim().slice(0, 500),
    }));

    return NextResponse.json({ tasks });
  } catch {
    return NextResponse.json({ error: "AI 서비스 오류가 발생했습니다" }, { status: 500 });
  }
}
