function layGiaTri(selector) {
  return [...document.querySelectorAll(selector + ':checked')].map((cb) => cb.value);
} // lấy các giá trị đã chọn từ các checkbox

function khop(daChon, giaTri) {
  return daChon.length === 0 || daChon.includes(giaTri);
} // ko có giá trị nào được chọn thì trả về true, nếu có thì kiểm tra xem giá trị của sách có nằm trong các giá trị đã chọn hay k

function thoaKhoangGia(gia, khoang) {
  const [min, max] = khoang.split('-');
  return gia >= Number(min) && (max === 'plus' || gia <= Number(max)); 
  // trả về true nếu giá trị của sách nằm trong khoảng giá đã chọn, nếu max là 'plus' thì chỉ cần kiểm tra giá trị lớn hơn min
}

function hienThongBaoRong(rong) {
  let tb = document.getElementById('khong-co-sach');
  if (!tb) {
    tb = document.createElement('p');
    tb.id = 'khong-co-sach';
    tb.textContent = 'Không tìm thấy sách phù hợp. Vui lòng thử lại với các tiêu chí khác.';
    tb.style.cssText = 'grid-column: 1 / -1; text-align: center;';
    document.querySelector('.list-book').appendChild(tb);
  }
  tb.style.display = rong ? '' : 'none'; /* '' trả về display: block */ 
} // hiển thị thông báo trong trường hợp ko có sách

function filter() {
  const khoangGia = layGiaTri('.price_option');
  const loai = layGiaTri('.loai_option');
  const ncc = layGiaTri('.ncc_option');
  const danhMuc = document.querySelector('.list-item.is-active')?.hash.slice(1); /* lấy id của danh mục đang chọn, nếu không có thì undefined */
  let soSachHienThi = 0;

  document.querySelectorAll('.list-book .item-book').forEach((card) => {
    const gia = Number(card.querySelector('.price').textContent.replace(/\D/g, ''));
    const hopLe =
      (!danhMuc || card.dataset.danhmuc === danhMuc) &&
      (khoangGia.length === 0 || khoangGia.some((k) => thoaKhoangGia(gia, k))) &&
      khop(loai, card.dataset.loai) &&
      khop(ncc, card.dataset.ncc);

    card.style.display = hopLe ? '' : 'none';  /* '' trả về display: flex */
    if (hopLe) soSachHienThi++;
  });
  hienThongBaoRong(soSachHienThi === 0);
}

document.querySelectorAll('.nav_menu .list-item').forEach((link) => {
  link.addEventListener('click', (e) => {
    const dangChon = link.classList.contains('is-active');
    document.querySelectorAll('.list-item').forEach((l) => l.classList.remove('is-active'));
    link.classList.toggle('is-active', !dangChon);
    filter();
  }); 
});// nếu đang chọn thì bỏ chọn, còn ko thì chọn