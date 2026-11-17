// product-detail.js

// 1. Lấy dữ liệu sách từ localStorage và hiển thị lên HTML
function hienThiChiTietSach() {
  const sach = JSON.parse(localStorage.getItem('sachDangXem'));
  if (!sach) return;

  const bookName = document.querySelector('.book-name');
  const bookImg = document.querySelector('.item-book img');
  const bookPrice = document.querySelector('.price span');

  document.title = sach.ten;
  if (bookName) bookName.textContent = sach.ten;
  if (bookImg) {
    bookImg.src = sach.anh;
    bookImg.alt = sach.ten;
  }
  if (bookPrice) bookPrice.textContent = sach.gia;
}

// 2. Xử lý lưu sản phẩm vào giỏ hàng (giữ nguyên cấu trúc cart cũ của bạn)
function themVaoGioHang() {
  const bookName = document.querySelector('.book-name');
  const bookImg = document.querySelector('.item-book img');
  const bookPrice = document.querySelector('.price span');
  const quantityInput = document.querySelector('.quantity-book');

  const quantity = parseInt(quantityInput.value);
  if (isNaN(quantity) || quantity < 1) {
    alert('Vui lòng nhập số lượng hợp lệ!');
    quantityInput.value = 1;
    return false;
  }

  const product = {
    name: bookName.textContent.trim(),
    image: bookImg.getAttribute('src'),
    price: bookPrice.textContent.trim(),
    quantity: quantity,
  };

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const sanPhamTonTai = cart.find((item) => item.name === product.name);

  if (sanPhamTonTai) {
    sanPhamTonTai.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  return true;
}

// 3. Gắn sự kiện cho các nút và ô nhập số lượng
function khoiTaoTrangChiTiet() {
  const khungSach = document.querySelector('.main .item-book');
  if (!khungSach) return;

  hienThiChiTietSach();

  const formSoLuong = khungSach.querySelector('.quanlity');
  const quantityInput = khungSach.querySelector('.quantity-book');
  const btnAddCart = khungSach.querySelector('.btn-add-cart');
  const btnBuyNow = khungSach.querySelector('.btn-buy-now');
  const bookName = khungSach.querySelector('.book-name');

  // Chặn form tự reload trang khi nhấn Enter
  formSoLuong.addEventListener('submit', (e) => e.preventDefault());

  // Tự sửa về 1 nếu nhập số âm hoặc xóa trống
  quantityInput.addEventListener('change', () => {
    if (quantityInput.value < 1 || quantityInput.value === '') {
      quantityInput.value = 1;
    }
  });

  // Nút Thêm vào giỏ hàng
  btnAddCart.addEventListener('click', () => {
    if (themVaoGioHang()) {
      alert(`Đã thêm ${quantityInput.value} quyển "${bookName.textContent}" vào giỏ hàng!`);
    }
  });

  // Nút Mua ngay
  btnBuyNow.addEventListener('click', () => {
    if (themVaoGioHang()) {
      alert('Đặt mua thành công! Đang chuyển đến giỏ hàng...');
      window.location.href = 'cart.html';
    }
  });
}

khoiTaoTrangChiTiet();
