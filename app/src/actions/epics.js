import * as actions from "../constants/actionTypes";
import { combineEpics } from "redux-observable";
import "rxjs/add/operator/concatMap";
import { Observable } from "rxjs/Observable";
import * as api from "../api/api";

const loadJobs = action$ =>
    action$.ofType(actions.JOBS_LOAD).concatMap(action => {
        return api
            .getJobs()
            .then(jobs => ({ type: actions.JOBS_LOAD_SUCCESS, payload: jobs }))
            .catch(error => ({ type: actions.JOBS_LOAD_ERROR, payload: error }));
    });

export default combineEpics(
    loadJobs,
);