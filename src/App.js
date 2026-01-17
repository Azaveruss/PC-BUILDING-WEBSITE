import { useState } from "react";

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
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedGPU, setSelectedGPU] = useState(null);
  const [selectedCPU, setSelectedCPU] = useState(null);
  const [selectedMOBO, setSelectedMOBO] = useState(null);
  const [selectedRAM, setSelectedRAM] = useState(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" });

  const estimatedFPS =
    selectedGPU && selectedCPU && selectedRAM
      ? Math.round(200 * selectedGPU.fps * selectedCPU.fps * selectedRAM.fps)
      : null;

  const totalPrice =
    (selectedGPU?.price || 0) +
    (selectedCPU?.price || 0) +
    (selectedRAM?.price || 0) +
    (selectedMOBO?.price || 0);

  const assemblyFee = 150;
  const finalPrice = totalPrice > 0 ? totalPrice + assemblyFee : 0;

  const handleSubmitQuote = () => {
    console.log("Quote requested:", { ...formData, build: { selectedGPU, selectedCPU, selectedMOBO, selectedRAM, finalPrice } });
    alert("Quote request submitted! We'll contact you within 24 hours.");
    setShowQuoteForm(false);
    setFormData({ name: "", email: "", phone: "", notes: "" });
  };

  // LANDING PAGE
  if (currentPage === "home") {
    return (
      <div style={{ background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
        {/* Navigation */}
        <nav style={{
          borderBottom: "1px solid #1a1a1a",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h1 style={{
            fontSize: "24px",
            fontWeight: "900",
            letterSpacing: "2px",
            margin: 0
          }}>CUSTOMWORX</h1>
          <button
            onClick={() => setCurrentPage("builder")}
            style={{
              background: "#fff",
              color: "#000",
              border: "none",
              padding: "12px 28px",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              borderRadius: "4px",
              letterSpacing: "1px"
            }}
          >
            BUILD NOW
          </button>
        </nav>

        {/* Hero Section */}
        <section style={{
          padding: "120px 40px",
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto"
        }}>
          <h1 style={{
            fontSize: "64px",
            fontWeight: "900",
            lineHeight: "1.1",
            marginBottom: "24px",
            letterSpacing: "-2px"
          }}>
            No BS. No Compromise.
            <br />
            <span style={{ color: "#00ff88" }}>Configured by you for you.</span>
          </h1>
          <p style={{
            fontSize: "20px",
            color: "#888",
            marginBottom: "48px",
            lineHeight: "1.6"
          }}>
            Real people building real machines with passion. See your exact performance before you buy.
          </p>
          <button
            onClick={() => setCurrentPage("builder")}
            style={{
              background: "#00ff88",
              color: "#000",
              border: "none",
              padding: "18px 48px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              borderRadius: "6px",
              letterSpacing: "1px"
            }}
          >
            Start Building →
          </button>
        </section>

        {/* How It Works */}
        <section style={{ padding: "80px 40px", background: "#0d0d0d" }}>
          <h2 style={{
            textAlign: "center",
            fontSize: "36px",
            fontWeight: "900",
            marginBottom: "60px",
            letterSpacing: "1px"
          }}>How It Works</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "40px",
            maxWidth: "1000px",
            margin: "0 auto"
          }}>
            {[
              { num: "01", title: "Configure", desc: "Pick your parts and see real-time performance estimates" },
              { num: "02", title: "Request Quote", desc: "Get a detailed breakdown with transparent pricing" },
              { num: "03", title: "We Build", desc: "Professional assembly, rigorous testing, fast shipping" }
            ].map((step, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "48px",
                  fontWeight: "900",
                  color: "#00ff88",
                  marginBottom: "16px"
                }}>{step.num}</div>
                <h3 style={{ fontSize: "24px", marginBottom: "12px" }}>{step.title}</h3>
                <p style={{ color: "#888", lineHeight: "1.6" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: "80px 40px" }}>
          <h2 style={{
            textAlign: "center",
            fontSize: "36px",
            fontWeight: "900",
            marginBottom: "60px"
          }}>Why Customworx</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "40px",
            maxWidth: "1000px",
            margin: "0 auto"
          }}>
            {[
              { icon: "⚡", title: "Performance Guaranteed", desc: "See exact FPS estimates for your favorite games before you buy" },
              { icon: "💎", title: "Transparent Pricing", desc: "No hidden fees. You see exactly what you're paying for" },
              { icon: "🔧", title: "Expert Assembly", desc: "Built by enthusiasts who actually care about your rig" },
              { icon: "🚀", title: "Fast Turnaround", desc: "Most builds shipped within 5-7 business days" }
            ].map((feature, i) => (
              <div key={i} style={{ textAlign: "center", padding: "20px" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>{feature.icon}</div>
                <h3 style={{ fontSize: "20px", marginBottom: "12px" }}>{feature.title}</h3>
                <p style={{ color: "#888", lineHeight: "1.6" }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "80px 40px", textAlign: "center", background: "#0d0d0d" }}>
          <h2 style={{ fontSize: "36px", marginBottom: "32px" }}>Ready to build your dream PC?</h2>
          <button
            onClick={() => setCurrentPage("builder")}
            style={{
              background: "#00ff88",
              color: "#000",
              border: "none",
              padding: "18px 48px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              borderRadius: "6px"
            }}
          >
            Start Your Build
          </button>
        </section>

        {/* Footer */}
        <footer style={{ padding: "40px", textAlign: "center", borderTop: "1px solid #1a1a1a", color: "#666" }}>
          <p>© 2026 Customworx. Built different.</p>
        </footer>
      </div>
    );
  }

  // BUILDER PAGE
  return (
    <div style={{ background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
      {/* Nav */}
      <nav style={{
        borderBottom: "1px solid #1a1a1a",
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1
          onClick={() => setCurrentPage("home")}
          style={{
            fontSize: "24px",
            fontWeight: "900",
            cursor: "pointer",
            margin: 0
          }}
        >CUSTOMWORX</h1>
        <button
          onClick={() => setCurrentPage("home")}
          style={{
            background: "transparent",
            color: "#fff",
            border: "1px solid #333",
            padding: "10px 24px",
            cursor: "pointer",
            borderRadius: "4px"
          }}
        >← Back</button>
      </nav>

      <div style={{ display: "flex", gap: "40px", padding: "40px", maxWidth: "1400px", margin: "0 auto", flexWrap: "wrap" }}>
        {/* Left - Components */}
        <div style={{ flex: "1", minWidth: "300px" }}>
          <h1 style={{ fontSize: "36px", marginBottom: "40px" }}>Configure Your Build</h1>

          {[
            { label: "Graphics Card", data: GPUS, selected: selectedGPU, setter: setSelectedGPU },
            { label: "Processor", data: CPUS, selected: selectedCPU, setter: setSelectedCPU },
            { label: "Motherboard", data: MOBOS, selected: selectedMOBO, setter: setSelectedMOBO },
            { label: "Memory", data: RAMS, selected: selectedRAM, setter: setSelectedRAM }
          ].map((comp, i) => (
            <div key={i} style={{
              background: "#141414",
              border: "1px solid #222",
              borderRadius: "12px",
              padding: "24px",
              marginBottom: "16px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <label style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>
                  {comp.label}
                </label>
                {comp.selected && <span style={{ color: "#00ff88", fontWeight: "700" }}>${comp.selected.price}</span>}
              </div>
              <select
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "#0a0a0a",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "16px",
                  cursor: "pointer"
                }}
                value={comp.selected?.name || ""}
                onChange={(e) => comp.setter(comp.data[e.target.value] || null)}
              >
                <option value="">Select {comp.label}</option>
                {Object.entries(comp.data).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.name} - ${item.price}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Right - Summary */}
        <div style={{ width: "400px", minWidth: "300px" }}>
          <div style={{
            position: "sticky",
            top: "40px",
            background: "#141414",
            border: "1px solid #222",
            borderRadius: "12px",
            padding: "32px"
          }}>
            <h2 style={{ fontSize: "24px", marginBottom: "24px" }}>Your Build</h2>

            <div style={{ marginBottom: "24px" }}>
              {[selectedGPU, selectedCPU, selectedMOBO, selectedRAM].filter(Boolean).map((item, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                  fontSize: "14px"
                }}>
                  <span style={{ color: "#888" }}>{item.name}</span>
                  <span>${item.price}</span>
                </div>
              ))}
              {totalPrice === 0 && (
                <p style={{ color: "#666", textAlign: "center", padding: "20px 0" }}>
                  Select components to see your build
                </p>
              )}
            </div>

            {estimatedFPS && (
              <div style={{
                background: "#0a0a0a",
                border: "2px solid #00ff88",
                borderRadius: "12px",
                padding: "24px",
                textAlign: "center",
                marginBottom: "24px"
              }}>
                <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>ESTIMATED PERFORMANCE</div>
                <div style={{ fontSize: "48px", fontWeight: "900", color: "#00ff88" }}>{estimatedFPS}</div>
                <div style={{ fontSize: "12px", color: "#888" }}>FPS @ 1080p Ultra</div>
              </div>
            )}

            {totalPrice > 0 && (
              <>
                <div style={{ borderTop: "1px solid #222", paddingTop: "16px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#888" }}>Parts Total</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#888" }}>Assembly & Testing</span>
                    <span>${assemblyFee}</span>
                  </div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "20px",
                    fontWeight: "700",
                    paddingTop: "12px",
                    borderTop: "1px solid #222",
                    marginTop: "12px"
                  }}>
                    <span>Total</span>
                    <span>${finalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowQuoteForm(true)}
                  style={{
                    width: "100%",
                    background: "#00ff88",
                    color: "#000",
                    border: "none",
                    padding: "16px",
                    fontSize: "16px",
                    fontWeight: "700",
                    cursor: "pointer",
                    borderRadius: "8px",
                    letterSpacing: "1px"
                  }}
                >
                  Request Quote →
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      {showQuoteForm && (
        <div
          onClick={() => setShowQuoteForm(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#141414",
              border: "1px solid #222",
              borderRadius: "16px",
              padding: "40px",
              maxWidth: "500px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto"
            }}
          >
            <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>Request Your Quote</h2>
            <p style={{ color: "#888", marginBottom: "32px" }}>We'll get back to you within 24 hours</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  padding: "14px",
                  background: "#0a0a0a",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "16px"
                }}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  padding: "14px",
                  background: "#0a0a0a",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "16px"
                }}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{
                  padding: "14px",
                  background: "#0a0a0a",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "16px"
                }}
              />
              <textarea
                placeholder="Additional requests or questions..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows="4"
                style={{
                  padding: "14px",
                  background: "#0a0a0a",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "16px",
                  resize: "none",
                  fontFamily: "inherit"
                }}
              />

              <div style={{
                background: "#0a0a0a",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #333"
              }}>
                <p style={{ fontWeight: "700", marginBottom: "12px" }}>Your Build:</p>
                <p style={{ color: "#888", fontSize: "14px", margin: "4px 0" }}>{selectedGPU?.name}</p>
                <p style={{ color: "#888", fontSize: "14px", margin: "4px 0" }}>{selectedCPU?.name}</p>
                <p style={{ color: "#888", fontSize: "14px", margin: "4px 0" }}>{selectedMOBO?.name}</p>
                <p style={{ color: "#888", fontSize: "14px", margin: "4px 0" }}>{selectedRAM?.name}</p>
                <p style={{ fontWeight: "700", marginTop: "12px", fontSize: "18px" }}>
                  Total: ${finalPrice.toLocaleString()}
                </p>
              </div>

              <button
                onClick={handleSubmitQuote}
                style={{
                  background: "#00ff88",
                  color: "#000",
                  border: "none",
                  padding: "16px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  borderRadius: "8px"
                }}
              >
                Submit Request
              </button>
              <button
                onClick={() => setShowQuoteForm(false)}
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "1px solid #333",
                  padding: "16px",
                  fontSize: "16px",
                  cursor: "pointer",
                  borderRadius: "8px"
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
