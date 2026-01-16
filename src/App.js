import { useState } from "react";
import "./App.css";

// PC PARTS DATA
const GPUS = {
  "RTX 4090": { name: "NVIDIA RTX 4090", fps: 1.0, price: 1599 },
  "RTX 4080": { name: "NVIDIA RTX 4080", fps: 0.85, price: 1199 },
  "RX 7900 XTX": { name: "AMD RX 7900 XTX", fps: 0.83, price: 999 },
};

const CPUS = {
  "RYZEN 9": { name: "AMD Ryzen 9 7950X", fps: 1.0, price: 549 },
  "RYZEN 7": { name: "AMD Ryzen 7 7800X3D", fps: 0.95, price: 449 },
  "RYZEN 5": { name: "AMD Ryzen 5 7600X", fps: 0.8, price: 299 },
};

const RAMS = {
  "16GB DDR5": { name: "16GB DDR5 6000MHz", fps: 0.95, price: 89 },
  "32GB DDR5": { name: "32GB DDR5 6000MHz", fps: 1.0, price: 149 },
  "64GB DDR5": { name: "64GB DDR5 6000MHz", fps: 1.02, price: 279 },
};

const MOBOS = {
  "B650": { name: "B650 Chipset", fps: 1.0, price: 199 },
  "X670": { name: "X670 Chipset", fps: 1.0, price: 299 },
  "X870E": { name: "X870E Chipset", fps: 1.0, price: 499 },
};

function App() {
  const [selectedGPU, setSelectedGPU] = useState(null);
  const [selectedCPU, setSelectedCPU] = useState(null);
  const [selectedMOBO, setSelectedMOBO] = useState(null);
  const [selectedRAM, setSelectedRAM] = useState(null);

  const estimatedFPS =
    selectedGPU && selectedCPU && selectedRAM
      ? Math.round(200 * selectedGPU.fps * selectedCPU.fps * selectedRAM.fps)
      : null;

  const totalPrice =
    (selectedGPU?.price || 0) +
    (selectedCPU?.price || 0) +
    (selectedRAM?.price || 0) +
    (selectedMOBO?.price || 0);

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1 className="title">PC BUILDER</h1>
          <p className="subtitle">Configure your dream gaming rig</p>
        </header>

        {/* Component Grid */}
        <div className="components-grid">
          {/* GPU */}
          <div className="component-card">
            <div className="card-header">
              <label className="component-label">Graphics Card</label>
              {selectedGPU && <span className="price">${selectedGPU.price}</span>}
            </div>
            <select
              className="component-select"
              value={selectedGPU?.name || ""}
              onChange={(e) => setSelectedGPU(GPUS[e.target.value] || null)}
            >
              <option value="">Select GPU</option>
              {Object.entries(GPUS).map(([key, gpu]) => (
                <option key={key} value={key}>
                  {gpu.name}
                </option>
              ))}
            </select>
          </div>

          {/* CPU */}
          <div className="component-card">
            <div className="card-header">
              <label className="component-label">Processor</label>
              {selectedCPU && <span className="price">${selectedCPU.price}</span>}
            </div>
            <select
              className="component-select"
              value={selectedCPU?.name || ""}
              onChange={(e) => setSelectedCPU(CPUS[e.target.value] || null)}
            >
              <option value="">Select CPU</option>
              {Object.entries(CPUS).map(([key, cpu]) => (
                <option key={key} value={key}>
                  {cpu.name}
                </option>
              ))}
            </select>
          </div>

          {/* Motherboard */}
          <div className="component-card">
            <div className="card-header">
              <label className="component-label">Motherboard</label>
              {selectedMOBO && <span className="price">${selectedMOBO.price}</span>}
            </div>
            <select
              className="component-select"
              value={selectedMOBO?.name || ""}
              onChange={(e) => setSelectedMOBO(MOBOS[e.target.value] || null)}
            >
              <option value="">Select Motherboard</option>
              {Object.entries(MOBOS).map(([key, mobo]) => (
                <option key={key} value={key}>
                  {mobo.name}
                </option>
              ))}
            </select>
          </div>

          {/* RAM */}
          <div className="component-card">
            <div className="card-header">
              <label className="component-label">Memory</label>
              {selectedRAM && <span className="price">${selectedRAM.price}</span>}
            </div>
            <select
              className="component-select"
              value={selectedRAM?.name || ""}
              onChange={(e) => setSelectedRAM(RAMS[e.target.value] || null)}
            >
              <option value="">Select RAM</option>
              {Object.entries(RAMS).map(([key, ram]) => (
                <option key={key} value={key}>
                  {ram.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Panel */}
        {(estimatedFPS || totalPrice > 0) && (
          <div className="results-panel">
            <div className="results-grid">
              {estimatedFPS && (
                <div className="result-card fps-card">
                  <span className="result-label">Estimated FPS</span>
                  <span className="result-value">{estimatedFPS}</span>
                  <span className="result-sublabel">@ 1080p Ultra</span>
                </div>
              )}
              
              {totalPrice > 0 && (
                <div className="result-card price-card">
                  <span className="result-label">Total Cost</span>
                  <span className="result-value">${totalPrice.toLocaleString()}</span>
                  <span className="result-sublabel">Parts Only</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;