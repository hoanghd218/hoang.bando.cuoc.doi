import { motion } from "framer-motion";
import { FINANCIAL_DATA } from "../data";

export default function FinancialChart() {
  const maxVal = Math.max(...FINANCIAL_DATA.map((d) => d.assets));

  return (
    <section style={{ padding: "4rem 2rem", maxWidth: 900, margin: "0 auto" }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          textAlign: "center",
          fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
          fontWeight: 800,
          marginBottom: "1rem",
          color: "var(--finance)",
        }}
      >
        HANH TRINH TAI CHINH
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
        $60K → $100M tong tai san trong 10 nam
      </motion.p>

      {/* Bar chart */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: "clamp(1rem, 4vw, 3rem)",
          height: 300,
          padding: "0 1rem",
        }}
      >
        {FINANCIAL_DATA.map((d, i) => {
          const height = Math.max((d.assets / maxVal) * 250, 12);
          const opacity = 0.4 + (d.assets / maxVal) * 0.6;
          return (
            <motion.div
              key={d.year}
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.5 }}
                style={{
                  color: "var(--finance)",
                  fontWeight: 700,
                  fontSize: "clamp(0.8rem, 2vw, 1.1rem)",
                }}
              >
                {d.label}
              </motion.span>
              <div
                style={{
                  width: "clamp(40px, 10vw, 80px)",
                  height,
                  background: `linear-gradient(to top, rgba(255,215,64,${opacity * 0.3}), rgba(255,215,64,${opacity}))`,
                  borderRadius: "8px 8px 0 0",
                  border: "1px solid rgba(255,215,64,0.3)",
                  position: "relative",
                }}
              >
                {/* Glow effect */}
                <div
                  style={{
                    position: "absolute",
                    top: -2,
                    left: "10%",
                    right: "10%",
                    height: 4,
                    background: "var(--finance)",
                    borderRadius: 2,
                    boxShadow: "0 0 12px rgba(255,215,64,0.6)",
                  }}
                />
              </div>
              <span
                style={{
                  color: "var(--text-dim)",
                  fontSize: "0.8rem",
                }}
              >
                {d.year}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Asset allocation 2036 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          marginTop: "3rem",
          background: "var(--bg-card)",
          borderRadius: 16,
          padding: "1.5rem 2rem",
          border: "1px solid rgba(255,215,64,0.15)",
        }}
      >
        <h3
          style={{
            fontSize: "0.9rem",
            color: "var(--text-dim)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          Phan bo tai san muc tieu 2036
        </h3>
        <div
          style={{
            display: "flex",
            gap: 4,
            height: 32,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {[
            { label: "Cong ty 40%", pct: 40, color: "var(--career)" },
            { label: "BDS 30%", pct: 30, color: "var(--health)" },
            { label: "Startup 20%", pct: 20, color: "var(--experience)" },
            { label: "Tien mat 10%", pct: 10, color: "var(--growth)" },
          ].map((seg) => (
            <motion.div
              key={seg.label}
              initial={{ width: 0 }}
              whileInView={{ width: `${seg.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              title={seg.label}
              style={{
                background: seg.color,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.65rem",
                fontWeight: 600,
                color: "#0a0e27",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {seg.pct >= 15 ? seg.label : ""}
            </motion.div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            marginTop: 12,
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Cong ty", color: "var(--career)", pct: "40%" },
            { label: "Bat dong san", color: "var(--health)", pct: "30%" },
            { label: "Startup/Co phieu", color: "var(--experience)", pct: "20%" },
            { label: "Tien mat", color: "var(--growth)", pct: "10%" },
          ].map((l) => (
            <div
              key={l.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.75rem",
                color: "var(--text-dim)",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  background: l.color,
                  flexShrink: 0,
                }}
              />
              {l.label} ({l.pct})
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
