const product = JSON.parse(localStorage.getItem("productBook"));

function showDetail () {
    if(product) {
        const namebook = document.querySelector(".main .book-name");
        const price = document.querySelector(".main .price span");
        const srcImg = document.querySelector(".main img");

        namebook.textContent = product.name;
        price.textContent = product.price;
        srcImg.setAttribute("src", product.image);
    }
}

let cart = [];
function renderCart() {
    const buttonCart = document.querySelector(".btn-add-cart");
    buttonCart.addEventListener("click", () => {
        const quantityBook = document.querySelector(".quantity-book").value;

        if(quantityBook === "") {
            alert("Vui lòng nhập số lượng");
            return;
        } else {
            const id = product.id;

            if(JSON.parse(localStorage.getItem("cart")) !== null) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            const productID = cart.find(item => item.id === id);
            console.log(productID)
            if(productID) {
                productID.quantity = quantityBook;
            } else {
                product.quantity = quantityBook;
                cart.push(product);
            }
            
            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.href = "cart.html";
        }
    })
}

function setup() {
    showDetail();
    renderCart();
}

window.addEventListener("load", setup);