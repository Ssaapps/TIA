import axios from "axios";
import { API_BASE_URL } from "./constants";

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
  baseURL: API_BASE_URL,
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