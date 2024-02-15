const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let todos = [];

app.get("/api/todos", (req, res) => {
    res.json(todos);
});

app.post("/api/todos", (req, res) => {
    const newTodo = req.body.todo;
    todos.push(newTodo);
    res.json({message: "ToDo added succesfully"});
});

app.delete("/api/todos/:index", (req, res) => {
    const index = req.params.index;
    todos.splice(index, 1);
    res.json({message: "ToDos deleted succesfully"});
});

app.listen(8888, () => {
    console.log("Server is running on https://localhost:8888");
});