import React from "react";
import { CursorContext } from "@context/cursor"

export default function withAppContext(Component) {
  return function WrapperComponent(props) {
    return (
      <CursorContext.Consumer>
        {state => <Component {...props} context={state} />}
      </CursorContext.Consumer>
    );
  };
}
