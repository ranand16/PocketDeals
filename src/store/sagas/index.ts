import { all } from 'redux-saga/effects';

// All Sagas - '../../containers/*/sagas'
// import employeesSaga from '../../components/Product/sagas';
// import analytics from './analytics'
// import functions from './functions'
// import messaging from './messaging'
// import storage from './storage'
import todoSagaManager from '../../modules/BackendIntegratioCheck/saga'
import productSagaManager from '../../modules/Products/saga'
import registerSagaManager from '../../shared/Register/saga';

export default function* rootSaga() {
  // console.log(todoSagaManager)
  // console.log(login)
  yield all([
    // fork(employeesSaga),
    // fork(analytics),
    // fork(functions),
    // fork(login),
    // login(),
    // fork(messaging),
    // fork(storage),
    productSagaManager(),
    todoSagaManager(),
    registerSagaManager()
    // fork(todoSagaManager),
  ]);
}