import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  const { task, description } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(`사용자가 다음 태스크를 완료하지 못했어. 더 작고 쉬운 단계로 다시 분해해줘.
각 단계는 2분 이내로 완료 가능해야 하고, 아주 구체적이고 쉬워야 해.
반드시 JSON 배열만 반환하고 다른 텍스트는 포함하지 마.

실패한 태스크: "${task}"
설명: "${description}"

형식:
[
  { "id": 1, "title": "단계 제목", "description": "구체적인 행동 설명" },
  ...
]

최대 4단계까지만 생성해.`);

  const text = result.response.text();
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    return NextResponse.json({ error: "Parse error" }, { status: 500 });
  }

  const tasks = JSON.parse(jsonMatch[0]);
  return NextResponse.json({ tasks });
}
