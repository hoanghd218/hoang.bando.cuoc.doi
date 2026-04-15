import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import LifeAreas from "./components/LifeAreas";
import FlowMap from "./components/FlowMap";
import FinancialChart from "./components/FinancialChart";
import VisionGallery from "./components/VisionGallery";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Divider() {
  return (
    <div
      style={{
        maxWidth: 200,
        height: 1,
        margin: "1rem auto",
        background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
      }}
    />
  );
}

function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Hero />
      <Divider />
      <FlowMap />
      <div style={{ textAlign: "center", margin: "1rem 0" }}>
        <Link
          to="/ban-do"
          style={{
            display: "inline-block",
            padding: "10px 28px",
            background: "linear-gradient(135deg, #00d4ff20, #00e67620)",
            border: "1px solid #00d4ff60",
            borderRadius: 10,
            color: "#00d4ff",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
            transition: "all 0.2s",
          }}
        >
          🗺️ Xem bản đồ cuộc đời toàn màn hình →
        </Link>
      </div>
      <Divider />
      <Timeline />
      <Divider />
      <LifeAreas />
      <Divider />
      <FinancialChart />
      <Divider />
      <VisionGallery />

      {/* Footer */}
      <footer
        style={{
          padding: "4rem 2rem",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          marginTop: "2rem",
        }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            color: "var(--text-muted)",
            fontSize: "0.9rem",
            fontStyle: "italic",
            maxWidth: 600,
            margin: "0 auto 1rem",
            lineHeight: 1.8,
          }}
        >
          "Ban danh gia qua cao nhung gi minh lam trong 1 nam,
          <br />
          va danh gia qua thap nhung gi minh lam trong 10 nam."
          <br />
          <span style={{ color: "var(--text-dim)" }}>— Jim Rohn</span>
        </motion.p>
        <p style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
          Ban do cuoc doi Tony Hoang &bull; 2026-2036 &bull; Review tiep theo:
          08/07/2026
        </p>
      </footer>
    </div>
  );
}

export default App;
