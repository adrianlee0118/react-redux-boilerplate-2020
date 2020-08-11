import { INCREMENT, DECREMENT } from "../constants";

//Reducer -- a controller operating on some part of the application's state which receives standardized instructions and acts on the state according to the dispatched instruction.

//Initial state
const initialState = {
  count: 0,
};

//Controller for some existing state that originates from initialState
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default reducer;
