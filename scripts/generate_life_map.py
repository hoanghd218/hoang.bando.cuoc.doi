#!/usr/bin/env python3
"""
Generate visual life map for Tony Hoang 2026-2036.
Creates:
  1. A timeline infographic (matplotlib)
  2. AI-generated milestone images (Kie.ai nano-banana-2)
  3. A combined vision board
"""
from __future__ import annotations

import os
import sys
import textwrap

# Add parent dir so we can import image_providers & config
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.offsetbox import OffsetImage, AnnotationBbox
from PIL import Image, ImageDraw, ImageFont
import numpy as np

import config  # noqa: F401 — needed by image_providers
from image_providers import generate_image

# ── Output ──────────────────────────────────────────────────────────
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "images")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ── Renderer config ─────────────────────────────────────────────────
RENDERER = "kie"          # nano-banana-2
ASPECT_RATIO = "1:1"      # square milestone cards
IMAGE_SIZE = (1024, 1024)  # expected output

# ── Color palette ───────────────────────────────────────────────────
COLORS = {
    "bg":          "#0a0e27",
    "card_bg":     "#131836",
    "accent":      "#00d4ff",
    "gold":        "#ffd700",
    "health":      "#00e676",
    "career":      "#448aff",
    "finance":     "#ffd740",
    "family":      "#ff6090",
    "growth":      "#b388ff",
    "experience":  "#ff9100",
    "community":   "#69f0ae",
    "text":        "#ffffff",
    "text_dim":    "#8892b0",
}

AREA_COLORS = {
    "health":     COLORS["health"],
    "career":     COLORS["career"],
    "finance":    COLORS["finance"],
    "family":     COLORS["family"],
    "growth":     COLORS["growth"],
    "experience": COLORS["experience"],
    "community":  COLORS["community"],
}

# ── Milestone data ──────────────────────────────────────────────────
MILESTONES = [
    {
        "year": 2027,
        "age": 33,
        "label": "NAM 1 — KHOI DAU",
        "highlights": [
            "Half Marathon dau tien",
            "Sach #1 xuat ban",
            "$1M doanh thu",
            "10K+ FreedomBuilder",
        ],
        "color": COLORS["accent"],
    },
    {
        "year": 2029,
        "age": 35,
        "label": "NAM 3 — TANG TOC",
        "highlights": [
            "Full Marathon",
            "50K+ community",
            "$3-5M doanh thu",
            "Bat dau dau tu startup",
        ],
        "color": COLORS["gold"],
    },
    {
        "year": 2031,
        "age": 37,
        "label": "NAM 5 — BUT PHA",
        "highlights": [
            "Half Ironman 70.3",
            "<10 nguoi + AI agents",
            "$30M tai san",
            "Speaker quoc te",
        ],
        "color": COLORS["experience"],
    },
    {
        "year": 2036,
        "age": 42,
        "label": "NAM 10 — TU DO",
        "highlights": [
            "Full Ironman Finisher",
            "<5 nguoi, $100M",
            "Digital nomad",
            "Quy dau tu + tu thien",
        ],
        "color": COLORS["health"],
    },
]

# ── 7 Life areas for the wheel ──────────────────────────────────────
LIFE_AREAS = [
    {"name": "Suc khoe",    "icon": "SK", "key": "health",     "target": "Ironman Finisher"},
    {"name": "Su nghiep",   "icon": "SN", "key": "career",     "target": "$100M, <5 nguoi"},
    {"name": "Tai chinh",   "icon": "TC", "key": "finance",    "target": "$100M tai san"},
    {"name": "Gia dinh",    "icon": "GD", "key": "family",     "target": "Con trai 17, gai 11"},
    {"name": "Phat trien",  "icon": "PT", "key": "growth",     "target": "Speaker, Author"},
    {"name": "Trai nghiem", "icon": "TN", "key": "experience", "target": "Digital nomad"},
    {"name": "Cong dong",   "icon": "CD", "key": "community",  "target": "200K+ members"},
]

