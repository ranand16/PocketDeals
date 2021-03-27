import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import { Actions } from '../../Interfaces/actions'
import { REQUEST } from '../../shared/Utils/actions'
import { 
  addProductToCartSuccessAction, 
  fetchProductsFailureAction, 
  fetchProductsSuccessAction, 
  removeProductToCartSuccessAction
} from './actions'
import { ADDPRODUCT, REMOVEPRODUCT } from './constants'
import Tabletop from "tabletop";

function* addproductToCart(action: Actions) {
  yield put(addProductToCartSuccessAction(action))
}

function* removeproductFromCart(action: Actions) {
  yield put(removeProductToCartSuccessAction(action))
}

function* syncProductsSaga() {
  try {
    const productDetailsResponse = yield call(Tabletop.init,{
      key: "1uEIXiVcmX6_bnAY6LjrOpmPCAa9nHw1uJx2HqMPFUmk",
      simpleSheet: true
    })
    if(productDetailsResponse) {
      yield put(fetchProductsSuccessAction(productDetailsResponse))
    }
  }
  catch(error) {
		yield put(fetchProductsFailureAction(error))
  }
}

export default function* productSagaManager() {
  yield all([
    yield fork(syncProductsSaga),
    takeLatest(REQUEST(ADDPRODUCT), addproductToCart),
    takeLatest(REQUEST(REMOVEPRODUCT), removeproductFromCart)
  ])
}