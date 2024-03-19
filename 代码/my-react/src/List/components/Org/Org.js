import React, { useCallback } from 'react'
import { useOrg } from './hooks'
import './Org.scss'
const Org = () => {
  const { orgList, orgId, showList, onOrgClick, onOrgShow } = useOrg()


  // 渲染树结构
  const onRender = useCallback((data) => {
    return data.map((item) => (
      <li

        key={item.id}
      >
        <div>
          <svg className={showList.includes(item.id) ? 'show' : ''}  onClick={() => {
            onOrgShow(item)
          }} viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1395"><path d="M857.088 224.256q28.672-28.672 69.12-28.672t69.12 28.672q29.696 28.672 29.696 68.608t-29.696 68.608l-382.976 380.928q-12.288 14.336-30.72 19.968t-38.912 4.608-40.448-8.704-34.304-22.016l-376.832-374.784q-29.696-28.672-29.696-68.608t29.696-68.608q14.336-14.336 32.256-21.504t36.864-7.168 37.376 7.168 32.768 21.504l313.344 309.248z" p-id="1396"></path></svg>
          <span
            onClick={() => {
              onOrgClick(item)
            }}
            className={orgId === item.id ? 'active' : ''}
          >{item.name}</span>
        </div>
        {item.children && showList.includes(item.id) && (
          <ul>
            {onRender(item.children)}
          </ul>
        )}
      </li>
    ))
  }, [orgId, showList, onOrgShow, onOrgClick])


  return (
    <div className='org'>
      <h3>部门</h3>
      <ul>
        {
          onRender(orgList)
        }

      </ul>
      {(!orgList || orgList.length === 0) && <div className='empty'>暂无数据</div>}

    </div>
  )
}

export default Org