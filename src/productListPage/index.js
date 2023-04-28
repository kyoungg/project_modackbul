import { chageNumberToLocaleString } from "../utils/index.js";
const productList = document.querySelector(".product-content");
const productItem = document.querySelector(".productItem");

const products = [
  {
    _id: "1",
    imgPath:
      "https://images.pexels.com/photos/9849124/pexels-photo-9849124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    company: "company 1",
    name: "Product 1",
    price: 1000,
  },
  {
    _id: "2",
    imgPath:
      "https://images.pexels.com/photos/9849124/pexels-photo-9849124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    company: "company 2",
    name: "Product 2",
    price: 2000,
  },
  {
    _id: "2",
    imgPath:
      "https://images.pexels.com/photos/9849124/pexels-photo-9849124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    company: "company 2",
    name: "Product 2",
    price: 2000,
  },
  {
    _id: "2",
    imgPath:
      "https://images.pexels.com/photos/9849124/pexels-photo-9849124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    company: "company 2",
    name: "Product 2",
    price: 2000,
  },
  {
    _id: "2",
    imgPath:
      "https://images.pexels.com/photos/9849124/pexels-photo-9849124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    company: "company 2",
    name: "Product 2",
    price: 2000,
  },
  {
    _id: "2",
    imgPath:
      "https://images.pexels.com/photos/9849124/pexels-photo-9849124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    company: "company 2",
    name: "Product 2",
    price: 2000,
  },
];

async function addProductItems() {
  // const res = await fetch(`http://localhost:5000/api/categories/${name}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // const products = await res.json();
  // console.log(data);

  products.forEach((product) => {
    const name = product.name;
    const price = product.price;
    const company = product.company;
    const image = product.imgPath;
    const category = product.category;

    productList.insertAdjacentHTML(
      "beforeend",
      `<div class="product col">
      <div class="card">
      <a href="productDetailPage.html" class="productItem"><img src="${image}" class="product_img card-img-top" alt="" /></a>
        <div class="card-body">
          <h6 class="company card-title">${company}</h6>
          <h6 class="name card-title">${name}</h6>
          <h5 class="price card-text">${chageNumberToLocaleString(price)}</h5>
        </div>
      </div>
    </div>
    `
    );
  });
}

addProductItems();

// productItem.addEventListener("click", navigate);

// function navigate() {
//   window.location.href = `${_id}`;
// }
