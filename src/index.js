/*
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryParamProvider } from 'use-query-params'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <QueryParamProvider>
    {/* <BrowserRouter> should be wrap all the components that use react-router-dom */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryParamProvider>
)

// Updating to React v18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
