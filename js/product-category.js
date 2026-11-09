// product-category.js
const soSachTungTrang = 12; 
class Product {
  constructor(element, STT) {
    this.element = element; 
    this.id = Number(element.querySelector('.id')?.textContent) || STT;
    this.gia = Number(element.querySelector('.price').textContent.replace(/\D/g, ''));
  }
  choHienThi(hien) {
    this.element.style.display = hien ? '' : 'none'; 
  }
}

class Pagination {
  constructor(container, onChange) {
    this.container = container;
    container.addEventListener('click', (e) => {
      const nut = e.target.closest('.pagination__button');
      if (!nut || nut.disabled) return; 
      onChange(Number(nut.dataset.trang));
    });
  }

  render(trangHienTai, tongTrang) {
    const taoNut = (nhan, trang, { active = false, disabled = false} = {}) => `
      <button class="pagination__button${active ? ' pagination__button--active' : ''}"
        data-trang="${trang}"${disabled ? 'disabled' : ''}>${nhan}</button>`;
    let html = taoNut('<i class="fa-solid fa-arrow-left-long"></i>', trangHienTai - 1, {disabled: trangHienTai === 1});
    for (let i = 1; i <= tongTrang; i++) {
      html += taoNut(i, i, { active: i === trangHienTai });
    }
    html += taoNut('<i class="fa-solid fa-arrow-right-long"></i>', trangHienTai + 1, {disabled: trangHienTai === tongTrang});
    this.container.innerHTML = html;
  }
}

function refeshCategory() {
  const sapXep = document.getElementById('book-filter');
  const danhSach = document.querySelector('.list-book');
  if (!sapXep || !danhSach) return;
  const dsSanPham = [...danhSach.querySelectorAll('.item-book')].map((el, i) => new Product(el, i + 1));
  const tongTrang = Math.ceil(dsSanPham.length / soSachTungTrang);
  const sapXepTheoGia = {
    default: (a, b) => a.id - b.id,
    'price-asc': (a, b) => a.gia - b.gia,
    'price-desc': (a, b) => b.gia - a.gia,
  };
  let trang = 1;

  const nav = document.createElement('nav');
  nav.className = 'pagination';
  danhSach.insertAdjacentElement('afterend', nav);
  const phanTrang = new Pagination(nav, (soTrang) => {
    trang = soTrang;
    display();
    danhSach.scrollIntoView({ behavior: 'smooth' });
  });

  function display() {
    const batDau = (trang - 1) * soSachTungTrang;
    const soSanh = sapXepTheoGia[sapXep.value] || sapXepTheoGia.default;
    
    [...dsSanPham].sort(soSanh).forEach((sp, viTri) => {
      danhSach.appendChild(sp.element);
      sp.choHienThi(viTri >= batDau && viTri < batDau + soSachTungTrang);
    });
    phanTrang.render(trang, tongTrang);
  }

  sapXep.addEventListener('change', () => {
    trang = 1;
    display();
  });
  display();
}
refeshCategory();