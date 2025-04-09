"use client";
import Header from "@/components/Header/page";
import LeftPart from "@/components/LeftPart";
import Timer from "@/components/Timer";
import React, { useState, useEffect } from "react";

function ListOfHeadingPage() {
  const [passageDataBackend, setPassageDataBackend] = useState(null);
  const [passageTitleDataBackend, setPassageTitleDataBackend] = useState(null);
  const [questionsData, setQuestionsData] = useState([]);
  const [randomParagraphs, setRandomParagraphs] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/reading/list_of_headings`,
          {
            method: "GET",
            cache: "no-store",
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        const result = data.result;
        setPassageDataBackend(result.passage);
        setPassageTitleDataBackend(result.title);
        setQuestionsData(result.questions.list_of_headings);

        // Get random 5 paragraphs
        const selected = getRandomParagraphs(result.questions.list_of_headings.paragraphs);
        setRandomParagraphs(selected);

        // Initialize empty userAnswers
        const initialAnswers = {};
        selected.forEach((item) => {
          initialAnswers[item.question_id] = "";
        });
        setUserAnswers(initialAnswers);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const getRandomParagraphs = (arr, num = 5) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
  };

  const handleInputChange = (questionId, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: value.toUpperCase(),
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", userAnswers);
    alert("Answers submitted!");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 p-4 bg-[#CFFFDC] pb-28">
        {/* Left - Passage */}
        <LeftPart title={passageTitleDataBackend} passage={passageDataBackend} />

        {/* Right - Questions */}
        <div className="flex-1 overflow-auto p-4 scrollbar-vanish-subBranch">
          <div className="space-y-4">
            <h1 className="text-3xl text-center font-bold">
              {questionsData.instruction}
            </h1>

            {/* Show all heading options */}
            <div className="space-y-4">
              {questionsData.headings?.map((heading, index) => (
                <div key={index} className="bg-gray-400 p-4 rounded-lg shadow-md">
                  <p className="font-semibold mb-2">{heading}</p>
                </div>
              ))}
            </div>

            {/* Show 5 Random Paragraphs with Input */}
            <div className="space-y-6 mt-6">
              <h3 className="text-xl font-semibold">Match the Paragraphs:</h3>

              {randomParagraphs.map((item) => (
                <div
                  key={item.question_id}
                  className="flex items-center space-x-4 bg-gray-400 p-4 rounded shadow-md"
                >
                  <span className="font-bold text-lg">Paragraph {item.paragraph}</span>
                  <input
                    type="text"
                    maxLength={1}
                    value={userAnswers[item.question_id] || ""}
                    onChange={(e) => handleInputChange(item.question_id, e.target.value)}
                    className="border border-gray-400 p-2 rounded w-26 text-center"
                    placeholder="Write here..."
                  />
                </div>
              ))}
            </div>

            {/* Submit */}
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

      {/* Timer at Bottom */}
      <div className="fixed bottom-0 w-full shadow-md bg-[#6B9D7AFF] z-50">
        <Timer minutes={10} />
      </div>
    </div>
  );
}

export default ListOfHeadingPage;
