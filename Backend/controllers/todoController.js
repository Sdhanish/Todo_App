const todoModel=require('../models/todoModel')


module.exports.getTodo = async (req,res)=>{
  const toDo=await todoModel.find({})
  res.send(toDo);
}


module.exports.saveTodo =async(req,res)=>{
  const {text}=req.body;
  todoModel.create({text})
  .then((data)=>{
    console.log('successfully added');
    console.log(data);
    res.send(data);
  })
  .catch((err)=>{
    console.log(err);
    res.send(err);
    
  })
}

module.exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      { text },
      { new: true, runValidators: true } 
    );

    if (!updatedTodo) {
      return res.status(404).send("Todo not found");
    }

    console.log("Updated document:", updatedTodo);
    res.send("Data updated successfully");
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).send("Failed to update todo");
  }
};

module.exports.deleteTodo = async (req, res) => {
  const { id } = req.params; 

  try {
    const deletedTodo = await todoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).send("Todo not found");
    }

    res.send("Successfully deleted");
    console.log("Deleted successfully:", deletedTodo);
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).send("Failed to delete todo");
  }
};
