const formDangNhap = document.getElementById("form");

function successMessage(elmt) {
    const formItem = elmt.closest('.form-item');
    if (formItem.classList.contains('failure')) {
        formItem.classList.remove('failure');
        formItem.classList.add('success');
    } else {
        formItem.classList.add('success');
    }
    elmt.style.borderColor = 'green';
    formItem.lastElementChild.textContent = '';
}

function errorMessage(elmt, message) {
    const formItem = elmt.closest('.form-item');
    if (formItem.classList.contains('success')) {
        formItem.classList.remove('success');
        formItem.classList.add('failure');
    } else {
        formItem.classList.add('failure');
    }
    elmt.style.borderColor = 'red';
    formItem.lastElementChild.textContent = message;
}

const formDangNhap = document.getElementById('form');
const elEmail = document.getElementById('email');
const elPassword = document.getElementById('password');

formDangNhap.noValidate = true;

const formItems = document.querySelectorAll('.form-item');
const arrFormItems = Array.from(formItems);

arrFormItems.forEach(item => {
    let elmtSmall = document.createElement("SMALL");
    elmtSmall.className = "notification";
    elmtSmall.style.color = "red";
    elmtSmall.style.marginTop = "5px";
    item.appendChild(elmtSmall);
});

function validateEmail(email) {
    var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexEmail.test(String(email).toLowerCase());
}

function checkEmail() {
    const val = elEmail.value.trim();
    if (val === '') {
        errorMessage(elEmail, "Bắt buộc nhập email");
    } else if (!validateEmail(val)) {
        errorMessage(elEmail, "Email không hợp lệ");
    } else {
        successMessage(elEmail);
    }
}

function checkPassword(elmt, lengthRequired) {
    const val = elmt.value.trim();
    if (val === '') {
        errorMessage(elmt, "Bắt buộc nhập mật khẩu");
    } else if (val.length !== lengthRequired) {
        errorMessage(elmt, `Mật khẩu phải có đúng ${lengthRequired} ký tự`);
    } else {
        successMessage(elmt);
    }
}

elEmail.addEventListener('blur', checkEmail, false);
elPassword.addEventListener('blur', () => { checkPassword(elPassword, 8); }, false);

formDangNhap.addEventListener('submit', (evt) => {
    evt.preventDefault();

    checkEmail();
    checkPassword(elPassword, 8);

    let isValid = true;
    arrFormItems.forEach(item => {
        if (!item.classList.contains('success')) {
            isValid = false;
        }
    });

    if (isValid) {
        const userEmail = elEmail.value.trim();
        const userPassword = elPassword.value;

        let userList = [];
        if (localStorage.getItem('users') !== null) {
            userList = JSON.parse(localStorage.getItem('users'));
        }

        const findAcountUser = userList.find(
            user => user.userEmail === userEmail && user.userPassword === userPassword
        );

        if (findAcountUser) {
            alert('Đăng nhập thành công!');
            localStorage.setItem('currentUser', JSON.stringify(findAcountUser));
            window.location.href = 'index.html';
        } else {
            alert('Mật khẩu hay email không đúng. Vui lòng thử lại!!');
        }
    } else {
        alert("Bạn điền biểu mẫu chưa hợp lệ.");
    }
}, false);

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