# ── AI Image prompts for milestones ─────────────────────────────────
MILESTONE_PROMPTS = {
    2027: (
        "Illustration of a confident young Vietnamese man, age 33, crossing a half marathon "
        "finish line with a medal, wearing running gear, city skyline behind him, "
        "golden sunrise, his wife and two small children (a 8-year-old boy and a 2-year-old girl) "
        "cheering on the sideline. Warm cinematic lighting, "
        "inspirational atmosphere, digital art style, vibrant colors, detailed."
    ),
    2029: (
        "Illustration of a successful Vietnamese tech entrepreneur, age 35, standing on stage "
        "at a tech conference giving a keynote speech about AI Agents, large screen behind showing "
        "'50K+ Community', audience of hundreds. He looks confident and passionate. "
        "His family (wife, 10-year-old son, 4-year-old daughter) watching proudly from front row. "
        "Modern conference hall, blue and gold lighting, digital art style, cinematic."
    ),
    2031: (
        "Illustration of an athletic Vietnamese man, age 37, finishing a Half Ironman triathlon "
        "(swimming, cycling, running), emerging from water onto beach with '70.3' banner. "
        "Sunset over ocean. His son (12) and daughter (6) running to hug him at finish line. "
        "Trophy and medal visible. Inspirational, epic composition, digital art, warm golden light."
    ),
    2036: (
        "Illustration of a fit Vietnamese man, age 42, with 6-pack abs, standing on a luxury "
        "beachfront villa balcony overlooking tropical ocean at sunset. His teenage son (17) "
        "and daughter (11) beside him, laptop on table showing AI dashboard. "
        "Private infinity pool, palm trees, yacht in distance. He has achieved complete freedom — "
        "financial, time, location. Digital art, cinematic, golden hour, aspirational lifestyle, "
        "warm family moment, ultra detailed."
    ),
}

# Extra images: family vision & Ikigai
EXTRA_PROMPTS = {
    "family_2036": (
        "Warm illustration of a happy Vietnamese family of four traveling the world together: "
        "father (42, fit, confident), mother (beautiful), teenage son (17), daughter (11). "
        "They are at an iconic world landmark collage — Eiffel Tower, Tokyo Tower, Sydney Opera House. "
        "Luggage, passports, smiles. Digital nomad family lifestyle. "
        "Bright, colorful, joyful, digital art, travel poster style."
    ),
    "workspace_future": (
        "Futuristic minimalist workspace of a Vietnamese tech CEO: sleek desk with holographic "
        "AI agent dashboard showing autonomous business operations, multiple screens with charts "
        "showing $100M revenue. Ocean view through floor-to-ceiling windows. "
        "Only 5 team members visible on video call. AI robots handling tasks. "
        "Clean, modern, inspirational, digital art, blue and gold color scheme."
    ),
    "ironman_finish": (
        "Epic illustration of a Vietnamese man crossing the Ironman 140.6 finish line at sunset, "
        "arms raised in triumph, lean muscular build with visible abs, "
        "crowd cheering, confetti falling, 'IRONMAN FINISHER' banner overhead. "
        "His family (wife, teenage son, young daughter) embracing him at the finish. "
        "Emotional, triumphant, golden light, digital art, ultra detailed, cinematic composition."
    ),
    "community_impact": (
        "Illustration of a Vietnamese man speaking to a massive online community — "
        "200,000+ members shown as a glowing network graph behind him. "
        "FreedomBuilder logo, people from around the world connected through screens, "
        "AI agents floating as helpful digital assistants. "
        "Inspirational, tech-forward, warm, community feeling, digital art."
    ),
}


# ── 1. Generate Timeline Infographic ────────────────────────────────

