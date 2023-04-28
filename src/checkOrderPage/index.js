import {
  STORAGE_NAME,
  SUMMARY_KEY_LIST,
  SUMMARY_PHRASE_LIST,
  CAN_CHANGE_ORDER_STATE,
  CHANGE_BUTTON_TEXT,
  CANCEL_BUTTON_TEXT,
} from "./const.js";
import { checkAuth, getUserData } from "../utils/index.js";

const { isLoggedIn, token } = checkAuth();

let orderList = null;

/**
 * 유저의 주문 내역을 얻기 위한 API 통신을 진행하는 함수
 * @returns 유저의 주문 내역
 */
async function getOrderList() {
  // 회원 주문 내역 조회
  if (isLoggedIn) {
    const { _id } = getUserData();

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/order/${_id}`,
        {
          method: "GET",
          headers: {
            Authorization: "bearer " + token,
          },
        }
      );

      const responseData = await response.json();

      console.log(responseData);

      orderList = responseData.data;
    } catch (err) {
      console.log(err);
    }
  }

  // 비회원 주문 내역 조회
  if (!isLoggedIn) {
    const nonmemberOrderNumber = JSON.parse(
      localStorage.getItem("nonmemberData")
    );

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${nonmemberOrderNumber}`
      );

      const responseData = await response.json();

      orderList = responseData.data;
    } catch (err) {
      console.log(err);
    }
  }
}

const listDiv = document.querySelector(".list_div");

/**
 * 주문 내역 중 하나를 렌더링하는 함수
 * @param {Object} order 한 개의 주문 데이터
 */
function renderOrder(order) {
  const eachDiv = document.createElement("div");
  eachDiv.classList.add(
    "each_div",
    "d-flex",
    "border",
    "border-success",
    "rounded",
    "p-2",
    "mb-4"
  );

  const productDiv = document.createElement("div");
  productDiv.classList.add("d-flex", "align-items-center", "w-75");

  const img = document.createElement("img");
  img.src = `http://localhost:5000/${order.cart[0].imgURL}`;
  img.alt = "상품 이미지";
  img.classList.add("rounded", "w-25", "pe-2");

  const ul = document.createElement("ul");
  ul.classList.add("m-0", "p-0");

  for (let i = 0; i < SUMMARY_PHRASE_LIST(order).length; i++) {
    const li = document.createElement("li");
    li.classList.add("mb-1");

    li.innerText = `${SUMMARY_KEY_LIST[i]} : ${SUMMARY_PHRASE_LIST(order)[i]}`;
    ul.appendChild(li);
  }

  productDiv.appendChild(img);
  productDiv.appendChild(ul);
  eachDiv.appendChild(productDiv);

  if (
    SUMMARY_PHRASE_LIST(order)[SUMMARY_PHRASE_LIST(order).length - 1] ===
    CAN_CHANGE_ORDER_STATE
  ) {
    const btn_div = document.createElement("div");
    btn_div.classList.add(
      "d-flex",
      "align-items-end",
      "w-25",
      "justify-content-end"
    );

    const changeOrderBtn = document.createElement("button");
    changeOrderBtn.classList.add(
      "change_btn",
      "btn",
      "btn-outline-warning",
      "me-1"
    );
    changeOrderBtn.type = "button";
    changeOrderBtn.innerText = CHANGE_BUTTON_TEXT;
    changeOrderBtn.addEventListener("click", () =>
      backToOrderingPage(order._id)
    );

    btn_div.appendChild(changeOrderBtn);

    const cancelOrderBtn = document.createElement("button");
    cancelOrderBtn.classList.add("cancel_btn", "btn", "btn-outline-danger");
    cancelOrderBtn.type = "button";
    cancelOrderBtn.innerText = CANCEL_BUTTON_TEXT;
    cancelOrderBtn.addEventListener("click", () =>
      cancelOrderHandler(order._id)
    );

    btn_div.appendChild(cancelOrderBtn);

    eachDiv.appendChild(btn_div);
  }

  listDiv.appendChild(eachDiv);
}

/**
 * 주문 내역 리스트를 렌더링하는 함수
 */
async function renderOrderList() {
  // 재렌더링을 위해 자식 노드 전부 제거
  listDiv.replaceChildren();

  await getOrderList();

  if (orderList.length < 1) {
    const h2 = document.querySelector(".alert_title");

    h2.innerText = "주문 내역이 없습니다.";
    return;
  }

  // 주문 내역 데이터를 하나씩 쪼개서 렌더링
  orderList.forEach((eachOrder, index) => {
    renderOrder(eachOrder);
  });
}

/**
 * 주문 수정 페이지로 이동하는 함수
 */
function backToOrderingPage(id) {
  // 어떤 주문을 클릭해서 이동하는 건지를 알아야지, 주문 진행 페이지에서 데이터를 보여줄 수 있음
  // 그렇다면 이 함수는 주문의 id를 전달해줘야함.
  // localStorage에 저장해서 사용하고, 이동 후 삭제하는게 좋을듯
  // const wantModify = {
  //   // orderNum: 주문번호,
  //   orderNum: "fudsfijads;fjasifjaeip1u49812794817240",
  // };

  const wantModify = orderList.filter((eachOrder) => eachOrder._id === id);

  localStorage.setItem("modifyOrderData", JSON.stringify(wantModify[0]));

  window.location.href = "modifyOrderPage.html";
}

async function cancelOrderHandler(id) {
  const isCancel = window.confirm("정말 주문을 취소하시겠습니까?");

  if (!isCancel) {
    return;
  }

  // 주문 데이터 삭제 API 통신
  try {
    const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      orderList = orderList.filter((order) => order._id !== id);

      alert("주문이 취소되었습니다.");
    }
  } catch (err) {
    console.log(err);
  }

  renderOrderList();
}

renderOrderList();
