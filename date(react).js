import React from "react";

function App() {
  const currentDate = new Date();

  return (
    <div>
      <h1>Current System Date and Time</h1>
      <h2>{currentDate.toLocaleString()}</h2>
    </div>
  );
}

export default App;