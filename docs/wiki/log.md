# Wiki Log — Nhật ký hoạt động

> Append-only. Mỗi entry ghi lại thao tác ingest, query, hoặc lint.

---

## [2026-04-08] init | Khởi tạo LLM Wiki

**Thao tác:** Khởi tạo toàn bộ cấu trúc wiki từ tài liệu hiện có.

**Sources đã ingest:**
1. `ban-do-cuoc-doi-tony-hoang-2026-2036.md` — Tài liệu nền tảng 10 năm
2. `chien-luoc-thuong-hieu-ca-nhan.md` — Chiến lược thương hiệu 3 nền tảng
3. `action-plan-90-ngay-sprint1.md` — Kế hoạch 90 ngày Sprint 1

**Trang wiki đã tạo (11 trang):**
- Entities: tony-hoang, freedombuilder, dan-martell
- Concepts: ai-agents, ironman-triathlon, tu-do-tai-chinh, thuong-hieu-ca-nhan
- Summaries: ban-do-cuoc-doi, chien-luoc-thuong-hieu, action-plan-sprint1
- Synthesis: tong-hop-sprint1-hien-tai

**Ghi chú:**
- 7 roadmaps chi tiết + 7 kế hoạch 2026 chưa được ingest riêng (thông tin chính đã nằm trong bản đồ cuộc đời)
- Có thể ingest thêm khi cần đi sâu vào từng lĩnh vực

---

## [2026-04-08] ingest | 7 Use Cases mới của Claude

**Thao tác:** Ingest transcript video "7 NEW Mind-Blowing Use Cases of Claude"

**Source:** `docs/sources/transcripts/7 NEW Mind-Blowing Use Cases of Claude.txt`

**Trang wiki đã tạo/cập nhật:**
- **Tạo mới:** `summaries/7-use-cases-claude.md` — Tóm tắt 7 tính năng: Memory 2.0, Co-work, Dispatch, Computer Use, Scheduled Tasks, Visualizations
- **Cập nhật:** `concepts/ai-agents.md` — Thêm mục "Xu hướng: Claude AI Agent Platform"
- **Cập nhật:** `entities/tony-hoang.md` — Thêm mục "Công cụ AI đang dùng/nghiên cứu"
- **Cập nhật:** `index.md` — Thêm summary mới, cập nhật thống kê (11→12 trang)

**Takeaways chính:**
- Claude đang chuyển từ chatbot → AI Agent platform → phù hợp tầm nhìn Tony
- 7 use cases = 7+ ý tưởng content YouTube cho FreedomBuilder
- Dispatch + Scheduled Tasks = automation thực sự, delegate từ xa
