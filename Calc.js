import React, { useState } from "react";

function App() {
  const [display, setDisplay] = useState("");

  const click = (value) => {
    if (value === "C")
      setDisplay("");
    else if (value === "=") {
      try {
        setDisplay(eval(display).toString());
      } catch {
        setDisplay("Error");
      }
    } else
      setDisplay(display + value);
  };

  const style = {
    width: "280px",
    margin: "80px auto",
    padding: "20px",
    textAlign: "center",
    background: "#f3e8ff",
    borderRadius: "15px",
    boxShadow: "0 0 15px gray"
  };

  return (
    <div style={style}>
      <h2>Calculator</h2>

      <input
        value={display}
        readOnly
        style={{
          width: "90%",
          padding: "12px",
          marginBottom: "15px",
          fontSize: "20px",
          textAlign: "right"
        }}
      />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "8px"
      }}>
        {["7","8","9","/","4","5","6","*",
          "1","2","3","-","C","0","=","+"].map((b) => (
          <button
            onClick={() => click(b)}
            style={{
              padding: "15px",
              fontSize: "18px",
              border: "none",
              borderRadius: "8px",
              background: "#d8b4fe"
            }}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;