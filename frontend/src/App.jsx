import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'


import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'

function App() {


  return (
   <div className="App">
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/chats" Component={ChatPage} />
     
      
    </Routes>
     
    </div>
  )
}

export default App
