import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import "./index.css";
import App from "./Components/App";
import rootReducer from './reducers';

//function logger
// const logger = function ({ dispatch, getState}) {
//     return function (next) {
//         return function (action) {
//             //middleware code
//             if(typeof action !== 'function')
//             {
//                 console.log(action.type);
//             }
//             next(action);
//         }
//     }
// }

const logger = ({dispatch, getState}) => (next) => (action) => {
    //logger code
    if(typeof action !== 'function')
    {
        console.log(action.type);
    }
    next(action);
}

// const thunk = ({dispatch, getState}) => (next) => (action) => {
//     //logger code
//     if(typeof action === 'function')
//     {
//         action(dispatch);
//         return;
//     }
//     next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger,thunk));
console.log('store',store);
// console.log('Before State ',store.getState());

// store.dispatch({
//     type: 'ADD_MOVIES',
//     movies: [{ name: 'Superman'}]
// });
// console.log('After State ',store.getState());

ReactDOM.render(<App store={store}/>, document.getElementById("root"));
 