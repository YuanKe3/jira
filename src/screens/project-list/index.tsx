import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'
import { List } from './list'
import { SearchPanel } from './search-panel'

export const ProjectListScreen = () => {
  // 所有负责人
  const [users, setUsers] = useState([])
  // loading 的状态
  const [isLoading, setIsLoading] = useState(false)
  // 错误状态
  const [error, setError] = useState<null | Error>(null)
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
    setIsLoading(true)
    client('projects', { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch(error => {
        setList([])
        setError(error)
      })
      .finally(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam])

  useMount(() => {
    client('users').then(setUsers)
  })

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List users={users} loading={isLoading} dataSource={list} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
