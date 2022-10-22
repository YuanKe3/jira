import React, { ReactNode } from 'react'
import { useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'

interface AuthForm {
  username: string
  password: string
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
  const [user, setUser] = useState<User | null>(null)
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))
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
