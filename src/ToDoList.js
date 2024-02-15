import {useEffect, useState} from "react";
import axios from "axios";

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");

    // загрузка задач из locarstorage при запуске приложения
    // useEffect(() => {
    //     const savedTodos = localStorage.getItem("todos");
    //     if (savedTodos) {
    //         setTodos(JSON.parse(savedTodos));
    //     }
    // }, []);
    useEffect(() => {
        fetchToDos();
    }, []);

    const fetchToDos = async () => {
        try {
            const response = await axios.get("http://localhost:8888/api/todos");
            setTodos(response.data);
        } catch (error) {
            console.error("Error fetching todos: ", error);
        }
    };

    // сохранение в localstorage при добавлении новых задач
    // useEffect(() => {
    //     localStorage.setItem("todos", JSON.stringify(todos));
    // }, [todos]);

    const handlerInputChange = (event) => setInputValue(event.target.value);

    const handleAddToDo = async() => {
        // // обрезаем пустые символы
        // if (inputValue.trim() !== "") {
        //     // добавляем новое значение в конец существующего массива
        //     setTodos([...todos, inputValue]);
        //     setInputValue("");
        // }
        try {
            await axios.post("http://localhost:8888/api/todos", {todo: inputValue});
            fetchToDos();
            setInputValue("");
        } catch (error) {
            console.error("Error adding todo: ", error);
        }
    };

    const handleDeleteToDo = async(index) => {
        // // сохранение в новый массив элементов, не соответствующих номеру переданного на удаление
        // const newTodos = todos.filter((todo, i) => i !== index);
        // setTodos(newTodos);

        try {
            await axios.delete(`http://localhost:8888/api/todos/${index}`);
            fetchToDos();
        } catch (error) {
            console.error("Error deleting todo: ", error);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">ToDo List</h1>
            <input type="text" className="form-control my-3" value={inputValue} onChange={handlerInputChange} placeholder="Enter new todo..." />
            <button className="btn btn-outline-primary my-3" onClick={handleAddToDo}>
                Save
            </button>

            <ul className="list-group mt-3">
                {todos.map((todo, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {todo}
                        <button className="btn btn-outline-danger" onClick={(() => handleDeleteToDo(index))}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
