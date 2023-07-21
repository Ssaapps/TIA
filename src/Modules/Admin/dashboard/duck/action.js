import { ActionTypes } from "./type";
import { makeHttpRequest } from "../../../../Shared/utils/common";

export const getDashboard = (date) => {
    const monthAgoDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
    // Format the date as "YYYY-MM-DD"
    let formattedStartDate = monthAgoDate.toISOString().slice(0, 10);
    let formattedEndDate = new Date().toISOString().slice(0, 10);
    if (date) {
        formattedStartDate = date[0];
        formattedEndDate = date[1];
    }

    return async function (dispatch) {
        dispatch({ type: ActionTypes.FETCH_DASHBOARDS_REQUEST });
        makeHttpRequest({
            path: `admin/dashboard?start_date=${formattedStartDate}&end_date=${formattedEndDate}`,
            method: "GET",
        }, {
            SUCCESS: ActionTypes.FETCH_DASHBOARDS_SUCCESS,
            ERROR: ActionTypes.FETCH_DASHBOARDS_ERROR
        }, dispatch);
    }
}






