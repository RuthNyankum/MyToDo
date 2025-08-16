import React, { useEffect, useState } from 'react';
import Styles from '../component/form.module.css';
import TaskItems from './TaskItems';
import axios from 'axios';

function Form() {
  const [activeTab, setActiveTab] = useState('Today');
  const tabs = ['Today', 'Pending', 'Completed'];
  const [task, setTask] = useState([]); //entire task
  const [newTask, setNewTask] = useState(''); //individual task

  function handleSubmit(event) {
    event.preventDefault();
    if (newTask.trim() === '') return;

    const taskToAdd = { text: newTask, completed: false };
    //taskToAdd – it creates an object with the new task's text

    axios
      .post('http://localhost:5000/tasks', taskToAdd)
      .then((res) => {
        setTask([...task, res.data]);
        setNewTask('');
      })
      .catch((err) => console.log('Error adding task:', err));
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/tasks');
        setTask(res.data);
      } catch (err) {
        console.log('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, []);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setTask(task.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.log('Error deleting a task:', err));
  }

  async function handleEdit(id, updatedText) {
    try {
      const res = await axios.put(`http://localhost:5000/tasks/${id}`, {
        id,
        text: updatedText,
      });
      setTask(task.map((todo) => (todo.id === id ? res.data : todo)));
    } catch (error) {
      console.log('Error updating task:', error);
    }
  }

  async function handleToggle(id, newStatus) {
    try {
      const res = await axios.put(`http://localhost:5000/tasks/${id}`, {
        id,
        text: task.find((t) => t.id === id).text,
        completed: newStatus,
      });
      setTask(task.map((todo) => (todo.id === id ? res.data : todo)));
    } catch (err) {
      console.log('Error toggling task:', err);
    }
  }

  const filteredTasks = task.filter((todo) => {
    if (activeTab === 'Completed') return todo.completed; // done
    if (activeTab === 'Pending') return !todo.completed; // still not done
    // if (activeTab === 'Today') return !todo.completed; // show only unfinished
    return true;
  });

  return (
    <div>
      <div className={Styles.formHeader}>
        <div className={Styles.tabContainer}>
          {tabs.map((tab) => (
            <h2
              key={tab}
              className={`${Styles.tab} ${
                activeTab === tab ? Styles.active : ''
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </h2>
          ))}
        </div>
      </div>

      <form
        className={Styles.addForm}
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <input
          type="text"
          placeholder="Add a task"
          className={Styles.addInput}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className={Styles.addBtn}>
          Add
        </button>
      </form>

      <div className={Styles.taskListContainer}>
        {filteredTasks.map((todo) => (
          <TaskItems
            key={todo.id}
            taskText={todo.text}
            taskId={todo.id}
            completed={todo.completed}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default Form;
