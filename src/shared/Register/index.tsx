import { connect } from "react-redux";
import Signin from "./components/Signin/Signin";
import { 
    setAuthStateRequest,
    signinRequest,
    signupRequest
} from './actions'
import { RootState } from "../../store/reducers";
const mapStateToProps = (state: RootState) => ({
    ...state.registerState
});

const mapDispatchToProps = {
    setAuthStateRequest,
    signinRequest,
    signupRequest
};

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
