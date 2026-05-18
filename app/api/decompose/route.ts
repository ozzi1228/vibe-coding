import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 });
    }

    const { goal } = await req.json();
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
      return NextResponse.json({ error: "AI 응답 파싱 실패" }, { status: 500 });
    }

    const tasks = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ tasks });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
