import useHttp from "../../customHooks/useHttp";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();
  const createNewTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };
  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: "https://react-https-bfa5d-default-rtdb.firebaseio.com/tasks.json",
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: taskText },
      },
      createNewTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
