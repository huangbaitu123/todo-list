import React from 'react'
import { ItemType, useRemoveItem, useSaveItem, useTodoListStore } from './context'

export function Item(props: { item: ItemType }) {
  const { item } = props
  const removeItem = useRemoveItem()
  const { editingId, setEditingId } = useTodoListStore()
  const saveItem = useSaveItem()

  const [title, setTitle] = React.useState(item.title)
  const editing = editingId === item.id

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
            setEditingId('')
          } else {
            setEditingId(item.id)
          }
        }}
        className="w-10 shrink-0 min-w-14 hover:font-bold self-stretch"
      >
        {editing ? '√' : '🖊'}
      </button>
      <button
        onClick={() => {
          if (editing) {
            setEditingId('')
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
            saveItem({
              ...item,
              status:
                item.status === 'todo' ? 'doing' : item.status === 'doing' ? 'done' : item.status,
            })
          }}
        >
          {item.status}
        </button>
      )}
    </li>
  )
}
