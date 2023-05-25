import {createStore} from 'redux';
import setUserReducer from "./reducers/setFetchedUserReducer";

const configureStore = () => {
    return createStore(setUserReducer)
}

export default configureStore;