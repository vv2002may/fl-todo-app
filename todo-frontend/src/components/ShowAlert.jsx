import React, { memo } from "react";
import { useEffect } from "react";

const ShowAlert = memo(function ({ message, setMessage }) {
  const divRef = React.useRef();

  return (
    <div>
      <div ref={divRef} className="custom-alert">
        <p>{message}</p>
        <div
          style={
            {
              display: 'none',
            }
          }
        >
          {setTimeout(() => {
            if (divRef.current) {
              divRef.current.remove();
              setMessage("");
            }
          }, 2000)}
        </div>
      </div>
    </div>
  );
});

export default ShowAlert;
