import React from 'react'
import ReactDOM from 'react-dom/client'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import App from './App'
import './index.css'

config.autoAddCss = false

document.documentElement.classList.add('dark')

document.body.classList.add('font-body', 'bg-nc-base', 'text-nc-primary')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)