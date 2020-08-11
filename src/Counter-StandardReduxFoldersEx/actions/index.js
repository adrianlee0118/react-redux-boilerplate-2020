import { INCREMENT, DECREMENT } from "../constants";

//Actions: translation of standard actions into dispatch action types sent to the reducer to invoke a standard response
const doIncrement = () => {
  return {
    type: INCREMENT,
  };
};

const doDecrement = () => {
  return {
    type: DECREMENT,
  };
};

export { doIncrement, doDecrement };
