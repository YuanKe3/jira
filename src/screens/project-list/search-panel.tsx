export interface User {
  id: string
  name: string
  email: string
  title: string
  organization: string
}

interface SearchPanelProps {
  users: User[]
  param: {
    name: string
    personId: string
  }
  setParam: (param: SearchPanelProps['param']) => void
}

/**
 * input 框及负责人的 select 框
 */
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <form>
      <input
        type='text'
        value={param.name}
        onChange={evt =>
          setParam({
            ...param,
            name: evt.target.value
          })
        }
      />
      <select
        value={param.personId}
        onChange={evt =>
          setParam({
            ...param,
            personId: evt.target.value
          })
        }>
        <option value={''}>负责人</option>
        {users.map(user => (
          <option value={user.id} key={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  )
}
