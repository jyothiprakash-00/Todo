import React, { useState } from "react";
import moment from "moment";
import { Button, Input, DatePicker, TimePicker, Modal } from "antd";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const showModal = (todo) => {
    setEditingTodo(todo);
    setTask(todo.task);
    setDate(moment(todo.date));
    setTime(moment(todo.time, "HH:mm"));
    setisModalOpen(true);
  };

  const handleAddTodo = () => {
    if (task) {
      if (editingTodo) {
        // Edit an existing todo
        const updatedTodos = todos.map((todo) =>
          todo.id === editingTodo.id
            ? { ...todo, task}
            : todo
        );
        setTodos(updatedTodos);
        setEditingTodo(null);
      } else {
        // Add a new todo
        const newTodo = {
          id: Date.now(),
          task
        };
        setTodos([...todos, newTodo]);
      }
      setTask("");
      setDate(null);
      setTime(null);
      setisModalOpen(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleCancel = () => {
    setisModalOpen(false);
    setEditingTodo(null);
    setTask("");
    setDate(null);
    setTime(null);
  };

  return (
    <div className="container-fluid p-3 mb-2 text-emphasis-info vh-200">

    <div className="App">
      <h1 style={{marginTop:'100px'}}>Todo List</h1>
      <div>
        <Button style={{width:'250px',height:'60px',borderRadius:'50%',backgroundColor:'black'}} className="addbtn" type="primary" onClick={() => setisModalOpen(true)}>
          Add Todo
          
        </Button>
      </div>


      <div className="mapitems">
      <ul class="list-group list-group-flush">
        {todos.map((todo)=>(
          <>
            {/* <li key={todo.id} class="list-group-item"></li> */}
            <li style={{backgroundColor:'black'}} class="list-group-item"><span id="spanid"><i class="bi bi-check-circle"></i></span>{todo.task}</li>
           
            <div className="d-flex">
              <Button  onClick={() => showModal(todo)}> Edit <span id="edit"><i class="bi bi-pen"></i></span></Button>
              <Button onClick={() => handleDeleteTodo(todo.id)}>  Delete <span id="delete"> <i class="bi bi-trash3-fill"></i></span></Button> 
            </div><br/>
            </>
            
        ))}

</ul>
</div>


      <Modal
      
        title={editingTodo ? "Edit Todo" : "Add Todo"}
        open={isModalOpen}
        onOk={handleAddTodo}
        onCancel={handleCancel}
      >
        <Input
       
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
       
        
      </Modal>
    </div>

    </div>
  );
}

export default App;