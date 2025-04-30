"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [MockInterviewQuestions, setMockInterviewQuestions] = useState();
  const [activeQuestion, setActiveQuestion] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      GetInterviewDetails();
    }
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result.length === 0) {
        throw new Error("No interview data found");
      }

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      console.log(jsonMockResp);
      setMockInterviewQuestions(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionSection
          MockInterviewQuestions={MockInterviewQuestions}
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
        />
        <RecordAnswerSection
          MockInterviewQuestions={MockInterviewQuestions}
          activeQuestion={activeQuestion}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestion > 0 && (
          <Button onClick={() => setActiveQuestion(activeQuestion - 1)}>
            Previous Question
          </Button>
        )}
        {activeQuestion < MockInterviewQuestions?.length - 1 && (
          <Button onClick={() => setActiveQuestion(activeQuestion + 1)}>
            Next Question
          </Button>
        )}
        {activeQuestion === MockInterviewQuestions?.length - 1 && (
          <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
