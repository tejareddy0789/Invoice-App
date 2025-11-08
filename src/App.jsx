import React from 'react'
import AppContent from './component/AppContent'
import {Provider} from 'react-redux'
import {store} from './store/store'

function App() {
  return <Provider store={store}>
    <AppContent />
  </Provider>
}

export default App