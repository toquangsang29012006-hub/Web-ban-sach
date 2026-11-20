const listBook = document.querySelectorAll(".item-book");
const buttonPagination = document.querySelectorAll(".btn-page");

function showPage(page) {
  let currentPage = page;
  let idStart = (currentPage - 1) * 12;
  let idEnd = idStart + 12; 
  listBook.forEach(book => {
    const idBook = parseInt(book.querySelector(".id").textContent);
    if(idBook > idStart && idBook <= idEnd) {
      book.hidden = false;
    }
    else {
      book.hidden = true;
    }
  })
}

function Pagination() {
 showPage(1);

  buttonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const currentPage = parseInt(button.textContent);
      const idStart = (currentPage - 1) * 12;
      const idEnd = idStart + 12; 
      showPage(currentPage);
    })
  });
  
}


let listNewBook = Array.from(document.querySelectorAll(".item-book"));

function sort() {
  for(let i = 0; i < listNewBook.length; i++) {
    for(let j = 0; j < listNewBook.length - 1 - i; j++) {
      let price1 = listNewBook[j].querySelector(".price").textContent;
      let price2 = listNewBook[j+1].querySelector(".price").textContent;

      if(Number(price1.replace(/[^0-9]/g, "")) > Number(price2.replace(/[^0-9]/g, ""))) {
        let temp = listNewBook[j];
        listNewBook[j] = listNewBook[j+1];
        listNewBook[j+1] = temp;
      }
    }
  }
  
}


function renderSort() {
  const filter = document.getElementById("filter");
  filter.addEventListener("change", (event) => {
    const valueOption = event.target.value;
    const parentBook = document.querySelector(".list-book");
    if(valueOption === "price-asc") {
      sort();
      for(let i = 0; i < listNewBook.length; i++) {
        parentBook.appendChild(listNewBook[i]);
      }
    } else if(valueOption ===  "price-desc") {
      sort();
      for(let i = listNewBook.length -1; i >= 0; i--) {
        parentBook.appendChild(listNewBook[i]);
      }
    } else {
      for(let i = 0; i < listBook.length; i++) {
        parentBook.appendChild(listBook[i]);
      }
    }
  })
}

function setup() {
  Pagination();
  renderSort();
}

window.addEventListener("load", setup);

 




