import { LOADING } from "../../config/constants"
import { Actions } from "../../Interfaces/actions"
import { FAILURE, REQUEST, SUCCESS } from "../../shared/Utils/actions"
import { SAVETODO, TODOSYNC, UPDATETODO } from "./constants"

const initialState = {
  list: [],
  new: "",
  useFirestore: true, // this needs to be true all the time since I don't want to use realtime db
  listLoading: undefined,
  listSaving: "",
  listError: "",
  listUpdating: "",
  listUpdatingError: ""
}

interface TodoState {
  list: any;
  new: string;
  useFirestore: boolean;
  listLoading: string | undefined;
  listSaving: string;
  listError: string;

  listUpdating: string;
  listUpdatingError: string;
}

export default (
  state: TodoState = initialState, 
  action: Actions
) => {
  switch (action.type) {
    case REQUEST(TODOSYNC):
      return {
        ...state,
        listLoading: LOADING
      }
    case SUCCESS(TODOSYNC):
      return {
        ...state,
        list: action.payload,
        listLoading: undefined
      }
    case FAILURE(TODOSYNC):
      return {
        ...state,
        listError: "There was error while syncing the todo list"
      }

    // SAVING  TODO
    case REQUEST(SAVETODO):
      return {
        ...state,
        listSaving: "Saving new todo"
      }
    case SUCCESS(SAVETODO):
      return {
        ...state,
        listSaving: "New todo is saved successfully",
      }
    case FAILURE(SAVETODO):
      return {
        ...state,
        listError: "There was an error while saving new todo"
      }

    // UPDATING TODO
    case REQUEST(UPDATETODO):
      return {
        ...state,
        listUpdating: "Todo updating"
      }
    case SUCCESS(UPDATETODO):
      return {
        ...state,
        listUpdating: "Todo is updated successfully",
      }
    case FAILURE(UPDATETODO):
      return {
        ...state,
        listUpdatingError: "There was an error while updating todo"
      }
    default:
      return state
  }
}