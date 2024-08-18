import React, { useState } from 'react';

const Tasks = () => {
  const [newTask, setNewtask] = useState('');
  return (
    <div>
      <h1>TODO List </h1>
      <form action="submit">
        <input type="text " onChange={(e) => setNewtask(e.target.value)} />
        <button>Add Task</button>
      </form>
      <ul>
        <li>
          <input type="checkbox" />
          <p>{newTask}</p>
          <button>Delete</button>
        </li>
      </ul>
    </div>
  );
};

export default Tasks;
