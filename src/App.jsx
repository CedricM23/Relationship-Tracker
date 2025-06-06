import { useState } from 'react'
import NavBar from './components/NavBar/NavBar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Datesview from './views/DatesView/DatesView.jsx'
import DateDetailView from './views/DateDetailView/DateDetailView.jsx'
import TrendingView from './views/TrendingView/TrendingView.jsx'
import MediaDetailView from './views/MediaDetailView/MediaDetailView.jsx'
import './App.css'
import FavoritesView from './views/FavoritesView/FavoritesView.jsx'
import ShowsView from './views/ShowsView/ShowsView.jsx'
import WatchlistView from './views/WatchlistView/WatchlistView.jsx'
import MoviesView from './views/MoviesView/MoviesView.jsx'

function App() {
  return (
    <>
      <title>Relationship Tracker</title>
      <BrowserRouter>
      <NavBar />
      <Routes>
      <Route path='/dates' element={<Datesview/>} />
      <Route path='dates/:id' element={<DateDetailView/>} />
      <Route path='/Watchlist' element={<WatchlistView/>} />
      <Route path='watchlist/:id/:type' element={<MediaDetailView/>} />
      <Route path='/trending' element={<TrendingView/>} />
      <Route path='/favorites' element={<FavoritesView/>} />
      <Route path='/shows' element={<ShowsView/>} />
      <Route path='/movies' element={<MoviesView/>} />
      {/* WATCHLIST */}
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
