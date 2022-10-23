import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useDebounce, useDocumentTitle } from 'utils'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { useProjectsSearchParams } from './util'

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)
  // 项目名称以及其负责人 id
  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200))
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

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`
