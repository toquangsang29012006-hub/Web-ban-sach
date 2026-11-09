const formDangKy = document.getElementById("form");

formDangKy.addEventListener('submit', (event) => {
    event.preventDefault();

    let newUser = {
        userName: document.getElementById("fullname").value,
        userEmail: document.getElementById("email").value,
        userPassword: document.getElementById("password").value,
        userDate: document.getElementById("date").value,
        userAddress: document.getElementById("address").value
    }

    let userList = [];

    if(localStorage.getItem('users') !== null) {
        userList = JSON.parse(localStorage.getItem('users'));
    }

    const checkEmail = userList.some(user => user.email === newUser.email);

    if(checkEmail) {
        alert('Tài khoản đã được đăng ký');
        return;
    }

    userList.push(newUser);
    localStorage.setItem('users', JSON.stringify(userList));

    alert("Đã đăng ký thành công!!");
    window.location.href = '/dangnhap.html';

})