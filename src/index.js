import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import movies from './reducers';
import "./index.css";
import App from "./Components/App";

const store = createStore(movies);
console.log('store',store);
// console.log('Before State ',store.getState());

// store.dispatch({
//     type: 'ADD_MOVIES',
//     movies: [{ name: 'Superman'}]
// });
// console.log('After State ',store.getState());

ReactDOM.render(<App store={store}/>, document.getElementById("root"));
 