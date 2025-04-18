"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header/page";
import Timer from "@/components/Timer";

import WritingTask from "@/components/WritingTaskCommon";

export default function WritingTaskPage() {
  
    const fetchWritingTask = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/writing/part1`, {
        method: "GET",
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to fetch task");
      const data = await response.json();
      return data.result;
    };
  
    const {
      data: writingTask,
      isLoading,
      isError,
      refetch,
    } = useQuery({
      queryKey: ["writingTask"],
      queryFn: fetchWritingTask,
      enabled: false,
    });
  
    useEffect(() => {
      refetch();
    }, [refetch]);
  
  
    if (isLoading) return <div className="p-8">Loading task...</div>;
    if (isError) return <div className="p-8">Error loading task.</div>;
  
    return (
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex flex-1 h-screen p-4 bg-[#CFFFDC] pb-26 overflow-auto">
          <div className="flex-1 max-w-4xl mx-auto space-y-6">
            {writingTask && (
              <WritingTask
                taskType={writingTask.task_type}
                question={writingTask.question}
                graphImageUrl={writingTask.graph_image_url}
                topics={writingTask.topics}
              />
            )}
          </div>
        </div>
  
        <div className="fixed bottom-0 w-full shadow-md bg-[#6B9D7AFF]">
          <Timer minutes={20} />
        </div>
      </div>
    );
  }
  