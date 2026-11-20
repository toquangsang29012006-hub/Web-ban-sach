function setImg(product) {
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = "";
    img.className = "img-product";
    return img;
}

function setNameAndPrice(product) {
    const divInfo = document.createElement('div');
    divInfo.className = "product-info";

    const h4 = document.createElement('h4');
    h4.className = "book-name";
    h4.textContent = product.name;

    const pPrice = document.createElement('p');
    pPrice.className = "book-price";
    pPrice.textContent = product.price;

    divInfo.appendChild(h4);
    divInfo.appendChild(pPrice);

    return divInfo;
}

function setQuantity(product) {
    const pQuantity = document.createElement('p');
    pQuantity.className = "quantity";
    pQuantity.textContent = product.quantity;
    return pQuantity;
}

function showCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = document.querySelector('.main');

    if(cart.length === 0) {
        product.innerHTML = '<p class="show">Không có sản phẩm nào được chọn</p>';
        return;
    }


    cart.forEach(productBook => {
        const article = document.createElement('article');
        article.className = 'item-product';

        const form = document.createElement('form');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        form.appendChild(checkbox);
        article.appendChild(form);

        // Dùng insertAdjacentHTML vì các hàm set của bạn trả về chuỗi HTML
        article.appendChild(setImg(productBook));
        article.appendChild(setNameAndPrice(productBook));
        article.appendChild(setQuantity(productBook));

        const btnDelete = document.createElement('button');
        btnDelete.className = 'btn-delete';
        btnDelete.textContent = 'Xóa';
        article.appendChild(btnDelete);

        // Nối tiếp vào cuối danh sách hiện tại
        product.appendChild(article);
    });
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

