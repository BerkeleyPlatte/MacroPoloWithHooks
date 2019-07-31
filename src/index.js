import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import MacroPolo from './components/MacroPolo'
import './index.css'

ReactDOM.render(
  <Router>
      <MacroPolo />
  </Router>
  , document.getElementById('root'))
