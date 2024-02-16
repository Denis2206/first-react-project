import {useEffect, useState} from "react";
import axios from "axios";

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState(""); // значение в поле ввода задачи
    const [priority, setPriority] = useState("Low"); // приоритет
    const [deadline, setDeadline] = useState(""); // дедлайн
    const [description, setDescription] = useState(""); // описание задачи
    const [sortPriority, setSortPriority] = useState("Low"); // сортировка по приоритету
    const [editing, setEditing] = useState(false); // открыта ли форма изменения
    const [selectedTodo, setSelectedTodo] = useState(null);//выбранная задача

    // загрузка задач из locarstorage при запуске приложения
    // useEffect(() => {
    //     const savedTodos = localStorage.getItem("todos");
    //     if (savedTodos) {
    //         setTodos(JSON.parse(savedTodos));
    //     }
    // }, []);
    useEffect(() => {
        fetchToDos();
    }, [sortPriority]);

    const fetchToDos = async () => {
        try {
            const response = await axios.get("http://localhost:8888/api/todos");
            // const sortedTodos = response.data.sort((a, b, c) => {
            //     const priorityOrder = {Low: 0, Medium: 1, High: 2};
            //     // return priorityOrder[a.priority] - priorityOrder[b.priority];
            //     // return (priorityOrder[a.priority] - priorityOrder[b.priority]) * (sortPriority === "High" ? -1 : 1);
                
            //     // if (sortPriority === "Low") {
            //     //     return priorityOrder[a.priority] - priorityOrder[b.priority] - priorityOrder[c.priority];
            //     // }
            //     // if (sortPriority === "Medium") {
            //     //     return priorityOrder[b.priority] - priorityOrder[a.priority] - priorityOrder[c.priority];
            //     // }
            //     // if (sortPriority === "High") {
            //     //     return priorityOrder[c.priority] - priorityOrder[a.priority] - priorityOrder[b.priority];
            //     // }

            //     if (sortPriority === "Low") {
            //         console.log("a " + a);
            //         console.log("b " + b);
            //         console.log("c " + c);
            //         return priorityOrder[a.priority] - priorityOrder[b.priority];                    
            //         // return 1;
            //     }
            //     if (sortPriority === "Medium") {
            //         return priorityOrder[b.priority] - priorityOrder[a.priority];
            //         // return -1;
            //     }
            //     if (sortPriority === "High") {
            //         return priorityOrder[c.priority] - priorityOrder[a.priority];
            //         // return 0;
            //     }
                
            //     // return (priorityOrder[a.priority] - priorityOrder[b.priority]) * (sortPriority === "High" ? -1 : 1);
            // });
            // setTodos(response.data);
            // const unSortedTodos = response.data;
            // console.log("unSortedTodos " + unSortedTodos.map(item => item.priority));
            // console.log("unSortedTodos " + Object.values(unSortedTodos));
            // console.log("todos " + todos.map(item => item.priority));
            // if(sortPriority === "Low"){
            //     const sortedTodos = response.data.sort((a, b) => {
            //         const priorityOrder = {Low: 0, Medium: 1, High: 2};
            //         return priorityOrder[a.priority] - priorityOrder[b.priority];
            //     });
            //     setTodos(sortedTodos);
            // }
            // if(sortPriority === "Medium"){
            //     const sortedTodos = response.data.sort((a, b) => {
            //         const priorityOrder = {Low: 0, Medium: 1, High: 2};
            //         return priorityOrder[a.priority] - priorityOrder[b.priority];
            //     });
            //     setTodos(sortedTodos);
            // }
            // if(sortPriority === "High"){
            //     const sortedTodos = response.data.sort((a, b) => {
            //         const priorityOrder = {Low: 0, Medium: 1, High: 2};
            //         return priorityOrder[a.priority] - priorityOrder[b.priority];
            //     });
            //     setTodos(sortedTodos);
            // }

            const sortedTodos = response.data.sort((a, b) => {
                // if(sortPriority === "Low"){
                //     const priorityOrder = {Low: 0, Medium: 1, High: 2};
                //     return priorityOrder[a.priority] - priorityOrder[b.priority];
                // }
                // else if(sortPriority === "Medium"){
                //     const priorityOrder = {Low: 1, Medium: 0, High: 2};
                //     return priorityOrder[a.priority] - priorityOrder[b.priority];
                // }
                // else {
                //     const priorityOrder = {Low: 1, Medium: 2, High: 0};
                //     return priorityOrder[a.priority] - priorityOrder[b.priority];
                // }
                let priorityOrder;
                switch(sortPriority){
                    case "Low": priorityOrder = {Low: 0, Medium: 1, High: 2};
                    return priorityOrder[a.priority] - priorityOrder[b.priority];

                    case "Medium": priorityOrder = {Low: 1, Medium: 0, High: 2};
                    return priorityOrder[a.priority] - priorityOrder[b.priority];

                    case "High": priorityOrder = {Low: 1, Medium: 2, High: 0};
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                    
                    default: priorityOrder = {Low: 0, Medium: 0, High: 0};
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                }
            });
            setTodos(sortedTodos);

            // setTodos(sortedTodos);
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

    const handleDescriptionChange = (event) => setDescription(event.target.value);

    const handleSortPriorityChange = (event) => {
        setSortPriority(event.target.value);
        // const sortedTodos = todos.sort((a, b, c) => {
        //     const priorityOrder = {Low: 0, Medium: 1, High: 2};
        //     if(priority === "Low"){
        //         return priorityOrder[a.priority] - priorityOrder[b.priority];
        //     }
        //     else if(priority === "Medium"){
        //         return priorityOrder[b.priority] - priorityOrder[a.priority];
        //     }
        //     return priorityOrder[c.priority] - priorityOrder[a.priority];
        // });
        // setTodos(sortedTodos);
    };

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
                description: description,
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

    const handleEditToDo = (todo) => {
        setSelectedTodo(todo);
        setEditing(true);
    }

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

    // кейсы цветов в зависимости от приоритета
    const getPriorityColor = (priority) => {
        switch (priority) {
            case "Low":
                return "table-success";
            case "Medium":
                return "table-warning";
            case "High":
                return "table-danger";
            default:
                return "table-light";
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">ToDo List</h1>
            <div className="form-group my-2">
                <input type="text" className="form-control my-3" value={inputValue} onChange={handleInputChange} placeholder="Enter new todo..." />
                <select value={priority} onChange={handlePriorityChange} className="form-select my-2">
                    <option value="" disabled>
                        Choose priority
                    </option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <input type="datetime-local" value={deadline} onChange={handleDeadlineChange} className="form-control my-2" />
                <textarea value={description} onChange={handleDescriptionChange} className="form-control my-2" placeholder="Enter todo description"></textarea>
            </div>
            <button className="btn btn-outline-primary my-3" onClick={handleAddToDo}>
                Save
            </button>
            {/* <ul className="list-group mt-3"> */}
            {/* {todos.map((todo, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {todo}
                        <button className="btn btn-outline-danger" onClick={(() => handleDeleteToDo(index))}>
                            Delete
                        </button>
                    </li>
                ))} */}
            {/* {todos.map((todo) => (
                    <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center pb-2">
                        <span>Name: {todo.todo}</span>|
                        <span>Priority: {todo.priority}</span>|
                        <span>Deadline: {todo.deadline}</span>

                        <button className="btn btn-outline-danger" onClick={() => handleDeleteToDo(todo._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul> */}

            {/* сортировка по приоритету */}
            <select value={sortPriority} onChange={handleSortPriorityChange} className="form-select my-2 w-25 ms-auto">
                <option value="" disabled>
                    Choose priority
                </option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <table className="table table-sm table-hover table-group-divider table-striped-columns align-middle mt-3">
                <thead>
                    <tr className="table-info">
                        <th>Title</th>
                        <th>Description</th>
                        <th>Deadline</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo._id} className={getPriorityColor(todo.priority)}>
                            <td>{todo.todo}</td>
                            <td>{todo.description}</td>
                            <td style={{width: "20%"}}>{todo.deadline}</td>
                            <td>
                                <button className="btn btn-outline-danger" onClick={() => handleDeleteToDo(todo._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ToDoList;
