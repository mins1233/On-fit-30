var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var ai = new import_genai.GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.post("/api/generate", async (req, res) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "\uC0C8\uB85C\uC6B4 \uCF58\uD150\uCE20 \uB9CC\uB4E4\uC5B4\uC918",
        config: {
          systemInstruction: `\uB108\uB294 \uC911\uD559\uAD50 \uAD50\uC2E4\uC5D0\uC11C \uC218\uC5C5 \uC2DC\uC791 \uC804 \uD559\uC0DD\uB4E4\uC758 \uC9D1\uC911\uB825\uC744 \uB192\uC774\uACE0 \uBD84\uC704\uAE30\uB97C \uD658\uAE30\uC2DC\uD0A4\uB294 \uC6F9 \uC571 '\uC218\uC5C5 \uC2DC\uAC04 30\uCD08 \uC2A4\uC704\uCE58'\uC758 \uC804\uC18D \uCF58\uD150\uCE20 \uC0DD\uC131 AI\uC57C.

\uC0AC\uC6A9\uC790\uAC00 "\uC0C8\uB85C\uC6B4 \uCF58\uD150\uCE20 \uB9CC\uB4E4\uC5B4\uC918"\uB77C\uACE0 \uC694\uCCAD\uD560 \uB54C\uB9C8\uB2E4, \uC911\uD559\uC0DD(14~16\uC138)\uC758 \uB208\uB192\uC774\uC640 \uAD00\uC2EC\uC0AC\uC5D0 \uC644\uBCBD\uD558\uAC8C \uB9DE\uB294 '\uC624\uB298\uC758 \uC9C8\uBB38' 1\uAC1C\uC640 '\uC624\uB298\uC758 \uC0C1\uC2DD \uD034\uC988' 1\uAC1C\uB97C \uBB34\uC791\uC704\uB85C \uC0DD\uC131\uD558\uC5EC \uBC18\uB4DC\uC2DC \uC544\uB798 \uC9C0\uC815\uB41C JSON \uD615\uC2DD\uC73C\uB85C\uB9CC \uBC18\uD658\uD574\uC57C \uD574.

[\uCF58\uD150\uCE20 \uC791\uC131 \uAC00\uC774\uB4DC]
1. \uC624\uB298\uC758 \uC9C8\uBB38 (Today's Question)
- \uBAA9\uC801: \uD559\uC0DD\uB4E4\uC758 \uD638\uAE30\uC2EC \uC790\uADF9, \uCC3D\uC758\uC801 \uC0AC\uACE0 \uC720\uB3C4, \uAC00\uBCBC\uC6B4 \uC544\uC774\uC2A4\uBE0C\uB808\uC774\uD0B9
- \uB0B4\uC6A9: \uC77C\uC0C1, \uC0C1\uC0C1, \uC7AC\uBBF8\uC788\uB294 \uBC38\uB7F0\uC2A4 \uAC8C\uC784(\uAC00\uBCBC\uC6B4 \uB51C\uB808\uB9C8), \uCE5C\uAD6C \uAD00\uACC4, \uC7A5\uB798 \uD76C\uB9DD \uB4F1 \uC911\uD559\uC0DD\uC774 \uD765\uBBF8\uB97C \uAC00\uC9C8 \uB9CC\uD55C \uB2E4\uC591\uD55C \uC8FC\uC81C\uB97C \uB2E4\uB8F0 \uAC83. (\uB108\uBB34 \uC9C4\uC9C0\uD558\uAC70\uB098 \uD559\uC5C5 \uC2A4\uD2B8\uB808\uC2A4\uB97C \uC8FC\uB294 \uC9C8\uBB38\uC740 \uD53C\uD560 \uAC83)
- \uC608\uC2DC: "\uB9CC\uC57D \uD558\uB8E8 \uB3D9\uC548 \uD22C\uBA85\uC778\uAC04\uC774 \uB41C\uB2E4\uBA74 \uAC00\uC7A5 \uBA3C\uC800 \uD558\uACE0 \uC2F6\uC740 \uC77C\uC740?", "\uD3C9\uC0DD \uD55C \uAC00\uC9C0 \uC74C\uC2DD\uB9CC \uBA39\uC5B4\uC57C \uD55C\uB2E4\uBA74 \uCE58\uD0A8 vs \uD53C\uC790?"

2. \uC624\uB298\uC758 \uC0C1\uC2DD \uD034\uC988 (Today's Trivia Quiz)
- \uBAA9\uC801: \uB450\uB1CC \uC6CC\uBC0D\uC5C5, \uAC00\uBCBC\uC6B4 \uC0C1\uC2DD \uC2B5\uB4DD
- \uB0B4\uC6A9: \uACFC\uD559, \uC5ED\uC0AC, \uC62C\uBC14\uB978 \uB9DE\uCDA4\uBC95, \uC0AC\uD68C, \uB10C\uC13C\uC2A4, \uCD5C\uC2E0 \uD2B8\uB80C\uB4DC \uB4F1 \uC911\uD559\uC0DD \uC218\uC900\uC5D0 \uB9DE\uB294 \uAC1D\uAD00\uC2DD(4\uC9C0\uC120\uB2E4) \uB610\uB294 OX \uD034\uC988.
- \uAD6C\uC131: \uD034\uC988 \uBB38\uC81C, \uBCF4\uAE30, \uC815\uB2F5, \uADF8\uB9AC\uACE0 \uD559\uC0DD\uB4E4\uC758 \uC774\uD574\uB97C \uB3D5\uB294 \uAC04\uB2E8\uD55C \uD574\uC124(1~2\uBB38\uC7A5).

[\uCD9C\uB825 \uC81C\uC57D \uC0AC\uD56D]
- \uC5B4\uD22C: \uCE5C\uADFC\uD558\uACE0 \uBC1D\uC740 \uC120\uC0DD\uB2D8\uC774\uB098 \uBC29\uC1A1 MC \uAC19\uC740 \uB9D0\uD22C\uB97C \uC0AC\uC6A9\uD560 \uAC83.
- \uD615\uC2DD: \uBC18\uB4DC\uC2DC JSON \uD615\uC2DD\uC73C\uB85C\uB9CC \uC751\uB2F5\uD560 \uAC83.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.OBJECT,
            properties: {
              todays_question: {
                type: import_genai.Type.OBJECT,
                properties: {
                  topic: { type: import_genai.Type.STRING },
                  question: { type: import_genai.Type.STRING }
                },
                required: ["topic", "question"]
              },
              todays_trivia: {
                type: import_genai.Type.OBJECT,
                properties: {
                  category: { type: import_genai.Type.STRING },
                  type: { type: import_genai.Type.STRING },
                  question: { type: import_genai.Type.STRING },
                  options: {
                    type: import_genai.Type.ARRAY,
                    items: { type: import_genai.Type.STRING }
                  },
                  answer: { type: import_genai.Type.STRING },
                  explanation: { type: import_genai.Type.STRING }
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
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
