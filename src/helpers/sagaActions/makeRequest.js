//@flow
import {put,call,takeLatest} from 'redux-saga/effects';
import { api } from '../api';
import type { Saga } from 'redux-saga';
type payLoadType ={
    error:boolean,
    data:Array<Object>
};
const payLoad: payLoadType = {
    error:false,
    data:[]
};
function* getData(params): Saga<void> {
    let resp;
	try{
        resp = yield call(api.twitter, params.state.query);
        payLoad.data = resp;
		yield put({type: "SEARCH_DATA", state:payLoad});
	}catch(e){
        payLoad.error = true;
        payLoad.data = [];
		yield put({type: "SEARCH_DATA", state:payLoad});
	}
}

export const makeRequest = takeLatest("SEARCH", getData);
