"use client";

import React, { useState } from "react";
import { Sparkles, SendHorizonal } from "lucide-react";
import { aiService } from "@/services/ai.services";
import RoadmapSkeleton from "@/skeletons/Roadmap.skeleton";
import Loading from "@/components/loading";

export default function Page() {
  const [careerInput, setCareerInput] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "bot",
      text: "Hi! I'm your CareerThink AI. What's your dream career?",
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!careerInput.trim() || loading) return;

    setChatHistory((prev) => [...prev, { sender: "user", text: careerInput }]);
    setLoading(true);
    setCareerInput("");

    try {
      const result = await aiService(careerInput);
      setRoadmap(result);
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          text: result
            ? `Generating a roadmap for ${result.career} 🚀`
            : "Career not found. Please try another aspiration.",
        },
      ]);
    } catch (error) {
      console.error("AI service error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0e0e10] text-white">
      {/* Chat Panel */}
      <div className="w-full md:w-[35%] flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800 bg-[#131316] p-4 sm:p-6 h-[60vh] md:h-screen">
        {/* Chat History */}
        <div className="space-y-4 overflow-y-auto flex-1 custom-scrollbar pr-1">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-[85%] text-sm ${
                  msg.sender === "bot"
                    ? "bg-zinc-800 text-purple-300"
                    : "bg-purple-600 text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-lg bg-zinc-800 text-purple-300 text-sm animate-pulse">
                CareerBot is typing...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex items-center gap-2 mb-2 sm:mb-0"
        >
          <input
            value={careerInput}
            onChange={(e) => setCareerInput(e.target.value)}
            disabled={loading}
            className="flex-grow bg-zinc-900 p-2 rounded-md outline-none border border-zinc-700 text-white disabled:opacity-50"
            placeholder="Type your dream career..."
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 p-2 rounded-md flex items-center justify-center disabled:opacity-50"
          >
            {loading ? <Loading /> : <SendHorizonal size={18} />}
          </button>
        </form>
      </div>

      {/* Roadmap Panel */}
      <div className="w-full md:flex-1 p-4 sm:p-6 overflow-y-auto h-[calc(100vh-60vh)] md:h-screen custom-scrollbar">
        {loading ? (
          <RoadmapSkeleton />
        ) : !roadmap ? (
          <div className="text-center text-zinc-400 mt-10 sm:mt-20">
            <Sparkles className="mx-auto mb-4 text-purple-500" size={40} />
            <h2 className="text-2xl font-semibold">
              Start your career journey
            </h2>
            <p className="mt-2">
              Type your career aspiration in the chat to get a roadmap ✨
            </p>
          </div>
        ) : roadmap === null ? (
          <p className="text-red-400 text-lg mt-10">
            Career not found. Please try another aspiration.
          </p>
        ) : (
          <div className="space-y-6 text-zinc-200">
            <h2 className="text-3xl font-bold text-purple-400">
              Roadmap for {roadmap.career}
            </h2>

            {roadmap.qualifications && (
              <Card title="🎓 Qualifications" items={roadmap.qualifications} />
            )}

            {roadmap.entranceExams && (
              <Card title="📝 Entrance Exams" items={roadmap.entranceExams} />
            )}

            {roadmap.institutions && (
              <Card title="🏛️ Top Institutions" items={roadmap.institutions} />
            )}

            {roadmap.skills && (
              <Card title="🛠️ Essential Skills" items={roadmap.skills} />
            )}

            {roadmap.courses && (
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-300">
                  📚 Recommended Courses
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {roadmap.courses.map((course, idx) => (
                    <li key={idx}>
                      <a
                        href={course.link}
                        className="text-purple-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {course.name} ({course.platform})
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {roadmap.futureScope && (
              <Card title="🔮 Future Scope" items={roadmap.futureScope} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, items }) {
  return (
    <div className="bg-zinc-900 p-3 sm:p-4 rounded-xl shadow-sm border border-zinc-800">
      <h3 className="text-xl font-semibold mb-2 text-purple-300">{title}</h3>
      <ul className="list-disc pl-5 space-y-1 text-zinc-300">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
