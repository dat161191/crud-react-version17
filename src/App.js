import './App.scss';
import { Header } from './component/Header';
import { ListUser } from './component/ListUser';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListClock from './component/clock-conect-be/ListClock';
import Home from './component/Home';


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
          </Routes>

          {/* <Header />
        <Container>
          <ListUser />
        </Container> */}
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
