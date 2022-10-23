import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject } from 'utils'

/**
 * 返回页面 url 中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams()
  return [
    // 传入 ['name', 'age'] 这样的参数，返回 { name: 'zhangsan', age: 18 } 这样的值
    useMemo(
      () =>
        keys.reduce(
          (prev, key) => ({
            ...prev,
            [key]: searchParams.get(key) || ''
          }),
          {} as { [key in K]: string }
        ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      // iterator
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params
      }) as URLSearchParamsInit
      return setSearchParam(o)
    }
  ] as const
}
