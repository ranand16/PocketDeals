import { createAction } from "redux-actions";
import { 
    FAILURE,
    REQUEST, 
    SUCCESS 
} from "../Utils/actions";
import { 
    AUTHSTATE, 
    DOWNLOADPROFILE, 
    SIGNIN, 
    SIGNUP,
    UPDATEPROFILE
} from "./constants";

export const setAuthStateRequest = createAction(REQUEST(AUTHSTATE))
export const setAuthStateSuccess = createAction(SUCCESS(AUTHSTATE))

export const signinRequest = createAction(REQUEST(SIGNIN))
export const signinSuccess = createAction(SUCCESS(SIGNIN))
export const signinFailure = createAction(FAILURE(SIGNIN))

export const signupRequest = createAction(REQUEST(SIGNUP))
export const signupSuccess = createAction(SUCCESS(SIGNUP))
export const signupFailure = createAction(FAILURE(SIGNUP))

export const updateProfileRequest = createAction(REQUEST(UPDATEPROFILE))
export const updateProfileSuccess = createAction(SUCCESS(UPDATEPROFILE))
export const updateProfileFailure = createAction(FAILURE(UPDATEPROFILE))

export const profileDownloadRequest = createAction(REQUEST(DOWNLOADPROFILE))
export const profileDownloadSuccess = createAction(SUCCESS(DOWNLOADPROFILE))
export const profileDownloadFailure = createAction(FAILURE(DOWNLOADPROFILE))