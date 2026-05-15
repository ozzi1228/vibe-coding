import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { goal } = await req.json();

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `사용자의 목표를 실행 가능한 작은 단계로 분해해줘.
각 단계는 5분 이내로 완료 가능한 아주 구체적인 행동이어야 해.
반드시 JSON 배열만 반환하고 다른 텍스트는 포함하지 마.

목표: "${goal}"

형식:
[
  { "id": 1, "title": "단계 제목", "description": "구체적인 행동 설명" },
  ...
]

최대 6단계까지만 생성해.`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    return NextResponse.json({ error: "Invalid response" }, { status: 500 });
  }

  const jsonMatch = content.text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    return NextResponse.json({ error: "Parse error" }, { status: 500 });
  }

  const tasks = JSON.parse(jsonMatch[0]);
  return NextResponse.json({ tasks });
}
