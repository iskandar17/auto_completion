//@flow
import {put,call,takeEvery} from 'redux-saga/effects';
import { api } from '../api';
import type { Saga } from 'redux-saga';
type payLoadType ={
    error:boolean,
    data:Object
};
const payLoad: payLoadType = {
    error:false,
    data:{}
};
function* getData(params): Saga<void> {
    let resp;
	try{
        resp = yield call(api.twitter, params.state.query);
        payLoad.data = resp.json();
		yield put({type: "SEARCH_DATA", data:payLoad});
	}catch(e){
        payLoad.error = true;
        payLoad.data = e;
		yield put({type: "SEARCH_DATA", data:payLoad});
	}
}

export const makeRequest = takeEvery("SEARCH", getData);
