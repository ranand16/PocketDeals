import { combineReducers } from 'redux';
// import login from './login'
import products from '../../modules/Products/reducer'
import registerState from '../../shared/Register/reducer'
import todos from '../../modules/BackendIntegratioCheck/reducer'

// All Reducers - '../../containers/*/reducers'
// import employeesReducer from '../../components/Product/reducers';

const rootReducer = combineReducers<any>({
  // employeesReducer,
  // login,
  todos,
  products,
  registerState
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
