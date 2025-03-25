import Header from "@/components/Header/page";
import React from "react";
import Question_Types from "@/components/Question_types/page";

function Reading() {
    const parts = ["True/False/Not-Given", "Multiple Choice", "Note Completion", "Table Completion", "Short Answer","Matching Information", "Yes/No/Not-Given", "List Selection", "Summary Completion", "List of Heading"];
  return (
    <div className="relative w-full h-screen">
      <Header />
      <Question_Types sec_name="Reading" parts={parts} />
    </div>
  );
}

export default Reading;
