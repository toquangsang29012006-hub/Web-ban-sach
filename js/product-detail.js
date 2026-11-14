const navOpen = document.getElementById("nav-open");
const navClose = document.getElementById("nav-close");
const showMenu = document.getElementById("show-menu");

if (navOpen && navClose && showMenu) {
  navOpen.addEventListener("click", function () {
    showMenu.classList.add("show");
  });

  navClose.addEventListener("click", function () {
    showMenu.classList.remove("show");
  });
}

const bookName = document.querySelector(".book-name");
const bookImg = document.querySelector(".item-book img");
const bookPrice = document.querySelector(".price span");
const quantityInput = document.querySelector(".quantity-book");
const btnAddCart = document.querySelector(".btn-add-cart");
const btnBuyNow = document.querySelector(".btn-buy-now");

quantityInput.addEventListener("change", function () {
  if (quantityInput.value < 1 || quantityInput.value === "") {
    quantityInput.value = 1;
  }
});

function addToCart() {
  const quantity = parseInt(quantityInput.value);

  if (isNaN(quantity) || quantity < 1) {
    alert("Vui lòng nhập số lượng hợp lệ!");
    quantityInput.value = 1;
    return false;
  }

  const product = {
    name: bookName.innerText,
    image: bookImg.getAttribute("src"),
    price: bookPrice.innerText,
    quantity: quantity,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let isExist = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === product.name) {
      cart[i].quantity += product.quantity;
      isExist = true;
      break;
    }
  }

  if (!isExist) {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return true;
}

btnAddCart.addEventListener("click", function () {
  if (addToCart()) {
    alert("Đã thêm " + quantityInput.value + " quyển '" + bookName.innerText + "' vào giỏ hàng!");
  }
});

btnBuyNow.addEventListener("click", function () {
  if (addToCart()) {
    alert("Đặt mua thành công! Đang chuyển đến giỏ hàng...");
    window.location.href = "cart.html";
  }
});
