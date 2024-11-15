const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const cors=require('cors')
const routes=require('./routes/todoRoute')

const app=express();
const PORT=process.env.port || 5000

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log(`Connected`))
.catch((err)=>console.log(err))

app.use(routes)

app.listen(PORT,()=>console.log(`Listnening on Port ${PORT}`)
)