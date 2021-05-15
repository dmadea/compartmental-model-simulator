import { createStore, combineReducers } from 'redux';
import mainPage from './reducers/mainPage';
import graph from './reducers/graph';

// https://github.com/zalmoxisus/redux-devtools-extension#usage
const store = createStore(combineReducers({
     mainPage,
     graph 
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;