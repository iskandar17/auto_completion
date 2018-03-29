//@flow
import { all} from 'redux-saga/effects';
import {makeRequest} from './makeRequest';
import type { Saga } from 'redux-saga';

export default function* rootSaga(): Saga<void>{
	yield all([
		makeRequest
	])
}
