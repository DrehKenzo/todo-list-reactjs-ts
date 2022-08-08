import { Header } from './components/Header'
import { TaskList } from './components/TaskList'

import styles from './App.module.css'
import './global.css';

export function App() {

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <TaskList />
      </div> 
    </>
  )
}
