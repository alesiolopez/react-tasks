import { createContext, useState, useEffect } from "react";
import { tasks as data } from "../data/tasks"; //con "as" le asigna un alias para poder utilizar.

//se exportan ambos individualmente para que, cuando lo importemos, sepamos a quien estamos llamando.

export const TaskContext = createContext(); //este es el nombre del contexto

export function TaskContextProvider(props) {
  //Pero este engloba al resto de componentes
  const [tasks, setTasks] = useState([]);

  //creamos el elemento
  function createTask(task) {
    setTasks([
      ...tasks,
      {
        title: task.title,
        id: tasks.length,
        description: task.description,
      },
    ]);
  }

  //eliminamos el elemento
  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  useEffect(() => {
    setTasks(data);
  }, []);

  return (
    //a partir de acá se crea el componente
    <TaskContext.Provider
      value={{
        tasks,
        deleteTask,
        createTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
