/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, HelpCircle, Brain, RefreshCw, CheckCircle2, XCircle, AlertCircle, Quote } from "lucide-react";

interface QuestionData {
  topic: string;
  question: string;
}

interface TriviaData {
  category: string;
  type: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface Content {
  todays_question: QuestionData;
  todays_trivia: TriviaData;
}

export default function App() {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    setSelectedOption(null);
    setShowExplanation(false);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("콘텐츠를 가져오는데 실패했습니다.");
      const data = await response.json();
      setContent(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleOptionSelect = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    setShowExplanation(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#1A1A1A] font-sans selection:bg-[#FFD93D]">
      {/* Header */}
      <header className="border-b-4 border-[#1A1A1A] bg-[#FFD93D] p-6 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#1A1A1A] p-2 rounded-lg">
              <Zap className="text-[#FFD93D] w-8 h-8 fill-current" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">
              수업 시간 30초 스위치
            </h1>
          </div>
          <button 
            onClick={fetchContent}
            disabled={loading}
            className="group relative inline-flex items-center gap-2 bg-[#FF6B6B] border-4 border-[#1A1A1A] px-6 py-3 font-bold text-xl uppercase tracking-wider transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] active:translate-x-0 active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
            {loading ? '생성 중...' : '새로운 스위치'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 mt-12 space-y-12">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#FFE5E5] border-4 border-[#FF6B6B] p-6 rounded-2xl flex items-start gap-4"
            >
              <AlertCircle className="w-8 h-8 text-[#FF6B6B] shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-[#FF6B6B]">문제가 발생했습니다.</h3>
                <p className="font-medium">{error}</p>
                <button 
                  onClick={fetchContent}
                  className="mt-4 text-[#FF6B6B] underline font-bold"
                >
                  다시 시도하기
                </button>
              </div>
            </motion.div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-8 border-t-[#FF6B6B] border-r-[#4ECDC4] border-b-[#FFE66D] border-l-[#1A1A1A] rounded-full"
              />
              <p className="text-2xl font-black italic animate-pulse">
                오늘의 즐거운 수업 준비 중...
              </p>
            </div>
          ) : content && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
              {/* Today's Question Card */}
              <motion.section 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative bg-white border-4 border-[#1A1A1A] rounded-3xl p-8 shadow-[12px_12px_0px_0px_rgba(78,205,196,1)] flex flex-col justify-between min-h-[400px]"
              >
                <div className="absolute -top-6 -left-6 bg-[#4ECDC4] border-4 border-[#1A1A1A] px-4 py-2 rounded-xl transform -rotate-12">
                  <span className="text-lg font-black uppercase text-[#1A1A1A]">오늘의 질문</span>
                </div>
                
                <div className="mt-8 flex-grow">
                  <div className="mb-4 inline-block bg-[#1A1A1A] text-white px-3 py-1 text-sm font-bold skew-x-[-10deg]">
                    주제: {content.todays_question.topic}
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-4 -left-4 w-12 h-12 text-[#4ECDC4]/20 -z-10" />
                    <h2 className="text-2xl md:text-3xl font-black leading-tight text-[#1A1A1A] break-keep">
                      "{content.todays_question.question}"
                    </h2>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t-2 border-[#1A1A1A]/10 italic font-medium text-[#1A1A1A]/70 text-center">
                  친구와 함께 자유롭게 이야기를 나눠보세요!
                </div>
              </motion.section>

              {/* Trivia Quiz Card */}
              <motion.section 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative bg-white border-4 border-[#1A1A1A] rounded-3xl p-8 shadow-[12px_12px_0px_0px_rgba(255,230,109,1)] flex flex-col min-h-[400px]"
              >
                <div className="absolute -top-6 -right-6 bg-[#FFE66D] border-4 border-[#1A1A1A] px-4 py-2 rounded-xl transform rotate-12">
                  <span className="text-lg font-black uppercase text-[#1A1A1A]">상식 퀴즈</span>
                </div>

                <div className="mt-8">
                  <div className="mb-4 inline-block bg-[#1A1A1A] text-white px-3 py-1 text-sm font-bold skew-x-[-10deg]">
                    분야: {content.todays_trivia.category}
                  </div>
                  <h2 className="text-xl md:text-2xl font-black leading-snug mb-6 break-keep">
                    {content.todays_trivia.question}
                  </h2>

                  <div className="space-y-3">
                    {content.todays_trivia.options.map((option, idx) => {
                      const isCorrect = option === content.todays_trivia.answer;
                      const isSelected = selectedOption === option;
                      
                      let bgColor = "bg-white";
                      let borderColor = "border-[#1A1A1A]";
                      
                      if (selectedOption) {
                        if (isCorrect) {
                          bgColor = "bg-[#4ECDC4]";
                          borderColor = "border-[#1A1A1A]";
                        } else if (isSelected && !isCorrect) {
                          bgColor = "bg-[#FF6B6B]";
                          borderColor = "border-[#1A1A1A]";
                        } else {
                          bgColor = "bg-gray-50 opacity-50";
                          borderColor = "border-gray-200";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(option)}
                          disabled={!!selectedOption}
                          className={`w-full text-left p-4 border-4 ${borderColor} ${bgColor} rounded-xl font-bold text-lg transition-all ${!selectedOption ? 'hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]' : ''} flex justify-between items-center`}
                        >
                          <span>{idx + 1}. {option}</span>
                          {selectedOption && isCorrect && <CheckCircle2 className="w-6 h-6 text-[#1A1A1A]" />}
                          {selectedOption && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-[#1A1A1A]" />}
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-6 p-4 bg-[#1A1A1A] text-white rounded-xl"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-5 h-5 text-[#FFE66D]" />
                          <span className="font-black text-[#FFE66D] uppercase">정답 해설</span>
                        </div>
                        <p className="font-bold text-lg leading-relaxed">{content.todays_trivia.explanation}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.section>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="mt-20 p-8 border-t-4 border-[#1A1A1A] bg-[#1A1A1A] text-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-xl font-black italic tracking-wider">
            SWITCH ON YOUR MIND!  स्विच!
          </p>
          <div className="flex items-center gap-2 text-sm font-bold opacity-60">
            <span>© 2024 수업 시간 30초 스위치</span>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <span>Middle School Special Content</span>
          </div>
        </div>
        
        {/* Animated marquee in BG */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none select-none flex items-center whitespace-nowrap overflow-hidden">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-8xl font-black uppercase tracking-tighter"
          >
            FOCUS ENERGY CREATIVITY SMILE FOCUS ENERGY CREATIVITY SMILE FOCUS ENERGY CREATIVITY SMILE
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
