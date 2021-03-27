import { createAction } from "redux-actions";
import { 
    FAILURE, 
    REQUEST, 
    SUCCESS 
} from "../../shared/Utils/actions";
import { 
    TODOSYNC,
    SAVETODO,
    UPDATETODO
} from "./constants";

export const todoSyncRequestAction = createAction(REQUEST(TODOSYNC));
export const todoSyncSuccessAction = createAction(SUCCESS(TODOSYNC));
export const todoSyncFailureAction = createAction(FAILURE(TODOSYNC));

export const todoSaveRequestAction = createAction(REQUEST(SAVETODO));
export const todoSaveSuccessAction = createAction(SUCCESS(SAVETODO));
export const todoSaveFailureAction = createAction(FAILURE(SAVETODO));

export const todoChangeRequestAction = createAction(REQUEST(UPDATETODO));
export const todoChangeSuccessAction = createAction(SUCCESS(UPDATETODO));
export const todoChangeFailureAction = createAction(FAILURE(UPDATETODO));