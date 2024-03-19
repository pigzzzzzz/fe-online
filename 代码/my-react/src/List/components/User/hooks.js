import { useSetState, useLockFn, useDebounceFn } from "ahooks"
import userApi from '../../../api/user.ts'
import { useCallback, useEffect, useContext } from "react"
import ListContext from '../../ListContext'

export const useUser = () => {
  const [state, setState] = useSetState({ userList: [] })
  const { orgId, onLoading } = useContext(ListContext)
  // 搜索请求，hook 监听异步请求，异步请求中时所有的重复请求将会无视直到第一个请求完成
  const query = useLockFn(useCallback(async () => {
    // 开启loading
    onLoading(true)
    await userApi.query({
      orgId
    }).then((res) => {
      setState({
        userList: res
      })
      // 关闭loading
      onLoading(false)
    }).catch(() => {
      alert('内部异常')
      onLoading(false)
    })
  }, [onLoading, orgId, setState]))

  // 频繁调用 run，但只会在所有点击完成 500ms 后执行一次相关函数
  const { run } = useDebounceFn(
    (val) => {
      setState({
        name: val
      })
    },
    {
      wait: 500,
    },
  )

  // 搜素框赋值
  const searchChange = useCallback((e) => {
    setState({
      searchVal: e.target.value
    })
    run(e.target.value)
  }, [run, setState])


  // 初始请求。监听orgId变化
  useEffect(() => {
    query()
  }, [query])


  return {
    ...state,
    setState,
    searchChange
  }
}