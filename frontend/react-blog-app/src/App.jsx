import React from 'react'

import { NavbarComp } from './components/navigation/NavbarComp'
import { Routing } from './components/navigation/Routing'



import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
 
  return (
  
    <div className="App">
       <NavbarComp />
        <Routing />
    </div>
  )
}

export default App
