import React from 'react'
import { Route, createBrowserRouter } from 'react-router-dom'
import Hero from './pages/Hero'

const App = () => {

  const routes = createBrowserRouter([
    {
      path : '/hero',
      element : <Hero />
    }
  ])

  return (
    <div>
      <Hero />
    </div>
  )
}

export default App