def generate_timeline_infographic():
    """Create the main timeline infographic with matplotlib."""
    fig, ax = plt.subplots(1, 1, figsize=(20, 28), facecolor=COLORS["bg"])
    ax.set_facecolor(COLORS["bg"])
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 14)
    ax.axis("off")

    # ── Title ──
    ax.text(5, 13.5, "BAN DO CUOC DOI", fontsize=42, fontweight="bold",
            color=COLORS["text"], ha="center", va="center",
            fontfamily="sans-serif")
    ax.text(5, 13.05, "TONY HOANG  •  2026 → 2036  •  32 → 42 TUOI",
            fontsize=18, color=COLORS["accent"], ha="center", va="center")

    # ── Mission ──
    mission = ('"Giai phong ban than va nguoi khac\n'
               'khoi cong viec lap lai bang AI Agents"')
    ax.text(5, 12.45, mission, fontsize=14, color=COLORS["gold"],
            ha="center", va="center", style="italic",
            bbox=dict(boxstyle="round,pad=0.5", facecolor=COLORS["card_bg"],
                      edgecolor=COLORS["gold"], alpha=0.8, linewidth=1.5))

    # ── Timeline line ──
    timeline_y = 9.5
    ax.plot([1, 9], [timeline_y, timeline_y], color=COLORS["accent"],
            linewidth=3, alpha=0.5, zorder=1)

    # Timeline dots & milestone cards
    x_positions = [1.5, 3.8, 6.2, 8.5]
    for i, (ms, x) in enumerate(zip(MILESTONES, x_positions)):
        # Dot on timeline
        ax.plot(x, timeline_y, "o", color=ms["color"], markersize=20, zorder=3)
        ax.text(x, timeline_y, str(ms["year"]), fontsize=9, fontweight="bold",
                color=COLORS["bg"], ha="center", va="center", zorder=4)

        # Card below
        card_y = 7.8
        card = mpatches.FancyBboxPatch(
            (x - 0.85, card_y - 0.9), 1.7, 1.8,
            boxstyle="round,pad=0.15",
            facecolor=COLORS["card_bg"],
            edgecolor=ms["color"],
            linewidth=2,
            alpha=0.9,
        )
        ax.add_patch(card)

        # Card content
        ax.text(x, card_y + 0.65, ms["label"], fontsize=9, fontweight="bold",
                color=ms["color"], ha="center", va="center")
        ax.text(x, card_y + 0.4, f'{ms["age"]} tuoi', fontsize=8,
                color=COLORS["text_dim"], ha="center", va="center")

        for j, h in enumerate(ms["highlights"]):
            ax.text(x, card_y + 0.05 - j * 0.22, f"• {h}", fontsize=7.5,
                    color=COLORS["text"], ha="center", va="center")

        # Connector line
        ax.plot([x, x], [timeline_y - 0.15, card_y + 0.85],
                color=ms["color"], linewidth=1.5, alpha=0.6, linestyle="--")

    # ── 7 Life Areas wheel ──
    wheel_y = 5.2
    ax.text(5, 6.3, "7 LINH VUC CUOC DOI", fontsize=20, fontweight="bold",
            color=COLORS["text"], ha="center", va="center")

    angles = np.linspace(0, 2 * np.pi, len(LIFE_AREAS), endpoint=False)
    radius = 1.8
    center_x, center_y = 5, wheel_y - 0.3

    # Center circle
    center_circle = plt.Circle((center_x, center_y), 0.6,
                                facecolor=COLORS["card_bg"],
                                edgecolor=COLORS["accent"], linewidth=2)
    ax.add_patch(center_circle)
    ax.text(center_x, center_y + 0.1, "IKIGAI", fontsize=10, fontweight="bold",
            color=COLORS["accent"], ha="center", va="center")
    ax.text(center_x, center_y - 0.15, "AI Agents", fontsize=8,
            color=COLORS["text_dim"], ha="center", va="center")

    for k, (area, angle) in enumerate(zip(LIFE_AREAS, angles)):
        # Offset to start from top
        a = angle - np.pi / 2
        bx = center_x + radius * np.cos(a)
        by = center_y + radius * np.sin(a)
        color = AREA_COLORS[area["key"]]

        # Line from center
        ax.plot([center_x, bx], [center_y, by], color=color,
                linewidth=1.5, alpha=0.4)

        # Area circle
        area_circle = plt.Circle((bx, by), 0.55,
                                  facecolor=COLORS["card_bg"],
                                  edgecolor=color, linewidth=2)
        ax.add_patch(area_circle)

        ax.text(bx, by + 0.15, area["icon"], fontsize=11, fontweight="bold",
                ha="center", va="center", color=color)
        ax.text(bx, by - 0.1, area["name"], fontsize=7, fontweight="bold",
                color=color, ha="center", va="center")
        ax.text(bx, by - 0.3, area["target"], fontsize=5.5,
                color=COLORS["text_dim"], ha="center", va="center")

    # ── Financial trajectory ──
    fin_y = 2.0
    ax.text(5, 2.9, "HANH TRINH TAI CHINH", fontsize=16, fontweight="bold",
            color=COLORS["finance"], ha="center", va="center")

    fin_data = [
        (2026, "$60K", 0.06),
        (2027, "$1M", 1.0),
        (2029, "$5M", 5.0),
        (2031, "$30M", 30.0),
        (2036, "$100M", 100.0),
    ]
    fin_x = [1.5, 3, 5, 7, 8.5]
    fin_heights = [0.02, 0.1, 0.3, 0.6, 1.0]

    for fx, (yr, label, _), fh in zip(fin_x, fin_data, fin_heights):
        bar = mpatches.FancyBboxPatch(
            (fx - 0.3, fin_y - 0.5), 0.6, fh * 1.2,
            boxstyle="round,pad=0.05",
            facecolor=COLORS["finance"],
            alpha=0.3 + fh * 0.6,
        )
        ax.add_patch(bar)
        ax.text(fx, fin_y - 0.65, str(yr), fontsize=8,
                color=COLORS["text_dim"], ha="center")
        ax.text(fx, fin_y - 0.5 + fh * 1.2 + 0.1, label, fontsize=10,
                fontweight="bold", color=COLORS["finance"], ha="center")

    # ── Bottom quote ──
    ax.text(5, 0.5,
            '"Ban danh gia qua cao nhung gi minh lam trong 1 nam,\n'
            'va danh gia qua thap nhung gi minh lam trong 10 nam." — Jim Rohn',
            fontsize=11, color=COLORS["text_dim"], ha="center", va="center",
            style="italic")

    # ── Save ──
    path = os.path.join(OUTPUT_DIR, "life_map_timeline.png")
    fig.savefig(path, dpi=200, bbox_inches="tight",
                facecolor=COLORS["bg"], edgecolor="none")
    plt.close(fig)
    print(f"[OK] Timeline infographic saved: {path}")
    return path


