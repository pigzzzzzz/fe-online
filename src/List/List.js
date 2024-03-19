

import React, { useMemo } from 'react'
import './List.scss'
import { useModel } from './hooks'
import Org from './components/Org'
import User from './components/User'
import ListContext from './ListContext'
const List = () => {
  const { orgId, loading, orgIdChange, onLoading } = useModel()

  const contextValues = useMemo(() => {
    return {
      orgId, orgIdChange, onLoading
    }
  }, [orgId, orgIdChange, onLoading])

  return (
    <div className='main'>
      <ListContext.Provider value={contextValues}>
        {/* OrgTree */}
        <Org></Org>
        {/* UserTable  */}
        <User></User>
      </ListContext.Provider>

      {/* loading  效果 */}
      {
        loading && <div className='loading-overlay'>
          <div className='loading-spinner'></div>
        </div>
      }
    </div>
  )
}

export default List