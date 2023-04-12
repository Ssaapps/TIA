import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Modules/Login";
import { useSelector } from "react-redux";
import Welcome from "./Modules/Welcome";
import AppLayout from "./Modules/Layouts";
import Photo from "./Modules/Photo";
import Signup from './Modules/Login/Signup';
import UploadSuccess from './Modules/Admin/upload/UploadSucess';
import Upload from './Modules/Admin/upload/Upload';
import Admin from './Modules/Admin';
import Dashboard from './Modules/Admin/dashboard';
import PhotosList from './Modules/Admin/photos';
import Settings from './Modules/Admin/settings';
import Albums from './Modules/Admin/albums';


function App() {
  const mSate = useSelector((state) => state)
  const isAuth = !!useSelector((state) => state.login.token);


  return (
    <Router>
      <Routes>

        <Route exact path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />
        <Route exact path="/signup" element={isAuth ? <Navigate to="/" /> : <Signup />} />


        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path='photos' element={<PhotosList />} />
          <Route path='settings' element={<Settings />} />
          <Route path='albums' element={<Albums />} />
          <Route path="upload/success" element={<UploadSuccess />} />
          <Route path="upload" element={<Upload />} />

        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/photo/:id" element={<Photo />} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
