import { useState } from 'react'
import NavBar from './components/NavBar/NavBar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Datesview from './views/DatesView/DatesView.jsx'
import DateDetailView from './views/DateDetailView/DateDetailView.jsx'

function App() {
  return (
    <>
      <title>Relationship Tracker</title>
      <BrowserRouter>
      <NavBar />
      <Routes>
      <Route path='/dates' element={<Datesview/>} />
      <Route path='dates/:id' element={<DateDetailView/>} />

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
