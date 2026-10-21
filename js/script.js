const buttonOpenMenu = document.querySelector("#nav-open");
const buttonCloseMenu = document.querySelector("#nav-close");
const menuList = document.querySelector("#show-menu");

buttonOpenMenu.addEventListener("click", () => {
  menuList.classList.add("show");
});

buttonCloseMenu.addEventListener("click", () => {
  menuList.classList.remove("show");
});

 