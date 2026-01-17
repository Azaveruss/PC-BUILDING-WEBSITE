import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

// EmailJS configuration - Replace these with your actual IDs from emailjs.com
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

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

const PREBUILTS = [
  {
    name: "Budget Beast",
    gpu: "RX 7900 XTX",
    cpu: "RYZEN 5",
    ram: "16GB DDR5",
    mobo: "B650",
    description: "Great 1080p gaming performance",
  },
  {
    name: "Sweet Spot",
    gpu: "RTX 4080",
    cpu: "RYZEN 7",
    ram: "32GB DDR5",
    mobo: "X670",
    description: "Excellent 1440p gaming",
  },
  {
    name: "Ultimate",
    gpu: "RTX 4090",
    cpu: "RYZEN 9",
    ram: "64GB DDR5",
    mobo: "X870E",
    description: "No compromises 4K gaming",
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState("builder");
  const [selectedGPU, setSelectedGPU] = useState(null);
  const [selectedCPU, setSelectedCPU] = useState(null);
  const [selectedMOBO, setSelectedMOBO] = useState(null);
  const [selectedRAM, setSelectedRAM] = useState(null);
  const [compareBuilds, setCompareBuilds] = useState([null, null]);
  const [formStatus, setFormStatus] = useState("idle"); // idle, sending, sent, error
  const formRef = useRef();

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus("sending");

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setFormStatus("sent");
        formRef.current.reset();
        setTimeout(() => setFormStatus("idle"), 5000);
      })
      .catch(() => {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 5000);
      });
  };

  const estimatedFPS =
    selectedGPU && selectedCPU && selectedRAM
      ? Math.round(200 * selectedGPU.fps * selectedCPU.fps * selectedRAM.fps)
      : null;

  const totalPrice =
    (selectedGPU?.price || 0) +
    (selectedCPU?.price || 0) +
    (selectedRAM?.price || 0) +
    (selectedMOBO?.price || 0);

  const calculateBuildStats = (build) => {
    if (!build) return null;
    const gpu = GPUS[build.gpu];
    const cpu = CPUS[build.cpu];
    const ram = RAMS[build.ram];
    const mobo = MOBOS[build.mobo];
    return {
      fps: Math.round(200 * gpu.fps * cpu.fps * ram.fps),
      price: gpu.price + cpu.price + ram.price + mobo.price,
    };
  };

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-top">
            <h1 className="title">CUSTOMWORX</h1>
          </div>
          <nav className="nav-tabs">
            <button
              className={`nav-tab ${currentPage === "builder" ? "active" : ""}`}
              onClick={() => setCurrentPage("builder")}
            >
              Builder
            </button>
            <button
              className={`nav-tab ${currentPage === "prebuilts" ? "active" : ""}`}
              onClick={() => setCurrentPage("prebuilts")}
            >
              Prebuilts
            </button>
            <button
              className={`nav-tab ${currentPage === "compare" ? "active" : ""}`}
              onClick={() => setCurrentPage("compare")}
            >
              Compare
            </button>
            <button
              className={`nav-tab ${currentPage === "about" ? "active" : ""}`}
              onClick={() => setCurrentPage("about")}
            >
              About
            </button>
            <button
              className={`nav-tab ${currentPage === "contact" ? "active" : ""}`}
              onClick={() => setCurrentPage("contact")}
            >
              Contact
            </button>
          </nav>
        </header>

        {/* Builder Page */}
        {currentPage === "builder" && (
          <>
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
          </>
        )}

        {/* Prebuilts Page */}
        {currentPage === "prebuilts" && (
          <div className="prebuilts-grid">
            {PREBUILTS.map((build) => {
              const stats = calculateBuildStats(build);
              return (
                <div key={build.name} className="prebuilt-card">
                  <h3 className="prebuilt-name">{build.name}</h3>
                  <p className="prebuilt-description">{build.description}</p>
                  <div className="prebuilt-specs">
                    <div className="spec-row">
                      <span className="spec-label">GPU</span>
                      <span className="spec-value">{GPUS[build.gpu].name}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">CPU</span>
                      <span className="spec-value">{CPUS[build.cpu].name}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">RAM</span>
                      <span className="spec-value">{RAMS[build.ram].name}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Motherboard</span>
                      <span className="spec-value">{MOBOS[build.mobo].name}</span>
                    </div>
                  </div>
                  <div className="prebuilt-stats">
                    <div className="prebuilt-stat">
                      <span className="stat-value fps">{stats.fps} FPS</span>
                      <span className="stat-label">@ 1080p Ultra</span>
                    </div>
                    <div className="prebuilt-stat">
                      <span className="stat-value price">${stats.price.toLocaleString()}</span>
                      <span className="stat-label">Total</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Compare Page */}
        {currentPage === "compare" && (
          <div className="compare-container">
            <div className="compare-grid">
              {[0, 1].map((index) => (
                <div key={index} className="compare-column">
                  <select
                    className="component-select"
                    value={compareBuilds[index]?.name || ""}
                    onChange={(e) => {
                      const build = PREBUILTS.find((b) => b.name === e.target.value) || null;
                      setCompareBuilds((prev) => {
                        const next = [...prev];
                        next[index] = build;
                        return next;
                      });
                    }}
                  >
                    <option value="">Select a build</option>
                    {PREBUILTS.map((build) => (
                      <option key={build.name} value={build.name}>
                        {build.name}
                      </option>
                    ))}
                  </select>
                  {compareBuilds[index] && (
                    <div className="compare-details">
                      <h3 className="compare-name">{compareBuilds[index].name}</h3>
                      <div className="compare-specs">
                        <div className="spec-row">
                          <span className="spec-label">GPU</span>
                          <span className="spec-value">{GPUS[compareBuilds[index].gpu].name}</span>
                        </div>
                        <div className="spec-row">
                          <span className="spec-label">CPU</span>
                          <span className="spec-value">{CPUS[compareBuilds[index].cpu].name}</span>
                        </div>
                        <div className="spec-row">
                          <span className="spec-label">RAM</span>
                          <span className="spec-value">{RAMS[compareBuilds[index].ram].name}</span>
                        </div>
                        <div className="spec-row">
                          <span className="spec-label">Motherboard</span>
                          <span className="spec-value">{MOBOS[compareBuilds[index].mobo].name}</span>
                        </div>
                      </div>
                      {(() => {
                        const stats = calculateBuildStats(compareBuilds[index]);
                        return (
                          <div className="compare-stats">
                            <div className="compare-stat">
                              <span className="stat-value fps">{stats.fps} FPS</span>
                            </div>
                            <div className="compare-stat">
                              <span className="stat-value price">${stats.price.toLocaleString()}</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About Page */}
        {currentPage === "about" && (
          <div className="page-content">
            <div className="content-card">
              <h2 className="page-title">About Customworx</h2>
              <p className="page-text">
                We're passionate about helping gamers build their dream PCs. Our mission is to make
                PC building accessible and straightforward, whether you're a first-time builder or
                a seasoned enthusiast.
              </p>
              <p className="page-text">
                Our FPS calculator uses real-world benchmarks to give you accurate performance
                estimates, so you know exactly what to expect from your build before you buy.
              </p>
              <div className="features-grid">
                <div className="feature">
                  <h3 className="feature-title">Custom Builds</h3>
                  <p className="feature-text">Configure your perfect PC with our intuitive builder tool.</p>
                </div>
                <div className="feature">
                  <h3 className="feature-title">Prebuilt Options</h3>
                  <p className="feature-text">Choose from our curated selection of optimized builds.</p>
                </div>
                <div className="feature">
                  <h3 className="feature-title">Compare Builds</h3>
                  <p className="feature-text">See how different configurations stack up side by side.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Page */}
        {currentPage === "contact" && (
          <div className="page-content">
            <div className="content-card">
              <h2 className="page-title">Contact Us</h2>
              <p className="page-text">
                Have questions about your build? Need help choosing components? We're here to help.
              </p>
              <form ref={formRef} className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="user_name"
                    className="form-input"
                    placeholder="Your name"
                    required
                    disabled={formStatus === "sending"}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="user_email"
                    className="form-input"
                    placeholder="your@email.com"
                    required
                    disabled={formStatus === "sending"}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    className="form-textarea"
                    placeholder="How can we help?"
                    rows="5"
                    required
                    disabled={formStatus === "sending"}
                  />
                </div>
                <button
                  type="submit"
                  className={`submit-btn ${formStatus}`}
                  disabled={formStatus === "sending"}
                >
                  {formStatus === "idle" && "Send Message"}
                  {formStatus === "sending" && "Sending..."}
                  {formStatus === "sent" && "Message Sent!"}
                  {formStatus === "error" && "Failed - Try Again"}
                </button>
                {formStatus === "sent" && (
                  <p className="form-success">Thanks for reaching out! We'll get back to you soon.</p>
                )}
                {formStatus === "error" && (
                  <p className="form-error">Something went wrong. Please try again or email us directly.</p>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;