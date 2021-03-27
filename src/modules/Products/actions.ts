import { createAction } from "redux-actions";
import { 
    FAILURE, 
    REQUEST, 
    SUCCESS 
} from "../../shared/Utils/actions";
import { 
    GETPRODUCTS, 
    ADDPRODUCT,
    REMOVEPRODUCT
} from './constants';

export const addProductToCartRequestAction = createAction(REQUEST(ADDPRODUCT));
export const addProductToCartSuccessAction = createAction(SUCCESS(ADDPRODUCT));

export const removeProductToCartRequestAction = createAction(REQUEST(REMOVEPRODUCT));
export const removeProductToCartSuccessAction = createAction(SUCCESS(REMOVEPRODUCT));

export const fetchProductsRequestAction = createAction(REQUEST(GETPRODUCTS));
export const fetchProductsSuccessAction = createAction(SUCCESS(GETPRODUCTS));
export const fetchProductsFailureAction = createAction(FAILURE(GETPRODUCTS));