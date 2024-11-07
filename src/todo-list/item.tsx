import React from 'react'
import { ItemType, useTodoListAction, useTodoListState } from './context'

export function Item(props: { item: ItemType }) {
  const { item } = props
  const removeItem = useTodoListAction('remove_item')
  const editTitle = useTodoListAction('edit_title')
  const saveItem = useTodoListAction('save_item')
  const changeStatus = useTodoListAction('change_status')
  const state = useTodoListState()
  const [title, setTitle] = React.useState(item.title)
  const editing = state.editingId === item.id

  return (
    <li key={item.id} className="flex gap-2 items-center">
      {editing ? (
        <input
          placeholder="input event"
          value={title}
          className="!m-0"
          onChange={evt => {
            setTitle(evt.target.value)
          }}
        ></input>
      ) : (
        <span
          className={`${
            item.status === 'done'
              ? 'line-through opacity-55'
              : item.status === 'doing'
              ? 'text-green-600'
              : ''
          }`}
        >
          {item.title}{' '}
        </span>
      )}

      <button
        onClick={() => {
          if (editing) {
            saveItem({
              ...item,
              title: title || item.title,
            })
            editTitle('')
          } else {
            editTitle(item.id)
          }
        }}
        className="w-10 shrink-0 min-w-14 hover:font-bold self-stretch"
      >
        {editing ? '√' : '🖊'}
      </button>
      <button
        onClick={() => {
          if (editing) {
            editTitle('')
            setTitle(item.title)
          } else {
            removeItem(item.id)
          }
        }}
        className="shrink-0 min-w-14 text-lg hover:font-bold self-stretch"
      >
        ×
      </button>
      {!editing && (
        <button
          className="self-stretch  shrink-0 min-w-14 "
          onClick={() => {
            changeStatus(item)
          }}
        >
          {item.status}
        </button>
      )}
    </li>
  )
}
