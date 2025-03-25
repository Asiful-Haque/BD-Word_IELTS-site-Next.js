import Header from "@/components/Header/page";
import React from "react";
import Question_Types from "@/components/Question_types/page";

function Listening() {
    const parts = ["Multiple Choice", "Sentence Completion", "Summary Completion","Yes/No/Not-Given", "List of Heading"];
  return (
    <div className="relative w-full h-screen">
      <Header />
      <Question_Types sec_name="Listening" parts={parts} />
    </div>
  );
}

export default Listening;
