import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Link } from "react-router-dom";

/* ─── Màu sắc ─── */
const C = {
  ikigai: "#00d4ff",
  health: "#00e676",
  career: "#448aff",
  finance: "#ffd740",
  family: "#ff6090",
  growth: "#b388ff",
  experience: "#ff9100",
  community: "#69f0ae",
  milestone: "#4a5280",
  bg: "#0a0e27",
  cardBg: "#131836",
  dim: "#8892b0",
};

/* ─── Node style helper ─── */
const card = (color, width = 180) => ({
  background: `linear-gradient(135deg, ${color}18, ${color}08)`,
  border: `2px solid ${color}`,
  borderRadius: 14,
  padding: "14px 18px",
  color: "#fff",
  fontSize: 12,
  minWidth: width,
  textAlign: "center",
  backdropFilter: "blur(8px)",
});

const milestoneCard = (color, width = 200) => ({
  ...card(color, width),
  borderWidth: 2,
  borderStyle: "solid",
  boxShadow: `0 0 20px ${color}30`,
});

const subCard = (color) => ({
  background: `${color}12`,
  border: `1px solid ${color}40`,
  borderRadius: 10,
  padding: "10px 14px",
  color: "#fff",
  fontSize: 11,
  minWidth: 150,
  textAlign: "left",
});

/* ─── Layout constants ─── */
const CX = 600; // Trung tâm X
const CY = 80;  // Trung tâm Y (IKIGAI)

