import { all, call, fork, takeLatest } from 'redux-saga/effects'
import { Actions } from '../../Interfaces/actions'
import rsf from '../../rsf'
import { REQUEST } from '../../shared/Utils/actions'
import { todoSyncSuccessAction } from './actions'
import { SAVETODO, UPDATETODO } from './constants'

function* saveNewTodo(action: Actions) {
  try {
    const response = yield call(rsf.firestore.addDocument, 'todos', action.payload);
    // if (response.status === 200 && response.data.status === 200) {
      // yield put(todoSaveSuccessAction(response.data.data));
    // } else {
    //   yield put(todoSaveFailureAction(response.data.data));
    // }
  } catch (e) {
    // yield put(todoSaveFailureAction(e));
  }
}

function* updateTodoDetails(action: Actions) {
  yield call(rsf.firestore.updateDocument, `todos/${action.payload.todoId}`, {
    done: action.payload.done,
  })
}

const todosTransformer = (todos: any) => {
  const res: any = []
  todos.forEach((doc: any) =>
    res.push({
      id: doc.id,
      ...doc.data(),
    }),
  )
  return res
}

function* syncTodosSaga() {
  yield fork(rsf.firestore.syncCollection, 'todos', {
    successActionCreator: todoSyncSuccessAction,
    transform: todosTransformer,
  })
}

export default function* todoSagaManager() {
  yield all([
    yield fork(syncTodosSaga),
    takeLatest(REQUEST(SAVETODO), saveNewTodo),
    takeLatest(REQUEST(UPDATETODO), updateTodoDetails)
  ])
}