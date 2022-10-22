import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'
import { List } from './list'
import { SearchPanel } from './search-panel'

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
  // 自动携带 token 的 fetch 请求
  const client = useHttp()

  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParam) }).then(setList)
  }, [debouncedParam])

  useMount(() => {
    client('users').then(setUsers)
  })

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
