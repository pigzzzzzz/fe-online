import { useSetState } from "ahooks"
import { useCallback } from "react"

export const useModel = () => {
  const [state, setState] = useSetState({
    orgId: ''  //选中的orgID
  })


  // org点击确认事件
  const orgIdChange = useCallback((id) => {
    setState({
      orgId: id
    })
  }, [setState])

  // loading效果
  const onLoading = useCallback((val) => {
    setState({
      loading: val
    })
  }, [setState])


  return {
    ...state,
    setState,
    orgIdChange,
    onLoading
  }
}