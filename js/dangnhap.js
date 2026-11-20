const formDangNhap = document.getElementById("form");

formDangNhap.addEventListener("submit", (event) => {
    event.preventDefault();

    const userEmail = document.getElementById("email").value;
    const userPassword = document.getElementById("password").value;

    let userList = [];

    if(localStorage.getItem('users') !== null) {
        userList = JSON.parse(localStorage.getItem('users'));
    }

    const findAcountUser = userList.find(user => user.userEmail === userEmail && user.userPassword === userPassword);
    if(findAcountUser) {
        alert('Đăng nhập thành công!');

        localStorage.setItem('currentUser', JSON.stringify(findAcountUser));

        window.location.href = 'index.html';
    } else{
        alert('Mật khẩu hay email không đúng. Vui lòng thử lại!!');
    }
})

