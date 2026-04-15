import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MILESTONES, EXTRA_IMAGES } from "../data";

function ImageCard({ src, label, color, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.04, y: -5 }}
      onClick={onClick}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        aspectRatio: "1/1",
        border: `2px solid ${color || "rgba(255,255,255,0.1)"}`,
      }}
    >
      <img
        src={src}
        alt={label}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "2rem 1rem 0.8rem",
          background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
        }}
      >
        <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>{label}</p>
      </div>
    </motion.div>
  );
}

function Lightbox({ src, label, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.9)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        cursor: "zoom-out",
      }}
    >
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.7 }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 800, maxHeight: "90vh", position: "relative" }}
      >
        <img
          src={src}
          alt={label}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "85vh",
            objectFit: "contain",
            borderRadius: 12,
          }}
        />
        <p
          style={{
            textAlign: "center",
            marginTop: 12,
            fontSize: "1.1rem",
            fontWeight: 600,
          }}
        >
          {label}
        </p>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: -40,
            right: 0,
            background: "none",
            border: "none",
            color: "white",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function VisionGallery() {
  const [lightbox, setLightbox] = useState(null);

  const milestoneImages = MILESTONES.filter((m) => m.image).map((m) => ({
    src: m.image,
    label: `${m.year} — ${m.label}`,
    color: m.color,
  }));

  const extraImages = EXTRA_IMAGES.map((e) => ({
    src: e.src,
    label: e.label,
    color: "rgba(255,255,255,0.15)",
  }));

  const allImages = [...milestoneImages, ...extraImages];

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
          background: "linear-gradient(135deg, #ffd700, #ff9100)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        VISION BOARD
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
        Tuong tuong tuong lai — nhin thay de tin tuong
      </motion.p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.2rem",
        }}
      >
        {allImages.map((img, i) => (
          <ImageCard
            key={i}
            src={img.src}
            label={img.label}
            color={img.color}
            onClick={() => setLightbox(img)}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={lightbox.src}
            label={lightbox.label}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
