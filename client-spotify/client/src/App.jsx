import React from 'react'
import Home from './pages/Home'
import {BrowserRouter , Routes ,Route}  from 'react-router-dom';
import SinglePage from './pages/SinglePage';


const App = () => {
  return (
  <BrowserRouter>
  
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/single' element={<SinglePage/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
