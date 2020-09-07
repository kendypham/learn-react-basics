import React, { useState, useCallback, useMemo } from "react";
import "./App.scss";
import Hero from './components/Hero';

function App() {
  const [count, setCount] = useState(0);
  const handleChange = useCallback(() => { }, []);
  const data = useMemo(() => [{}, {}, {}], []);
  return (
    <div className="app">
      <h1>React hooks</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <Hero name="Learning React" onClick={handleChange} data={data} />
    </div>
  );
}

export default App;
