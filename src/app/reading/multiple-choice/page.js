"use client"
import Header from '@/components/Header/page'
import Timer from '@/components/Timer';
import React, { useEffect,useState } from 'react'


// Mock data (you can replace this with the actual data from your backend or API)
const passageData = {
    title: "The Importance of Conservation Efforts",
    passage: "The natural world is a precious resource that has been sustaining life for millions of years. From the towering trees in the forests to the delicate balance of the oceans, nature offers innumerable benefits that humans have often taken for granted. The degradation of the environment through deforestation, pollution, and overexploitation has become one of the greatest challenges of our time. Conservation efforts are essential for ensuring that the planet’s biodiversity remains intact, ecosystems continue to function properly, and future generations inherit a world that is capable of sustaining their needs.\n\nOne of the key reasons why conservation is so important is the preservation of biodiversity. Biodiversity refers to the variety of life on Earth, including the diversity of species, genes, and ecosystems. Each species, no matter how small or seemingly insignificant, plays a vital role in maintaining the balance of the ecosystem. The loss of biodiversity due to habitat destruction or climate change can have devastating effects on the environment and human health. For example, the extinction of pollinators like bees threatens the survival of many crops and plants, which could lead to food shortages.\n\nAnother aspect of conservation is the protection of endangered species. Many animals and plants are at risk of extinction due to human activities such as poaching, illegal logging, and habitat destruction. In some cases, species that are critical to maintaining ecological balance are being lost at alarming rates. The black rhinoceros, for example, has faced a dramatic decline in numbers due to poaching for its horn. Conservation programs have been implemented to protect these species and preserve their natural habitats, but more work is needed to ensure their survival.\n\nClimate change is also a significant threat to the environment and wildlife. Rising global temperatures have led to the melting of polar ice caps and the acidification of oceans. These changes affect not only marine life but also land-based species, as their habitats and food sources are altered. Coral reefs, which are some of the most biodiverse ecosystems on the planet, are being destroyed due to ocean acidification and rising temperatures. Efforts to mitigate climate change by reducing greenhouse gas emissions and adopting renewable energy sources are critical for the health of the planet.\n\nConservation is not limited to protecting animals and plants; it also includes the protection of ecosystems. Forests, wetlands, and grasslands are critical for maintaining the balance of the environment. Forests, for example, act as carbon sinks by absorbing large amounts of carbon dioxide, helping to reduce the effects of climate change. Wetlands filter water and provide habitat for countless species, while grasslands support the grazing animals that many predators depend on. The loss of these ecosystems can have cascading effects on the entire food chain, ultimately affecting human populations as well.\n\nIn addition to its environmental benefits, conservation also has economic and social value. Healthy ecosystems provide services that humans rely on, such as clean water, fertile soil, and a stable climate. The tourism industry, which relies on the beauty and biodiversity of natural environments, generates billions of dollars each year. Moreover, many indigenous communities around the world rely on their natural surroundings for sustenance and cultural practices. Conservation ensures that these communities can continue to thrive while preserving their way of life.\n\nDespite the overwhelming evidence of the importance of conservation, there are still significant challenges to overcome. Governments and organizations must work together to implement effective conservation policies and strategies. This includes enacting and enforcing laws that protect wildlife and habitats, providing funding for research and education, and fostering public awareness of the issue. It also requires addressing the root causes of environmental degradation, such as overconsumption, waste, and unsustainable agricultural practices.\n\nThe involvement of local communities in conservation efforts is crucial. Many of the most successful conservation projects have been community-led, with local people taking the initiative to protect their environment. Empowering communities to be active participants in conservation allows for more sustainable and effective solutions. Involving indigenous knowledge and practices can also provide valuable insights into how ecosystems have been managed for centuries.\n\nThe fight for conservation is far from over, but there is hope. Around the world, there are countless individuals, organizations, and governments working together to protect the environment. While the challenges are great, the potential benefits of successful conservation are even greater. A world that is rich in biodiversity, free from pollution, and capable of sustaining future generations is within reach if we act now.\n\nDespite the overwhelming evidence of the importance of conservation, there are still significant challenges to overcome. Governments and organizations must work together to implement effective conservation policies and strategies. This includes enacting and enforcing laws that protect wildlife and habitats, providing funding for research and education, and fostering public awareness of the issue. It also requires addressing the root causes of environmental degradation, such as overconsumption, waste, and unsustainable agricultural practices.\n\nThe involvement of local communities in conservation efforts is crucial. Many of the most successful conservation projects have been community-led, with local people taking the initiative to protect their environment. Empowering communities to be active participants in conservation allows for more sustainable and effective solutions. Involving indigenous knowledge and practices can also provide valuable insights into how ecosystems have been managed for centuries.\n\nThe fight for conservation is far from over, but there is hope. Around the world, there are countless individuals, organizations, and governments working together to protect the environment. While the challenges are great, the potential benefits of successful conservation are even greater. A world that is rich in biodiversity, free from pollution, and capable of sustaining future generations is within reach if we act now.",
};

