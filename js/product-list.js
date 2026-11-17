const listProducts = document.querySelectorAll('.item-book');

function productList () {
    listBook.forEach(book => {
        book.addEventListener("click", () => {
            const newProduct = {
                id: book.querySelector(".id").textContent,
                name: book.querySelector(".book-name").textContent,
                price: book.querySelector(".price").textContent,
                image: book.querySelector("img").getAttribute("src")
            }

            localStorage.setItem("productBook", JSON.stringify(newProduct));

            window.location.href = "/product-detail.html";
        })
    })
}

window.addEventListener("load", productList());