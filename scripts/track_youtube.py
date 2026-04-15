"""
Track YouTube channel stats hàng ngày.
Lưu dữ liệu vào docs/nhat-ky/youtube/ và cập nhật nhật ký hàng ngày.

Cách dùng:
    python scripts/track_youtube.py              # Track hôm nay
    python scripts/track_youtube.py --date 2026-04-08  # Track ngày cụ thể
    python scripts/track_youtube.py --summary     # Tổng hợp 7 ngày gần nhất
"""

import argparse
import json
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path

import requests
from dotenv import load_dotenv

# --- Config ---
ROOT_DIR = Path(__file__).resolve().parent.parent
load_dotenv(ROOT_DIR / ".env")

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY", "")
YOUTUBE_CHANNEL_ID = os.getenv("YOUTUBE_CHANNEL_ID", "")

DATA_DIR = ROOT_DIR / "docs" / "nhat-ky" / "youtube"
DAILY_DIR = ROOT_DIR / "docs" / "nhat-ky"

API_BASE = "https://www.googleapis.com/youtube/v3"


def fetch_channel_stats() -> dict:
    """Lấy thống kê kênh: subscribers, views, videos."""
    url = f"{API_BASE}/channels"
    params = {
        "part": "statistics,snippet",
        "id": YOUTUBE_CHANNEL_ID,
        "key": YOUTUBE_API_KEY,
    }
    resp = requests.get(url, params=params, timeout=15)
    resp.raise_for_status()
    data = resp.json()

    if not data.get("items"):
        print(f"Lỗi: Không tìm thấy kênh với ID: {YOUTUBE_CHANNEL_ID}")
        sys.exit(1)

    item = data["items"][0]
    stats = item["statistics"]
    return {
        "tên_kênh": item["snippet"]["title"],
        "subscribers": int(stats.get("subscriberCount", 0)),
        "tổng_views": int(stats.get("viewCount", 0)),
        "tổng_videos": int(stats.get("videoCount", 0)),
    }


def fetch_recent_videos(max_results: int = 5) -> list[dict]:
    """Lấy danh sách video mới nhất."""
    # Bước 1: Lấy danh sách video ID
    url = f"{API_BASE}/search"
    params = {
        "part": "snippet",
        "channelId": YOUTUBE_CHANNEL_ID,
        "order": "date",
        "maxResults": max_results,
        "type": "video",
        "key": YOUTUBE_API_KEY,
    }
    resp = requests.get(url, params=params, timeout=15)
    resp.raise_for_status()
    search_data = resp.json()

    video_ids = [item["id"]["videoId"] for item in search_data.get("items", [])]
    if not video_ids:
        return []

    # Bước 2: Lấy stats cho từng video
    url = f"{API_BASE}/videos"
    params = {
        "part": "statistics,snippet",
        "id": ",".join(video_ids),
        "key": YOUTUBE_API_KEY,
    }
    resp = requests.get(url, params=params, timeout=15)
    resp.raise_for_status()
    videos_data = resp.json()

    results = []
    for item in videos_data.get("items", []):
        stats = item["statistics"]
        results.append({
            "id": item["id"],
            "tiêu_đề": item["snippet"]["title"],
            "ngày_đăng": item["snippet"]["publishedAt"][:10],
            "views": int(stats.get("viewCount", 0)),
            "likes": int(stats.get("likeCount", 0)),
            "comments": int(stats.get("commentCount", 0)),
        })

    return results


def load_previous_data(date_str: str) -> dict | None:
    """Đọc dữ liệu ngày trước đó để tính delta."""
    # Tìm file gần nhất trước ngày hiện tại
    current = datetime.strptime(date_str, "%Y-%m-%d")
    for i in range(1, 8):
        prev_date = (current - timedelta(days=i)).strftime("%Y-%m-%d")
        prev_file = DATA_DIR / f"{prev_date}.json"
        if prev_file.exists():
            with open(prev_file) as f:
                return json.load(f)
    return None


def save_data(date_str: str, channel: dict, videos: list[dict]) -> Path:
    """Lưu dữ liệu JSON."""
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    data = {
        "ngày": date_str,
        "thời_gian_cập_nhật": datetime.now().isoformat(),
        "kênh": channel,
        "video_mới_nhất": videos,
    }

    filepath = DATA_DIR / f"{date_str}.json"
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    return filepath


def generate_markdown_report(date_str: str, channel: dict, videos: list[dict], prev: dict | None) -> str:
    """Tạo báo cáo markdown để chèn vào nhật ký."""
    lines = []

    # Tính delta
    if prev:
        prev_ch = prev["kênh"]
        delta_subs = channel["subscribers"] - prev_ch["subscribers"]
        delta_views = channel["tổng_views"] - prev_ch["tổng_views"]
        delta_sign = lambda x: f"+{x}" if x >= 0 else str(x)

        lines.append(f"- **Subscribers:** {channel['subscribers']:,} ({delta_sign(delta_subs)} so với lần track trước)")
        lines.append(f"- **Tổng views:** {channel['tổng_views']:,} ({delta_sign(delta_views)} views mới)")
        lines.append(f"- **Tổng videos:** {channel['tổng_videos']}")
    else:
        lines.append(f"- **Subscribers:** {channel['subscribers']:,}")
        lines.append(f"- **Tổng views:** {channel['tổng_views']:,}")
        lines.append(f"- **Tổng videos:** {channel['tổng_videos']}")

    # Top video gần đây
    if videos:
        lines.append("")
        lines.append("**Video gần đây:**")
        for v in videos[:3]:
            lines.append(f"- [{v['tiêu_đề']}](https://youtu.be/{v['id']}) — {v['views']:,} views, {v['likes']:,} likes")

    return "\n".join(lines)


