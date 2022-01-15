import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import { ToastContainer } from 'react-toast'

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Home} />
      <ToastContainer position="top-right" />
    </main>
  </div>
)

export default App
