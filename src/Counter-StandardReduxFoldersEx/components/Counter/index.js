import React from "react";
import { doIncrement, doDecrement } from "../../actions";
import { connect } from "react-redux";

//Component--handles the presentation given some props which may include state. Contains methods that dispatch action types to reducers.
const Counter = ({ count }) => {
  const increment = () => {
    this.props.dispatch(doIncrement);
  };

  const decrement = () => {
    this.props.dispatch(doDecrement);
  };

  return (
    <div>
      <h2>Counter</h2>
      <div>
        <button onClick={decrement}>-</button>
        <span>{count}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

// Counter component needs to access count state to present it, so make it accessible from props
const mapStateToProps = (state) => ({
  count: state.count,
});

export default connect(mapStateToProps)(Counter);
