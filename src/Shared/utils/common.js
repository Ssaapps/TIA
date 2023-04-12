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


export const niceBytes = (x) => {
    const units = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let l = 0, n = parseInt(x, 10) || 0;

    while(n >= 1024 && ++l){
        n = n/1024;
    }
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

export const getTableData = (data,fields) => {
    return data && data.map((item) =>
    {
        return {
            fields: fields.map( (field,index) => {

                if (field instanceof Object) {
                    return {
                        "id": field.id,
                        "render": field.render,
                        "content": item
                    }
                }else {
                    let str = item[field]
                    if (field.indexOf(".") > -1) {
                        let ii = item;
                        field.split(".").forEach((it) => {
                            if (ii !== undefined && ii !== null) {
                                str = ii[it] && ii[it]
                                ii = str;
                            }
                        })
                    }
                    return {
                        "id": field,
                        "title": str
                    }
                }

            })
        }
    })

}

export const getParameterByName = (name, url)  => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const capitalize = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
}

