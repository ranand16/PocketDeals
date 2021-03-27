import { connect } from "react-redux";
import CartComp from "./components/CartComp/CartComp";
import { RootState } from "../../store/reducers";
import {
    addProductToCartRequestAction,
    removeProductToCartRequestAction
} from "../Products/actions"


const mapStateToProps = (state: RootState) => ({
    ...state.products
});

const mapDispatchToProps = {
    addProductToCartRequestAction,
    removeProductToCartRequestAction
};

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CartComp);