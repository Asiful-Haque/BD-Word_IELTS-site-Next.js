import React, { useState } from "react";
import ResultPopup from "@/components/ResultPopUp";

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
    if (wordCount < 200) {
      alert("Please write at least 200 words.");
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
        <img
          src={graphImageUrl}
          alt="Writing Task Graph"
          className="w-full max-w-3xl mx-auto rounded-lg shadow-md"
        />
      )}

      {topics && (
        <div className="space-x-2">
          {topics.map((topic, index) => (
            <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              {topic}
            </span>
          ))}
        </div>
      )}

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
