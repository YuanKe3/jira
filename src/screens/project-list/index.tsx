import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useState } from 'react'
import { useDebounce } from 'utils'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { List } from './list'
import { SearchPanel } from './search-panel'

export const ProjectListScreen = () => {
  // 项目名称以及其负责人 id
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 200)
  // 自动携带 token 的 fetch 请求
  const { isLoading, error, data: list } = useProjects(debouncedParam)
  const { data: users } = useUsers()

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List users={users || []} loading={isLoading} dataSource={list || []} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
