# MCK x N0L4B3L – Website

Website bán nhạc và merch của MCK, lấy cảm hứng layout từ nfrealmusic.com.
Viết bằng HTML/CSS/JS thuần, không framework, gồm 16 trang.

## Cấu trúc

```
index.html            Home
about.html            About Us
music.html            Danh sách sản phẩm
product-*.html        Chi tiết sản phẩm (hvl, 99, vinyl, tee, ticket)
news.html, post.html  Tin tức + chi tiết bài viết
contact.html          Liên hệ + Google Map
faq.html              Câu hỏi thường gặp
signin.html           Đăng nhập
signup.html           Đăng ký
checkout.html         Giỏ hàng / thanh toán
careers.html          Tuyển dụng
job-*.html            Mô tả từng vị trí (sound, visual, social)
css/style.css         File CSS duy nhất
js/main.js            Menu mobile, carousel, chọn option, giỏ hàng
img/logo.svg          Logo SVG
```

## Cách chạy

Cần có mạng, vì ảnh (Unsplash), video YouTube và Google Map đều tải online.

**Cách 1 – VS Code + Live Server**

1. Mở VS Code: File → Open Folder → chọn thư mục project.
2. Cài extension **Live Server** (Ritwick Dey).
3. Chuột phải `index.html` → **Open with Live Server**.

**Cách 2 – Python**

Mở terminal trong thư mục project rồi chạy:

```bash
python -m http.server 5500
```

Sau đó mở http://localhost:5500 trên trình duyệt.

**Cách 3** – Mở trực tiếp `index.html` bằng trình duyệt (double-click).

## Kịch bản demo (~10 phút)

1. **Giới thiệu (30s)** – Chủ đề web, công nghệ HTML/CSS/JS thuần, 16 trang.
2. **Cấu trúc code (1')** – Trong VS Code chỉ ra:
   - các file HTML;
   - `style.css`: biến màu `:root` và các `@media` 1023px / 767px;
   - `main.js`;
   - `logo.svg`.
3. **Home (1'30)**:
   - Rê chuột lên nav bên phải để thấy hiệu ứng.
   - Carousel tự chuyển sau 5s, bấm dot để chuyển slide.
   - Có animation fade-up khi load, video YouTube và form newsletter.
4. **Sản phẩm (2')**:
   - Music: lưới sản phẩm, ảnh phóng to khi hover.
   - product-tee: chọn size, tăng giảm số lượng.
   - product-hvl: bấm thumbnail thì ảnh lớn đổi theo.
   - product-ticket: chọn hạng vé.
5. **Checkout (1'30)**:
   - Bấm +/- thì tổng tiền tự tính lại, phí ship 30.000₫.
   - Bấm Remove để xóa món.
   - Chọn phương thức thanh toán.
   - Mở hàm `updateCart()` trong `main.js` để giải thích.
6. **Trang thông tin (2')**:
   - About: lịch sử, đội ngũ, video.
   - News: bấm bài viết để mở `post.html`.
   - Careers: chính sách nhân sự, job, quy trình ứng tuyển, form.
   - Contact: form và bản đồ.
   - FAQ: accordion.
   - Sign in / Sign up: submit hiện thông báo.
7. **Responsive (1')** – Nhấn F12 rồi Ctrl+Shift+M:
   - iPad: nav thành top bar, lưới 2 cột.
   - iPhone: menu hamburger, lưới 1 cột.
8. **Kết (30s)** – Đối chiếu với yêu cầu:
   - ≥10 trang, mỗi trang có `<title>` riêng;
   - 1 file CSS;
   - có animation/transition;
   - ≥8 ảnh, có video;
   - responsive.

## Lưu ý

- Ảnh hoặc video không hiện: kiểm tra kết nối mạng.
- Các form chỉ là demo, không có backend.
