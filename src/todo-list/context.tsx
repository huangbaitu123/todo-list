import React, { Dispatch, PropsWithChildren } from 'react'

type Status = 'todo' | 'doing' | 'done'
export type ItemType = { title: string; id: string; status: Status }
export type FilterType = 'all' | Status

function getInitValue() {
  return {
    filterType: 'all' as FilterType,
    list: [] as ItemType[],
    editingId: '',
  }
}

type ContextValue = ReturnType<typeof getInitValue>

const TodoListContext = React.createContext<readonly [ContextValue, Dispatch<TodoListAction>]>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  null as any
)

export type TodoListAction =
  | {
      type: 'add_item'
      payload: string
    }
  | {
      type: 'remove_item'
      // aa
      payload: string
    }
  | {
      type: 'edit_title'
      payload: string
    }
  | {
      type: 'change_status'
      payload: ItemType
    }
  | {
      type: 'save_item'
      payload: ItemType
    }
  | {
      type: 'set_filter'
      payload: FilterType
    }

function todoListReducer(state = getInitValue(), { type, payload }: TodoListAction) {
  if (type === 'add_item') {
    return {
      ...state,
      list: state.list.concat({
        id: Math.random().toString(),
        title: payload,
        status: 'todo',
      }),
    }
  }
  if (type === 'remove_item') {
    return {
      ...state,
      list: state.list.filter(v => v.id !== payload),
    }
  }
  if (type === 'edit_title') {
    return {
      ...state,
      editingId: payload,
    }
  }
  if (type === 'save_item') {
    const index = state.list.findIndex(v => v.id === payload.id)
    if (index >= 0) {
      const list = [...state.list]
      list[index] = payload
      state.list = list
    }
    return { ...state }
  }
  if (type === 'change_status') {
    const index = state.list.findIndex(v => v.id === payload.id)
    if (index >= 0) {
      const list = [...state.list]
      const item = { ...state.list[index] }
      if (item.status === 'todo') {
        item.status = 'doing'
      } else if (item.status === 'doing') {
        item.status = 'done'
      }
      list[index] = item
      state.list = list
    }
    return { ...state }
  }
  if (type === 'set_filter') {
    return {
      ...state,
      filterType: payload,
    }
  }
  return state
}

export function TodoListProvider(props: PropsWithChildren) {
  const initValue = React.useMemo(getInitValue, [])
  const [state, dispatch] = React.useReducer(todoListReducer, initValue)
  const value = React.useMemo(() => [state, dispatch] as const, [state, dispatch])

  return <TodoListContext.Provider value={value}>{props.children}</TodoListContext.Provider>
}

const useTodoListContext = () => React.useContext(TodoListContext)

export const useFilteredList = () => {
  const [state] = useTodoListContext()
  if (state.filterType === 'all') {
    return state.list
  }
  return state.list.filter(v => {
    return v.status === state.filterType
  })
}

export const useTodoListAction = <A extends TodoListAction['type']>(type: A) => {
  const [, dispatch] = useTodoListContext()
  return (payload: Extract<TodoListAction, { type: A }>['payload']) => {
    return dispatch({ type, payload } as TodoListAction)
  }
}

export const useTodoListState = () => {
  const [state] = useTodoListContext()
  return state
}
