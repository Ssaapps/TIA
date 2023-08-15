import axios from "axios";
import { API_BASE_URL } from "./constants";

// TODO: change token

var isJsonParsable = string => {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  return true;
}

const getToken = () => {
  const rawToken = isJsonParsable(localStorage.getItem("token")) ? localStorage.getItem("token") : null;
  if (rawToken) {
    return JSON.parse(rawToken)?.access_token;
  }
  else {
    return null
  }
}

const Axios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000000,
  // validateStatus: function (status) {
  //   if (status > 200 && status < 300) {
  //     return true
  //   }
  //   // if(status == 403){
  //   //   localStorage.clear()
  //   //   window.location.replace("/login")
  //   // }
  // },



  headers: {
    Authorization: `Bearer ${getToken()}`,
    Accept: "application/json",
  },
});

export default Axios;