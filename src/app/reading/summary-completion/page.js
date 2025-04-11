"use client";
import Header from "@/components/Header/page";
import LeftPart from "@/components/LeftPart";
import Timer from "@/components/Timer";
import React, { useEffect, useState } from "react";

function SummaryPage() {
  const [passageDataBackend, setPassageDataBackend] = useState(null);
  const [passageTitleDataBackend, setPassageTitleDataBackend] = useState(null);
  const [questionsData, setQuestionsData] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [numOfGaps, setNumOfGaps] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/reading/summary_completion`,
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
        setPassageTitleDataBackend(result.title);
        setPassageDataBackend(result.passage);
        setInstructions(result.questions.summary_completion.instruction);
        setQuestionsData(result.questions.summary_completion);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (questionsData.summary_text) {
      const gaps = (questionsData.summary_text.match(/__\d+__/g) || []).length;
      setNumOfGaps(gaps);
      setUserAnswers(new Array(gaps).fill(""));
    }
  }, [questionsData.summary_text]);

  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswerChange = (index, value) => {
    setUserAnswers((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[index] = value;
      return updatedAnswers;
    });
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", userAnswers);
    let correctAnswers = 0;
    for (let i = 0; i < userAnswers.length; i++) {
      const userAnswer = userAnswers[i]?.toLowerCase().trim();
      const correctAnswer = questionsData.answers[(i + 1).toString()]?.toLowerCase();
      if (userAnswer === correctAnswer) {
        correctAnswers++;
      }
    }
    alert(`You got ${correctAnswers} correct out of ${userAnswers.length}.`);
    setUserAnswers(new Array(numOfGaps).fill(""));
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
            {instructions && (
              <>
                <h1 className="text-2xl text-center">{instructions}</h1>
              </>
            )}
            <div className="bg-gray-400 p-4 rounded-lg shadow-md">
              <p className="font-semibold text-xl mb-2">
                {questionsData.summary_text}
              </p>
              
            </div>
            {numOfGaps > 0 &&
                Array.from({ length: numOfGaps }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-400 p-4 rounded-lg shadow-md"
                  >
                    <p className="font-semibold mb-2">{`Answer ${index + 1}`}</p>
                    <input
                      type="text"
                      className="w-full p-2 rounded-md text-black"
                      placeholder={`Write your answer here...`}
                      value={userAnswers[index] || ""}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}
            <div className="flex justify-center mt-6">
              <button
                //   onClick={() => alert("Answers submitted!")}
                onClick={handleSubmit}
                className="bg-[#6B9D7AFF] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#5B956CFF]"
              >
                Submit Answers
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full  shadow-md bg-[#6B9D7AFF]">
        <Timer minutes={10} />
      </div>
    </div>
  );
}

export default SummaryPage;
