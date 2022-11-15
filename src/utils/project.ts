import { useCallback, useEffect } from 'react'
import { Project } from 'screens/project-list/list'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { useAsync } from './use-async'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()

  const fetchProjects = useCallback(
    () => client('projects', { data: cleanObject(param || {}) }),
    [client, param]
  )

  useEffect(() => {
    // 这里的 run 函数和 fetchProjects 函数都是使用 useCallback 进行包裹的，防止进行无限循环
    run(fetchProjects(), {
      retry: fetchProjects
    })
  }, [param, fetchProjects, run])
  return result
}

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
      })
    )
  }
  return {
    mutate,
    ...asyncResult
  }
}

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'POST'
      })
    )
  }
  return {
    mutate,
    ...asyncResult
  }
}
