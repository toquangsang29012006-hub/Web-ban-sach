// product-detail.js
class ProductDetail {
  constructor(element) {
    this.element = element;
    this.tenEl = element.querySelector('.book-name');
    this.anhEl = element.querySelector('img');
    this.giaEl = element.querySelector('.price span');
    this.soLuongEl = element.querySelector('.quantity-book');
    this.btnThemGio = element.querySelector('.btn-add-cart');
    this.btnMuaNgay = element.querySelector('.btn-buy-now');
  }

  // Đổ thông tin sách lấy từ trang danh mục lên HTML
  hienThi(sach) {
    if (!sach) return;
    document.title = sach.ten;
    this.tenEl.textContent = sach.ten;
    this.anhEl.src = sach.anh;
    this.anhEl.alt = sach.ten;
    this.giaEl.textContent = sach.giaHienThi;
  }

  // Lưu sản phẩm vào giỏ hàng (localStorage)
  themVaoGio() {
    const soLuong = parseInt(this.soLuongEl.value);
    if (isNaN(soLuong) || soLuong < 1) {
      alert('Vui lòng nhập số lượng hợp lệ!');
      this.soLuongEl.value = 1;
      return false;
    }

    const sanPham = {
      name: this.tenEl.textContent.trim(),
      image: this.anhEl.getAttribute('src'),
      price: this.giaEl.textContent.trim(),
      quantity: soLuong,
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const sanPhamCu = cart.find((item) => item.name === sanPham.name);

    if (sanPhamCu) {
      sanPhamCu.quantity += sanPham.quantity;
    } else {
      cart.push(sanPham);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    return true;
  }

  // Gắn các sự kiện bấm nút và nhập số lượng
  ganSuKien() {
    // Chặn form tự reload trang khi nhấn Enter
    this.element.querySelector('.quanlity')?.addEventListener('submit', (e) => e.preventDefault());

    // Tự sửa về 1 nếu nhập số âm hoặc xóa trống
    this.soLuongEl.addEventListener('change', () => {
      if (this.soLuongEl.value < 1 || this.soLuongEl.value === '') {
        this.soLuongEl.value = 1;
      }
    });

    // Nút Thêm vào giỏ hàng
    this.btnThemGio.addEventListener('click', () => {
      if (this.themVaoGio()) {
        alert(`Đã thêm ${this.soLuongEl.value} quyển "${this.tenEl.textContent}" vào giỏ hàng!`);
      }
    });

    // Nút Mua ngay
    this.btnMuaNgay.addEventListener('click', () => {
      if (this.themVaoGio()) {
        alert('Đặt mua thành công! Đang chuyển đến giỏ hàng...');
        window.location.href = 'cart.html';
      }
    });
  }
}

function refeshDetail() {
  const khungSach = document.querySelector('.main .item-book');
  if (!khungSach) return;

  const sach = JSON.parse(localStorage.getItem('sachDangXem'));
  const chiTiet = new ProductDetail(khungSach);

  chiTiet.hienThi(sach);
  chiTiet.ganSuKien();
}

refeshDetail();
