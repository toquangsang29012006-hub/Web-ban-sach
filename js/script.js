function openCloseMenu () {
  const buttonOpenMenu = document.querySelector("#nav-open");
  const buttonCloseMenu = document.querySelector("#nav-close");
  const menuList = document.querySelector("#show-menu");

  buttonOpenMenu.addEventListener("click", () => {
    menuList.classList.add("show");
  });

  buttonCloseMenu.addEventListener("click", () => {
    menuList.classList.remove("show");
  });
}


function renderAccount() {
  const userLogin = JSON.parse(localStorage.getItem('currentUser'));
  const noLoginUser = document.getElementById("no-login");
  const loginUser = document.getElementById("login");
  const myAccount = document.getElementById("parent-account");

  if(userLogin) {
    noLoginUser.hidden = true;

    loginUser.hidden = false;

    loginUser.innerHTML = "<a href='accout.html' class='nav-link-login'>Xin chào, " + userLogin.userName + "</a>"

    const name = document.querySelector(".account-infor .account:nth-child(1) .value");
    const email = document.querySelector(".account-infor .account:nth-child(2) .value");
    const date = document.querySelector(".account-infor .account:nth-child(3) .value");
    const addrress = document.querySelector(".address-user .address");

    name.textContent = userLogin.userName;
    email.textContent = userLogin.userEmail;
    date.textContent = userLogin.userDate;
    addrress.textContent = userLogin.userAddress;
    

  }
}

function setup () {
  openCloseMenu();
  renderAccount();
}

window.addEventListener("load", setup);