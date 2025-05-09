"use client";
import Header from "@/components/Header/page";
import LeftPart from "@/components/LeftPart";
import ResultPopup from "@/components/ResultPopUp";
import Timer from "@/components/Timer";
import React, { useState, useEffect } from "react";

function NoteCompletionPage() {
  const [passageDataBackend, setPassageDataBackend] = useState(null);
  const [passageTitleDataBackend, setPassageTitleDataBackend] = useState(null);
  const [questionsData, setQuestionsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/reading/complete_the_notes`,
          {
            method: "GET",
            cache: "no-store",
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching Word");
        }
        const data = await response.json();
        const result = data.result;
        setPassageDataBackend(result.passage);
        setPassageTitleDataBackend(result.title);
        setQuestionsData(result.questions.complete_the_notes.not_more_than_two_words_answers);
        console.log("✅ Received from API:", result.questions.complete_the_notes.not_more_than_two_words_answers);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  const [userAnswers, setUserAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const [showResult, setShowResult] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

  const handleSubmit = () => {
    console.log("Submitted Answers:", userAnswers);
    let correctAnswers = 0;
    for (const [key, value] of Object.entries(userAnswers)) {
      const correctAnswer = questionsData[key - 1]?.answer?.toLowerCase();
      const userAnswer = value?.toLowerCase().trim();
      console.log("Correct Answer:", correctAnswer);
      console.log("User Answer:", userAnswer);
      if (userAnswer === correctAnswer) {
        correctAnswers++;
      }
    }
    setCorrectAnswerCount(correctAnswers);
    setShowResult(true);
    setUserAnswers({});
  };

  return (
    <div>
      <Header />
      <div className="flex flex-1 h-screen p-4 bg-[#CFFFDC] pb-26">
        {/* Left side - Passage */}
        <LeftPart
          title={passageTitleDataBackend}
          passage={passageDataBackend}
        />

        {/* Right side - Questions */}
        <div className="flex-1 overflow-auto p-4 scrollbar-vanish-subBranch">
          <div className="space-y-4">
            <h1 className="text-3xl text-center font-bold">Write Your Answer Here. (Not more than two words)</h1>
            {questionsData && questionsData.map((question, index) => (
              <div key={index} className="bg-gray-400 p-4 rounded-lg shadow-md">
                <p className="font-semibold mb-2">{question.text}</p>
                <textarea
                  className="w-full p-2 rounded-md resize-none text-black"
                  placeholder="Write your answer here..."
                  value={userAnswers[question.notes_id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(question.notes_id, e.target.value)
                  }
                />
              </div>
            ))}
            <div className="flex justify-center mt-6">
              <button 
            //   onClick={() => alert("Answers submitted!")}
              onClick={handleSubmit} 
              className="bg-[#6B9D7AFF] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#5B956CFF]">
                Submit Answers
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full  shadow-md bg-[#6B9D7AFF]">
        <Timer minutes={10} />
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

export default NoteCompletionPage;
