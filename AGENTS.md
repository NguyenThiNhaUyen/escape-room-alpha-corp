# AGENTS.md — Escape Room: Giải cứu Alpha Corp

## Mục tiêu project

Xây dựng web học tập dạng Escape Room phục vụ thuyết trình môn Kinh tế chính trị Mác-Lênin, Chương 3: Giá trị thặng dư trong nền kinh tế thị trường.

Web gồm 10 phòng + màn mở đầu + màn kết thúc. Mỗi phòng có: lý thuyết thuyết trình, áp dụng vào Alpha Corp, câu hỏi mở khóa, đáp án và giải thích.

---

## Tech scope

- **Ngôn ngữ**: HTML + CSS + JavaScript thuần
- **Framework / thư viện**: KHÔNG dùng. Không React, không Tailwind, không jQuery, không thư viện bên ngoài nào
- **Build tool**: KHÔNG cần. Không npm, không Vite, không Webpack
- **External resource**: Chỉ Google Fonts (Inter + Orbitron) qua CDN link
- **Cách chạy**: Mở `index.html` trực tiếp trong trình duyệt là hoạt động

---

## File scope

Project chỉ gồm **6 file** (ngoài thư mục `docs/` giữ nguyên):

| File | Loại | Mục đích |
|---|---|---|
| `index.html` | Code | Entry point, HTML skeleton |
| `index.css` | Code | Toàn bộ styling, design tokens, animations |
| `app.js` | Code | Logic chính: state, render, events, particles |
| `data.js` | Code | Dữ liệu 10 phòng dạng object array |
| `AGENTS.md` | Tài liệu | Quy tắc làm việc (file này) |
| `PROGRESS.md` | Tài liệu | Theo dõi tiến độ và verification |

**KHÔNG tạo thêm file ngoài danh sách trên** trừ khi có yêu cầu rõ ràng từ user.

---

## Content rules

1. Nội dung trong `data.js` phải giữ **đầy đủ 100%** theo kịch bản đã cung cấp trong prompt.
2. **KHÔNG** tự rút gọn, bỏ ý chính, hoặc diễn giải lại nội dung lý thuyết.
3. **KHÔNG** bỏ phần "Áp dụng vào Alpha Corp" ở bất kỳ phòng nào.
4. **KHÔNG** thay đổi ý nghĩa nội dung môn học.
5. Có thể format bằng HTML (`<p>`, `<ul>`, `<li>`, `<strong>`) để hiển thị đẹp.
6. Mỗi phòng phải có đủ 5 phần: theoryContent, caseContent, question, options + correctAnswer, explanation.

---

## UX rules

1. **Ưu tiên thuyết trình**: web dùng để trình bày trước lớp, không phải game giải trí.
2. **Font chữ đủ lớn**: base 18px, Presentation Mode 22px.
3. **Dễ đọc**: card nội dung tách biệt rõ, màu nền và màu chữ tương phản tốt.
4. **Hiệu ứng hỗ trợ, không lấn át**: particle, glow, animation chỉ tạo không khí, KHÔNG được làm rối hoặc che nội dung.
5. **Công thức nổi bật**: `T → H … SX … H' → T'` phải được highlight ở các phòng liên quan.
6. **Presentation Mode**: toggle tăng font, line-height, giảm animation để phù hợp máy chiếu.
7. **Thu gọn / Mở rộng**: card lý thuyết và card Alpha Corp có nút collapse/expand.

---

## Game flow rules

```
Intro → Room 1 → Room 2 → Room 3 → Room 4 → Room 5 → Room 6 → Room 7 → Room 8 → Room 9 → Room 10 → Ending
```

- Mỗi phòng hiển thị theo thứ tự: Lý thuyết → Alpha Corp → Câu hỏi.
- Phải trả lời đúng câu hỏi mới sang phòng tiếp theo.
- Sau Phòng 10, chuyển sang màn kết thúc.
- Màn kết thúc hiển thị điểm số và kết luận thuyết trình.

---

## Answer logic

### Trả lời SAI
1. Option sai đổi border đỏ + shake.
2. Hiện thông báo "Chưa đúng" + gợi ý ngắn.
3. Disable option sai vừa chọn.
4. Cho phép chọn đáp án khác và thử lại.
5. KHÔNG hiện nút "Sang phòng tiếp theo".

### Trả lời ĐÚNG
1. Option đúng đổi border xanh lá + pulse glow.
2. Hiện "Chính xác!" + giải thích đầy đủ.
3. Hiện nút "Sang phòng tiếp theo".
4. Disable tất cả option.
5. Chỉ tính điểm nếu đúng ngay lần đầu.

---

## Change control

1. Khi sửa bug hoặc chỉnh UI, **chỉ sửa phần liên quan**. Không refactor lan man sang các phần đang hoạt động tốt.
2. Không đổi cấu trúc file (thêm/xóa file) nếu không có yêu cầu từ user.
3. Không đổi flow game (thứ tự phòng, logic đúng/sai) nếu không có yêu cầu từ user.
4. Không đổi nội dung lý thuyết nếu không có yêu cầu từ user.
5. Sau mỗi lần implement hoặc sửa lỗi, **phải cập nhật PROGRESS.md**.
6. Khi gặp vấn đề cần quyết định thiết kế, ghi vào PROGRESS.md phần Notes trước khi làm.
