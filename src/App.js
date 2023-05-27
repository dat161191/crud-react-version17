import './App.scss';
import { Header } from './component/Header';
import { ListUser } from './component/users-call-api/ListUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListClock from './component/clock-conect-be/ListClock';
import Home from './component/Home';
import Login from './component/login-logout/Login';
import Logout from './component/login-logout/Logout';


function App() {
  return (
    <BrowserRouter>
      <>
        <div className="app-container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<ListUser />} />
            <Route path="/clocks" element={<ListClock />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />


          </Routes>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
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
    </BrowserRouter>
  );
}

export default App;
