import React from "react";

function QuestionItem({ question , onDeleteQuestion, onUpdateeQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handelDeleteQuestion(){
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method: "DELETE"
    })
    .then(r => r.json())
    .then(deleteQuestion => onDeleteQuestion(deleteQuestion))
    
  }
    function handleUpdateQuestion() {
      fetch(`http://localhost:4000/questions/${question.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "correctIndex": question.correctIndex,
        }),
      }) .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to update question");
        }
      })
      .then((updatedQuestion) => onUpdateeQuestion(updatedQuestion))
    }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} >{options}</select>
      </label>
      <button onClick={handelDeleteQuestion}>Delete Question</button>
      <button onClick={handleUpdateQuestion}>Update Question</button>
      
    </li>
  );
}

export default QuestionItem;
