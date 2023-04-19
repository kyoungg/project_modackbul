const productImg = document.querySelector(".product_img");
const productSeller = document.querySelector(".product_seller");
const productName = document.querySelector(".product_name");
const productDesc = document.querySelector(".product_desc");
const productPrice = document.querySelector(".product_price");

const qty = document.querySelector(".qty");
const totalPrice = document.querySelector(".total_price");

const cartBtn = document.querySelector(".cart_btn");
const buyBtn = document.querySelector(".buy_btn");

const data = [
  {
    imageUrl:
      "https://images.pexels.com/photos/9849124/pexels-photo-9849124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    seller: "엘리스",
    name: "텐트",
    desc: "상품설명입니다.",
    price: 200000,
  },
];

// 각 데이터를 요소에 삽입하여 화면에 보여주기
function getProduct() {
  const productData = data[0];

  productImg.src = productData.imageUrl;
  productSeller.innerHTML = productData.seller;
  productName.innerHTML = productData.name;
  productDesc.innerHTML = productData.desc;
  productPrice.innerHTML = `${productData.price}원`;
  totalPrice.innerHTML = `${productData.price}원`;

  // 수량 바뀔 때 마다 가격 변동
  qty.addEventListener("change", () => {
    const count = qty.value;
    totalPrice.innerHTML = `${productData.price * count}원`;
  });
}

getProduct();

// 로컬 스토리지에 장바구니 데이터 넣기?
function addCart() {
  const quantity = qty.value;
  let cart = { ...data, quantity };
  localStorage.setItem("cartData", JSON.stringify(cart));
  alert("상품을 장바구니에 담았습니다.");
}

// 장바구니 버튼 클릭
cartBtn.addEventListener("click", addCart);

// 구매하기
buyBtn.addEventListener("click", () => {
  const quantity = qty.value;
  let cart = { ...data, quantity };
  localStorage.setItem("cartData", JSON.stringify(cart));

  // 구매 페이지 이동
  window.location.href = "/orderingPage";
});
