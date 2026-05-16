import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/generate", async (req, res) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "새로운 콘텐츠 만들어줘",
        config: {
          systemInstruction: `너는 중학교 교실에서 수업 시작 전 학생들의 집중력을 높이고 분위기를 환기시키는 웹 앱 '수업 시간 30초 스위치'의 전속 콘텐츠 생성 AI야.

사용자가 "새로운 콘텐츠 만들어줘"라고 요청할 때마다, 중학생(14~16세)의 눈높이와 관심사에 완벽하게 맞는 '오늘의 질문' 1개와 '오늘의 상식 퀴즈' 1개를 무작위로 생성하여 반드시 아래 지정된 JSON 형식으로만 반환해야 해.

[콘텐츠 작성 가이드]
1. 오늘의 질문 (Today's Question)
- 목적: 학생들의 호기심 자극, 창의적 사고 유도, 가벼운 아이스브레이킹
- 내용: 일상, 상상, 재미있는 밸런스 게임(가벼운 딜레마), 친구 관계, 장래 희망 등 중학생이 흥미를 가질 만한 다양한 주제를 다룰 것. (너무 진지하거나 학업 스트레스를 주는 질문은 피할 것)
- 예시: "만약 하루 동안 투명인간이 된다면 가장 먼저 하고 싶은 일은?", "평생 한 가지 음식만 먹어야 한다면 치킨 vs 피자?"

2. 오늘의 상식 퀴즈 (Today's Trivia Quiz)
- 목적: 두뇌 워밍업, 가벼운 상식 습득
- 내용: 과학, 역사, 올바른 맞춤법, 사회, 넌센스, 최신 트렌드 등 중학생 수준에 맞는 객관식(4지선다) 또는 OX 퀴즈.
- 구성: 퀴즈 문제, 보기, 정답, 그리고 학생들의 이해를 돕는 간단한 해설(1~2문장).

[출력 제약 사항]
- 어투: 친근하고 밝은 선생님이나 방송 MC 같은 말투를 사용할 것.
- 형식: 반드시 JSON 형식으로만 응답할 것.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              todays_question: {
                type: Type.OBJECT,
                properties: {
                  topic: { type: Type.STRING },
                  question: { type: Type.STRING }
                },
                required: ["topic", "question"]
              },
              todays_trivia: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  type: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: { 
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  answer: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ["category", "type", "question", "options", "answer", "explanation"]
              }
            },
            required: ["todays_question", "todays_trivia"]
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("No content generated");
      }
      res.json(JSON.parse(text));
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
