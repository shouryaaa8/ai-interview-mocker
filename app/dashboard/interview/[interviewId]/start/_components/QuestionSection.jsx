import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionSection({ MockInterviewQuestions, activeQuestion, setActiveQuestion}) {
  console.log(MockInterviewQuestions);
  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
        
    }else{
        alert('Your Browser does not support Text to Speech')
    
    }
  }
  return (
    MockInterviewQuestions && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {MockInterviewQuestions &&
            MockInterviewQuestions.map((question, index) => {
              return (
                <h1
                  key={index}
                  className={`p-2 border  rounded-full text-xs md:text-sm text-center cursor-pointer ${
                    activeQuestion == index && "bg-primary text-white"
                  }`}
                  onClick={() => setActiveQuestion(index)}
                >
                  Question #{index + 1}
                </h1>
              );
            })}
        </div>
        <h2 className="my-5 text-md md:text-lg">{MockInterviewQuestions[activeQuestion].Question===undefined? MockInterviewQuestions[activeQuestion].question:MockInterviewQuestions[activeQuestion].Question}</h2>
        <Volume2 className="cursor-pointer" onClick={()=>textToSpeech(MockInterviewQuestions[activeQuestion].Question===undefined? MockInterviewQuestions[activeQuestion].question:MockInterviewQuestions[activeQuestion].Question)} />
        <div className="p-5 border rounded-lg bg-blue-100 mt-20">
            <h2 className="flex gap-2 items-center text-primary">
                <Lightbulb />
                <strong>Note:</strong>
            </h2>
            <h2 className="text-sm text-primary my-2">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
        </div>
      </div>
    )
  );
}

export default QuestionSection;
