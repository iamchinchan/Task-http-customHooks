import React, { useEffect, useState } from "react";
import useHttp from "./customHooks/useHttp";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const fetchTaskHandler = (taskData) => {
      const loadedTasks = [];

      for (const taskKey in taskData) {
        loadedTasks.push({ id: taskKey, text: taskData[taskKey].text });
      }
      setTasks(loadedTasks);
    };
    fetchTasks(
      {
        url: "https://react-https-bfa5d-default-rtdb.firebaseio.com/tasks.json",
      },
      fetchTaskHandler
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
