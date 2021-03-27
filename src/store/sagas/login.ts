import firebase from 'firebase'
import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects'

import {
    loginSuccessAction,
    loginFailAction
} from '../actions/login'

import rsf from '../../rsf'
import { 
	REQUEST 
} from '../../shared/Utils/actions'
import { 
	LOGIN, 
	LOGOUT 
} from '../constants'

const authProvider = new firebase.auth.GoogleAuthProvider()

function* loginSaga() {
	try {
		yield call(rsf.auth.signInWithPopup, authProvider)
		// successful login will trigger the loginStatusWatcher, which will update the state
	} catch (error) {
		yield put(loginFailAction(error))
	}
}

function* logoutSaga() {
	try {
		yield call(rsf.auth.signOut)
		// successful logout will trigger the loginStatusWatcher, which will update the state
	} catch (error) {
		yield put(loginFailAction(error))
	}
}

function* loginStatusWatcher() {
	// events on this channel fire when the user logs in or logs out
	const channel = yield call(rsf.auth.channel)
	while (true) {
		const { user } = yield take(channel)
		if (user) yield put(loginSuccessAction(user))
		else yield put(loginSuccessAction())
	}
}

export default function* loginRootSaga() {
	yield fork(loginStatusWatcher)
	yield all([
		takeEvery(REQUEST(LOGIN), loginSaga),
		takeEvery(REQUEST(LOGOUT), logoutSaga),
	])
}
