# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Tony Hoang's 10-year life map (2026-2036, ages 32-42) — a personal strategic planning document, not a software codebase. The repository tracks goals, milestones, and action plans across 7 life areas.

## Structure

- `/docs/` — All planning documents live here. Never save files to the root folder.

## The 7 Life Areas

1. **Sức khỏe & Thể chất** — Mục tiêu sức khỏe (Half Marathon → Full Ironman năm 2036)
2. **Sự nghiệp & Công việc** — Sản phẩm AI Agent, cộng đồng FreedomBuilder, sách
3. **Tài chính** — Tự do tài chính ($60K/năm → $100M tổng tài sản năm 2036)
4. **Gia đình** — Con trai sinh 2019, con gái sinh 2025; 30 phút/ngày + 4 giờ/cuối tuần bắt buộc
5. **Phát triển bản thân** — Học 4-6h sáng mỗi ngày, viết sách
6. **Trải nghiệm & Giải trí** — Du lịch, workation, các giải chạy/đua
7. **Đóng góp & Cộng đồng** — FreedomBuilder: 2.500 → 200K+ thành viên

## Key Milestones (4 checkpoints)

- **2027 (1 year):** First paying customers, book #1 published, $1M revenue
- **2029 (3 years):** Full Marathon, 50K+ community, $3-5M revenue, angel investing
- **2031 (5 years):** Half Ironman, <10 person company + AI agents, $30M assets
- **2036 (10 years):** Full Ironman, <5 person company, $100M assets, digital nomad

## Language

**QUY TẮC BẮT BUỘC:** Tất cả nội dung trong repo này PHẢI viết bằng tiếng Việt CÓ DẤU (tiếng Việt có dấu đầy đủ).
- KHÔNG BAO GIỜ viết tiếng Việt không dấu — kể cả trong code comments, commit messages, file names, và tất cả tài liệu.
- Ví dụ đúng: "Sức khỏe & Thể chất", "Sự nghiệp & Công việc"
- Ví dụ sai: "Suc khoe & The chat", "Su nghiep & Cong viec"

## Working with This Repo

- Keep documents in `/docs/`
- Sprint hiện tại: Sprint 1 "Nền tảng" (04-06/2026) với kế hoạch hành động 90 ngày
- Chu kỳ review: KPI hàng tháng, đánh giá sprint 90 ngày, tổng kết năm (01/01/2027)
- Hình mẫu: Dan Martell (Tech Founder → Investor → Educator)
- Sứ mệnh: "Giải phóng bản thân và người khác khỏi công việc lặp lại bằng AI Agents"

## LLM Wiki — Cơ sở tri thức cá nhân

Repo này sử dụng pattern LLM Wiki: LLM duy trì một wiki liên kết từ các tài liệu gốc. Tony đọc wiki, LLM viết và cập nhật.

### Cấu trúc 3 tầng

1. **Nguồn thô** (`docs/sources/`) — Bài viết, podcast notes, sách, ghi chú. Immutable — LLM không sửa.
2. **Wiki** (`docs/wiki/`) — LLM sở hữu hoàn toàn. Tạo, cập nhật, liên kết chéo.
3. **Schema** (file CLAUDE.md này) — Quy ước, workflow, cấu trúc.

### Cấu trúc wiki

```
docs/wiki/
├── index.md          ← Danh mục tất cả trang (LLM đọc trước khi trả lời)
├── log.md            ← Nhật ký hoạt động (append-only)
├── entities/         ← Trang thực thể (người, tổ chức, sản phẩm)
├── concepts/         ← Trang khái niệm (AI Agents, Ironman, FIRE...)
├── summaries/        ← Tóm tắt mỗi nguồn đã ingest
└── synthesis/        ← Tổng hợp, so sánh, phân tích liên lĩnh vực
```

### 3 thao tác chính

**Ingest (Nạp nguồn mới):**
1. Tony thêm nguồn vào `docs/sources/`
2. LLM đọc nguồn, thảo luận takeaways với Tony
3. LLM tạo summary trong `wiki/summaries/`
4. LLM cập nhật các entity/concept pages liên quan
5. LLM cập nhật `index.md` và append `log.md`

**Query (Hỏi đáp):**
1. LLM đọc `wiki/index.md` để tìm trang liên quan
2. LLM đọc các trang wiki, tổng hợp câu trả lời có trích dẫn
3. Câu trả lời hay có thể lưu lại thành trang synthesis mới

**Lint (Kiểm tra sức khỏe wiki):**
1. Tìm mâu thuẫn giữa các trang
2. Tìm trang mồ côi (không có liên kết đến)
3. Tìm khái niệm được đề cập nhưng chưa có trang riêng
4. Tìm thông tin cũ cần cập nhật
5. Gợi ý câu hỏi mới để khám phá

### Quy ước wiki pages

- Mỗi trang có YAML frontmatter: `tags`, `sources`, `created`, `updated`
- Liên kết chéo dùng cú pháp Obsidian: `[[tên-trang]]`
- Mỗi trang kết thúc bằng "Xem thêm" với các liên kết liên quan
- Tên file: kebab-case, tiếng Việt không dấu (vì đây là filename, không phải nội dung)
- Nội dung bên trong: PHẢI viết tiếng Việt có dấu (theo quy tắc ngôn ngữ)

### Quy tắc LLM khi làm việc với wiki

- LUÔN đọc `wiki/index.md` trước khi trả lời câu hỏi về nội dung
- Khi ingest nguồn mới: cập nhật TẤT CẢ trang liên quan, không chỉ tạo summary
- Khi phát hiện mâu thuẫn: ghi chú rõ ràng, không âm thầm ghi đè
- Append `log.md` sau mỗi thao tác ingest/query quan trọng/lint
- Tài liệu gốc trong `docs/` (ngoài wiki) là source of truth — wiki tóm tắt, không thay thế
