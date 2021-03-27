import { connect } from "react-redux";
import Todo from "./components/Todo/Todo";
import { 
    todoSaveRequestAction,
    todoSyncRequestAction 
} from "./actions"
import { RootState } from "../../store/reducers";
const mapStateToProps = (state: RootState) => ({
    ...state.todos
});

const mapDispatchToProps = {
    todoSaveRequestAction,
    todoSyncRequestAction
};

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
