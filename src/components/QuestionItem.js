import React from "react";

function QuestionItem({ id, prompt, answers, correctIndex  , setOnDelete, setOnUpdate }) {


  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} >{options}</select>
      </label>
      <button onClick={() => setOnDelete(id)}>Delete Question</button>
      <button onClick={() => setOnUpdate(id)}>Update Question</button>
      
    </li>
  );
}

export default QuestionItem;
