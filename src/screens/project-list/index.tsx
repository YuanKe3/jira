import { useState, useEffect } from 'react'
import qs from 'qs'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { cleanObject, useDebounce, useMount } from 'utils'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  // 所有负责人
  const [users, setUsers] = useState([])
  // 项目名称以及其负责人 id
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 200)
  // 工程的列表
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(
      async response => {
        if (response.ok) {
          setList(await response.json())
        }
      }
    )
  }, [debouncedParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  )
}
