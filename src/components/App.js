import React, { useEffect,useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionData , setQuestionsData] = useState([]);
  const [input, setInput] = useState(0)
 

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((question) => setQuestionsData(question))
  }, [])

  
  function handldeReomveInput(e){
    setInput(e.target.value)
  }
  function handleOnDelete(id){
    const deleteQestion = questionData.filter(question => question.id === id)

    fetch(`http://localhost:4000/questions/${input}`, {
      method :"DELETE"
    })
    .then((r) => r.json())
    .then(() => setQuestionsData(deleteQestion))

  }
  function handleUpdateQuestion(id, correctIndex){
    const updatedQuestion = questionData.map((question) =>
    question.id === id ? fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "correctIndex": question.correctIndex}),
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Question with ID ${id} updated to ${correctIndex}.`);
        } else {
          console.error(`Failed to update question correct index with ID ${id}.`);
        }
      })
      .catch((error) => console.error("Error updating question correct Index :", error)) : question
  );


  
    setQuestionsData(updatedQuestion);
};
  function handelDeleteQuestion(id){

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log(`Question with ID ${id} deleted.`);
        
        const updatedQuestion = questionData.filter((question) => question.id !== id);
        setQuestionsData(updatedQuestion);
      })
      .catch((error) => console.error("Error deleting question:", error));
  }
  function handleAddQuestion(newQuestion){
 setQuestionsData([...questionData , newQuestion])
  }
  return (
    <main>
       <input type="text" value={input} onChange={handldeReomveInput} />
      <button onClick={handleOnDelete}>remove</button>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm AddQuestion={handleAddQuestion} /> : <QuestionList questionData={questionData}  setOnDelete={handelDeleteQuestion} setOnUpdate={handleUpdateQuestion} />}
    </main>
  );
}

export default App;
