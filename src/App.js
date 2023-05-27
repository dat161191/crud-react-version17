import './App.scss';
import { Header } from './component/Header';
import { ListUser } from './component/users-call-api/ListUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListClock from './component/clock-conect-be/ListClock';
import Home from './component/Home';
import Login from './component/login-logout/Login';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

function App() {
  const { user } = useContext(UserContext);
  console.log("check usecontext: ", user," check token:");
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
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
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
