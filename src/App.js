import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Modules/Auth/Login";
import { useSelector } from "react-redux";
import Welcome from "./Modules/Welcome";
import AppLayout from "./Modules/Layouts";
import Photo from "./Modules/Photo";
import UploadSuccess from './Modules/Admin/upload/UploadSucess';
import Upload from './Modules/Admin/upload/Upload';
import Admin from './Modules/Admin';
import Dashboard from './Modules/Admin/dashboard';
import PhotosList from './Modules/Admin/photos';
import Settings from './Modules/Admin/settings';
import Albums from './Modules/Admin/albums';
import Groups from "./Modules/Admin/groups";
import Orders from "./Modules/Admin/orders";
import Album from "./Modules/Album";
import Register from "./Modules/Auth/Register";
import { useEffect } from "react";
import Cart from './Modules/Cart';


function App() {
  const mSate = useSelector((state) => state)
  const isAuth = !!useSelector((state) => state.login.login.token);

  useEffect(() => {

    console.log("isAuth", isAuth)
  }, [isAuth])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/*<Route exact path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />*/}
        {/*<Route exact path="/register" element={isAuth ? <Navigate to="/" /> : <Register />} />*/}

        {/*<Route path="/admin" element={<Admin />}>*/}
        {/*  <Route index element={<Dashboard />} />*/}
        {/*  <Route path='photos' element={<PhotosList />} />*/}
        {/*  <Route path='settings' element={<Settings />} />*/}
        {/*  <Route path='albums' element={<Albums />} />*/}
        {/*  /!* <Route path='groups' element={<Groups />} /> *!/*/}
        {/*  <Route path='orders' element={<Orders />} />*/}
        {/*  <Route path="upload/success" element={<UploadSuccess />} />*/}
        {/*  <Route path="upload" element={<Upload />} />*/}

        {/*</Route>*/}


        {/*<Route path="/" element={<AppLayout />}>*/}
        {/*  <Route path="/" element={<Welcome />} />*/}
        {/*  <Route path="/photo/:id" element={<Photo />} />*/}
        {/*  <Route path="/album/:id" element={<Album />} />*/}
        {/*  <Route path='/cart' element={<Cart />} />*/}
        {/*</Route>*/}

      </Routes>
    </Router>
  );
}

export default App;
