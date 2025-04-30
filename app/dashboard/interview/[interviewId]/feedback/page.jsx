"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [overallRating, setoverallRating] = useState(0);
  const router = useRouter();
  useEffect(() => {
    getFeedback();
    OverallRating();
  }, []);
  const OverallRating = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    console.log(result);
    setFeedbackList(result);
    let ans = 0;
    result.map((feedback) => {
      ans += Number(feedback.rating);
    });
    setoverallRating(ans / result.length);
  };
  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    console.log(result);
    setFeedbackList(result);
  };
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
      <h2 className="text-2xl font-bold">Here is your interview Feedback</h2>
      <h2 className="text-primary my-3 text-lg">
        Your overall interview rating: {overallRating}
      </h2>

      <h2 className="text-sm text-gray-500">
        Find below interview question with correct answer, Your answer and
        feedback for improvement
      </h2>
      {feedbackList.map((feedback, index) => (
        <Collapsible key={index} className="mt-7">
          <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
            {feedback.question} <ChevronsUpDown className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex flex-col gap-2">
              <h2 className="text-red-500 p-2 border rounded-lg ">
                <strong>Rating: </strong>
                {feedback.rating}
              </h2>
              <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                <strong>Your Answer: </strong>
                {feedback.userAns}
              </h2>
              <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                <strong>Correct Answer: </strong>
                {feedback.correctAns}
              </h2>
              <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                <strong>Feedback: </strong>
                {feedback.feedback}
              </h2>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}

      <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
}

export default Feedback;
