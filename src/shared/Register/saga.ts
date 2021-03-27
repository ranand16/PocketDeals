import { all, call, put, takeLatest } from 'redux-saga/effects'
import { Actions } from '../../Interfaces/actions'
import rsf from '../../rsf'
import { REQUEST } from '../../shared/Utils/actions'
import { 
	setAuthStateSuccess,
	signinFailure,
	signinSuccess, 
	signupFailure,
	signupSuccess
} from './actions'
import { 
    AUTHSTATE, 
	SIGNIN, 
	SIGNUP,
} from './constants'

function* setAuthState(action: Actions) {
    yield put(setAuthStateSuccess(action.payload))
}

function* signinSaga(action: Actions) {
	try {
		const { signinemail, signinpassword } = action.payload
		const response = yield call([rsf.auth, rsf.auth.signInWithEmailAndPassword], signinemail, signinpassword)
		if (response.user) {
			yield put(signinSuccess(response.user));
		} else {
			yield put(signinFailure({ message: "There was some error while logging into your account!" }));
		}
	} catch (e) {
		console.log(e)
		yield put(signinFailure(e));
	}
}

function* signupSaga(action: Actions) {
	try {
		const { signupEmail, signupPassword } = action.payload
		console.log(action)
		const response = yield call([rsf.auth, rsf.auth.createUserWithEmailAndPassword], signupEmail, signupPassword)
		console.log(response)
		if (response.user) {
			yield put(signupSuccess(response.user));
		} else {
			yield put(signupFailure({ message: "There was some error while creating your account!" }));
		}
	} catch (e) {
		console.log(e)
		yield put(signupFailure(e));
	}
}

export default function* registerSagaManager() {
	yield all([
		takeLatest(REQUEST(AUTHSTATE), setAuthState),
		takeLatest(REQUEST(SIGNIN), signinSaga),
		takeLatest(REQUEST(SIGNUP), signupSaga)
	])
}