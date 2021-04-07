import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import { Actions } from '../../Interfaces/actions'
import rsf from '../../rsf'
import { REQUEST } from '../../shared/Utils/actions'
import { 
	profileDownloadRequest,
	setAuthStateSuccess,
	signinFailure,
	signinSuccess, 
	signupFailure,
	signupSuccess,
	updateProfileFailure
} from './actions'
import { 
    AUTHSTATE, 
	SIGNIN, 
	SIGNUP,
	UPDATEPROFILE,
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
		const { signupEmail, signupPassword, signupName="", signupphonenumber="" } = action.payload
		const signupResponse = yield call([rsf.auth, rsf.auth.createUserWithEmailAndPassword], signupEmail, signupPassword);
		console.log(signupResponse)
		const createProfileRespose = yield call(rsf.firestore.setDocument, `users/${signupResponse.user.uid}`, {
			addresses: [{
				point: { logintude: "", latitude: "" },
				address: "",
				addressType: "Other"
			},{ 
				point: { logintude: "", latitude: "" },
				address: "",
				addressType: "Office"
			},{ 
				point: { logintude: "", latitude: "" },
				address: "",
				addressType: "Home"
			}],
			firstName: signupName,
			mobile: signupphonenumber,
			lastName: "",
			bio: ""
		},{
			merge: true
		});
		console.log("createProfileRespose:: ",createProfileRespose)
		yield put(signupSuccess(signupResponse.user));
		if (signupResponse.user) {
			yield put(signupSuccess(signupResponse.user));
		} else {
			yield put(signupFailure({ message: "There was some error while creating your account!" }));
		}
	} catch (e) {
		console.log(e)
		yield put(signupFailure(e));
	}
}

function* updateProfile(action: Actions) {
	const { userId, updateFields } = action.payload
	try {
		yield call(rsf.firestore.updateDocument, `users/${userId}`, {
			...updateFields
		  });
	} catch (e) {
		yield put(updateProfileFailure(e));
	}
}

function* syncProfileSaga() {
	yield fork(rsf.firestore.syncCollection, 'users', {
	  successActionCreator: profileDownloadRequest,
	  transform: (profile)=>  profile,
	})
}

export default function* registerSagaManager() {
	yield all([
		yield fork(syncProfileSaga),
		takeLatest(REQUEST(AUTHSTATE), setAuthState),
		takeLatest(REQUEST(SIGNIN), signinSaga),
		takeLatest(REQUEST(SIGNUP), signupSaga),
		takeLatest(REQUEST(UPDATEPROFILE), updateProfile)
	])
}