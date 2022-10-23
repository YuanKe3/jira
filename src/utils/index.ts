import { useEffect, useRef, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

// 在函数里，改变传入的对象是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // TODO: 依赖项里加上 callback 会造成无限循环，这个和 useCallback 以及 useMemo 有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index = 0) => setValue(value.slice(index + 1))
  }
}

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  // useRef 可以保存某一数据的初始值，且在全部周期函数中都不会变化
  const oldTitle = useRef(document.title).current
  // 页面加载时，oldTitle === 旧 title 'React App'
  // 加载后，oldTitle === 新 title
  useEffect(() => {
    document.title = title
  }, [title])
  // 页面卸载时，如果 keepOnmount 为 false，则保留标题
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 如果不指定依赖，读到的就是旧 title
        document.title = oldTitle
      }
    }
  }, [keepOnUnmount, oldTitle])
}

export const resetRoute = () => (window.location.href = window.location.origin)
