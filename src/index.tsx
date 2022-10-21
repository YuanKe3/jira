import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { loadDevTools } from 'jira-dev-tool'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

loadDevTools(() =>
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
)
