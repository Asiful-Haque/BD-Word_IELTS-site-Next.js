"use client";
import Header from "@/components/Header/page";
import LeftPart from "@/components/LeftPart";
import Timer from "@/components/Timer";
import React, { useState, useEffect } from "react";

function ListSelectionPage() {
  const [passageDataBackend, setPassageDataBackend] = useState(null);
  const [passageTitleDataBackend, setPassageTitleDataBackend] = useState(null);
  const [questionsData, setQuestionsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/reading/list_selection`,
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
        setQuestionsData(result.questions.list_selection);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  const [userAnswers, setUserAnswers] = useState(["", "", "", "", ""]); 

  // Handle the answer change for each input field
  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = value;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    for (let i = 0; i < userAnswers.length; i++) {
      const userAnswer = userAnswers[i]?.toLowerCase().trim();
      const correctAnswer = questionsData.correct_options[i]?.toLowerCase();
      if (userAnswer === correctAnswer) {
        correctAnswers++;
      }
    }
    alert(`You got ${correctAnswers} correct out of ${userAnswers.length}.`);
    setUserAnswers(["", "", "", "", ""]);
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
            <h1 className="text-3xl text-center font-bold">
              {questionsData.question_text}
            </h1>
            {/* Display the options */}
            <div className="space-y-4">
              {questionsData.options?.map((option, index) => (
                <div key={index} className="bg-gray-400 p-4 rounded-lg shadow-md">
                  <p className="font-semibold mb-2">{option}</p>
                </div>
              ))}
            </div>

            {/* 5 input fields to collect answers */}
            <div className="space-y-4 mt-6">
              <h3 className="text-xl font-semibold">Enter Your Answers:</h3>
              {userAnswers.map((answer, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => {
                        const newAnswer = e.target.value.toUpperCase(); 
                        if (newAnswer && !userAnswers.includes(newAnswer) && newAnswer.length === 1) {
                          handleAnswerChange(index, newAnswer);
                        } else if (!newAnswer) {
                          handleAnswerChange(index, ''); 
                        }
                      }}
                    maxLength={1} // Limiting the input to a single character
                    className="border p-2 rounded-md w-22 text-center"
                    placeholder={`Answer ${index + 1}`}
                  />
                </div>
              ))}
            </div>

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
        <Timer minutes={10} />
      </div>
    </div>
  );
}

export default ListSelectionPage;
