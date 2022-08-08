import { Check, PlusCircle, Trash } from 'phosphor-react';
import { useState } from 'react';
import styles from './TaskList.module.css';

import notepad from '../assets/notepad.svg';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {

  const [taskList, setTaskList] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [countTaskCreated, setCountTaskCreated] = useState(0);
  const [countTaskComplete, setCountTaskComplete] = useState(0);

  function handleCreateNewTask() {

    if(!newTaskTitle) return;

    setTaskList([...taskList, {
        id: Math.random(),
        title: newTaskTitle,
        isComplete: false
      }
    ]);

    setCountTaskCreated(taskList.length + 1);
  }

  function handleToggleCheckbox(id: number) {
    const itemComplete = taskList.map(task => task.id === id ? {...task, isComplete: !task.isComplete} : task);
    
    handleUpdateTask(itemComplete);
    setTaskList(itemComplete);
    
  }

  function handleUpdateTask(list: Task[]) {
    const checkedTaskList = list.filter(task => task.isComplete);
    setCountTaskComplete(checkedTaskList.length);
  }

  function handleDeleteTask(id: number) {
    const updateTaskList = taskList.filter(task => task.id !== id);
    handleUpdateTask(updateTaskList);

    setTaskList(updateTaskList);
    setCountTaskCreated(taskList.length - 1);
  }

  return(
    <section className={styles.taskList}>
      <header>
        <div className={styles.inputGroup}>
          <input 
            type="text" 
            placeholder='Adicione uma nova tarefa' 
            onChange={(e) => setNewTaskTitle(e.target.value)} 
            value={newTaskTitle} 
          />
          <button 
            type="submit" 
            onClick={handleCreateNewTask}
          >
          Criar
          <PlusCircle size={18} />
          </button>
        </div>
      </header>
      <main>
        <div className={styles.taskDescription}>
          <div className={styles.taskCreated}>
            <strong>Tarefas criadas</strong>
            <span>{countTaskCreated}</span>
          </div>
          <div className={styles.taskComplete}>
            <strong>Concluídas</strong>
            <span>{countTaskComplete} {countTaskCreated !== 0 ? `de ${countTaskCreated}` : '' }</span>
          </div>
        </div>

        <ul>
          {taskList.length !== 0 ? taskList.map(task => {
              return(
                <li key={task.id} className={`${styles.taskItem}${task.isComplete ? ' ' + styles.completed : ''}`}>
                  <label className={styles.checkboxContainer}>
                    <input 
                      type="checkbox" 
                      checked={task.isComplete} 
                      onChange={() => handleToggleCheckbox(task.id)}
                    />
                    <span className={styles.checkmark}>
                      <Check size={12} />
                    </span>
                  </label>
                  <p>{task.title}</p>
                  <button 
                    className={styles.taskDelete}
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <Trash size={16} />
                  </button>
              </li>
              )
            }) : (
              <div className={styles.mensage}>
                <img src={notepad} alt="" />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            )}
        </ul>
      </main>
    </section>
  );
}