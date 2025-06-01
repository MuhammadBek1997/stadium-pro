import { Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/Navbar.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Collections from './pages/Collections';
import Orders from './pages/Orders';
import Single from './pages/Single';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/single/:id" element={<Single />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
