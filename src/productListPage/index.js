import { chageNumberToLocaleString } from "../utils/index.js";
const productList = document.querySelector(".product-content");
const nav = document.querySelector(".category");

// 상품 가져오기
async function addProductItems() {
  const res = await fetch("http://localhost:5000/api/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const products = await res.json();
  console.log(products);
  sessionStorage.setItem("productData", JSON.stringify(products));

  products.data.forEach((product) => {
    const name = product.name;
    const price = product.price;
    const company = product.company;
    const image = product.imgPath;

    productList.insertAdjacentHTML(
      "afterbegin",
      `<div class="product col">
      <a href="./productDetailPage.html" class="productItem">
      <div class="card">
      <img src="${image}" class="product_img card-img-top" alt="" />
        <div class="card-body">
          <h6 class="company card-title">${company}</h6>
          <h6 class="name card-title">${name}</h6>
          <h5 class="price card-text">${chageNumberToLocaleString(price)}</h5>
        </div>
      </div>
      </a>
    </div>
    `
    );

    const productItem = productList.querySelector(".productItem");
    productItem.addEventListener("click", () => {
      sessionStorage.setItem("name", JSON.stringify(product));
    });
  });
}
addProductItems();

// 카테고리 가져오기
async function addcategory(e) {
  const res = await fetch("http://localhost:5000/api/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const category = await res.json();
  console.log(category);
  sessionStorage.setItem("categoryData", JSON.stringify(category));

  category.data.forEach((tab) => {
    const id = tab._id;
    const name = tab.name;

    nav.insertAdjacentHTML(
      "beforeend",
      `<li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">${name}</a>
  </li>`
    );
  });
}

addcategory();
