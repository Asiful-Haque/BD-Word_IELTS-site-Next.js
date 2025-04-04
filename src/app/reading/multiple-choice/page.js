"use client"
import Header from '@/components/Header/page'
import LeftPart from '@/components/LeftPart';
import Timer from '@/components/Timer';
import React, { useEffect,useState } from 'react'


export default function MultipleChoicePage() {
    const [passageDataBackend, setPassageDataBackend] = useState(null);
    const [passageTitleDataBackend, setPassageTitleDataBackend] = useState(null);
    const [questionsData, setQuestionsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reading/multiple_choice`, {
                    method: 'GET',
                    cache: 'no-store',
                });
                if (!response.ok) {
                    throw new Error('Error fetching Word');
                }
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

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleOptionChange = (questionId, selectedOption) => {
    const existingAnswers = selectedAnswers[questionId] || [];
    const isSelected = existingAnswers.includes(selectedOption);
    let updatedAnswers;
    if (isSelected) {
      // Remove option
      updatedAnswers = existingAnswers.filter((opt) => opt !== selectedOption);
    } else {
      // Add option - Its not set as state..thats why it will not re-render but still update the value of the array
      updatedAnswers = [...existingAnswers, selectedOption];
    }
  
    setSelectedAnswers({
      ...selectedAnswers, //It will make re-render with the new created object as it is sent as reference value
      [questionId]: updatedAnswers,
    });
  };

  return (
      <div className="h-screen flex flex-col">
          <Header />
          <div className="flex flex-1 h-screen p-4 bg-[#CFFFDC] pb-26">
              {/* Left side - Passage */}
              <LeftPart title={passageTitleDataBackend} passage={passageDataBackend}/>

              {/* Right side - Questions */}
              <div className="flex-1 overflow-auto p-4 scrollbar-vanish-subBranch">
                  <div className="space-y-4">
                  <h1 className="text-3xl text-center font-bold">Select Appropriate Option</h1>
                      {questionsData.map((question,index) => (
                          <div key={index} className="bg-gray-400 p-4 rounded-lg shadow-md">
                              <p className="font-semibold mb-2">{question.question_text}</p>
                              <div className="space-y-2">
                                  {question.options.map((option, index) => (
                                      <label key={index} className="block">
                                          <input
                                              type="checkbox"
                                              name={`question_${question.question_id}`}
                                              value={option}
                                              checked={selectedAnswers[question.question_id]?.includes(option) || false}
                                              onChange={() =>
                                                  handleOptionChange(question.question_id, option)
                                              }
                                              className="mr-2"
                                          />
                                          {option}
                                      </label>
                                  ))}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
          <div className="fixed bottom-0 w-full shadow-md bg-[#6B9D7AFF]">
              <Timer minutes={5} />
          </div>
      </div>
  );
}


