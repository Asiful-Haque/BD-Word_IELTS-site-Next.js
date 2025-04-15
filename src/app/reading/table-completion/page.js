"use client";
import Header from "@/components/Header/page";
import LeftPart from "@/components/LeftPart";
import ResultPopup from "@/components/ResultPopUp";
import Timer from "@/components/Timer";
import React, { useEffect, useState } from "react";

function TableCompletionPage() {
  const [passageDataBackend, setPassageDataBackend] = useState(null);
  const [passageTitleDataBackend, setPassageTitleDataBackend] = useState(null);
  const [questionsData, setQuestionsData] = useState({ table: [] });
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/reading/table_completion`,
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
        console.log("✅ Received from API:", result.questions.table_completion);
        setPassageTitleDataBackend(result.title);
        setPassageDataBackend(result.passage);
        setQuestionsData(result.questions.table_completion);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

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
      const correctAnswer = questionsData.table[key - 2]?.answer?.toLowerCase();
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

  // Function to render columns that may contain fill-in-the-blank placeholders
  const renderFillInBlankColumn = (columnValue, rowId) => {
    if (columnValue && columnValue.includes("________")) {
      return (
        <p className="flex flex-wrap items-center gap-1">
          {columnValue.split("**________**").map((part, i, arr) => (
            <React.Fragment key={i}>
              <span>{part}</span>
              {i < arr.length - 1 && (
                <input
                  type="text"
                  className="border-b border-black bg-transparent text-black outline-none w-32"
                  value={userAnswers[rowId] || ""}
                  onChange={(e) => handleAnswerChange(rowId, e.target.value)}
                />
              )}
            </React.Fragment>
          ))}
        </p>
      );
    }
    return columnValue; 
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
            {questionsData.table && (
              <div className="overflow-auto">
                <table className="min-w-full border border-gray-500 text-left bg-white rounded-md shadow">
                  <thead className="bg-gray-200">
                    <tr>
                      {/* Empty first column in first row */}
                      {questionsData.table[0]?.row_id === 1 && (
                        <th className="p-2 border border-gray-400"></th>
                      )}
                      <th className="p-2 border border-gray-400">
                        {questionsData.table[0]?.column_1}
                      </th>
                      <th className="p-2 border border-gray-400">
                        {questionsData.table[0]?.column_2}
                      </th>
                      <th className="p-2 border border-gray-400">
                        {questionsData.table[0]?.column_3}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {questionsData.table.map((tab, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        {/* Skip the first row for normal row rendering, because it was used as the heading */}
                        {tab.row_id !== 1 ? (
                          <>
                            <td className="p-2 border border-gray-300 font-bold">
                              {tab.row_id}
                            </td>
                            <td className="p-2 border border-gray-300">
                              {renderFillInBlankColumn(tab.column_1, tab.row_id)}
                            </td>
                            <td className="p-2 border border-gray-300">
                              {renderFillInBlankColumn(tab.column_2, tab.row_id)}
                            </td>
                            <td className="p-2 border border-gray-300">
                              {renderFillInBlankColumn(tab.column_3, tab.row_id)}
                            </td>
                          </>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleSubmit}
                    className="bg-[#6B9D7AFF] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#5B956CFF]"
                  >
                    Submit Answers
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full shadow-md bg-[#6B9D7AFF]">
        <Timer minutes={10} />
      </div>
      {showResult && (
        <ResultPopup
          correctAnswers={correctAnswerCount}
          total={questionsData.table.length}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  );
}

export default TableCompletionPage;
