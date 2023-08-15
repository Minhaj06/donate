import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container">
        <h1 className="text-6xl text-amber-600">Hello</h1>
        <button className="btn btn-secondary capitalize text-lg">Click Me</button>
      </div>
    </>
  );
}

export default App;
