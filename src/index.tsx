import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'
import { loadServer, DevTools } from 'jira-dev-tool'
// 务必在 jira-dev-tool 中引入
import 'antd/dist/antd.less'
import { AppProviders } from 'context'

loadServer(() =>
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </React.StrictMode>
  )
)
