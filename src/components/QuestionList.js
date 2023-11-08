import React , {useEffect , useState} from "react";
import QuestionItem from "./QuestionItem";
function QuestionList({questionData ,  setOnDelete, setOnUpdate}) {
  
 
  return (
    <section>
      
      <h1>Quiz Questions</h1>
      <ul> 
      {questionData.map((question) => {
      return <QuestionItem key={question.id} id={question.id}  prompt={question.prompt} answers ={question.answers}
       correctIndex={question.correctIndex}
      setOnDelete={ setOnDelete} setOnUpdate={setOnUpdate}/> 
      })

      }
       
      </ul>
    </section>
  );
}

export default QuestionList;
