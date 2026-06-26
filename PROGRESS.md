# PROGRESS.md — Escape Room: Giải mã Alpha Corp

## Current status

### Update - 2026-06-26: Academic & Scholarly UI Redesign

- [x] Thay đổi lớp phủ hình nền thành dạng dải tròn (radial vignette gradient) để hướng sự tập trung của lớp học vào trung tâm và tạo chiều sâu trang nghiêm.
- [x] Đóng hộp các `.card` thành dạng bảng chuyên đề (thêm màu nền xám than ấm, viền mảnh, bo góc 8px và đổ bóng nhẹ), khắc phục triệt để lỗi chữ đè lên ảnh nền.
- [x] Đơn giản hóa các ô đáp án `.option-item`: loại bỏ hiệu ứng dịch chuyển ngang (translateX) gây cảm giác trò chơi lòe loẹt, chỉ giữ lại sự thay đổi màu viền tinh tế và chuyên nghiệp.
- [x] Tối ưu hóa hàm `selectAnswer` và `handleIncorrect` trong `app-game.js`: thay vì vẽ lại toàn bộ phòng học (renderRoom) khi chọn đáp án hoặc khi chọn sai (gây Reflow giật/lệch màn hình), giờ đây ứng dụng thực hiện cập nhật trực tiếp trong DOM. Khi trả lời sai, ô đáp án sẽ chuyển đỏ, nút bấm kiểm tra bị khóa và dòng chữ cảnh báo "Chưa đúng!..." sẽ lắc nhẹ (shake) hiển thị mượt mà tại chỗ, không làm dịch chuyển vị trí trang.
- [x] Loại bỏ toàn bộ hiệu ứng phát sáng neon (glow) và chớp tắt lòe loẹt ở công thức (`.formula-display`, `.formula-inline`), trình bày công thức trong hộp phẳng phẳng sạch sẽ.
- [x] Thiết kế lại Diagnosis Panel thành một bảng báo cáo khoa học thanh lịch với các đường kẻ mảnh và màu sắc trung tính trang nhã.
- [x] Giảm tốc độ di chuyển hạt bụi bay ở nền xuống hệ số `0.1` để tạo cảm giác chậm rãi, tôn nghiêm như trong giảng đường đại học.
- [x] Đồng bộ hóa hiệu ứng dải màu nền vignette cho cả chế độ thuyết trình (Presentation Mode).
- [x] Kiểm tra cú pháp JavaScript thành công bằng `node --check`.

**Giai đoạn**: UI Improvements v7 — Tinh chỉnh phong cách học thuật tối giản & Trang nghiêm thuyết trình

**Trạng thái**: Hoàn tất lột xác giao diện từ dạng phẳng trong suốt đơn điệu sang dạng các hộp bảng biểu giáo trình điện tử trang trọng, rõ chữ, tương phản cao, loại bỏ toàn bộ các chi tiết chớp nháy màu mè/gamey để phù hợp tuyệt đối cho bài thuyết trình môn Triết học/Kinh tế chính trị.


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

### UI Improvements v2 (2026-06-26)
- [x] Thêm GSAP CDN vào `index.html`
- [x] Door Transition — cửa vault mở khóa bằng GSAP timeline khi chuyển phòng
- [x] Mini Map — 10 node tròn thay progress bar (completed/current/locked states)
- [x] Key Acquired — badge "🔑 Key Acquired" + nút "🔓 Mở khóa phòng tiếp theo"
- [x] Alpha Corp Dossier — nhãn "DOSSIER" trên card case header + gold glow
- [x] Formula Timeline — T → H … SX … H' → T' ngang, highlight theo phòng, phòng 10 đỏ
- [x] Ending Diagnosis Panel — bảng "Diagnosis Report" với điểm mắc kẹt, nguyên nhân, kết luận
- [x] Intro Building Silhouettes — 3 tòa tháp CSS pseudo-element ở nền intro
- [x] Cập nhật AGENTS.md tech scope (cho phép thư viện CDN nhỏ)
- [x] Theme Overhaul — Đổi toàn bộ palette màu từ Sci-Fi Neon sang Dusty Gold & Charcoal
- [x] Cài đặt `background.jpg` làm hình nền chính của web với lớp phủ tối màu để tối ưu hiển thị văn bản
- [x] Loại bỏ hộp card đóng hộp (Card border/background) chuyển thành các Block mở rộng thoáng đạt chia theo khoảng trắng
- [x] Tích hợp font Space Grotesk (Tiêu đề), Inter (Nội dung) và JetBrains Mono (Monospace cho công thức)
- [x] Tích hợp thư viện Lucide Icons qua CDN và thay thế hoàn toàn các emoji cũ
- [x] Phân phối lại hệ thống màu sắc theo phân cấp (Chữ tiêu đề màu trắng, Công thức màu vàng gold, Các nút hành động màu cam, Nhãn cảnh báo màu đỏ)
- [x] Tối ưu hóa hiển thị trình chiếu nâng cao: Khi bật Presentation Mode, tăng font-weight của body, p, li, options lên 600, đổi màu text phụ sang trắng tinh #ffffff, tăng độ đậm lớp phủ tối lên 0.96 và tăng sáng màu accent/gold để tăng tối đa độ sắc nét khi chiếu lên máy chiếu mờ.
- [x] Bổ sung nội dung phân tích tuần hoàn chi tiết từ Phòng 5 kịch bản (các điều kiện liên tục về không gian, thời gian, lưu thông) tích hợp đầy đủ vào Phòng 10 (phòng tổng kết) trong data.js

---

## Pending tasks

