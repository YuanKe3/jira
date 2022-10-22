import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { loadDevTools } from 'jira-dev-tool'
import { AppProviders } from 'context'

loadDevTools(() =>
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>
  )
)
