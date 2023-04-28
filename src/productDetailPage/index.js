import { chageNumberToLocaleString } from "../utils/index.js";
import { checkAuth } from "../utils/index.js";
const { isLoggedIn, token } = checkAuth();

const productImg = document.querySelector(".product_img");
const productSeller = document.querySelector(".product_seller");
const productDesc = document.querySelector(".product_desc");
const productPrice = document.querySelector(".product_price");
const productName = document.getElementsByClassName("product_name");
const qty = document.querySelector(".qty");
const totalPrice = document.querySelector(".total_price");
const cartBtn = document.querySelector(".cart_btn");
const buyBtn = document.querySelector(".buy_btn");

async function getProduct() {
  // const res = await fetch(`http://localhost:5000/api/products/${name}`, {
  //   method: "GET",
  // });
  // const data = await res.json();

  // mock data
  const data = {
    name: "폴라리스 카프리콘 오토캐빈텐트",
    price: 200000,
    description: "상품설명입니다.",
    company: "폴라리스",
    imgPath:
      "https://images.pexels.com/photos/9849124/pexels-photo-9849124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  };
  const { name, price, description, company, imgPath } = data;

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

  // 빈배열 초기화
  let cartData = [];
  //cartData 찾기
  const cartDataJSON = localStorage.getItem("cartData");
  if (cartDataJSON) {
    cartData = JSON.parse(cartDataJSON);
  }

  function addCartItem(cartItem) {
    cartData.push(cartItem);
  }

  async function addToCart() {
    const quantity = Number(qty.value);
    const cartItem = { name, price, description, company, imgPath, quantity };
    addCartItem(cartItem);

    // 로그인 유저 서버 저장
    if (isLoggedIn) {
      try {
        const res = await fetch("http://localhost:5000/api/carts/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItem),
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        alert("장바구니 추가 중 문제가 발생했습니다.");
        console.error(error);
      }
    } else {
      // 비회원 localStorage 저장
      localStorage.setItem("cartData", JSON.stringify(cartData));
      alert("상품을 장바구니에 담았습니다.");
    }
  }

  function buyNow() {
    const quantity = Number(qty.value);
    const cart = { name, price, description, company, imgPath, quantity };

    window.location.href = "orderingPage.html";
    localStorage.setItem("cartData", JSON.stringify([cart]));
  }

  // 각 데이터를 요소에 삽입하여 화면에 보여주기 (단순 텍스트만 교체할 땐 textContent 사용)
  productImg.src = imgPath;
  productSeller.textContent = company;
  productDesc.textContent = description;
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
