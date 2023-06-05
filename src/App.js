import './App.scss';
import { Header } from './component/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import AppRouter from './router/AppRouter';

function App() {
  const { user } = useContext(UserContext);
  // console.log("check usecontext: ", user, " check token:");
  return (
    <BrowserRouter>
      <>
        <div className="app-container">
          <Header />
          <AppRouter />
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
