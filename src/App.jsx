import { Route, Routes } from 'react-router-dom'
import './App.css'
import './styles/res1024.css';
import './styles/res768.css';
import './styles/res500.css';
import Card3D from './components/Card3D'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Collections from './pages/Collections';
import Orders from './pages/Orders';

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/collection' element={<Collections/>}/>
      <Route path='/order' element={<Orders/>}/>
    </Routes>
    </>
  )
}

export default App
