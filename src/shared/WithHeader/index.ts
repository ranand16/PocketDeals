import { connect } from "react-redux";
import WithHeader from "./WithHeader";
import {
    setAuthStateRequest
} from '../Register/actions'
import { RootState } from "../../store/reducers";
const mapStateToProps = (state: RootState) => ({
    ...state.registerState
});

const mapDispatchToProps = {
    setAuthStateRequest
};

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WithHeader);
