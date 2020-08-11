import React from "react";
import reducer from "./reducers";
import Counter from "./components/Counter";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./App.css";

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

export default App;
