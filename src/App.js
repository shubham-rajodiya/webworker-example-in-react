import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [webworker] = useState(new window.Worker("worker.js"));
  const [result, setResult] = useState("Calculating....");

  useEffect(() => {
    const message = { multiply: { array: new Array(1000).fill(2) } };
    webworker.postMessage(message);
    webworker.onerror = () => {
      setResult("Error");
    };

    webworker.onmessage = (e) => {
      if (e.data) {
        setResult(e.data.result);
      } else {
        setResult("Error");
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      webworker.terminate();
    };
  }, []);

  return (
    <div className="App">
      <h1>webworker-example-in-react</h1>
      <header className="App-header">
        <h1>Multiplication Of large array</h1>
        <h2>Result: {result}</h2>
      </header>
    </div>
  );
}

export default App;
