const clearBtn = document.getElementById("clear");
const cbxrubia = document.getElementById("cboxRubia");
const cbxmorena = document.getElementById("cboxMorena");
const cbxroja = document.getElementById("cboxRoja");
const labelrubia = document.getElementById("labelrubia");
const labelmorena = document.getElementById("labelmorena");
const labelroja = document.getElementById("labelRoja");
const clearFilters = document.getElementById("clearFilters");
const runFilters = document.getElementById("runFilters");
const popUp = document.getElementById("popup1");
let filterNumber = document.getElementById("filterNotification");
let filterNotificationmain = document.getElementById("filterNotification-main");
let allCheckbox = document.querySelectorAll(".checkbox");
let gridBoard = document.getElementById("productGrid");
let checksenabled = 0;
let productList;
let htmlgridproduct = "";
let itemTofind = "";

window.onload = () => {
  filterNumber.innerHTML = 0;
  filterNotificationmain.innerHTML = 0;
  cbxmorena.checked = false;
  cbxrubia.checked = false;
  cbxroja.checked = false;
  loadProductsdata();
};

let loadProductsdata = () => {
  fetch("./assets/products.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      productList = data.products;
      loadHandlebarsTemplate(productList);
      createGridPictures();
    })
    .catch((error) => {
      console.log(error);
    });
  return productList;
};

let numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
let createGridPictures = () => {
  productList.forEach((product) => {
    htmlgridproduct += `
            <div class="product-card">
                <img src="./assets/img/${product.img}" alt =${product.name} />
                <p> ${product.name}</p>
                <p> ${product.description}</p>
                <p>$${numberWithCommas(product.price)}<p>
                <div class="agregar">
                    AGREGAR
                </div>
            </div> 
            `;
  });
  gridBoard.innerHTML = htmlgridproduct;
};

let howManycheckboxEnabled = () => {
  allCheckbox.forEach((checkitem) => {
    checkitem.addEventListener("change", (e) => {
      checksenabled = 0;
      
      for (i = 0; i < allCheckbox.length; i++) {
        if (allCheckbox[i].checked == true) {
          checksenabled++;          
        }
      }
      enableFilterButton();
      filterNumber.innerHTML = checksenabled;
      filterNotificationmain.innerHTML = checksenabled;
    });
  });
};

let enableFilterButton = () => {
   htmlgridproduct = ''
   
  if (checksenabled > 0) {
    clearFilters.addEventListener("click", clearCheckBox);
    clearFilters.classList.remove("disabled");
  } else if (!checksenabled) {
    clearFilters.classList.add("disabled");
    createGridPictures();
  }
};
let clearCheckBox = () => {
  filterNumber.innerHTML = 0;
  filterNotificationmain.innerHTML = 0;
  cbxmorena.checked = false;
  cbxrubia.checked = false;
  cbxroja.checked = false;
  clearFilters.classList.add("disabled");
  createGridPictures();
};

let loadHandlebarsTemplate = (productList) => {
  let template = Handlebars.compile(
    document.getElementById("product-template").innerHTML
  );
  document.getElementById("contentProducts").innerHTML = template(productList);
};

let rubiaitem = (defaultFilter) => {
  defaultFilter = "id=1";
  itemTofind = "ale";
};

cbxrubia.addEventListener("change", rubiaitem);

let morenaItem = (defaultFilter) => {
  defaultFilter = "id=2";
  itemTofind = "milk";
};

cbxmorena.addEventListener("change", morenaItem);

let rojaItem = (defaultFilter) => {
  defaultFilter = "id=3";
  itemTofind = "topa";
};

cbxroja.addEventListener("change", rojaItem);

let applyAllFilters = () => {
  htmlgridproduct = "";
  let description;
    
  console.log(itemTofind);

  productList.forEach((product) => {
    description = product.name.toLowerCase();

    if (description.indexOf(itemTofind) !== -1) {
      htmlgridproduct += `
            <div class="product-card">
                <img src="./assets/img/${product.img}" alt =${product.name} />
                <p> ${product.name}</p>
                <p> ${product.description}</p>
                <p>$${numberWithCommas(product.price)}<p>
                <div class="agregar">
                    AGREGAR
                </div>
            </div> 
            `;
    } else if (htmlgridproduct === "") {
      htmlgridproduct += ` `;
    }

    gridBoard.innerHTML = htmlgridproduct;
  });
};
runFilters.addEventListener('click', applyAllFilters);
howManycheckboxEnabled();