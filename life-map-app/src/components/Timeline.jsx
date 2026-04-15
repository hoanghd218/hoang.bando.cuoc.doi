import { useState } from "react";
import { motion } from "framer-motion";
import { MILESTONES } from "../data";

function MilestoneCard({ milestone, index, isActive, onClick }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      style={{
        display: "flex",
        justifyContent: isLeft ? "flex-end" : "flex-start",
        width: "50%",
        alignSelf: isLeft ? "flex-start" : "flex-end",
        paddingRight: isLeft ? 40 : 0,
        paddingLeft: isLeft ? 0 : 40,
        marginBottom: -20,
        cursor: "pointer",
      }}
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        style={{
          background: isActive
            ? `linear-gradient(135deg, ${milestone.color}15, ${milestone.color}08)`
            : "var(--bg-card)",
          border: `2px solid ${isActive ? milestone.color : "rgba(255,255,255,0.05)"}`,
          borderRadius: 16,
          padding: "1.5rem",
          maxWidth: 420,
          width: "100%",
          transition: "border-color 0.3s, background 0.3s",
          position: "relative",
        }}
      >
        {/* Year badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <span
            style={{
              background: milestone.color,
              color: "#0a0e27",
              fontWeight: 800,
              fontSize: "1.1rem",
              padding: "4px 14px",
              borderRadius: 8,
            }}
          >
            {milestone.year}
          </span>
          <span style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>
            {milestone.age} tuoi
          </span>
        </div>

        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: milestone.color,
            marginBottom: 4,
          }}
        >
          {milestone.label}
        </h3>
        <p
          style={{
            color: "var(--text-dim)",
            fontSize: "0.8rem",
            marginBottom: 12,
          }}
        >
          {milestone.phase}
        </p>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {milestone.highlights.map((h, i) => (
            <li
              key={i}
              style={{
                color: "var(--text)",
                fontSize: "0.85rem",
                padding: "4px 0",
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <span style={{ color: milestone.color, flexShrink: 0 }}>▸</span>
              {h}
            </li>
          ))}
        </ul>

        {/* Expanded details */}
        {isActive && milestone.details && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                marginTop: 16,
                paddingTop: 16,
                borderTop: `1px solid ${milestone.color}30`,
              }}
            >
              {Object.entries(milestone.details).map(([key, val]) => (
                <div key={key} style={{ marginBottom: 8 }}>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      color: `var(--${key})`,
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {key}
                  </span>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                    {val}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section
      style={{
        padding: "4rem 2rem",
        maxWidth: 1000,
        margin: "0 auto",
        position: "relative",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          textAlign: "center",
          fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
          fontWeight: 800,
          marginBottom: "3rem",
          background: "linear-gradient(135deg, #fff, var(--accent))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        HANH TRINH 10 NAM
      </motion.h2>

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Center line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 3,
            background: "linear-gradient(to bottom, var(--accent), var(--gold), var(--health))",
            transform: "translateX(-50%)",
            borderRadius: 2,
          }}
        />

        {/* Milestone nodes on the line */}
        {MILESTONES.map((ms, i) => {
          const top = i * (100 / (MILESTONES.length - 1));
          return (
            <div
              key={ms.year}
              style={{
                position: "absolute",
                left: "50%",
                top: `${top}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.3 }}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: ms.color,
                  border: "3px solid var(--bg-primary)",
                  boxShadow: `0 0 20px ${ms.color}60`,
                }}
              />
            </div>
          );
        })}

        {/* Cards */}
        {MILESTONES.map((ms, i) => (
          <MilestoneCard
            key={ms.year}
            milestone={ms}
            index={i}
            isActive={activeIndex === i}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
