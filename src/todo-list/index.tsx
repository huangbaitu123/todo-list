import { TodoListProvider } from './context'
import Input from './input'
import List from './list'

export default function TodoList() {
  return (
    <TodoListProvider>
      <div>
        <h2 className="text-lg my-8">Todo List:</h2>
        <Input />
        <hr />
        <List />
      </div>
    </TodoListProvider>
  )
}
