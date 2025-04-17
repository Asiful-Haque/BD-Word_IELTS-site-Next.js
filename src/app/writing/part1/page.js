"use client";
import Header from "@/components/Header/page";
import Timer from "@/components/Timer";
import ResultPopup from "@/components/ResultPopUp";
import React, { use, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function WritingTaskPage() {
//   const [writingTask, setWritingTask] = useState(null);
  const [writingAnswer, setWritingAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const fetchWritingTask = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/writing/part1`, {
      method: "GET",
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Failed to fetch task");
    const data = await response.json();
    return data.result;
  }

    const { data: writingTask, isLoading, error, isError } = useQuery({
            queryKey: ["writingTask"],
            queryFn: fetchWritingTask,
        })

  const handleChange = (e) => {
    const text = e.target.value;
    setWritingAnswer(text);
    setWordCount(text.trim().split(/\s+/).length);
  };

  const handleSubmit = () => {
    if (wordCount < 200) {
      alert("Please write at least 200 words.");
      return;
    }

    setShowResult(true);
    console.log("Submitted Writing Answer:", writingAnswer);
  };

  if (isLoading) return <div className="p-8">Loading task...</div>;
  if (isError) return <div className="p-8">Error loading task.</div>;
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 h-screen p-4 bg-[#CFFFDC] pb-26 overflow-auto">
        <div className="flex-1 max-w-4xl mx-auto space-y-6">
          {writingTask && (
            <>
              <h1 className="text-2xl font-bold text-center mb-4">
                {writingTask.task_type}
              </h1>
              <p className="text-lg font-medium bg-white p-4 rounded shadow">
                {writingTask.question}
              </p>
              <img
                src={writingTask.graph_image_url}
                alt="Writing Task Graph"
                className="w-full max-w-3xl mx-auto rounded-lg shadow-md"
              />
              <textarea
                placeholder="Write your answer here (minimum 200 words)..."
                rows={12}
                value={writingAnswer}
                onChange={handleChange}
                className="w-full p-4 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
              />
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Word Count: <span className="font-semibold">{wordCount}</span>
                </p>
                <button
                  onClick={handleSubmit}
                  className="bg-[#6B9D7AFF] text-white px-4 py-2 rounded-md hover:bg-[#5B956CFF]"
                >
                  Submit Writing
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 w-full shadow-md bg-[#6B9D7AFF]">
        <Timer minutes={20} />
      </div>

      {showResult && (
        <ResultPopup
          correctAnswers={1} 
          total={1}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  );
}
