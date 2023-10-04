import axios from "axios";
import { API_BASE_URL } from "./constants";
import Cookies from "js-cookie";
import Axios from "./axios_instance";

export const makeHttpRequest = (request, dispatchVariables, dispatch, onSuccess = null, onError = null, tag = null, onUploadProgress) => {
    const token = JSON.parse(localStorage.getItem("token") ?? "{}")
    let options = {
        method: request.method,
        url: API_BASE_URL + request.path,
        data: request.data,
        headers: {
            Authorization: "Bearer " + token?.access_token ?? ""
        },
        onDownloadProgress: process => {
            console.log(process)
            let percentCompleted = Math.round(
                (process.loaded * 100) / process.total
            );
            // console.log("download completed : ",percentCompleted)
        },
        onUploadProgress: onUploadProgress
    }
    if (request.query) {
        options = {
            ...options,
            params: request.query
        }
    }

    if (request.file) {
        const formData = new FormData();

        formData.append("file", request.file);
        Object.keys(request.data).forEach((item, index) => {
            formData.append(item, Object.values(request.data)[index])
        })

        options = {
            ...options,
            data: formData,
            timeout: 1000 * 60 * 60 * 24 * 7,
            headers: {
                ...options.headers,
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const percentage = (progressEvent.loaded * 100) / progressEvent.total;
                dispatch({
                    id: request.id,
                    type: dispatchVariables.PROGRESS,
                    tag: tag,
                    payload: +percentage.toFixed(2),
                });
            }
        }
    }

    axios.request(options).then((response) => {

        // console.log(response);

        if (onSuccess != null) {
            onSuccess(response.data);
        }

        dispatch({
            id: request.id,
            type: dispatchVariables.SUCCESS,
            tag: tag,
            payload: response.data,
        })


    }).catch(error => {

        let errorMessage = error.message;
        if (error.response && error.response.data) {
            errorMessage = error.response.data.message;
        }
        console.log("error", error)
        dispatch({
            id: request.id,
            type: dispatchVariables.ERROR,
            payload: errorMessage,
            tag: tag,
        })
        if (onError != null) {
            onError(error);
        }

    })
}


export const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

export const niceBytes = (x) => {
    const units = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let l = 0, n = parseInt(x, 10) || 0;

    while (n >= 1024 && ++l) {
        n = n / 1024;
    }
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

export const getLighterColor = (hexColor, percent = 0.5) => {
    console.log("beforeColor", hexColor)
    // Convert HEX color to RGB
    let r = parseInt(hexColor.substring(1, 3), 16);
    let g = parseInt(hexColor.substring(3, 5), 16);
    let b = parseInt(hexColor.substring(5, 7), 16);
    // Calculate new RGB values based on percent lightness
    r = Math.round(r + ((255 - r) * percent));
    g = Math.round(g + ((255 - g) * percent));
    b = Math.round(b + ((255 - b) * percent));
    // Convert RGB color back to HEX
    const newHexColor = '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
    console.log("afterColor", newHexColor)

    return newHexColor;
}

export const generateRandomNumber = () => {
    return window.URL.createObjectURL(new Blob([])).substring(31);
}

export const getTableData = (data, fields) => {
    return data && data.map((item) => {
        return {
            fields: fields.map((field, index) => {

                if (field instanceof Object) {
                    return {
                        "id": field.id,
                        "render": field.render,
                        "content": item
                    }
                } else {
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

export const getParameterByName = (name, url) => {
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


export const downloadReceipt = async (reference, path) => {
    try {
        const response = await Axios.get(path ?? `/orders/${reference}/download`, {
            responseType: 'blob'
        })
        console.log(response.data)
        // const blob = new Blob([response.data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        //TODO: replace with the file extentsion
        link.setAttribute('download', 'receipt.zip');
        document.body.appendChild(link);
        link.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    }
    catch (e) {
        throw e
    }
}
export function convertToKBorMBorGB(bytes) {
    const kilobytes = bytes / 1024;

    if (kilobytes >= 1000) {
        const megabytes = kilobytes / 1024;
        if (megabytes >= 1000) {
            const gigabytes = megabytes / 1024;
            return gigabytes.toFixed(2) + " GB";
        } else {
            return megabytes.toFixed(2) + " MB";
        }
    } else {
        return kilobytes.toFixed(2) + " kB";
    }
}



export function flattenObject(obj, parentKey = "") {
    let result = {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const currentKey = parentKey ? `${parentKey}.${key}` : key;
            const value = obj[key];

            if (typeof value === "object" && value !== null) {
                const nestedObject = flattenObject(value, currentKey);
                result = { ...result, ...nestedObject };
            } else {
                result[currentKey] = value;
            }
        }
    }

    return result;
}



export function generateArray(length, value) {
    return Array(length).fill(value);
}