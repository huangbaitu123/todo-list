import React from 'react'
import { createAtomicContext, useAtomicContext, useAtomicContextMethods } from '../atomic-context'

type Status = 'todo' | 'doing' | 'done'
export type ItemType = { title: string; id: string; status: Status }

export type FilterType = 'all' | Status

function getInitValue() {
  return {
    filterType: 'all' as 'all' | Status,
    list: [] as ItemType[],
    editingId: '',
  }
}

const TodoListContext = createAtomicContext(getInitValue())

export const useTodoListStore = () => useAtomicContext(TodoListContext)
export const useTodoListValue = () => React.useMemo(getInitValue, [])
export const TodoListProvider = TodoListContext.Provider
export const useTodoListMethods = () => useAtomicContextMethods(TodoListContext)

export const useFilteredList = () => {
  const { filterType, list } = useTodoListStore()
  if (filterType === 'all') {
    return list
  }
  return list.filter(v => v.status === filterType)
}

export const useRemoveItem = () => {
  const { setList, getList } = useTodoListMethods()
  return (id: string) => {
    const list = getList()
    const newList = list.filter(v => {
      return v.id !== id
    })
    setList(newList)
  }
}

export const useSaveItem = () => {
  const { setList, getList } = useTodoListMethods()
  return (item: ItemType) => {
    const list = [...getList()]
    const index = list.findIndex(v => v.id === item.id)
    if (index === -1) {
      list.push(item)
    } else {
      list[index] = { ...item }
    }
    setList(list)
  }
}
