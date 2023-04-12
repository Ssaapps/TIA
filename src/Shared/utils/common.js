import axios from "axios";
import {API_BASE_URL} from "./constants";
import Cookies from "js-cookie";

export const makeHttpRequest =  (request, dispatchVariables , dispatch, onSuccess = null,onError =  null,tag = null) => {
    const token = JSON.parse(localStorage.getItem("token") ?? "{}")
    console.log("token",token)
    let options = {
        method: request.method,
        url: API_BASE_URL + request.path,
        data: request.data,
        headers: {
            Authorization: "Bearer "+ token.access_token ?? ""
        },
        onDownloadProgress: process => {
            console.log(process)
            let percentCompleted = Math.round(
                (process.loaded * 100) / process.total
            );
            // console.log("download completed : ",percentCompleted)
        },
        onUploadProgress: progress => {
            console.log("onUploadProgress -> ",progress);
        }
    }
    if (request.query) {
        options = {
            ...options,
            params: request.query
        }
    }
    axios.request(options).then((response) => {

            // console.log(response);

            if (onSuccess != null) {
                onSuccess(response.data);
            }

            dispatch({
                type: dispatchVariables.SUCCESS,
                tag: tag,
                payload: response.data,
            })


        }).catch(error => {

            let errorMessage = error.message;
            if (error.response && error.response.data) {
                errorMessage = error.response.data.message;
            }
            dispatch({
                type: dispatchVariables.ERROR,
                payload: errorMessage,
                tag: tag,
            })
            if (onError != null) {
                onError();
            }

        })
}