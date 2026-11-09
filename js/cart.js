
let cart = [
    {
        name: "Sách tiếng Anh",
        price: "185.000đ",
        image:"./images/book-discount-1.jpg",//
        quantity: 1
    },   
];


const cartContainer = document.querySelector('#cart-list');

if (cartContainer) {
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Giỏ hàng trống</p>';
    } else {
        let html = '';
        cart.forEach(item => {
            html += `
                <div style="margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 10px; display: flex; align-items: center; gap: 15px;">
                    <img src="${item.image}" width="60" height="60" style="object-fit: cover;" alt="${item.name}">
                    <div>
                        <h4 style="margin: 0 0 5px 0;">${item.name}</h4>
                        <p style="margin: 0 0 5px 0;">Giá: ${item.price}</p>
                        <p style="margin: 0;">Số lượng: ${item.quantity}</p>
                    </div>
                </div>
            `;
        });
        cartContainer.innerHTML = html;
    }
}