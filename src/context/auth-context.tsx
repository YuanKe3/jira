import * as auth from 'auth-provider'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'
import React, { ReactNode } from 'react'
import { User } from 'screens/project-list/search-panel'
import { useMount } from 'utils'
import { http } from 'utils/http'
import { useAsync } from 'utils/use-async'

interface AuthForm {
  username: string
  password: string
}

// 在首页刷新后，由于 user 初始化就是 null，所以 App.tsx 就会跳转到 unAuthenticatedApp 页面
const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

// 创建上下文
const AuthContext = React.createContext<
  | {
      user: User | null
      register: (form: AuthForm) => Promise<void>
      login: (form: AuthForm) => Promise<void>
      logout: () => void
    }
  | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

// 封装 AuthContext.Provider 组件
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser
  } = useAsync<User | null>()

  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    run(bootstrapUser())
  })

  // 当页面处于 pending 或 loading 状态时
  if (isIdle || isLoading) {
    return <FullPageLoading />
  }
  // 当 bootstrapUser 出错时
  if (isError) {
    return <FullPageErrorFallback error={error} />
  }
  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

// 使用上下文
export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 中使用')
  }
  return context
}