# ── 2. Generate AI milestone images ─────────────────────────────────

def generate_milestone_images():
    """Generate AI images for each milestone using Kie.ai (nano-banana-2)."""
    paths = {}

    all_prompts = {}
    for year, prompt in MILESTONE_PROMPTS.items():
        all_prompts[f"milestone_{year}"] = prompt
    for name, prompt in EXTRA_PROMPTS.items():
        all_prompts[name] = prompt

    for name, prompt in all_prompts.items():
        out_path = os.path.join(OUTPUT_DIR, f"{name}.png")
        if os.path.exists(out_path):
            print(f"[SKIP] {name} — already exists")
            paths[name] = out_path
            continue

        print(f"\n[GEN] {name}...")
        print(f"  Prompt: {prompt[:80]}...")

        img = generate_image(
            prompt=prompt,
            renderer=RENDERER,
            aspect_ratio=ASPECT_RATIO,
        )
        if img:
            img.save(out_path)
            print(f"[OK] Saved: {out_path}")
            paths[name] = out_path
        else:
            print(f"[FAIL] Could not generate {name}")

    return paths


# ── 3. Create combined vision board ─────────────────────────────────

def create_vision_board(timeline_path: str, milestone_paths: dict):
    """Combine timeline + milestone images into a single vision board."""
    # Layout: 3 columns x 4 rows of milestone images + timeline on top
    CARD_SIZE = 800
    PADDING = 30
    COLS = 4
    ROWS = 2

    # Calculate dimensions
    grid_w = COLS * CARD_SIZE + (COLS + 1) * PADDING
    grid_h = ROWS * CARD_SIZE + (ROWS + 1) * PADDING

    # Load timeline
    timeline_img = Image.open(timeline_path)
    tw = grid_w
    th = int(timeline_img.height * (tw / timeline_img.width))

    total_h = th + grid_h + PADDING * 2
    board = Image.new("RGB", (grid_w, total_h), color=(10, 14, 39))
    draw = ImageDraw.Draw(board)

    # Paste timeline at top
    timeline_resized = timeline_img.resize((tw, th), Image.LANCZOS)
    board.paste(timeline_resized, (0, 0))

    # Paste milestone images in grid
    ordered_keys = [
        "milestone_2027", "milestone_2029", "milestone_2031", "milestone_2036",
        "family_2036", "workspace_future", "ironman_finish", "community_impact",
    ]

    labels = [
        "2027 — KHOI DAU", "2029 — TANG TOC", "2031 — BUT PHA", "2036 — TU DO",
        "GIA DINH 2036", "WORKSPACE", "IRONMAN", "CONG DONG",
    ]

    y_offset = th + PADDING
    for idx, (key, label) in enumerate(zip(ordered_keys, labels)):
        row = idx // COLS
        col = idx % COLS
        x = PADDING + col * (CARD_SIZE + PADDING)
        y = y_offset + row * (CARD_SIZE + PADDING)

        if key in milestone_paths and os.path.exists(milestone_paths[key]):
            img = Image.open(milestone_paths[key])
            img = img.resize((CARD_SIZE, CARD_SIZE), Image.LANCZOS)
            board.paste(img, (x, y))
        else:
            # Placeholder
            draw.rectangle([x, y, x + CARD_SIZE, y + CARD_SIZE],
                           fill=(19, 24, 54), outline=(0, 212, 255), width=2)
            draw.text((x + CARD_SIZE // 2, y + CARD_SIZE // 2), "?",
                      fill=(100, 100, 150))

        # Label overlay
        label_bg = Image.new("RGBA", (CARD_SIZE, 50), (0, 0, 0, 180))
        board.paste(label_bg.convert("RGB"), (x, y + CARD_SIZE - 50),
                    mask=label_bg.split()[3])
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 22)
        except Exception:
            font = ImageFont.load_default()
        bbox = draw.textbbox((0, 0), label, font=font)
        tw2 = bbox[2] - bbox[0]
        draw.text((x + (CARD_SIZE - tw2) // 2, y + CARD_SIZE - 42), label,
                  fill=(255, 255, 255), font=font)

    # Save
    path = os.path.join(OUTPUT_DIR, "vision_board.png")
    board.save(path, quality=95)
    print(f"\n[OK] Vision board saved: {path}")
    return path


# ── Main ────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("  BAN DO CUOC DOI — TONY HOANG 2026-2036")
    print("  Visual Life Map Generator")
    print("=" * 60)

    # Step 1: Timeline infographic
    print("\n[1/3] Generating timeline infographic...")
    timeline_path = generate_timeline_infographic()

    # Step 2: AI milestone images
    print("\n[2/3] Generating AI milestone images (Kie.ai / nano-banana-2)...")
    print("  This may take several minutes...")
    milestone_paths = generate_milestone_images()

    # Step 3: Vision board
    print("\n[3/3] Creating combined vision board...")
    if milestone_paths:
        vision_path = create_vision_board(timeline_path, milestone_paths)
    else:
        print("  [SKIP] No milestone images generated, skipping vision board")
        vision_path = None

    # Summary
    print("\n" + "=" * 60)
    print("  DONE!")
    print(f"  Timeline:     {timeline_path}")
    if milestone_paths:
        print(f"  Images:       {len(milestone_paths)} generated in {OUTPUT_DIR}/")
    if vision_path:
        print(f"  Vision board: {vision_path}")
    print("=" * 60)


if __name__ == "__main__":
    main()
