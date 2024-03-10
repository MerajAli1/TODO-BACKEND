import mongoose from "mongoose";
import express from 'express'
import todoModel from './todoSchemaDb.mjs';
import cors from 'cors'
// import { getTodos, createTodo, updateTodo, deleteTodo } from './controllers/todoController.js'
const app = express()
const PORT = process.env.PORT || 5000

const uri = "mongodb+srv://admin:admin@cluster0.45knxpu.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0"

app.use(cors());


// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Get Todos
const getTodos = async (req, res) => {
    const body = req.body
    const _id = body._id
    if (!_id) {
        res.status(404).send({ message: "Id not found" })
        return
    }
    try {
        const allTodos = await todoModel.find({ _id })
        res.status(200).send(allTodos)
    } catch (error) {
        res.status(400).send(error.message)
    }

}
const getAllTodos = async (req, res) => {
    const body = req.body
    try {
        const allTodos = await todoModel.find({})
        res.status(200).send(allTodos)
    } catch (error) {
        res.status(400).send(error.message)
    }

}

//Create Todos
const createTodo = async (req, res) => {
    const body = req.body;
    if (!body.text) {
        res.status(404).send({ message: "Error Empty Todo" })
        return
    }

    try {
        const newTodos = await todoModel.create({
            text: body.text
        })
        res.status(201).send(newTodos)
    } catch (error) {
        res.status(500).send(error.message)
    }

}


// //Update Todos
const updateTodo = async (req, res) => {
    const { id } = req.params;

    const body = req.body


    if (!id || !body.text) {
        res.status(404).send(`There is no todo with the id of ${id}`)
        return 
    }
try {
    //Check the id is valid
    const updateTodo = await todoModel.findByIdAndUpdate(id, {
        text: body.text
    }).exec();
    
    res.status(200).send(updateTodo)
} catch (error) {
    res.status(500).send(error.message)
}

}
//Delete Todos
const deleteTodo = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(404).send(`ID not found`)
        return
    }
    try {
        //Check the id is valid
        const deleteTodo = await todoModel.findOneAndDelete({ _id: id })
        res.status(200).send({ message: "Item Delete Successfully" })
    } catch (error) {
        res.status(500).send(error.message)
    }

}



//API END POINTS

//GET TODO
app.get('/todos', getAllTodos)
//Create TODO
app.post('/todos', createTodo)
//Update TODO
app.put('/todos/:id', updateTodo)
//Delete TODO
app.delete('/todos/:id', deleteTodo)


mongoose.connect(uri);
mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
mongoose.connection.on("error", (err) => console.log("MongoDB Error", err));

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON http://localhost:${PORT}`);
})
