import { 
    FAILURE, 
    REQUEST, 
    SUCCESS 
} from "../../shared/Utils/actions";
import { createAction } from "redux-actions"
import { 
    LOGIN, 
    LOGOUT 
} from "../constants"

export const loginRequestAction = createAction(REQUEST(LOGIN));
export const loginSuccessAction = createAction(SUCCESS(LOGIN));
export const loginFailAction = createAction(FAILURE(LOGIN));

export const logoutRequestAction = createAction(REQUEST(LOGOUT));
export const logoutSuccessAction = createAction(SUCCESS(LOGOUT));
export const logoutFailureAction = createAction(FAILURE(LOGOUT));