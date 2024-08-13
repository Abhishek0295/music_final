import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import NotFound from './pages/NotFound';
import ProfilePage from './pages/ProfilePage';
import Settings from './pages/Settings';
import ForgotPass from './components/resetPassword/ForgotPass';
import ChangePass from './components/resetPassword/ChangePass';

const App = () => {
  return (
    <>
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
        transition={Bounce}
      />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/forgot-pass' element={<ForgotPass/> }/>
        <Route path="/change_password/:resetCode" element={<ChangePass />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Home />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="setting" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
