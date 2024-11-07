import { useFilteredList } from './context'
import { Item } from './item'

export default function List() {
  const list = useFilteredList()

  return (
    <ol className="flex flex-col gap-4 my-10">
      {list.map(item => {
        return <Item key={item.id} item={item}></Item>
      })}
      {list.length === 0 && <p className="text-gray-600">暂无</p>}
    </ol>
  )
}
