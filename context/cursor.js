import React, { useEffect, useState } from "react";
import classNames from "classnames";

export const CursorContext = React.createContext("cursorContext");

const SUPPORTED_CURSORS = [false, 'pointer', 'drag', 'more', 'back-to-top'];

export const CursorProvider = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursor, setCursor] = useState(false);

  const onMouseMove = event => {
    const { pageX: x, pageY: y } = event;
    setMousePosition({ x, y });
  };


  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove); 
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  });

  const { x, y } = mousePosition;

  const onCursor = cursorType => {
    cursorType = (SUPPORTED_CURSORS.includes(cursorType) && cursorType) || false;
    setCursor(cursorType);
  };

  return (
    <CursorContext.Provider value={{ onCursor }}>
      <ins
        className={classNames('cursor', {
          'active': !!cursor,
          [`cursor-${cursor}`]: !!cursor
        })}
        style={{
          left: `${x}px`,
          top: `${y}px`
        }}
        id="cursor"
      />
      {children}
    </CursorContext.Provider>
  );
};
