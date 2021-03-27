import { connect } from "react-redux";
import ProductsList from "./components/ProductsList/ProductsList";
import { 
    fetchProductsRequestAction,
    addProductToCartRequestAction,
    removeProductToCartRequestAction
} from "./actions"
import { RootState } from "../../store/reducers";
const mapStateToProps = (state: RootState) => ({
    ...state.products
});

const mapDispatchToProps = {
    fetchProductsRequestAction,
    addProductToCartRequestAction,
    removeProductToCartRequestAction
};

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);