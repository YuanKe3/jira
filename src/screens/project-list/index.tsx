import styled from '@emotion/styled'
import { Row, Typography } from 'antd'
import { useDebounce, useDocumentTitle } from 'utils'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { useProjectsSearchParams } from './util'

export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle('项目列表', false)
  // 项目名称以及其负责人 id
  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()

  return (
    <Container>
      <Row justify={'space-between'}>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List
        projectButton={props.projectButton}
        refresh={retry}
        users={users || []}
        loading={isLoading}
        dataSource={list || []}
      />
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`