// const questionsData = [
//     {
//         id: 1,
//         question: "What is the main reason for conservation efforts?",
//         options: [
//             "a) To reduce pollution",
//             "b) To preserve biodiversity",
//             "c) To create jobs",
//             "d) To increase industrialization",
//         ],
//         answer: "b) To preserve biodiversity",
//     },
//     {
//         id: 2,
//         question: "Which of the following is a key threat to marine life?",
//         options: [
//             "a) Deforestation",
//             "b) Ocean acidification",
//             "c) Overfishing",
//             "d) Both b and c",
//         ],
//         answer: "d) Both b and c",
//     },
//     {
//         id: 3,
//         question: "What is the primary benefit of wetlands?",
//         options: [
//             "a) They help reduce global warming",
//             "b) They provide habitat for many species",
//             "c) They support large grazing animals",
//             "d) They help in the destruction of coral reefs",
//         ],
//         answer: "b) They provide habitat for many species",
//     },
//     {
//         id: 4,
//         question: "Which species is mentioned as endangered due to poaching?",
//         options: ["a) Polar bears", "b) Black rhinoceros", "c) Blue whale", "d) Golden eagle"],
//         answer: "b) Black rhinoceros",
//     },
//     {
//         id: 5,
//         question: "What role do forests play in combating climate change?",
//         options: [
//             "a) They act as carbon sinks",
//             "b) They support biodiversity",
//             "c) They increase atmospheric carbon dioxide",
//             "d) They create forest fires",
//         ],
//         answer: "a) They act as carbon sinks",
//     },
//     {
//         id: 6,
//         question: "Which type of ecosystems are threatened by climate change?",
//         options: ["a) Wetlands", "b) Forests", "c) Coral reefs", "d) All of the above"],
//         answer: "d) All of the above",
//     },
//     {
//         id: 7,
//         question: "What is the main challenge faced by conservation efforts?",
//         options: [
//             "a) Lack of interest from governments",
//             "b) Overconsumption and unsustainable practices",
//             "c) Lack of biodiversity",
//             "d) High costs of conservation projects",
//         ],
//         answer: "b) Overconsumption and unsustainable practices",
//     },
//     {
//         id: 8,
//         question: "Why is it important to involve local communities in conservation?",
//         options: [
//             "a) To increase government funding",
//             "b) To ensure sustainable and effective solutions",
//             "c) To create job opportunities",
//             "d) To control local populations",
//         ],
//         answer: "b) To ensure sustainable and effective solutions",
//     },
//     {
//         id: 9,
//         question: "What is the economic value of conservation?",
//         options: [
//             "a) Higher government taxes",
//             "b) Creation of more industrial jobs",
//             "c) Preservation of services like clean water and fertile soil",
//             "d) Decreased spending on healthcare",
//         ],
//         answer: "c) Preservation of services like clean water and fertile soil",
//     },
//     {
//         id: 10,
//         question: "What is a key strategy for successful conservation?",
//         options: [
//             "a) Fostering public awareness",
//             "b) Cutting down more trees",
//             "c) Increasing industrial development",
//             "d) Reducing tourism activities",
//         ],
//         answer: "a) Fostering public awareness",
//     },
//     // Add more questions as needed...
// ];



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
              <div className="flex-1 overflow-auto p-4 border-r-2 border-gray-300 scrollbar-vanish-subBranch">
                  <h2 className="text-xl font-semibold mb-4">{passageTitleDataBackend}</h2>
                  <div className="text-justify">{passageDataBackend}</div>
              </div>

              {/* Right side - Questions */}
              <div className="flex-1 overflow-auto p-4 scrollbar-vanish-subBranch">
                  <div className="space-y-4">
                      {questionsData.map((question,index) => (
                          <div key={index} className="bg-gray-400 p-4 rounded-lg shadow-md">
                              <p className="font-semibold mb-2">{question.question_text}</p>
                              <div className="space-y-2">
                                  {question.options.map((option, index) => (
                                      <label key={index} className="block">
                                          <input
                                              type="radio"
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
          <div className="fixed bottom-0 w-full  shadow-md bg-[#253D2C]">
              <Timer minutes={5} />
          </div>
      </div>
  );
}


