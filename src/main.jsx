import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

import { Routers } from './routes'
import { store } from './app/store'

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Routers />
    </Provider>
  </React.StrictMode>
)