- [ ] User kiểm tra thủ công: mở index.html trong browser
- [ ] Kiểm tra door transition hoạt động
- [ ] Kiểm tra minimap hiển thị đúng trạng thái
- [ ] Kiểm tra formula timeline highlight đúng theo phòng
- [ ] Kiểm tra Presentation Mode với các tính năng mới
- [ ] Fix bugs nếu có

---

## Verification checklist

| # | Kiểm tra | Trạng thái |
|---|---|---|
| 1 | Mở `index.html` chạy được trực tiếp trong browser | ☐ |
| 2 | Màn mở đầu hiển thị đúng + có silhouette 3 tòa tháp nhẹ ở nền | ☐ |
| 3 | Bấm "Bắt đầu giải mã" chuyển sang Phòng 1 | ☐ |
| 4 | Mini Map hiển thị: node 1 amber, nodes 2-10 xám | ☐ |
| 5 | Formula Timeline hiển thị: T → H sáng amber (phòng 1-2) | ☐ |
| 6 | Card Alpha Corp có nhãn "DOSSIER" ở header | ☐ |
| 7 | Chọn đúng → "🔑 Key Acquired" badge + nút "🔓 Mở khóa phòng tiếp theo" | ☐ |
| 8 | Bấm nút → Door transition: lock xoay, ACCESS GRANTED, cửa trượt | ☐ |
| 9 | Sau transition, phòng mới render đúng + minimap cập nhật | ☐ |
| 10 | Phòng 10: formula timeline H'→T' đổi đỏ | ☐ |
| 11 | Ending: có Diagnosis Panel (điểm mắc kẹt, nguyên nhân, kết luận) | ☐ |
| 12 | Presentation Mode: door transition ngắn hơn, bớt glow | ☐ |
| 13 | Chọn sai vẫn hoạt động đúng (shake + disable + thử lại) | ☐ |
| 14 | Responsive: minimap, timeline, diagnosis panel không vỡ layout | ☐ |
| 15 | Console không có lỗi nghiêm trọng | ☐ |
| 16 | GSAP CDN fail → fallback: chuyển phòng bình thường, không crash | ☐ |

---

## Notes / Quyết định quan trọng

- **2025-06-25**: Quyết định dùng HTML + CSS + JS thuần, không framework.
- **2025-06-25**: File scope cố định 6 file (4 code + 2 markdown).
- **2025-06-25**: Nội dung lý thuyết giữ nguyên 100% từ kịch bản, không rút gọn.
- **2025-06-25**: Thêm Presentation Mode và nút Thu gọn/Mở rộng lý thuyết.
- **2025-06-25**: Implementation hoàn tất 4 file code. Chờ user kiểm tra thủ công.
- **2026-06-26**: Mở rộng tech scope cho phép thư viện CDN nhỏ (GSAP).
- **2026-06-26**: Thêm GSAP 3.x qua jsdelivr CDN cho door transition animation.
- **2026-06-26**: Formula timeline hiện ở tất cả 10 phòng (không chỉ phòng có room.formula).
- **2026-06-26**: data.js KHÔNG bị sửa — nội dung giữ nguyên 100%.
- **2026-06-26**: Đổi theme toàn diện sang "Corporate Thriller" (dusty gold + charcoal + bronze) để phù hợp kịch bản khủng hoảng tài chính và bất động sản của Alpha Corp.
- **2026-06-26**: Tích hợp ảnh nền `background.jpg` do người dùng cung cấp vào CSS, kết hợp với overlay tối màu tăng tính tương phản cho văn bản thuyết trình.
- **2026-06-26**: Điều chỉnh màu các hạt particles trong Canvas và các hiệu ứng chuyển cảnh khóa vault sang tông màu amber ấm áp.
- **2026-06-26**: Loại bỏ kiểu thiết kế đóng hộp (boxy cards) cho lý thuyết và case study, chuyển sang layout dạng Block thông thoáng phân tách bằng khoảng trắng và đường kẻ ngang tinh tế.
- **2026-06-26**: Nâng cấp Typography: Sử dụng Space Grotesk cho các tiêu đề (48px/26px), Inter cho nội dung (18px) và JetBrains Mono cho công thức (15px/18px) để tăng chất chuyên nghiệp và dễ đọc.
- **2026-06-26**: Chuẩn hóa màu phân cấp: Màu trắng cho tiêu đề, màu vàng gold nổi bật cho công thức, màu cam đất làm nút nhấn CTA, màu đỏ rỉ sét cho nhãn Dossier và các điểm mắc kẹt.
- **2026-06-26**: Di chuyển toàn bộ hệ thống emoji (📖, 🏢, 🔑, ✅, ❌, 🔓, 🔄, 🏆) sang thư viện vector Lucide Icons sắc nét, hiện đại.
- **2026-06-26**: Tối ưu hóa độ tương phản và độ dày font chữ (font-weight: 500 cho body) đảm bảo hiển thị xuất sắc khi chiếu lên màn hình máy chiếu lớp học.
- **2026-06-26**: Tích hợp toàn bộ nội dung phân tích khủng hoảng Alpha Corp (không gian, thời gian, điều kiện lưu thông) từ Phòng 5 của kịch bản gốc vào Phòng 10 (phòng tổng kết) của ứng dụng thực tế.
- **2026-06-26**: Nâng cấp Presentation Mode: chữ body/paragraphs/list items tăng lên font-weight: 600, tăng tương phản chữ phụ thành trắng tinh, tăng độ phủ nền 0.96 và tăng sáng công thức/accent để chống mờ tối đa trên máy chiếu thực tế.
