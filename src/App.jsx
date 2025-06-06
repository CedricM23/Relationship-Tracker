import { useState } from 'react'
import NavBar from './components/NavBar/NavBar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Datesview from './views/DatesView/DatesView.jsx'
import DateDetailView from './views/DateDetailView/DateDetailView.jsx'
import TrendingView from './views/TrendingView/TrendingView.jsx'
import MediaDetailView from './views/MediaDetailView/MediaDetailView.jsx'
import './App.css'
import FavoritesView from './views/FavoritesView/FavoritesView.jsx'

function App() {
  return (
    <>
      <title>Relationship Tracker</title>
      <BrowserRouter>
      <NavBar />
      <Routes>
      <Route path='/dates' element={<Datesview/>} />
      <Route path='dates/:id' element={<DateDetailView/>} />
      <Route path='/shows' element={<TrendingView/>} />
      <Route path='watchlist/:id/:type' element={<MediaDetailView/>} />
      <Route path='/trending' element={<TrendingView/>} />
      <Route path='/favorites' element={<FavoritesView/>} />
      {/* WATCHLIST */}
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
