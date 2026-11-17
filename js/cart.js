function setImg(product) {
    return '<img src="' + product.image + '" alt="" class="img-product"></img>'
    
}
function setNameAndPrice(product) {
    return '<div class="product-info"><h4 class="book-name">' + product.name + '</h4><p class="book-price">' + product.price + '</p></div>'
}


function setQuantity(product) {
    return '<p class="quantity">' + product.quantity +'</p>'
}

function showCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = document.querySelector('.main');

    if(cart.length === 0) {
        product.innerHTML = '<p class="show">Không có sản phẩm nào được chọn</p>';
        return;
    }

    const html = cart.map(productBook => {
        return '<article class="item-product"><form action=""><input type="checkbox"></form>' + setImg(productBook) + setNameAndPrice(productBook) + setQuantity(productBook) + '<button class="btn-delete">Xóa</button></article>'
    });

    product.innerHTML = html;
}

function sumPrice() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const sumPriceElement = document.querySelector(".footer .sum-price");
   
    let sum = 0;
    cart.forEach(book => {
        let price = Number(book.price.replace(/[^0-9]/g, ""));
        let quantity = Number(book.quantity);
        sum += price * quantity;
    });

    sumPriceElement.innerHTML = sum + "đ";
    
}


function checkBox() {
    const listBook = document.querySelectorAll(".item-product");
    const allBook = document.querySelector("#all");

    allBook.addEventListener("click", () => {
        if(allBook.checked) {
            listBook.forEach(item => {
                item.querySelector("input").checked = true;
            })
        } else {
            listBook.forEach(item => {
                item.querySelector("input").checked = false;
            })
        }
    });

    listBook.forEach(item => {
        item.addEventListener("click", () => {
            const count = document.querySelectorAll('.item-product input:checked').length;
            if(count === listBook.length) {
                allBook.checked = true;
            } else {
                allBook.checked = false;
            }
        })
    })

}

function removeBook() {
    const buttonDelete = document.querySelectorAll('.btn-delete');
    let cart = [];
    buttonDelete.forEach((button, index) => {
        button.addEventListener("click", () => {
            if(JSON.parse(localStorage.getItem("cart")) !== null) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));

            location.reload();
            
        });
    });
}

function setup() {
    showCart();
    sumPrice();
    checkBox();
    removeBook();
}

window.addEventListener("load", setup);

