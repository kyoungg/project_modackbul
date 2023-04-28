import {
  STORAGE_NAME,
  SUMMARY_KEY_LIST,
  SUMMARY_PHRASE_LIST,
  CAN_CHANGE_ORDER_STATE,
  CHANGE_BUTTON_TEXT,
  CANCEL_BUTTON_TEXT,
} from "./const.js";

// 로그인한 유저만 리스트 확인 가능
// 비로그인 유저는..이름, 주문 번호로 확인하기 때문에 리스트를 보여줄 수는 없지않을까.
// 하지만 둘 다 DB에서 정보를 가져와야하는 건 틀리지 않음.

// 주문 취소로 인해서 배열이 변경될 수 있다!
// 따라서, 전역적으로 접근하게 배열을 관리하고, 필요한 곳에서 접근해서 사용하는게 좋을 것 같다.
// 그렇게 되면 getOrderList()에서 굳이 return을 안해도 됨.
// let orderList = [];

// 더미 데이터
// 특정 유저의 지금까지의 상품 구매 내역
let orderList = [
  {
    id: 1,
    data: [
      {
        company: "모닥불 컴퍼니",
        name: "쫄깃쫄깃 텐트",
        number: 4,
        src: "https://bellenuit.kr/web/product/medium/202210/9c781c64ee97abde8109dc1c860c4076.jpg",
      },
      {
        company: "퓨다 컴퍼니",
        name: "파닥파닥 텐트",
        number: 2,
      },
      {
        company: "호로로롤 컴퍼니",
        name: "우와 텐트",
        number: 1,
      },
    ],
    total: 4404000,
    orderStatus: "상품 준비 중",
  },
  {
    id: 2,
    data: [
      {
        company: "뉴뉴뉴 컴퍼니",
        name: "불타오르는 텐트",
        number: 4,
        src: "https://bellenuit.kr/web/product/medium/202210/9c781c64ee97abde8109dc1c860c4076.jpg",
      },
    ],
    total: 4404000,
    orderStatus: "배송 중",
  },
  {
    id: 3,
    data: [
      {
        company: "얼음 컴퍼니",
        name: "차가운 텐트",
        number: 4,
        src: "https://bellenuit.kr/web/product/medium/202210/9c781c64ee97abde8109dc1c860c4076.jpg",
      },
    ],
    total: 4404000,
    orderStatus: "배송 완료",
  },
];

/**
 * 로그인한 유저의 주문 내역을 얻기 위한 API 통신을 진행하는 함수
 * @returns 로그인한 유저의 주문 내역
 */
function getOrderList() {
  // 배열 형태로 받아와야함.
  // const orderList = await fetch("url", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: {
  //     // 로그인 유저의 경우 유저 아이디
  //     // 비회원인 경우 주문 번호
  //   },
  // });

  // 더미 데이터
  const dummy = JSON.parse(localStorage.getItem(STORAGE_NAME));
  orderList = [dummy]; // 더미 객체 배열화

  // return orderList;
}

const listDiv = document.querySelector(".list_div");

/**
 * 주문 내역 중 하나를 렌더링하는 함수
 * @param {Object} order 한 개의 주문 데이터
 */
function renderOrder(order) {
  // const eachDiv = document.getElementsByClassName("each_div")[0];
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
  img.src = order.data[0].src;
  // img.alt = orderList[0].summary;
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
    btn_div.classList.add("d-flex", "align-items-end", "w-25");

    const changeOrderBtn = document.createElement("button");
    changeOrderBtn.classList.add(
      "change_btn",
      "btn",
      "btn-outline-warning",
      "me-1"
    );
    changeOrderBtn.type = "button";
    changeOrderBtn.innerText = CHANGE_BUTTON_TEXT;
    changeOrderBtn.addEventListener("click", backToOrderingPage);

    btn_div.appendChild(changeOrderBtn);

    const cancelOrderBtn = document.createElement("button");
    cancelOrderBtn.classList.add("cancel_btn", "btn", "btn-outline-danger");
    cancelOrderBtn.type = "button";
    cancelOrderBtn.innerText = CANCEL_BUTTON_TEXT;
    cancelOrderBtn.addEventListener("click", () =>
      cancelOrderHandler(order.id)
    );

    btn_div.appendChild(cancelOrderBtn);

    eachDiv.appendChild(btn_div);
  }

  listDiv.appendChild(eachDiv);
}

/**
 * 주문 내역 리스트를 렌더링하는 함수
 */
function renderOrderList() {
  // 재렌더링을 위해 자식 노드 전부 제거
  listDiv.replaceChildren();

  // const orderList = getOrderList();
  // getOrderList(); // orderList를 전역 변수로 관리하기 때문에 함수에 return이 없다.
  console.log(orderList);

  // 주문 내역 데이터를 하나씩 쪼개서 렌더링
  orderList.forEach((eachOrder, index) => {
    console.log(eachOrder);
    renderOrder(eachOrder);
  });
}

/**
 * 주문 수정 페이지로 이동하는 함수
 */
function backToOrderingPage() {
  // 어떤 주문을 클릭해서 이동하는 건지를 알아야지, 주문 진행 페이지에서 데이터를 보여줄 수 있음
  // 그렇다면 이 함수는 주문의 id를 전달해줘야함.
  // localStorage에 저장해서 사용하고, 이동 후 삭제하는게 좋을듯
  const wantModify = {
    // orderNum: 주문번호,
    orderNum: "fudsfijads;fjasifjaeip1u49812794817240",
  };

  localStorage.setItem("modifyOrderData", JSON.stringify(wantModify));

  window.location.href = "modifyOrderPage.html";
}

function cancelOrderHandler(id) {
  const isCancel = window.confirm("정말 주문을 취소하시겠습니까?");

  if (!isCancel) {
    return;
  }

  // async 필요
  // 주문 데이터 삭제 API 통신
  // cosnt deleteData = await fetch("url", {
  //   method: "DELETE",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: {
  //     주문 id,
  //   },
  // });

  // if (deleteData === true) {
  //   // 취소된 주문을 화면에서 제거해야함.
  //   orderData = orderData.filter((order) => order.id !== id);

  //   alert("주문이 취소되었습니다.");
  // }

  orderList = orderList.filter((order) => order.id !== id);

  alert("주문이 취소되었습니다.");

  renderOrderList();
}

renderOrderList();
