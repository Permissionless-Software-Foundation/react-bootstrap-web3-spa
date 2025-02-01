/*
  This Body component is a container for all the different Views of the app.
  Views are equivalent to 'pages' in a multi-page app. Views are hidden or
  displayed to simulate the use of pages in an SPA.
  The Body app contains all the Views and chooses which to show, based on
  the state of the Menu component.
*/

// Global npm libraries
import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Local libraries
import GetBalance from './balance'
import Placeholder2 from './placeholder2'
import Placeholder3 from './placeholder3'
import ServerSelectView from './servers/select-server-view'
import SelectServerButton from './servers/select-server-button'

function AppBody (props) {
  // Dependency injection through props
  const appData = props.appData

  return (
    <>
      <Routes>
        <Route path='/' element={<GetBalance wallet={appData.wallet} />} />
        <Route path='/balance' element={<GetBalance wallet={appData.wallet} />} />
        <Route path='/placeholder2' element={<Placeholder2 />} />
        <Route path='/placeholder3' element={<Placeholder3 />} />
        <Route path='/servers' element={<ServerSelectView appData={appData} />} />
      </Routes>
      {/** Show in all paths except the servers view */}
      {appData.currentPath !== '/servers' && <SelectServerButton linkTo='/servers' />}
    </>
  )
}

export default AppBody
