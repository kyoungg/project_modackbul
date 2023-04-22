import { chageNumberToLocaleString } from "../utils/index.js";

const productImg = document.querySelector(".product_img");
const productSeller = document.querySelector(".product_seller");
const productDesc = document.querySelector(".product_desc");
const productPrice = document.querySelector(".product_price");
const productName = document.getElementsByClassName("product_name");
const qty = document.querySelector(".qty");
const totalPrice = document.querySelector(".total_price");
const cartBtn = document.querySelector(".cart_btn");
const buyBtn = document.querySelector(".buy_btn");

// 상품 데이터 가져오기
async function getProduct() {
  // const data = await Api.get(`/api/products/${name}`);

  // mock data
  const data = {
    name: "폴라리스 카프리콘 오토캐빈텐트",
    price: 200000,
    desc: "상품설명입니다.",
    seller: "폴라리스",
    imageUrl:
      "https://images.pexels.com/photos/9849124/pexels-photo-9849124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  };

  const { name, price, desc, seller, imageUrl } = data;

  // 최소 수량 1, 최대 수량 10 (html에 적용은 해놨는데 직접 입력 시 적용이 안됐음)
  function updateTotalPrice() {
    let count = parseInt(qty.value, 10);
    if (count > 10) {
      alert("최대 주문 수량은 10개 입니다.");
      count = 10;
      qty.value = count;
    }
    if (count < 1) {
      alert("최소 주문 수량은 1개 입니다.");
      count = 1;
      qty.value = count;
    }
    // 수량 바뀔 때 마다 가격 변동
    totalPrice.innerHTML = `${chageNumberToLocaleString(price * count)}원`;
  }

  // 장바구니 버튼 클릭 시 (클래스로 구현하기...)
  function addToCart() {
    try {
      const quantity = Number(qty.value);
      const cart = { ...data, quantity };

      localStorage.setItem("cartData", JSON.stringify(cart));
      alert("상품을 장바구니에 담았습니다.");
    } catch (err) {
      console.err(err);
    }
  }

  // 구매하기 버튼 클릭 시
  function buyNow() {
    try {
      const quantity = Number(qty.value);
      const cart = { ...data, quantity };

      localStorage.setItem("cartData", JSON.stringify(cart));
      window.location.href = "orderingPage.html";
    } catch (err) {
      console.err(err);
    }
  }

  // 각 데이터를 요소에 삽입하여 화면에 보여주기 (단순 텍스트만 교체할 땐 textContent 사용)
  productImg.src = imageUrl;
  productSeller.textContent = seller;
  productDesc.textContent = desc;
  productPrice.textContent = `${chageNumberToLocaleString(price)}원`;
  totalPrice.textContent = `${chageNumberToLocaleString(price)}원`;
  for (let i = 0; i < productName.length; i++) {
    productName[i].textContent = name;
  }

  qty.addEventListener("input", updateTotalPrice);
  cartBtn.addEventListener("click", addToCart);
  buyBtn.addEventListener("click", buyNow);
}

getProduct();
