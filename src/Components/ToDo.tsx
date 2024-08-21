import { useState, Fragment } from 'react'
import './ToDo.css'

export default function ToDo() {
  const [items, setItems] = useState<Array<ToDoItem>>([])

  function addItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newItem: ToDoItem = {
      task: e.currentTarget.task.value,
      done: false,
    }
    setItems([newItem, ...items])
  }

  function setDone(index: number) {
    return () => {
      setItems(items.map((item, i) => {
        if (index === i) {
          item.done = true
        }
        return item
      }))
    }
  }

  function removeItem(index: number) {
    return () => {
      setItems(items.filter((_, i) => index != i))
    }
  }

  function removeAllItems() {
    return () => {
      setItems([])
    }
  }

  return (
    <>
      <h1>To-Do</h1>
      <form name='add-todo' onSubmit={addItem}>
        <h2>Create new item</h2>
        <label htmlFor='task'>Task</label>
        <input type='text' name='task' id='task' required></input>
        <button type='submit'>Add to list</button>
      </form>
      <h2>
        <button onClick={removeAllItems()}>Remove all</button>
        Items
      </h2>
      <dl>
        {
          items.map((item, i) => (
            <Fragment key={i}>
              <dt className={item.done ? "done" : "" }>
                {item.task}
              </dt>
              <dd>
                <button onClick={setDone(i)}>Done</button>
                <button onClick={removeItem(i)}>Remove</button>
              </dd>
            </Fragment>
          ))
        }
      </dl>
      <section>
        <p>Done: {items.filter(item => item.done).length}</p>
        <p>Total: {items.length}</p>
      </section>
    </>
  )
}

interface ToDoItem {
    task: string
    done: boolean
}
