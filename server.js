const express = require("express");
const cors = require("cors");
const {MongoClient, ObjectId} = require("mongodb");

const app = express();
const mongo_uri = "mongodb://127.0.0.1:27017";
const db_name = "todoListDb";
const collection_name = "todos";
// let db; // база данных
let db; // база данных

app.use(express.json());
app.use(cors());

// let todos = [];
MongoClient.connect(mongo_uri)
    .then((client) => {
        console.log("Connected to MongoDB");
        db = client.db(db_name);
    })
    .catch((error) => console.error("Error connecting to MongoDB", error));

// получение списка задач
app.get("/api/todos", async (req, res) => {
    // res.json(todos);
    try {
        const todos = await db.collection(collection_name).find().toArray();
        res.json(todos);
    } catch (error) {
        console.error("Error fetching todos: ", error);
        res.status(500).json({message: "Error fetching todos"});
    }
});

// добавление новых задач
app.post("/api/todos", async (req, res) => {
    // todos.push(newTodo);
    try {
        // const newTodo = req.body.todo;
        const {todo, priority, deadline} = req.body;
        // await db.collection(collection_name).insertOne({todo: newTodo});
        await db.collection(collection_name).insertOne({todo, priority, deadline});
        res.json({message: "ToDo added succesfully"});
    } catch (error) {
        console.error("Error adding todos: ", error);
        res.status(500).json({message: "Error adding todos"});
    }
});

// удаление
// app.delete("/api/todos/:index", (req, res) => {
app.delete("/api/todos/:id", async (req, res) => {
    // const index = req.params.index;
            // todos.splice(index, 1);
    try {
        const id = new ObjectId(req.params.id);
        await db.collection(collection_name).deleteOne({_id: id});
        res.json({message: "ToDos deleted succesfully"});
    } catch (error) {
        console.error("Error deleting todos: ", error);
        res.status(500).json({message: "Error deleting todos"});
    }
});

app.listen(8888, () => {
    console.log("Server is running on https://localhost:8888");
});
