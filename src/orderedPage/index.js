import {
  STORAGE_NAME,
  SUMMARY_KEY_LIST,
  SUMMARY_PHRASE_LIST,
} from "./const.js";

/**
 * 완료된 주문 정보를 얻기 위한 API 통신을 진행하는 함수
 * @returns 주문 정보를 담고 있는 객체
 */
function getOrderData() {
  // 비회원인 경우, 회원인 경우 관계없이 모두 DB에서 받아와야함.
  // async 붙여줘야함.
  // const orderData = await fetch("url", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type" : "application/json"
  //   },
  //   body: {
  //     // 회원/비회원 모두 주문 번호
  //   }
  // });

  const orderData = JSON.parse(localStorage.getItem(STORAGE_NAME));

  return orderData;
}

/**
 * 주문 완료된 정보를 렌더링하는 함수
 */
function renderOrder() {
  const orderData = getOrderData();
  console.log(orderData);

  const summaryDiv = document.getElementsByClassName("order_summary")[0];

  const img = document.createElement("img");
  img.src = orderData.data[0].img;
  img.alt = orderData.data[0].summary;
  img.classList.add("rounded", "w-25", "pe-2");

  const ul = document.createElement("ul");
  ul.classList.add("m-0", "p-0");

  for (let i = 0; i < SUMMARY_PHRASE_LIST(orderData).length; i++) {
    const li = document.createElement("li");
    li.classList.add("mb-2");

    li.innerText = `${SUMMARY_KEY_LIST[i]} : ${
      SUMMARY_PHRASE_LIST(orderData)[i]
    }`;
    ul.appendChild(li);
  }

  summaryDiv.appendChild(img);
  summaryDiv.appendChild(ul);
}

const btn = document.getElementsByClassName("order_check_btn")[0];

btn.addEventListener("click", checkOrderList);

/**
 * 주문 내역을 확인하는 페이지로 이동하는 함수
 */
function checkOrderList() {
  // 주문 내역 페이지로 이동
  window.location.href = "checkOrderPage.html";
}

renderOrder();