def update_daily_journal(date_str: str, youtube_report: str):
    """Cập nhật phần YouTube trong nhật ký hàng ngày."""
    month = date_str[:7]
    journal_dir = DAILY_DIR / month.replace("-", "-")
    journal_file = journal_dir / f"{date_str}.md"

    if not journal_file.exists():
        print(f"  Nhật ký {date_str} chưa có, bỏ qua cập nhật nhật ký.")
        return

    content = journal_file.read_text(encoding="utf-8")

    # Tìm và thay thế phần YouTube
    marker = "- **YouTube:**"
    if marker in content:
        # Thay thế dòng YouTube cũ bằng report mới
        lines = content.split("\n")
        new_lines = []
        skip = False
        for line in lines:
            if marker in line:
                new_lines.append(f"- **YouTube:** (tự động cập nhật {date_str})")
                new_lines.append(f"  {youtube_report.replace(chr(10), chr(10) + '  ')}")
                skip = True
                continue
            if skip and line.strip().startswith("- **"):
                skip = False
            if not skip:
                new_lines.append(line)

        journal_file.write_text("\n".join(new_lines), encoding="utf-8")
        print(f"  Đã cập nhật nhật ký: {journal_file}")


def print_summary():
    """In tổng hợp 7 ngày gần nhất."""
    files = sorted(DATA_DIR.glob("*.json"), reverse=True)[:7]
    if not files:
        print("Chưa có dữ liệu. Chạy track trước.")
        return

    print("\n=== TỔNG HỢP YOUTUBE 7 NGÀY GẦN NHẤT ===\n")
    print(f"{'Ngày':<12} {'Subs':>8} {'Δ Subs':>8} {'Views':>12} {'Δ Views':>10}")
    print("-" * 55)

    prev_data = None
    for f in reversed(files):
        with open(f) as fp:
            data = json.load(fp)
        ch = data["kênh"]
        if prev_data:
            prev_ch = prev_data["kênh"]
            d_subs = ch["subscribers"] - prev_ch["subscribers"]
            d_views = ch["tổng_views"] - prev_ch["tổng_views"]
            print(f"{data['ngày']:<12} {ch['subscribers']:>8,} {d_subs:>+8} {ch['tổng_views']:>12,} {d_views:>+10,}")
        else:
            print(f"{data['ngày']:<12} {ch['subscribers']:>8,} {'—':>8} {ch['tổng_views']:>12,} {'—':>10}")
        prev_data = data

    # Tính tổng thay đổi
    if len(files) >= 2:
        with open(files[-1]) as fp:
            oldest = json.load(fp)
        with open(files[0]) as fp:
            newest = json.load(fp)
        total_subs = newest["kênh"]["subscribers"] - oldest["kênh"]["subscribers"]
        total_views = newest["kênh"]["tổng_views"] - oldest["kênh"]["tổng_views"]
        print("-" * 55)
        print(f"{'TỔNG':>20} {total_subs:>+8} {'':>12} {total_views:>+10,}")

    # Mục tiêu Sprint 1
    if files:
        with open(files[0]) as fp:
            latest = json.load(fp)
        current_subs = latest["kênh"]["subscribers"]
        target_subs = 5000
        remaining = target_subs - current_subs
        print(f"\nMục tiêu Sprint 1: {target_subs:,} subscribers")
        print(f"Hiện tại: {current_subs:,} | Còn thiếu: {remaining:,}")


def main():
    parser = argparse.ArgumentParser(description="Track YouTube channel stats")
    parser.add_argument("--date", default=datetime.now().strftime("%Y-%m-%d"),
                        help="Ngày track (YYYY-MM-DD), mặc định hôm nay")
    parser.add_argument("--summary", action="store_true",
                        help="Hiển thị tổng hợp 7 ngày")
    args = parser.parse_args()

    if not YOUTUBE_API_KEY or not YOUTUBE_CHANNEL_ID:
        print("Lỗi: Thiếu YOUTUBE_API_KEY hoặc YOUTUBE_CHANNEL_ID trong .env")
        print("Thêm vào .env:")
        print("  YOUTUBE_API_KEY=your_key_here")
        print("  YOUTUBE_CHANNEL_ID=your_channel_id_here")
        sys.exit(1)

    if args.summary:
        print_summary()
        return

    print(f"Đang track YouTube cho ngày {args.date}...")

    # Lấy dữ liệu
    channel = fetch_channel_stats()
    videos = fetch_recent_videos(5)

    print(f"  Kênh: {channel['tên_kênh']}")
    print(f"  Subscribers: {channel['subscribers']:,}")
    print(f"  Tổng views: {channel['tổng_views']:,}")
    print(f"  Tổng videos: {channel['tổng_videos']}")

    # So sánh với lần trước
    prev = load_previous_data(args.date)

    # Lưu dữ liệu
    filepath = save_data(args.date, channel, videos)
    print(f"  Đã lưu: {filepath}")

    # Tạo report
    report = generate_markdown_report(args.date, channel, videos, prev)
    print(f"\n--- Báo cáo ---\n{report}")

    # Cập nhật nhật ký
    update_daily_journal(args.date, report)


if __name__ == "__main__":
    main()
