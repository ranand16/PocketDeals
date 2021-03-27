import { createAction } from "redux-actions";
import { 
    FAILURE,
    REQUEST, 
    SUCCESS 
} from "../Utils/actions";
import { 
    AUTHSTATE, 
    SIGNIN, 
    SIGNUP
} from "./constants";

export const setAuthStateRequest = createAction(REQUEST(AUTHSTATE))
export const setAuthStateSuccess = createAction(SUCCESS(AUTHSTATE))

export const signinRequest = createAction(REQUEST(SIGNIN))
export const signinSuccess = createAction(SUCCESS(SIGNIN))
export const signinFailure = createAction(FAILURE(SIGNIN))

export const signupRequest = createAction(REQUEST(SIGNUP))
export const signupSuccess = createAction(SUCCESS(SIGNUP))
export const signupFailure = createAction(FAILURE(SIGNUP))