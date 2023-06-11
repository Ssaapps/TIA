import axios from "axios";
// TODO: change token

const getToken = () => {
  const rawToken = localStorage.getItem("token");
  if (rawToken) {
    return JSON.parse(rawToken)?.access_token;
  }
  else {
    return null
  }
}

const Axios = axios.create({
  baseURL: "https://7206-154-160-11-174.ngrok-free.app/api/v1/",
  // timeout: 10000,
  validateStatus: function (status) {
    if (status > 200 < 300) {
      return true
    }
    // if(status == 403){
    //   localStorage.clear()
    //   window.location.replace("/login")
    // } 
  },
  headers: {
    Authorization: `Bearer ${getToken()}`,
    Accept: "application/json",
  },
});

export default Axios;