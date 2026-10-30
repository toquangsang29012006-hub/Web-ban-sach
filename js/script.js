const buttonOpenMenu = document.querySelector("#nav-open");
const buttonCloseMenu = document.querySelector("#nav-close");
const menuList = document.querySelector("#show-menu");
const itemNav = document.querySelectorAll(".nav-item");

buttonOpenMenu.addEventListener("click", () => {
  menuList.classList.add("show");
});

buttonCloseMenu.addEventListener("click", () => {
  menuList.classList.remove("show");
});

itemNav.forEach(item => {
  item.addEventListener("click", () => {
    itemNav.forEach(item => item.classList.remove("active"));
    item.classList.add("active");
  });
});