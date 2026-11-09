const buttonOpenMenu = document.querySelector("#nav-open");
const buttonCloseMenu = document.querySelector("#nav-close");
const menuList = document.querySelector("#show-menu");

buttonOpenMenu.addEventListener("click", () => {
  menuList.classList.add("show");
});

buttonCloseMenu.addEventListener("click", () => {
  menuList.classList.remove("show");
});


// Đăng nhập thành công
const userLogin = JSON.parse(localStorage.getItem('currentUser'));

const noLoginUser = document.getElementById("no-login");
const loginUser = document.getElementById("login");
const myAccount = document.getElementById("parent-account");

if(userLogin) {
  noLoginUser.hidden = true;

  loginUser.hidden = false;

  loginUser.innerHTML = `
    <a href="accout.html" class="nav-link-login">Xin chào ${userLogin.userName}</a>
  `
  myAccount.innerHTML = `
    <section class="account-infor" id="account-infor">
        <div class="account">
          <h4 class="key">Họ và tên:</h4>
          <p class="value">${userLogin.userName}</p>
        </div>
        <div class="account">
          <h4 class="key">Email:</h4>
          <p class="value">${userLogin.userEmail}</p>
        </div>
        <div class="account">
          <h4 class="key">Ngày sinh:</h4>
          <p class="value">${userLogin.userDate}</p>
        </div>
      </section>
      <section class="address-user">
        <i class="fa-solid fa-location-dot"></i>
        <p class="address">${userLogin.userAddress}</p>
      </section>
  `

}







