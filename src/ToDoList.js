import {useEffect, useState} from "react";
import axios from "axios";

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState(""); // значение в поле ввода задачи
    const [priority, setPriority] = useState("Low"); // приоритет
    const [deadline, setDeadline] = useState(""); // дедлайн
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

    const handleInputChange = (event) => setInputValue(event.target.value);

    const handlePriorityChange = (event) => setPriority(event.target.value);

    const handleDeadlineChange = (event) => setDeadline(event.target.value);

    const handleAddToDo = async () => {
        // // обрезаем пустые символы
        // if (inputValue.trim() !== "") {
        //     // добавляем новое значение в конец существующего массива
        //     setTodos([...todos, inputValue]);
        //     setInputValue("");
        // }
        try {
            await axios.post("http://localhost:8888/api/todos", {
                todo: inputValue,
                priority: priority,
                deadline: deadline,
            });
            fetchToDos();
            setInputValue("");
            setPriority("Low");
            setDeadline("");
        } catch (error) {
            console.error("Error adding todo: ", error);
        }
    };

    // const handleDeleteToDo = async(index) => {
    const handleDeleteToDo = async (id) => {
        // // сохранение в новый массив элементов, не соответствующих номеру переданного на удаление
        // const newTodos = todos.filter((todo, i) => i !== index);
        // setTodos(newTodos);

        try {
            // await axios.delete(`http://localhost:8888/api/todos/${index}`);
            await axios.delete(`http://localhost:8888/api/todos/${id}`);
            fetchToDos();
        } catch (error) {
            console.error("Error deleting todo: ", error);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">ToDo List</h1>
            <div className="form-group my-2">
                <input type="text" className="form-control my-3" value={inputValue} onChange={handleInputChange} placeholder="Enter new todo..." />
                <select value={priority} onChange={handlePriorityChange} className="form-select my-2">
                    <option value="" disabled>Choose priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <input type="datetime-local" value={deadline} onChange={handleDeadlineChange} className="form-control my-2" />
            </div>
            <button className="btn btn-outline-primary my-3" onClick={handleAddToDo}>
                Save
            </button>
            <ul className="list-group mt-3">
                {/* {todos.map((todo, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {todo}
                        <button className="btn btn-outline-danger" onClick={(() => handleDeleteToDo(index))}>
                            Delete
                        </button>
                    </li>
                ))} */}
                {todos.map((todo) => (
                    <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center pb-2">
                        <span>Name: {todo.todo}</span>|
                        <span>Priority: {todo.priority}</span>|
                        <span>Deadline: {todo.deadline}</span>

                        <button className="btn btn-outline-danger" onClick={() => handleDeleteToDo(todo._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
