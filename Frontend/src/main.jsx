import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App/App.jsx'
import { Provider } from "react-redux"
import { store } from './App/store..jsx'
import ErrorBoundary from './features/auth/component/ErrorBoundary.jsx'
import { ToastProvider } from './features/auth/component/ToastPopup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)
