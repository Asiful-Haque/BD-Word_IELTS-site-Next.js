import React, { useState } from "react";
import ResultPopup from "@/components/ResultPopUp";
import Image from "next/image";

const WritingTask = ({ taskType, question, graphImageUrl, topics }) => {
  const [writingAnswer, setWritingAnswer] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleChange = (e) => {
    const text = e.target.value;
    setWritingAnswer(text);
    setWordCount(text.trim().split(/\s+/).length);
  };

  const handleSubmit = () => {
    if (wordCount > 200) {
      alert("Please write upto 200 words.");
      return;
    }

    console.log("User answer:", writingAnswer);
    setShowResult(true); 
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto space-y-6 pb-40">
      <h1 className="text-2xl font-bold text-center mb-4">{taskType}</h1>
      <p className="text-lg font-medium bg-white p-4 rounded shadow">{question}</p>

      {graphImageUrl && (
        <Image
        src={graphImageUrl}
        alt="Writing Task Graph"
        width={800}
        height={300}
        className="object-contain rounded-lg m-auto pb-6"
        priority
      />
      )}

      <textarea
        placeholder={(taskType === "IELTS Writing Task 1")? "Write at least 200 words." : "Write your essay here(at least 500 words)."}
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

      {showResult && (
        <ResultPopup
          correctAnswers={1}
          total={1}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  );
};

export default WritingTask;
