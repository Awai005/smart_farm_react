import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import NodeDataVisualizer from "./components/NodeDataVisualizer";
import SetThreshold from "./components/SetThreshold";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={
              <>
                <NodeDataVisualizer />
                <SetThreshold />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

