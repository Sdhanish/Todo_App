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

module.exports.updateTodo = async(req,res)=>{
  const  {_id,text}=req.body;
  todoModel.findByIdAndUpdate(_id,{text})
  .then(()=>{
    res.send('data updated successfully')
    console.log('updated successfully')
  })
  .catch((err)=>{
    console.log(err);
    res.send(err);
  })
}
module.exports.deleteTodo = async(req,res)=>{
  const  {_id}=req.body;
  todoModel.findByIdAndDelete(_id)
  .then(()=>{
    res.send('successfully deleted')
    console.log('deleted sucessfully')
  })
  .catch((err)=>{
    console.log(err);
    res.send(err);
  })
}