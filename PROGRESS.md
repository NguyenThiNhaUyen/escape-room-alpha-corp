# PROGRESS.md — Escape Room: Giải cứu Alpha Corp

## Current status

**Giai đoạn**: Implementation hoàn tất — chờ user kiểm tra thủ công

**Trạng thái**: Tất cả 4 file code đã được tạo. User có thể mở `index.html` trực tiếp trong browser để kiểm tra.

---

## Completed tasks

- [x] Đọc và phân tích kịch bản từ `docs/`
- [x] Tạo Implementation Plan v1
- [x] Review và cập nhật Implementation Plan v2
- [x] Tạo AGENTS.md (quy tắc làm việc)
- [x] Tạo PROGRESS.md (theo dõi tiến độ)
- [x] Cập nhật Implementation Plan v2.1 bổ sung file scope 6 file
- [x] Implement `data.js` — INTRO_DATA, ENDING_DATA, ROOMS (10 phòng đầy đủ nội dung)
- [x] Implement `index.css` — design tokens, cards, options, buttons, progress bar, formula, collapse/expand, Presentation Mode, animations, responsive
- [x] Implement `index.html` — HTML skeleton với 3 screen sections, canvas particles, presentation toggle
- [x] Implement `app.js` — state management, render (intro/room/ending), answer logic (đúng/sai), collapse/expand, Presentation Mode, particle system

---

## Pending tasks

- [ ] User kiểm tra thủ công: mở index.html trong browser
- [ ] Kiểm tra flow: Intro → 10 phòng → Ending
- [ ] Kiểm tra logic đúng/sai
- [ ] Kiểm tra Presentation Mode
- [ ] Kiểm tra Thu gọn / Mở rộng lý thuyết
- [ ] Kiểm tra responsive
- [ ] Fix bugs nếu có

---

## Verification checklist

| # | Kiểm tra | Trạng thái |
|---|---|---|
| 1 | Mở `index.html` chạy được trực tiếp trong browser | ☐ |
| 2 | Màn mở đầu hiển thị đúng tiêu đề, mô tả, nút bắt đầu | ☐ |
| 3 | Bấm "Bắt đầu giải cứu" chuyển sang Phòng 1 | ☐ |
| 4 | Có đủ 10 phòng | ☐ |
| 5 | Mỗi phòng hiển thị đúng thứ tự: Lý thuyết → Alpha Corp → Câu hỏi | ☐ |
| 6 | Chọn sai → hiện gợi ý + cho chọn lại | ☐ |
| 7 | Chọn đúng → hiện giải thích + nút sang phòng tiếp | ☐ |
| 8 | Sau Phòng 10 chuyển sang màn kết thúc | ☐ |
| 9 | Màn kết thúc có điểm số và kết luận thuyết trình | ☐ |
| 10 | Thanh tiến trình cập nhật đúng theo phòng hiện tại | ☐ |
| 11 | Presentation Mode hoạt động | ☐ |
| 12 | Nút Thu gọn / Mở rộng lý thuyết hoạt động | ☐ |
| 13 | Không có lỗi console nghiêm trọng | ☐ |
| 14 | Giao diện đọc tốt trên laptop và máy chiếu | ☐ |
| 15 | Công thức T → H … SX … H' → T' nổi bật ở phòng liên quan | ☐ |

---

## Notes / Quyết định quan trọng

- **2025-06-25**: Quyết định dùng HTML + CSS + JS thuần, không framework.
- **2025-06-25**: File scope cố định 6 file (4 code + 2 markdown).
- **2025-06-25**: Nội dung lý thuyết giữ nguyên 100% từ kịch bản, không rút gọn.
- **2025-06-25**: Thêm Presentation Mode và nút Thu gọn/Mở rộng lý thuyết.
- **2025-06-25**: Implementation hoàn tất 4 file code. Chờ user kiểm tra thủ công.
