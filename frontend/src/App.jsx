import React from 'react'
import { Route, createBrowserRouter, BrowserRouter } from 'react-router-dom'
import Hero from './pages/Hero'

const App = () => {

  const routes = createBrowserRouter([
    {
      path : '/hero',
      element : <Hero />
    }
  ])

  return (
    <BrowserRouter routes={routes}>
    <div>
      <Hero />
    </div>
    </BrowserRouter>
  )
}

export default App