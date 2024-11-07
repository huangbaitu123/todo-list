import { FilterType, useTodoListAction, useTodoListState } from './context'

export default function Input() {
  const addItem = useTodoListAction('add_item')
  const changeFilter = useTodoListAction('set_filter')
  const { filterType } = useTodoListState()
  return (
    <form
      className="flex gap-4 sm:flex-row flex-col"
      onSubmit={evt => {
        evt.preventDefault()
        // @ts-expect-error nnnnn
        const title = evt.target.elements['event'].value.trim()
        if (!title) {
          return
        }
        addItem(title)
        // @ts-expect-error nnnnn
        evt.target.reset()
      }}
    >
      <input
        type="text"
        className="flex-grow-[10] !w-auto"
        name="event"
        required
        placeholder="输入事项"
      />
      <input type="submit" className="flex-grow-[2] !w-auto" value={'添加'} />
      <select
        name="filter"
        className="flex-grow-[2] !w-auto mb-4"
        value={filterType}
        onChange={evt => {
          changeFilter(evt.target.value as FilterType)
        }}
      >
        <option value={'all'}>All</option>
        <option value={'todo'}>Todo</option>
        <option value={'doing'}>Doing</option>
        <option value={'done'}>Done</option>
      </select>
    </form>
  )
}
