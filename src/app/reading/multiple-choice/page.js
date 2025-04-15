"use client";
import Header from "@/components/Header/page";
import LeftPart from "@/components/LeftPart";
import Timer from "@/components/Timer";
import ResultPopup from "@/components/ResultPopUp";
import React, { useEffect, useState } from "react";

export default function MultipleChoicePage() {
  const [passageDataBackend, setPassageDataBackend] = useState(null);
  const [passageTitleDataBackend, setPassageTitleDataBackend] = useState(null);
  const [questionsData, setQuestionsData] = useState([]);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reading/multiple_choice`, {
          method: 'GET',
          cache: 'no-store',
        });
        if (!response.ok) throw new Error('Error fetching Word');

        const data = await response.json();
        const result = data.result;
        console.log("✅ Received from API:", result.questions.multiple_choice);
        setPassageTitleDataBackend(result.title);
        setPassageDataBackend(result.passage);
        setQuestionsData(result.questions.multiple_choice);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const handleOptionChange = (questionId, selectedOption) => {
    const existingAnswers = selectedAnswers[questionId] || [];
    const isSelected = existingAnswers.includes(selectedOption);
    const updatedAnswers = isSelected
      ? existingAnswers.filter(opt => opt !== selectedOption)
      : [...existingAnswers, selectedOption];

    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: updatedAnswers,
    });
  };

  const handleSubmit = () => {
    let correctCount = 0;

    for (const question of questionsData) {
      const correctOptions = question.answer?.sort();
      const userSelected = selectedAnswers[question.question_id]?.sort();

      if (
        correctOptions &&
        userSelected &&
        correctOptions.length === userSelected.length &&
        correctOptions.every((val, idx) => val === userSelected[idx])
      ) {
        correctCount++;
      }
    }

    setCorrectAnswerCount(correctCount);
    setShowResult(true);
    setSelectedAnswers({});
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 h-screen p-4 bg-[#CFFFDC] pb-26">
        {/* Left side - Passage */}
        <LeftPart title={passageTitleDataBackend} passage={passageDataBackend} />

        {/* Right side - Questions */}
        <div className="flex-1 overflow-auto p-4 scrollbar-vanish-subBranch">
          <div className="space-y-4">
            <h1 className="text-3xl text-center font-bold">Select Appropriate Option</h1>
            {questionsData.map((question, index) => (
              <div key={index} className="bg-gray-400 p-4 rounded-lg shadow-md">
                <p className="font-semibold mb-2">{question.question_text}</p>
                <div className="space-y-2">
                  {question.options.map((option, i) => (
                    <label key={i} className="block">
                      <input
                        type="checkbox"
                        name={`question_${question.question_id}`}
                        value={option}
                        checked={selectedAnswers[question.question_id]?.includes(option) || false}
                        onChange={() => handleOptionChange(question.question_id, option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                className="bg-[#6B9D7AFF] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#5B956CFF]"
              >
                Submit Answers
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full shadow-md bg-[#6B9D7AFF]">
        <Timer minutes={5} />
      </div>

      {showResult && (
        <ResultPopup
          correctAnswers={correctAnswerCount}
          total={questionsData.length}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  );
}
