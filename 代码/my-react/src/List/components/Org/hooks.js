import { useSetState, useLockFn } from "ahooks"
import orgApi from '../../../api/org.ts'
import { useCallback, useEffect, useContext, useRef } from "react"
import ListContext from '../../ListContext'

export const useOrg = () => {
  const { orgId, orgIdChange } = useContext(ListContext)
  const [state, setState] = useSetState({
    orgList: [],
    showList: []
  })

  // 点击事件  
  const onOrgClick = useCallback(async (row) => {
    orgIdChange(row.id)
  }, [orgIdChange])



  // 点击是否显示和展示下一级  hook 监听异步请求，异步请求中时所有的重复请求将会无视.直到第一个请求完成
  const onOrgShow = useLockFn(useCallback(async (row) => {
    // 存在不在请求
    if (!row.children) {
      const res = await orgApi.query(row.id)
      row.children = res
      setState({
        orgList: state.orgList
      })
    }

    // 切换显示状态
    setState({
      showList: state.showList.includes(row.id)
        ? state.showList.filter(item => item !== row.id)
        : [...state.showList, row.id]
    })
  }, [setState, state.orgList, state.showList]))


  // 请求搜索
  const query = useCallback(() => {
    orgApi.query().then((res) => {
      setState({
        orgList: res
      })
    })
  }, [setState])

  useEffect(() => {
    query()
  }, [query])


  return {
    ...state,
    setState,
    orgId,
    onOrgClick,
    onOrgShow,

  }
}