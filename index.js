const express = require("express");
const app = express();
const PORT = 5000
const cors = require("cors");
const pool = require("./db")
app.use(cors());

app.use(express.json())

//Routes

//create a todo
app.post("/todos",async(req,res)=>{
try {
    const {description} = req.body;
    const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES($1) RETURNing *",
        [description]
      );
  
      res.json(newTodo.rows[0]);
} catch (error) {
   console.error(error.message)
}
})

app.listen(PORT,()=>{
    console.log(`server started on port :${PORT}`);
})