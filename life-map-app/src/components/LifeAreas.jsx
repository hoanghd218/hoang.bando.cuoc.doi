import { motion } from "framer-motion";
import { LIFE_AREAS } from "../data";

function AreaCard({ area, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.05, y: -5 }}
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${area.color}30`,
        borderRadius: 16,
        padding: "1.5rem",
        flex: "1 1 280px",
        maxWidth: 350,
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${area.color}, transparent)`,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <span style={{ fontSize: "1.8rem" }}>{area.icon}</span>
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: area.color,
          }}
        >
          {area.name}
        </h3>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.7rem",
            color: "var(--text-dim)",
            marginBottom: 6,
          }}
        >
          <span>Tien do</span>
          <span>{area.progress}%</span>
        </div>
        <div
          style={{
            height: 6,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${area.progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.1 }}
            style={{
              height: "100%",
              background: `linear-gradient(90deg, ${area.color}80, ${area.color})`,
              borderRadius: 3,
            }}
          />
        </div>
      </div>

      <div style={{ fontSize: "0.8rem" }}>
        <div style={{ marginBottom: 8 }}>
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Hien tai
          </span>
          <p style={{ color: "var(--text-dim)" }}>{area.current}</p>
        </div>
        <div>
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Muc tieu 2036
          </span>
          <p style={{ color: area.color, fontWeight: 600 }}>{area.target}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function LifeAreas() {
  return (
    <section style={{ padding: "4rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          textAlign: "center",
          fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
          fontWeight: 800,
          marginBottom: "1rem",
          color: "var(--text)",
        }}
      >
        7 LINH VUC CUOC DOI
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          textAlign: "center",
          color: "var(--text-dim)",
          marginBottom: "3rem",
          fontSize: "0.95rem",
        }}
      >
        Theo doi va can bang moi khia canh cuoc song
      </motion.p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.2rem",
          justifyContent: "center",
        }}
      >
        {LIFE_AREAS.map((area, i) => (
          <AreaCard key={area.key} area={area} index={i} />
        ))}
      </div>
    </section>
  );
}
