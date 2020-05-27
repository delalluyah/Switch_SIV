import { combineReducers } from "redux";
import auth from "./authReducer";
import errors from "./errorsReducer";
import messages from "./messagesReducer";
import sales from "./salesReducer";

export default combineReducers({ auth, errors, messages, sales });
