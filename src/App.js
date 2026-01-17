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

// Portfolio builds data
const PORTFOLIO_BUILDS = [
  {
    id: 1,
    name: "The Streamer",
    client: "Alex M.",
    specs: "RTX 4090 • Ryzen 9 7950X • 64GB DDR5",
    description: "Built for a full-time streamer who needed to game at 4K while encoding streams. Zero dropped frames.",
    image: "🎮"
  },
  {
    id: 2,
    name: "Silent Workstation",
    client: "Sarah K.",
    specs: "RTX 4080 • Ryzen 7 7800X3D • 32GB DDR5",
    description: "Whisper-quiet build for a video editor working from home. Custom loop cooling.",
    image: "🔇"
  },
  {
    id: 3,
    name: "Budget Beast",
    client: "Marcus T.",
    specs: "RX 7900 XTX • Ryzen 5 7600X • 16GB DDR5",
    description: "Maximum FPS per dollar. This thing crushes 1440p gaming without breaking the bank.",
    image: "💰"
  },
  {
    id: 4,
    name: "The Overkill",
    client: "David R.",
    specs: "RTX 4090 • Ryzen 9 7950X • 64GB DDR5",
    description: "No budget, no limits. Custom hardline tubing with full RGB sync.",
    image: "🚀"
  },
  {
    id: 5,
    name: "Esports Ready",
    client: "Jenny L.",
    specs: "RTX 4080 • Ryzen 7 7800X3D • 32GB DDR5",
    description: "Optimized for competitive gaming. 360Hz capable with ultra-low latency.",
    image: "🏆"
  },
  {
    id: 6,
    name: "Creator Pro",
    client: "Mike H.",
    specs: "RTX 4090 • Ryzen 9 7950X • 64GB DDR5",
    description: "3D rendering beast. Cuts render times in half compared to client's old workstation.",
    image: "🎨"
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedGPU, setSelectedGPU] = useState(null);
  const [selectedCPU, setSelectedCPU] = useState(null);
  const [selectedMOBO, setSelectedMOBO] = useState(null);
  const [selectedRAM, setSelectedRAM] = useState(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSubmitted, setContactSubmitted] = useState(false);

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

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    setContactSubmitted(true);
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  // Shared Navigation Component
  const Nav = () => (
    <nav style={{
      borderBottom: "1px solid #1a1a1a",
      padding: "20px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "16px"
    }}>
      <h1
        onClick={() => setCurrentPage("home")}
        style={{
          fontSize: "24px",
          fontWeight: "900",
          letterSpacing: "2px",
          margin: 0,
          cursor: "pointer"
        }}
      >CUSTOMWORX</h1>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
        {[
          { name: "Portfolio", page: "portfolio" },
          { name: "About", page: "about" },
          { name: "Contact", page: "contact" }
        ].map((item) => (
          <button
            key={item.page}
            onClick={() => setCurrentPage(item.page)}
            style={{
              background: "transparent",
              color: currentPage === item.page ? "#00ff88" : "#888",
              border: "none",
              padding: "10px 16px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              letterSpacing: "0.5px"
            }}
          >
            {item.name}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage("builder")}
          style={{
            background: "#00ff88",
            color: "#000",
            border: "none",
            padding: "10px 24px",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            borderRadius: "4px",
            letterSpacing: "1px",
            marginLeft: "8px"
          }}
        >
          BUILD NOW
        </button>
      </div>
    </nav>
  );

  // Shared Footer Component
  const Footer = () => (
    <footer style={{ padding: "40px", textAlign: "center", borderTop: "1px solid #1a1a1a", color: "#666" }}>
      <p>© 2026 Customworx. Built different.</p>
    </footer>
  );

  // LANDING PAGE
  if (currentPage === "home") {
    return (
      <div style={{ background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
        <Nav />

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

        <Footer />
      </div>
    );
  }

  // PORTFOLIO PAGE
  if (currentPage === "portfolio") {
    return (
      <div style={{ background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
        <Nav />

        <section style={{ padding: "80px 40px", maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{
            fontSize: "48px",
            fontWeight: "900",
            marginBottom: "16px",
            textAlign: "center"
          }}>Our Builds</h1>
          <p style={{
            fontSize: "18px",
            color: "#888",
            marginBottom: "60px",
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto 60px"
          }}>
            Every build tells a story. Here are some of our favorites.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "24px"
          }}>
            {PORTFOLIO_BUILDS.map((build) => (
              <div
                key={build.id}
                style={{
                  background: "#141414",
                  border: "1px solid #222",
                  borderRadius: "16px",
                  padding: "32px",
                  transition: "transform 0.2s, border-color 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "#00ff88";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#222";
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>{build.image}</div>
                <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>{build.name}</h3>
                <p style={{ color: "#00ff88", fontSize: "14px", marginBottom: "16px" }}>Built for {build.client}</p>
                <p style={{
                  color: "#666",
                  fontSize: "13px",
                  fontFamily: "monospace",
                  marginBottom: "16px",
                  padding: "8px 12px",
                  background: "#0a0a0a",
                  borderRadius: "6px",
                  display: "inline-block"
                }}>
                  {build.specs}
                </p>
                <p style={{ color: "#888", lineHeight: "1.6", fontSize: "15px" }}>{build.description}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <p style={{ color: "#888", marginBottom: "24px" }}>Want to see your build here?</p>
            <button
              onClick={() => setCurrentPage("builder")}
              style={{
                background: "#00ff88",
                color: "#000",
                border: "none",
                padding: "16px 40px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                borderRadius: "6px"
              }}
            >
              Start Your Build
            </button>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // ABOUT PAGE
  if (currentPage === "about") {
    return (
      <div style={{ background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
        <Nav />

        <section style={{ padding: "80px 40px", maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{
            fontSize: "48px",
            fontWeight: "900",
            marginBottom: "24px",
            textAlign: "center"
          }}>About <span style={{ color: "#00ff88" }}>Customworx</span></h1>

          <div style={{
            background: "#141414",
            border: "1px solid #222",
            borderRadius: "16px",
            padding: "40px",
            marginBottom: "40px"
          }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Our Story</h2>
            <p style={{ color: "#888", lineHeight: "1.8", marginBottom: "16px" }}>
              We started Customworx because we were tired of the same old story: overpriced prebuilts with mystery components,
              or the intimidating world of DIY building with no support.
            </p>
            <p style={{ color: "#888", lineHeight: "1.8" }}>
              We're gamers, creators, and PC enthusiasts who believe everyone deserves a machine that's built right,
              priced fairly, and performs exactly as promised. No compromises, no BS.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
            marginBottom: "40px"
          }}>
            {[
              { num: "50+", label: "Builds Completed" },
              { num: "100%", label: "Satisfaction Rate" },
              { num: "24hr", label: "Response Time" },
              { num: "2yr", label: "Warranty" }
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  background: "#141414",
                  border: "1px solid #222",
                  borderRadius: "12px",
                  padding: "32px",
                  textAlign: "center"
                }}
              >
                <div style={{ fontSize: "36px", fontWeight: "900", color: "#00ff88", marginBottom: "8px" }}>
                  {stat.num}
                </div>
                <div style={{ color: "#888", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: "#141414",
            border: "1px solid #222",
            borderRadius: "16px",
            padding: "40px"
          }}>
            <h2 style={{ fontSize: "24px", marginBottom: "24px" }}>What We Promise</h2>
            {[
              { title: "Transparency", desc: "You'll always know exactly what's in your build and what you're paying for." },
              { title: "Quality", desc: "We only use parts we'd put in our own rigs. No cutting corners." },
              { title: "Support", desc: "Questions? Issues? We're here. Not some overseas call center." },
              { title: "Performance", desc: "Our FPS estimates are based on real benchmarks. What you see is what you get." }
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: i < 3 ? "20px" : 0 }}>
                <h3 style={{ fontSize: "18px", color: "#00ff88", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#888", lineHeight: "1.6" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <button
              onClick={() => setCurrentPage("builder")}
              style={{
                background: "#00ff88",
                color: "#000",
                border: "none",
                padding: "16px 40px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                borderRadius: "6px"
              }}
            >
              Build With Us →
            </button>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // CONTACT PAGE
  if (currentPage === "contact") {
    return (
      <div style={{ background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
        <Nav />

        <section style={{ padding: "80px 40px", maxWidth: "600px", margin: "0 auto" }}>
          <h1 style={{
            fontSize: "48px",
            fontWeight: "900",
            marginBottom: "16px",
            textAlign: "center"
          }}>Get In Touch</h1>
          <p style={{
            fontSize: "18px",
            color: "#888",
            marginBottom: "48px",
            textAlign: "center"
          }}>
            Questions? Ideas? Just want to chat about builds? We're here.
          </p>

          <div style={{
            background: "#141414",
            border: "1px solid #222",
            borderRadius: "16px",
            padding: "40px"
          }}>
            {contactSubmitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
                <h2 style={{ fontSize: "24px", marginBottom: "8px", color: "#00ff88" }}>Message Sent!</h2>
                <p style={{ color: "#888" }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "8px"
                  }}>Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "14px",
                      background: "#0a0a0a",
                      border: "1px solid #333",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "16px"
                    }}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "8px"
                  }}>Email</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "14px",
                      background: "#0a0a0a",
                      border: "1px solid #333",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "16px"
                    }}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "8px"
                  }}>Message</label>
                  <textarea
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows="5"
                    style={{
                      width: "100%",
                      padding: "14px",
                      background: "#0a0a0a",
                      border: "1px solid #333",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "16px",
                      resize: "none",
                      fontFamily: "inherit"
                    }}
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: "#00ff88",
                    color: "#000",
                    border: "none",
                    padding: "16px",
                    fontSize: "16px",
                    fontWeight: "700",
                    cursor: "pointer",
                    borderRadius: "8px",
                    marginTop: "8px"
                  }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "20px",
            marginTop: "40px"
          }}>
            {[
              { icon: "📧", label: "Email", value: "hello@customworx.com" },
              { icon: "📍", label: "Location", value: "Austin, TX" },
              { icon: "⏰", label: "Response", value: "Within 24hrs" }
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "#141414",
                  border: "1px solid #222",
                  borderRadius: "12px",
                  padding: "24px",
                  textAlign: "center"
                }}
              >
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>{item.icon}</div>
                <div style={{ color: "#888", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                  {item.label}
                </div>
                <div style={{ fontSize: "14px" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // BUILDER PAGE
  return (
    <div style={{ background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
      <Nav />

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
