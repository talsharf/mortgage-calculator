import React from 'react'
import MortgageCalculator from './components/MortgageCalculator'
import './index.css'

function App() {
  return (
    <>
      <h1>Mortgage Calculator</h1>
      <div className="card">
        <MortgageCalculator />
      </div>
    </>
  )
}

export default App
