import { Actions } from "../../Interfaces/actions";
import { FAILURE, REQUEST, SUCCESS } from "../Utils/actions";
import { 
    AUTHSTATE, SIGNIN, SIGNUP,
    // SIGNINSTATE, 
    // SIGNUPSTATE 
} from "./constants";

const SiginState = [
    "Signing in...", 
    "There was an error while signing in!"
]
const SigupState = [
    "Signing up...", 
    "There was an error while signing up!"
]

interface UserDetails {
    displayName: string | null,
    email: string | null,
    emailVerified: boolean,
    phoneNumber: string | null
    photoURL: string | null,
    creationTime: string | null,
    lastSignInTime: string | null
}

interface RegisterState {
    authUIState: boolean,
    signinStatus: string | undefined,
    signupStatus: string | undefined,
    userDetails: UserDetails | null
}

const initialState: RegisterState = {
    authUIState: false,
    signinStatus: undefined,
    signupStatus: undefined,
    userDetails: null
}

export default (
    state: RegisterState = initialState,
    action: Actions
) => {
    const { 
        code = null, 
        message = null,
        displayName,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        metadata 
    } = action.payload || {}
    const { 
        creationTime,
        lastSignInTime
    } = metadata || {}
    switch (action.type) {
        case (REQUEST(SIGNUP)): 
        return {
            ...state,
            signupStatus: SigupState[0]
        }
        case (SUCCESS(SIGNUP)): 
        return {
            ...state,
            signupStatus: undefined
        }
        case (FAILURE(SIGNUP)): 
        return {
            ...state,
            signupStatus: message || SigupState[1],
        }

        case (REQUEST(SIGNIN)): 
        return {
            ...state,
            signinStatus: SiginState[0],
            userDetails: null
        }
        case (SUCCESS(SIGNIN)): 
        return {
            ...state,
            signinStatus: undefined,
            userDetails: {
                displayName,
                email,
                emailVerified,
                phoneNumber,
                photoURL,    
                creationTime,
                lastSignInTime
            }
        }
        case (FAILURE(SIGNIN)): 
        return {
            ...state,
            signinStatus: message || SiginState[1],
            userDetails: null
        }

        case (SUCCESS(AUTHSTATE)): 
        return {
            ...state,
            authUIState: action.payload
        }
        default: 
        return state
    }
}