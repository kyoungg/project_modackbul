import {
  STORAGE_NAME,
  SUMMARY_KEY_LIST,
  SUMMARY_PHRASE_LIST,
} from "./const.js";
import {
  checkEmail,
  checkName,
  checkPhoneNumber,
  findAddress,
} from "../utils/index.js";
import { checkAuth } from "../utils/index.js";

// const { isLoggedIn } = checkAuth();

const orderData = JSON.parse(localStorage.getItem(STORAGE_NAME));

/**
 * 주문 진행을 위한 구매 예정 데이터를 렌더링하는 함수
 */
function renderOrder() {
  // 주문 요약 보여주기
  const summaryDiv = document.getElementsByClassName("order_summary")[0];
  summaryDiv.classList.add(
    "d-flex",
    "border",
    "border-success",
    "justify-content-start",
    "align-items-center",
    "mb-4",
    "p-2",
    "rounded",
    "w-75"
  );

  const img = document.createElement("img");
  img.src = orderData.data[0].img;
  img.alt = orderData.data[0].summary;
  img.classList.add("rounded", "w-25");

  const ul = document.createElement("ul");

  for (let i = 0; i < SUMMARY_PHRASE_LIST(orderData).length; i++) {
    const li = document.createElement("li");

    li.innerText = `${SUMMARY_KEY_LIST[i]} : ${
      SUMMARY_PHRASE_LIST(orderData)[i]
    }`;
    ul.appendChild(li);
  }

  summaryDiv.appendChild(img);
  summaryDiv.appendChild(ul);

  // 로그인 여부에 따라 getUserData를 할지 말지 분기 처리
  const isLoggedIn = true; // 목업 로그인
  if (isLoggedIn) {
    // 로그인 유저의 경우 DB에서 가져온 유저 데이터를 보여주고, 해당 데이터들의 input 태그는 disabled 처리
    // 휴대폰 번호와 주소의 경우, 회원가입 시 등록하지 않는다.
    // 이 부분에 대해서도 분기 처리가 필요하지 않을까?
    const { email, id, phoneNumber, name } = getUserData();

    const input = document.getElementsByTagName("input");

    for (let i = 0; i < input.length; i++) {
      if (input[i].id === "email_input") {
        input[i].value = email;
        input[i].disabled = true;
      }

      if (input[i].id === "name_input") {
        input[i].value = name;
        input[i].disabled = true;
      }

      if (input[i].id === "phone_input") {
        input[i].value = phoneNumber;
        input[i].disabled = true;
      }
    }
  }
}

/**
 * 로그인한 유저의 기본 정보를 가져오는 함수
 * @returns {String} 이메일, 아이디, 휴대폰 번호, 이름
 */
function getUserData() {
  // async 앞에 붙여주기
  // 유저 데이터를 얻기 위한 API 통신
  // const { email, id, phoneNumber, name } = await fetch("url");

  // 더미 데이터
  const data = {
    email: "hi@hi.com",
    id: "afsadfefesf",
    phoneNumber: "010-1234-5678",
    name: "박기영",
  };

  const { email, id, phoneNumber, name } = data;

  return { email, id, phoneNumber, name };
}

const orderBtn = document.querySelector(".order_btn");

orderBtn.addEventListener("click", orderHandler);

/**
 * 주문하기 버튼 클릭 시, 유저의 데이터와 주문 데이터를 병합하여 API 통신을 진행하는 함수.
 * API 통신으로 주문 번호를 받아온 뒤, 이를 localStorage에 저장하고 주문 완료 페이지로 이동한다.
 */
function orderHandler() {
  const email = document.getElementById("email_input").value;
  const name = document.getElementById("name_input").value;
  const phoneNumber = document.getElementById("phone_input").value;
  const postNumber = document.getElementById("postNumber").value;
  const address1 = document.getElementById("addInput1").value;
  const address2 = document.getElementById("addInput2").value;

  if (
    email === "" ||
    name === "" ||
    phoneNumber === "" ||
    postNumber === "" ||
    address1 === "" ||
    address2 === ""
  ) {
    return alert("모든 정보를 입력해주세요.");
  }

  // 이메일, 이름, 휴대전화 번호 검증
  if (
    !checkEmail(email) ||
    !checkName(name) ||
    !checkPhoneNumber(phoneNumber)
  ) {
    return;
  }

  const purchaseData = {
    email,
    name,
    phoneNumber,
    address: {
      postNumber,
      address1,
      address2,
    },
    orderData,
  };

  console.log(purchaseData);

  // async 추가하기
  // API 통신으로 주문번호 받아오기
  // body에 있는 데이터로 해시 암호화?
  // let orderNumber = await fetch("url", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: purchaseData,
  // });

  // 주문 완료 페이지로 이동
  window.location.href = "orderedPage.html";
}

const cancelBtn = document.querySelector(".cancel_btn");

cancelBtn.addEventListener("click", cancelHandler);

/**
 * 취소하기 버튼 클릭 시, 이전 페이지로 이동하는 함수
 */
function cancelHandler() {
  // 이전 페이지로 이동
  // 장바구니 페이지에서 접근했을 수도 있고, 제품 상세 페이지에서 접근했을 수도 있다.
  window.location.href = document.referrer;
}

const findAddressBtn = document.querySelector(".find_address_btn");

findAddressBtn.addEventListener("click", findAddress);

renderOrder();
