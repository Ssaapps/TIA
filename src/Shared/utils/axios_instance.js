import axios from "axios";
// TODO: change token

const Axios = axios.create({
  baseURL: "https://3994-154-160-4-115.ngrok-free.app/api/v1/",
  // timeout: 10000,
  validateStatus: function (status) {
    if(status > 200  <300){
      return true
    }
    // if(status == 403){
    //   localStorage.clear()
    //   window.location.replace("/login")
    // } 
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    Accept: "application/json",
  },
});

export default Axios;