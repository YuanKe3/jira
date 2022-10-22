// 在真实环境中，如果使用 firebase 这种第三方 auth 服务的话，不需要开发者开发

import { User } from 'screens/project-list/search-panel'
const apiUrl = process.env.REACT_APP_API_URL

// token
const localStorageKey = '__auth_provider_token__'

// 获取 token
export const getToken = () => window.localStorage.getItem(localStorageKey)

// 设置 token
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

// 登录逻辑，登录成功则保存用户的 token
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(await response.json())
    }
  })
}

// 注册逻辑，注册成功则保存用户的 token
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(await response.json())
    }
  })
}

// 登出逻辑，登出成功则清除本地 token
export const logout = async () => window.localStorage.removeItem(localStorageKey)
