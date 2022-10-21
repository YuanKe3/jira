import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

// 在函数里，改变传入的对象是不好的
export const cleanObject = (object: object) => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    // @ts-ignore
    const value = result[key]
    if (isFalsy(value)) {
      // @ts-ignores
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    // 每次在 value 变化以后，设置一个定时器
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debouncedValue
}
