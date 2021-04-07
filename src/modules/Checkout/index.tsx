import { connect } from "react-redux";
import CheckoutComp from "./components/CheckoutComp/CheckoutComp";
import { RootState } from "../../store/reducers";
import {
    addProductToCartRequestAction,
    removeProductToCartRequestAction,
} from "../Products/actions"

import {
    setAuthStateRequest
} from '../../shared/Register/actions'
const mapStateToProps = (state: RootState) => ({
    ...state.products,
    ...state.registerState
});

const mapDispatchToProps = {
    addProductToCartRequestAction,
    removeProductToCartRequestAction,
    setAuthStateRequest
};

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutComp);