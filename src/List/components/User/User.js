import React, { useMemo } from 'react'
import { useUser } from './hooks'
import './User.scss'

const User = () => {
  const { userList, searchVal, name, searchChange } = useUser()

  const userData = useMemo(() => {
    return (userList || []).filter(item => item.name.indexOf(name || '') !== -1)
  }, [userList, name])

  return (
    <div className='user'>
      <div className='userSearch'>
        搜索：<input value={searchVal} onChange={searchChange}></input>
      </div>
      <table>
        <tbody>
          <tr>
            <th>姓名</th>
            <th>用户名</th>
          </tr>
          {
            (userData || []).map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.name}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {
        (!userData || userData.length === 0) && <div className='empty'>暂无数据</div>
      }
    </div>
  )
}

export default User