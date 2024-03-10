import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    }
})

const todoModel = mongoose.model("todos", todoSchema)
// module.exports = todoModel;
export default todoModel