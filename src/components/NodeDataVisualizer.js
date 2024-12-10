import React, { useState } from "react";
import axios from "axios";
import "./NodeDataVisualizer.css";

const NodeDataVisualizer = () => {
  const [nodeData, setNodeData] = useState({ 1: [], 2: [] });
  const [tankData, setTankData] = useState({ 1: "Tank_status", 2: "Tank_status" });
  const [activeTab, setActiveTab] = useState(1);
  const [error, setError] = useState("");

  const fetchNodeData = async (nodeId) => {
    setError("");
    try {
      const response = await axios.get(`https://smart-farm-v14p.onrender.com/get_node_data/${nodeId}`);
      if (response.status === 200 && response.data.status === "success") {
        setNodeData((prevData) => ({ ...prevData, [nodeId]: response.data.data }));
      } else {
        setError(`Failed to fetch data for Node ${nodeId}`);
      }
    } catch (err) {
      setError(`Error fetching data for Node ${nodeId}: ${err.message}`);
    }
  };

  const fetchTankData = async (nodeId) => {
    setError("");
    try {
      const response = await axios.get(`https://smart-farm-v14p.onrender.com/tank_data/${nodeId}`);
      if (response.status === 200) {
        setTankData((prevData) => ({
          ...prevData,
          [nodeId]: {
            water_level: response.data.water_level,
            timestamp: response.data.timestamp,
          },
        }));
      } else {
        setTankData((prevData) => ({ ...prevData, [nodeId]: "Tank node seems to be offline" }));
      }
    } catch {
      setTankData((prevData) => ({ ...prevData, [nodeId]: "Tank node seems to be offline" }));
    }
  };

  const handleTabClick = (nodeId) => {
    setActiveTab(nodeId);
    fetchNodeData(nodeId);
    fetchTankData(nodeId);
  };

  return (
    <div className="node-visualizer">
      <h2>Latest Five Data points</h2>

      <div className="tabs">
        <button
          className={activeTab === 1 ? "tab active" : "tab"}
          onClick={() => handleTabClick(1)}
        >
          Node 1
        </button>
        <button
          className={activeTab === 2 ? "tab active" : "tab"}
          onClick={() => handleTabClick(2)}
        >
          Node 2
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="table-container">
        {nodeData[activeTab].length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Moisture</th>
                <th>Humidity</th>
                <th>Temperature</th>
                <th>Pump Status</th>
              </tr>
            </thead>
            <tbody>
              {nodeData[activeTab].map((entry, index) => (
                <tr key={index}>
                  <td>{entry.timestamp}</td>
                  <td>{entry.moisture}</td>
                  <td>{entry.humidity}</td>
                  <td>{entry.temperature}</td>
                  <td>{entry.pump_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available for Node {activeTab}</p>
        )}
      </div>

      <div className="tank-container">
        <h3>Tank Data</h3>
        {typeof tankData[activeTab] === "string" ? (
            <p className="tank-status">{tankData[activeTab]}</p>
        ) : (
            <div className="tank-status">
            <p>
                <strong>Level:</strong> {tankData[activeTab].water_level}
            </p>
            <p>
                <strong>Time:</strong> {tankData[activeTab].timestamp}
            </p>
            </div>
        )}
        </div>
    </div>
  );
};

export default NodeDataVisualizer;

