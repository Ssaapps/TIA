import axios from "axios";
// TODO: change token

const Axios = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
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
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))?.access_token}`,
    Accept: "application/json",
  },
});

export default Axios;