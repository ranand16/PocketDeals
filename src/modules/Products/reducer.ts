import { LOADING } from "../../config/constants"
import { Actions } from "../../Interfaces/actions"
import { FAILURE, REQUEST, SUCCESS } from "../../shared/Utils/actions"
import { ADDPRODUCT, GETPRODUCTS, REMOVEPRODUCT } from "./constants"
import { AddToCart, RemoveFromCart } from "../../shared/Utils/AddToCart"

interface Product {

}

interface Cart {

}

const initialState = {
    list : [],
    listLoading : undefined,
    listLoadingError : undefined,
    addingProduct : undefined,
    addingProductError : undefined,
    cart: []
}

interface ProductState {
    list: any[];
    listLoading: string | undefined;
    listLoadingError: string | undefined;

    addingProduct: string | undefined;
    addingProductError: string | undefined;

    cart: any[];
}

export default (
        state: ProductState = initialState, 
        action: Actions
    ) => {
    switch(action.type) {
        case REQUEST(ADDPRODUCT): 
        const product = [...state.list].filter(prod=> prod.id === action.payload)
        return {
            ...state,
            cart: AddToCart(state.cart, product[0])
        }
        case REQUEST(REMOVEPRODUCT): 
        const productToRemoved = [...state.list].filter(prod=> prod.id === action.payload)
        const remo = RemoveFromCart(state.cart, productToRemoved[0].id)
        return {
            ...state,
            cart: remo
        }
        case REQUEST(GETPRODUCTS):
        return {
            ...state,
            listLoading: `${LOADING} product list`
        }
        case SUCCESS(GETPRODUCTS): 
        return {
            ...state,
            list: action.payload,
            listLoading: undefined
        }
        default:
            return state
    }
}