/* ─── NODES ─── */
function buildNodes() {
  return [
    /* ═══ TẦNG 1: IKIGAI — Trung tâm ═══ */
    {
      id: "ikigai",
      position: { x: CX - 100, y: CY },
      data: {
        label: (
          <div style={{ ...card(C.ikigai, 200), boxShadow: `0 0 40px ${C.ikigai}40` }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: C.ikigai }}>IKIGAI</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 6, lineHeight: 1.6 }}>
              "Giải phóng bản thân và người khác
              <br />
              khỏi công việc lặp lại bằng AI Agents"
            </div>
            <div style={{ marginTop: 8, fontSize: 10, color: C.ikigai, opacity: 0.7 }}>
              Tony Hoang • 2026–2036
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },

    /* ═══ TẦNG 2: 7 Lĩnh vực cuộc đời ═══ */
    {
      id: "health",
      position: { x: CX - 480, y: CY - 140 },
      data: {
        label: (
          <div style={card(C.health)}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>🏃 Sức khỏe & Thể chất</div>
            <div style={{ fontSize: 10, color: C.health, marginTop: 6 }}>
              Chạy 21km → Ironman 140.6
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },
    {
      id: "career",
      position: { x: CX + 280, y: CY - 140 },
      data: {
        label: (
          <div style={card(C.career)}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>🚀 Sự nghiệp & Công việc</div>
            <div style={{ fontSize: 10, color: C.career, marginTop: 6 }}>
              Founder → CEO $100M + Investor
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },
    {
      id: "finance",
      position: { x: CX - 480, y: CY + 100 },
      data: {
        label: (
          <div style={card(C.finance)}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>💰 Tài chính</div>
            <div style={{ fontSize: 10, color: C.finance, marginTop: 6 }}>
              $60K/năm → $100M tổng tài sản
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },
    {
      id: "family",
      position: { x: CX + 280, y: CY + 100 },
      data: {
        label: (
          <div style={card(C.family)}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>👨‍👩‍👧‍👦 Gia đình</div>
            <div style={{ fontSize: 10, color: C.family, marginTop: 6 }}>
              30 phút/ngày → Du lịch thế giới
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },
    {
      id: "growth",
      position: { x: CX - 600, y: CY - 10 },
      data: {
        label: (
          <div style={card(C.growth)}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>📚 Phát triển bản thân</div>
            <div style={{ fontSize: 10, color: C.growth, marginTop: 6 }}>
              Học 4-6h sáng → Speaker, Author
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },
    {
      id: "experience",
      position: { x: CX + 400, y: CY - 10 },
      data: {
        label: (
          <div style={card(C.experience)}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>✈️ Trải nghiệm & Giải trí</div>
            <div style={{ fontSize: 10, color: C.experience, marginTop: 6 }}>
              VN-based → Digital nomad
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },
    {
      id: "community",
      position: { x: CX - 100, y: CY + 220 },
      data: {
        label: (
          <div style={card(C.community, 200)}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>🤝 Đóng góp & Cộng đồng</div>
            <div style={{ fontSize: 10, color: C.community, marginTop: 6 }}>
              2.500 → 200K+ thành viên FreedomBuilder
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },

    /* ═══ TẦNG 3: Các mốc thời gian ═══ */
    // 2026 — Hiện tại
    {
      id: "m2026",
      position: { x: -100, y: 450 },
      data: {
        label: (
          <div style={milestoneCard(C.ikigai, 220)}>
            <div style={{ fontSize: 10, color: C.ikigai, fontWeight: 600, letterSpacing: 2 }}>
              HIỆN TẠI
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.ikigai, marginTop: 4 }}>
              2026 — Tuổi 32
            </div>
            <div style={{ fontSize: 9, color: "#ccc", marginTop: 2 }}>Xây nền tảng</div>
            <div style={{ fontSize: 10, color: C.dim, marginTop: 8, textAlign: "left", lineHeight: 1.7 }}>
              • Đang xây AI Agent (Amazon, POD)<br />
              • 3 video/tuần, 2.500 members<br />
              • Chạy 21km/3h, bắt đầu học bơi<br />
              • Thu nhập ~$60K/năm
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },
    // 2027
    {
      id: "m2027",
      position: { x: 250, y: 450 },
      data: {
        label: (
          <div style={milestoneCard(C.ikigai, 220)}>
            <div style={{ fontSize: 10, color: C.ikigai, fontWeight: 600, letterSpacing: 2 }}>
              NĂM 1
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.ikigai, marginTop: 4 }}>
              2027 — Tuổi 33
            </div>
            <div style={{ fontSize: 9, color: "#ccc", marginTop: 2 }}>Khởi đầu — First Revenue</div>
            <div style={{ fontSize: 10, color: C.dim, marginTop: 8, textAlign: "left", lineHeight: 1.7 }}>
              • Half Marathon chính thức<br />
              • Sách #1 xuất bản<br />
              • Khách hàng trả tiền đầu tiên<br />
              • $1M doanh thu — 10K+ community
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },
    // 2029
    {
      id: "m2029",
      position: { x: 600, y: 450 },
      data: {
        label: (
          <div style={milestoneCard("#ffd700", 220)}>
            <div style={{ fontSize: 10, color: "#ffd700", fontWeight: 600, letterSpacing: 2 }}>
              NĂM 3
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#ffd700", marginTop: 4 }}>
              2029 — Tuổi 35
            </div>
            <div style={{ fontSize: 9, color: "#ccc", marginTop: 2 }}>Tăng tốc — Scale Up</div>
            <div style={{ fontSize: 10, color: C.dim, marginTop: 8, textAlign: "left", lineHeight: 1.7 }}>
              • Full Marathon 42km<br />
              • 50K+ community<br />
              • $3-5M doanh thu<br />
              • Bắt đầu đầu tư startup
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },
    // 2031
    {
      id: "m2031",
      position: { x: 950, y: 450 },
      data: {
        label: (
          <div style={milestoneCard(C.experience, 220)}>
            <div style={{ fontSize: 10, color: C.experience, fontWeight: 600, letterSpacing: 2 }}>
              NĂM 5
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.experience, marginTop: 4 }}>
              2031 — Tuổi 37
            </div>
            <div style={{ fontSize: 9, color: "#ccc", marginTop: 2 }}>Bứt phá — Freedom</div>
            <div style={{ fontSize: 10, color: C.dim, marginTop: 8, textAlign: "left", lineHeight: 1.7 }}>
              • Half Ironman 70.3<br />
              • {"<10 người + AI tự vận hành"}<br />
              • $30M tài sản<br />
              • Speaker quốc tế
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },
    // 2036
    {
      id: "m2036",
      position: { x: 1300, y: 450 },
      data: {
        label: (
          <div style={milestoneCard(C.health, 220)}>
            <div style={{ fontSize: 10, color: C.health, fontWeight: 600, letterSpacing: 2 }}>
              NĂM 10
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.health, marginTop: 4 }}>
              2036 — Tuổi 42
            </div>
            <div style={{ fontSize: 9, color: "#ccc", marginTop: 2 }}>Tự do — Legacy</div>
            <div style={{ fontSize: 10, color: C.dim, marginTop: 8, textAlign: "left", lineHeight: 1.7 }}>
              • Full Ironman 140.6 Finisher<br />
              • {"<5 người, $100M doanh thu"}<br />
              • Digital nomad hoàn toàn<br />
              • Quỹ đầu tư + Quỹ từ thiện
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },

    /* ═══ TẦNG 4: Chi tiết từng lĩnh vực theo timeline ═══ */
    // Sức khỏe chi tiết
    {
      id: "h-detail",
      position: { x: -200, y: 750 },
      data: {
        label: (
          <div style={subCard(C.health)}>
            <div style={{ fontWeight: 700, color: C.health, marginBottom: 6 }}>🏃 Lộ trình sức khỏe</div>
            <div style={{ lineHeight: 1.8, color: C.dim }}>
              2026: Chạy 21km, gym, đạp xe<br />
              2027: Half Marathon đầu tiên<br />
              2029: Full Marathon, bơi thành thạo<br />
              2031: Half Ironman 70.3<br />
              2036: Full Ironman 140.6 Finisher
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },
    // Sự nghiệp chi tiết
    {
      id: "c-detail",
      position: { x: 150, y: 750 },
      data: {
        label: (
          <div style={subCard(C.career)}>
            <div style={{ fontWeight: 700, color: C.career, marginBottom: 6 }}>🚀 Lộ trình sự nghiệp</div>
            <div style={{ lineHeight: 1.8, color: C.dim }}>
              2026: Founder/Developer/YouTuber<br />
              2027: CEO + Educator, Sách #1<br />
              2029: Portfolio 3-5 AI Agents<br />
              2031: CEO chiến lược, 5-10 startup<br />
              2036: Thương hiệu như Dan Martell
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },
    // Tài chính chi tiết
    {
      id: "f-detail",
      position: { x: 500, y: 750 },
      data: {
        label: (
          <div style={subCard(C.finance)}>
            <div style={{ fontWeight: 700, color: C.finance, marginBottom: 6 }}>💰 Lộ trình tài chính</div>
            <div style={{ lineHeight: 1.8, color: C.dim }}>
              2026: $60K — Lương + freelance<br />
              2027: $1M doanh thu, $500K+ tài sản<br />
              2029: $3-5M doanh thu, $10M tài sản<br />
              2031: $5-10M doanh thu, $30M tài sản<br />
              2036: $10-20M doanh thu, $100M tài sản
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },
    // Gia đình chi tiết
    {
      id: "fm-detail",
      position: { x: 850, y: 750 },
      data: {
        label: (
          <div style={subCard(C.family)}>
            <div style={{ fontWeight: 700, color: C.family, marginBottom: 6 }}>👨‍👩‍👧‍👦 Lộ trình gia đình</div>
            <div style={{ lineHeight: 1.8, color: C.dim }}>
              2026: Con trai 7t, con gái 1t<br />
              2027: Family trip nước ngoài đầu tiên<br />
              2029: Workation 2-3 lần/năm<br />
              2031: Con bắt đầu học lập trình/AI<br />
              2036: Du lịch thế giới cùng gia đình
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },
    // Cộng đồng chi tiết
    {
      id: "cm-detail",
      position: { x: 1200, y: 750 },
      data: {
        label: (
          <div style={subCard(C.community)}>
            <div style={{ fontWeight: 700, color: C.community, marginBottom: 6 }}>🤝 Lộ trình cộng đồng</div>
            <div style={{ lineHeight: 1.8, color: C.dim }}>
              2026: 2.500 members<br />
              2027: 10K+ FreedomBuilder<br />
              2029: 50K+ members<br />
              2031: 100K+ members<br />
              2036: 200K+ members + Quỹ từ thiện
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },

    /* ═══ Sản phẩm chính ═══ */
    {
      id: "products",
      position: { x: CX - 120, y: CY + 340 },
      data: {
        label: (
          <div style={{ ...card("#00d4ff", 240), borderStyle: "dashed" }}>
            <div style={{ fontWeight: 700, color: C.ikigai, marginBottom: 6 }}>⚡ Sản phẩm cốt lõi</div>
            <div style={{ lineHeight: 1.8, color: C.dim, textAlign: "left" }}>
              1. AI Agent SaaS (Amazon, POD, Marketing)<br />
              2. FreedomBuilder Community<br />
              3. Sách & Khoá học online<br />
              4. Quỹ đầu tư AI Startups
            </div>
          </div>
        ),
      },
      style: { background: "transparent", border: "none", padding: 0 },
    },
  ];
}

/* ─── EDGES ─── */
function buildEdges() {
  const animEdge = (color) => ({
    style: { stroke: color, strokeWidth: 2 },
    animated: true,
  });

  const solidEdge = (color) => ({
    style: { stroke: color, strokeWidth: 1.5, strokeDasharray: "6 3" },
    animated: false,
  });

  return [
    // IKIGAI → 7 lĩnh vực
    { id: "e-ik-h", source: "ikigai", target: "health", ...animEdge(C.health) },
    { id: "e-ik-c", source: "ikigai", target: "career", ...animEdge(C.career) },
    { id: "e-ik-f", source: "ikigai", target: "finance", ...animEdge(C.finance) },
    { id: "e-ik-fm", source: "ikigai", target: "family", ...animEdge(C.family) },
    { id: "e-ik-g", source: "ikigai", target: "growth", ...animEdge(C.growth) },
    { id: "e-ik-x", source: "ikigai", target: "experience", ...animEdge(C.experience) },
    { id: "e-ik-cm", source: "ikigai", target: "community", ...animEdge(C.community) },

    // IKIGAI → Sản phẩm
    { id: "e-ik-prod", source: "ikigai", target: "products", ...animEdge(C.ikigai) },

    // Timeline: mốc → mốc
    { id: "e-26-27", source: "m2026", target: "m2027", ...animEdge(C.ikigai), label: "1 năm" },
    { id: "e-27-29", source: "m2027", target: "m2029", ...animEdge("#ffd700"), label: "2 năm" },
    { id: "e-29-31", source: "m2029", target: "m2031", ...animEdge(C.experience), label: "2 năm" },
    { id: "e-31-36", source: "m2031", target: "m2036", ...animEdge(C.health), label: "5 năm" },

    // Lĩnh vực → mốc thời gian (liên kết mờ)
    { id: "e-h-26", source: "health", target: "m2026", ...solidEdge(C.health) },
    { id: "e-c-27", source: "career", target: "m2027", ...solidEdge(C.career) },
    { id: "e-f-29", source: "finance", target: "m2029", ...solidEdge(C.finance) },
    { id: "e-fm-31", source: "family", target: "m2031", ...solidEdge(C.family) },
    { id: "e-cm-36", source: "community", target: "m2036", ...solidEdge(C.community) },
    { id: "e-g-27", source: "growth", target: "m2027", ...solidEdge(C.growth) },
    { id: "e-x-36", source: "experience", target: "m2036", ...solidEdge(C.experience) },

    // Mốc → chi tiết
    { id: "e-26-hd", source: "m2026", target: "h-detail", ...solidEdge(C.health) },
    { id: "e-27-cd", source: "m2027", target: "c-detail", ...solidEdge(C.career) },
    { id: "e-29-fd", source: "m2029", target: "f-detail", ...solidEdge(C.finance) },
    { id: "e-31-fmd", source: "m2031", target: "fm-detail", ...solidEdge(C.family) },
    { id: "e-36-cmd", source: "m2036", target: "cm-detail", ...solidEdge(C.community) },
  ];
}

/* ─── COMPONENT ─── */
export default function LifeMapPage() {
  const initialNodes = useMemo(() => buildNodes(), []);
  const initialEdges = useMemo(() => buildEdges(), []);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Nút quay lại */}
      <Link
        to="/"
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 10,
          padding: "8px 18px",
          background: "rgba(19, 24, 54, 0.9)",
          border: `1px solid ${C.ikigai}40`,
          borderRadius: 8,
          color: C.ikigai,
          textDecoration: "none",
          fontSize: 13,
          fontWeight: 600,
          backdropFilter: "blur(8px)",
          transition: "all 0.2s",
        }}
      >
        ← Trang chủ
      </Link>

      {/* Tiêu đề */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            fontSize: 18,
            fontWeight: 800,
            background: `linear-gradient(135deg, ${C.ikigai}, ${C.health})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
          }}
        >
          BẢN ĐỒ CUỘC ĐỜI TONY HOANG
        </h1>
        <p style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
          2026–2036 • Kéo thả &amp; zoom để khám phá
        </p>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        proOptions={{ hideAttribution: true }}
        style={{ background: C.bg }}
        minZoom={0.2}
        maxZoom={2}
      >
        <Background color="#1a2050" gap={24} size={1} />
        <Controls
          style={{
            background: C.cardBg,
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
          }}
        />
        <MiniMap
          nodeColor={(node) => {
            const colorMap = {
              ikigai: C.ikigai,
              health: C.health,
              career: C.career,
              finance: C.finance,
              family: C.family,
              growth: C.growth,
              experience: C.experience,
              community: C.community,
              products: C.ikigai,
            };
            if (node.id.startsWith("m20")) return "#ffd700";
            if (node.id.endsWith("-detail")) return C.dim;
            return colorMap[node.id] || C.milestone;
          }}
          style={{
            background: C.cardBg,
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
          }}
          maskColor="rgba(10, 14, 39, 0.7)"
        />
      </ReactFlow>
    </div>
  );
}
