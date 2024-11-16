import axios from 'axios'

const baseUrl = 'http://localhost:5000'


const getAllToDo = (setToDos) =>{
axios.get(baseUrl)
.then((response)=>{
  console.log(response.data);
  setToDos(response.data);
  
})
}

const addTodo = ({ text, setText, setTodos }) => {
  axios.post(`${baseUrl}/save`, { text }).then((data) => {
    console.log(data);
    setText(""); // Clear the input field
    getAllToDo(setTodos); // Refresh the list
  }).catch((err)=>console.log(err)
  )
};
const updateTodo = async ({ toDoId, text, setToDos, setText, setIsUpdating }) => {
  try {
    const response = await axios.put(`${baseUrl}/update/${toDoId}`, { text }); // Ensure correct base URL
    console.log("Todo updated:", response.data);
    setToDos((prev) =>
      prev.map((todo) => (todo._id === toDoId ? { ...todo, text } : todo))
    );
    setText("");
    setIsUpdating(false);
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

const deleteTodo = ({ _id, setToDos}) => {
  axios
    .delete(`${baseUrl}/delete/${_id}`, { _id})
    .then((response) => {
      console.log("Delete successful:", response.data);

      getAllToDo(setToDos); // Refresh list
    })
    .catch((err) => console.error("Error updating todo:", err));
};



export {getAllToDo,addTodo,updateTodo,deleteTodo}