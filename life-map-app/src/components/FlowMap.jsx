import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion } from "framer-motion";

const nodeStyle = (color) => ({
  background: `linear-gradient(135deg, ${color}20, ${color}10)`,
  border: `2px solid ${color}`,
  borderRadius: 12,
  padding: "12px 16px",
  color: "#fff",
  fontSize: 12,
  minWidth: 160,
  textAlign: "center",
});

const initialNodes = [
  // Center: IKIGAI
  {
    id: "ikigai",
    position: { x: 400, y: 0 },
    data: {
      label: (
        <div style={nodeStyle("#00d4ff")}>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#00d4ff" }}>IKIGAI</div>
          <div style={{ fontSize: 10, color: "#8892b0", marginTop: 4 }}>
            AI Agents giai phong con nguoi
          </div>
        </div>
      ),
    },
    type: "default",
    style: { background: "transparent", border: "none", padding: 0 },
  },

  // 7 Life areas ring
  {
    id: "health",
    position: { x: 100, y: -120 },
    data: {
      label: (
        <div style={nodeStyle("#00e676")}>
          <div>🏃 Suc khoe</div>
          <div style={{ fontSize: 10, marginTop: 4, color: "#00e676" }}>→ Ironman</div>
        </div>
      ),
    },
    style: { background: "transparent", border: "none", padding: 0 },
  },
  {
    id: "career",
    position: { x: 700, y: -120 },
    data: {
      label: (
        <div style={nodeStyle("#448aff")}>
          <div>🚀 Su nghiep</div>
          <div style={{ fontSize: 10, marginTop: 4, color: "#448aff" }}>→ $100M CEO</div>
        </div>
      ),
    },
    style: { background: "transparent", border: "none", padding: 0 },
  },
  {
    id: "finance",
    position: { x: 100, y: 120 },
    data: {
      label: (
        <div style={nodeStyle("#ffd740")}>
          <div>💰 Tai chinh</div>
          <div style={{ fontSize: 10, marginTop: 4, color: "#ffd740" }}>→ $100M assets</div>
        </div>
      ),
    },
    style: { background: "transparent", border: "none", padding: 0 },
  },
  {
    id: "family",
    position: { x: 700, y: 120 },
    data: {
      label: (
        <div style={nodeStyle("#ff6090")}>
          <div>👨‍👩‍👧‍👦 Gia dinh</div>
          <div style={{ fontSize: 10, marginTop: 4, color: "#ff6090" }}>→ Hanh phuc</div>
        </div>
      ),
    },
    style: { background: "transparent", border: "none", padding: 0 },
  },
  {
    id: "growth",
    position: { x: 0, y: 0 },
    data: {
      label: (
        <div style={nodeStyle("#b388ff")}>
          <div>📚 Phat trien</div>
          <div style={{ fontSize: 10, marginTop: 4, color: "#b388ff" }}>→ Speaker, Author</div>
        </div>
      ),
    },
    style: { background: "transparent", border: "none", padding: 0 },
  },
  {
    id: "experience",
    position: { x: 800, y: 0 },
    data: {
      label: (
        <div style={nodeStyle("#ff9100")}>
          <div>✈️ Trai nghiem</div>
          <div style={{ fontSize: 10, marginTop: 4, color: "#ff9100" }}>→ Digital nomad</div>
        </div>
      ),
    },
    style: { background: "transparent", border: "none", padding: 0 },
  },
  {
    id: "community",
    position: { x: 400, y: 180 },
    data: {
      label: (
        <div style={nodeStyle("#69f0ae")}>
          <div>🤝 Cong dong</div>
          <div style={{ fontSize: 10, marginTop: 4, color: "#69f0ae" }}>→ 200K+ members</div>
        </div>
      ),
    },
    style: { background: "transparent", border: "none", padding: 0 },
  },

  // Timeline milestones below
  {
    id: "y2027",
    position: { x: 50, y: 350 },
    data: {
      label: (
        <div style={{ ...nodeStyle("#00d4ff"), minWidth: 180 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#00d4ff" }}>2027 — KHOI DAU</div>
          <div style={{ fontSize: 10, color: "#8892b0", marginTop: 6, textAlign: "left" }}>
            • Half Marathon<br />
            • Sach #1 xuat ban<br />
            • $1M doanh thu<br />
            • 10K+ community
          </div>
        </div>
      ),
    },
    style: { background: "transparent", border: "none", padding: 0 },
  },
  {
    id: "y2029",
    position: { x: 300, y: 350 },
    data: {
      label: (
        <div style={{ ...nodeStyle("#ffd700"), minWidth: 180 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#ffd700" }}>2029 — TANG TOC</div>
          <div style={{ fontSize: 10, color: "#8892b0", marginTop: 6, textAlign: "left" }}>
            • Full Marathon<br />
            • 50K+ community<br />
            • $3-5M doanh thu<br />
            • Angel investing
          </div>
        </div>
      ),
    },
    style: { background: "transparent", border: "none", padding: 0 },
  },
  {
    id: "y2031",
    position: { x: 550, y: 350 },
    data: {
      label: (
        <div style={{ ...nodeStyle("#ff9100"), minWidth: 180 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#ff9100" }}>2031 — BUT PHA</div>
          <div style={{ fontSize: 10, color: "#8892b0", marginTop: 6, textAlign: "left" }}>
            • Half Ironman 70.3<br />
            • {"<10 nguoi + AI"}<br />
            • $30M tai san<br />
            • Speaker quoc te
          </div>
        </div>
      ),
    },
    style: { background: "transparent", border: "none", padding: 0 },
  },
  {
    id: "y2036",
    position: { x: 800, y: 350 },
    data: {
      label: (
        <div style={{ ...nodeStyle("#00e676"), minWidth: 180 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#00e676" }}>2036 — TU DO</div>
          <div style={{ fontSize: 10, color: "#8892b0", marginTop: 6, textAlign: "left" }}>
            • Full Ironman<br />
            • {"<5 nguoi, $100M"}<br />
            • Digital nomad<br />
            • Quy dau tu
          </div>
        </div>
      ),
    },
    style: { background: "transparent", border: "none", padding: 0 },
  },
];

const edgeStyle = (color) => ({
  style: { stroke: color, strokeWidth: 2 },
  animated: true,
});

const initialEdges = [
  // IKIGAI to areas
  { id: "e-ik-h", source: "ikigai", target: "health", ...edgeStyle("#00e676") },
  { id: "e-ik-c", source: "ikigai", target: "career", ...edgeStyle("#448aff") },
  { id: "e-ik-f", source: "ikigai", target: "finance", ...edgeStyle("#ffd740") },
  { id: "e-ik-fm", source: "ikigai", target: "family", ...edgeStyle("#ff6090") },
  { id: "e-ik-g", source: "ikigai", target: "growth", ...edgeStyle("#b388ff") },
  { id: "e-ik-x", source: "ikigai", target: "experience", ...edgeStyle("#ff9100") },
  { id: "e-ik-cm", source: "ikigai", target: "community", ...edgeStyle("#69f0ae") },

  // Timeline connections
  { id: "e-27-29", source: "y2027", target: "y2029", ...edgeStyle("#ffd700"), label: "2 nam" },
  { id: "e-29-31", source: "y2029", target: "y2031", ...edgeStyle("#ff9100"), label: "2 nam" },
  { id: "e-31-36", source: "y2031", target: "y2036", ...edgeStyle("#00e676"), label: "5 nam" },

  // Areas to milestones
  { id: "e-h-27", source: "health", target: "y2027", ...edgeStyle("#00e67640") },
  { id: "e-c-29", source: "career", target: "y2029", ...edgeStyle("#448aff40") },
  { id: "e-f-31", source: "finance", target: "y2031", ...edgeStyle("#ffd74040") },
  { id: "e-cm-36", source: "community", target: "y2036", ...edgeStyle("#69f0ae40") },
];

export default function FlowMap() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <section style={{ padding: "4rem 2rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          textAlign: "center",
          fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
          fontWeight: 800,
          marginBottom: "1rem",
          background: "linear-gradient(135deg, var(--accent), var(--growth))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        INTERACTIVE FLOW MAP
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          textAlign: "center",
          color: "var(--text-dim)",
          marginBottom: "2rem",
          fontSize: "0.9rem",
        }}
      >
        Keo tha cac node, zoom in/out de kham pha ban do
      </motion.p>

      <div
        style={{
          height: 550,
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          proOptions={{ hideAttribution: true }}
          style={{ background: "#0d1230" }}
        >
          <Background color="#1a2050" gap={20} size={1} />
          <Controls
            style={{
              background: "#131836",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
            }}
          />
          <MiniMap
            nodeColor={(node) => {
              const colors = {
                ikigai: "#00d4ff",
                health: "#00e676",
                career: "#448aff",
                finance: "#ffd740",
                family: "#ff6090",
                growth: "#b388ff",
                experience: "#ff9100",
                community: "#69f0ae",
              };
              return colors[node.id] || "#4a5280";
            }}
            style={{
              background: "#131836",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
            }}
            maskColor="rgba(10, 14, 39, 0.7)"
          />
        </ReactFlow>
      </div>
    </section>
  );
}
