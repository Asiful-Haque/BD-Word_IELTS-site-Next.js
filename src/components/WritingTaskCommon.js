'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import WritingFeedbackPopup from "./WritingFeebackPopup";
import ErrorPopup from "./WritingFeedbackError";


const WritingTask = ({ taskType, question, graphImageUrl }) => {
  const [writingAnswer, setWritingAnswer] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [parsed, setParsed] = useState(null);
  const [loading, setLoading] = useState(false);  // Add loading state
  const [error, setError] = useState(null);  // Add state for error message
  
  const router = useRouter();  // Initialize useRouter hook

  const handleChange = (e) => {
    const text = e.target.value;
    setWritingAnswer(text);
    setWordCount(text.trim().split(/\s+/).length);
  };

  // ✅ Extracts only the content inside \boxed{...} with proper brace matching
  function extractBoxedJson(rawString) {
    const boxedStart = rawString.indexOf('\\boxed{');
    if (boxedStart === -1) return null;

    const jsonStart = boxedStart + '\\boxed{'.length;
    let braceCount = 0;
    let endIndex = -1;

    for (let i = jsonStart; i < rawString.length; i++) {
      const char = rawString[i];
      if (char === '{') {
        braceCount++;
      } else if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          endIndex = i;
          break;
        }
      }
    }

    if (endIndex === -1) return null; // unmatched braces

    const jsonString = rawString.slice(jsonStart, endIndex + 1); // inclusive of last }
    return jsonString;
  }

  const handleSubmit = async () => {
    if (wordCount > 200) {
      alert("Please write up to 200 words.");
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      const response = await fetch("/api/analyze-writing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer: writingAnswer,
          taskType,
        }),
      });

      const data = await response.json();
      console.log("AI Raw Feedback:", data.feedback);

      let jsonString = extractBoxedJson(data.feedback);
      if (!jsonString) throw new Error("Invalid or unmatched boxed format");

      console.log("Extracted JSON string:", jsonString);
      if (!jsonString.startsWith("{")) {
        jsonString = `{${jsonString}}`;
      }
      console.log("Formatted JSON string finally:", jsonString);
      const parsedResult = JSON.parse(jsonString);
      console.log("Parsed object:", parsedResult);

      setParsed(parsedResult);
      setShowResult(true); // Show result after parsing data
    } catch (err) {
      // alert("Error submitting writing.");
      // console.error("Submission Error:", err);
      setError("An error occurred while submitting your writing. Please try again later.");
    } finally {
      setLoading(false); // Set loading state to false after the request is done
    }
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto space-y-6 pb-40 relative">
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
        placeholder={
          taskType === "IELTS Writing Task 1"
            ? "Write at least 200 words."
            : "Write your essay here (at least 500 words)."
        }
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

      {/* Tailwind Loading Spinner as Overlay */}
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="border-t-4 border-b-4 border-green-500 w-16 h-16 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Display Error Popup */}
      {error && (
        <ErrorPopup
          message={error}
          onClose={() => setError(null)}  // Close the error popup
        />
      )}

      {showResult && parsed && (
        <WritingFeedbackPopup
          score={parsed.score}
          feedback={parsed.feedback}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  );
};

export default WritingTask;
