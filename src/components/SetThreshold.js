import React, { useState } from "react";
import axios from "axios";
import "./SetThreshold.css";

const SetThreshold = () => {
  const [nodeId, setNodeId] = useState("1"); // Default to Node 1
  const [threshold, setThreshold] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Validation for threshold
    if (!threshold) {
      setError("Threshold is required.");
      return;
    }
    if (isNaN(threshold) || parseInt(threshold, 10) < 0) {
      setError("Threshold must be a positive number.");
      return;
    }

    try {
      const response = await axios.post(
        `https://8ad1-124-111-21-208.ngrok-free.app/set_threshold/${nodeId}`,
        { threshold: parseInt(threshold, 10) }
      );

      if (response.status === 200 && response.data.status === "success") {
        setMessage(`Threshold set successfully for Node ${nodeId}`);
      } else {
        setError(response.data.message || "Failed to set threshold.");
      }
    } catch (err) {
      setError(`Error setting threshold: ${err.message}`);
    }
  };

  return (
    <div className="set-threshold">
      <h2>Set Moisture Threshold</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nodeId">Node ID:</label>
          <select
            id="nodeId"
            value={nodeId}
            onChange={(e) => setNodeId(e.target.value)}
          >
            <option value="1">Node 1</option>
            <option value="2">Node 2</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="threshold">Threshold:</label>
          <input
            type="number"
            id="threshold"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            placeholder="Enter Threshold Value"
          />
        </div>
        <button type="submit">Set Threshold</button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SetThreshold;
