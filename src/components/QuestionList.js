import React , {useEffect , useState} from "react";
import QuestionItem from "./QuestionItem";
function QuestionList() {
 let [questionData , setQuestionsData] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(question => setQuestionsData(question))
  }, [questionData])

  function handleUpdateQuestion(editeQuestion){
    const updatedQuestions = questionData.map((question) =>
    question.id === editeQuestion.id ? editeQuestion: question
  );
  setQuestionsData(updatedQuestions);
  }
  function handelDeleteQuestion(deletQuestion){
    const updateQuestions = questionData.filter((question) => question.id !== deletQuestion.id) 
    setQuestionsData(updateQuestions)
  }
 
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul> 
      {questionData.map((question) => {
      return <QuestionItem key={question.id} question={question} 
       onUpdateeQuestion={handleUpdateQuestion} onDeleteQuestion= {handelDeleteQuestion}/> 
      })

      }
       
      </ul>
    </section>
  );
}

export default QuestionList;
