import Header from "@/components/Header/page";
import React from "react";
import Question_Types from "@/components/Question_types/page";

function Reading() {
    const parts = ["Part-1", "Part-2"];
  return (
    <div className="relative w-full h-screen">
      <Header />
      <Question_Types sec_name="Writing" parts={parts} />
    </div>
  );
}

export default Reading; 
