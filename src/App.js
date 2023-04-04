import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Login from "./Modules/Login";
import {useSelector} from "react-redux";
import Welcome from "./Modules/Welcome";
import AppLayout from "./Modules/Layouts";
import Photo from "./Modules/Photo";
import Signup from './Modules/Login/Signup';
import UploadSuccess from './Modules/Admin/upload/UploadSucess';
import Upload from './Modules/Admin/upload/Upload';


function App() {
  const mSate = useSelector((state) => state)
  const isAuth = !!useSelector((state) => state.login.token);


  return (
      <Router>
        <Routes>

          <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>


          <Route path="/" element={<AppLayout/>}>
              <Route path="/" element={<Welcome/>}/>
              <Route path="/photo/:id" element={<Photo/>}/>
              <Route path="/admin/upload" element={<Upload/>}/>
              <Route path="/upload/success" element={<UploadSuccess/>}/>
          </Route>

        </Routes>
      </Router>
  );
}

export default App;
