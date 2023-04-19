import {
  STORAGE_NAME,
  SUMMARY_KEY_LIST,
  SUMMARY_PHRASE_LIST,
} from "./const.js";
import { checkEmail, checkName, checkPhoneNumber } from "../utils/index.js";

// localStorage에서 데이터 전달 받고, 바로 localStorage 삭제
// 그런데, 이러면 새로고침했을 때 데이터가 없어진 상태라서 문제가 발생...
const orderData = JSON.parse(localStorage.getItem(STORAGE_NAME));
console.log(orderData);
// localStorage.removeItem(STORAGE_NAME);

/**
 * 주문 진행을 위한 구매 예정 데이터를 렌더링하는 함수
 */
function renderOrder() {
  // 주문 요약 보여주기
  const summaryDiv = document.getElementsByClassName("order_summary")[0];

  // const img = document.createElement("img");
  // img.src = "";
  // img.alt = "";

  const ul = document.createElement("ul");

  for (let i = 0; i < SUMMARY_PHRASE_LIST(orderData).length; i++) {
    const li = document.createElement("li");

    li.innerText = `${SUMMARY_KEY_LIST[i]} : ${
      SUMMARY_PHRASE_LIST(orderData)[i]
    }`;
    ul.appendChild(li);
  }

  // summaryDiv.appendChild(img);
  summaryDiv.appendChild(ul);

  // 로그인 여부에 따라 getUserData를 할지 말지 분기 처리
  const isLoggedIn = false; // 목업 로그인
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
  // const { email, id, phoneNumber, name } = await fetch("url", {
  //   method: "GET",
  // });

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

const cancelBtn = document.getElementsByClassName("cancel_btn")[0];

cancelBtn.addEventListener("click", cancelHandler);

function cancelHandler() {
  // 뒤로 이동?
}

const orderBtn = document.getElementsByClassName("order_btn")[0];

orderBtn.addEventListener("click", orderHandler);

/**
 * 주문하기 버튼 클릭 시, 유저의 데이터와 주문 데이터를 병합하여 API 통신을 진행하는 함수.
 * API 통신으로 주문 번호를 받아온 뒤, 이를 localStorage에 저장하고 주문 완료 페이지로 이동한다.
 */
function orderHandler() {
  const email = document.getElementById("email_input").value;
  const name = document.getElementById("name_input").value;
  const phoneNumber = document.getElementById("phone_input").value;
  const address = document.getElementById("address_input").value;

  if (email === "" || name === "" || phoneNumber === "" || address === "") {
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

  // 주소 검증

  const purchaseData = {
    orderNumber: createOrderNumber(),
    email,
    name,
    phoneNumber,
    address,
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

/**
 * 오늘의 날짜를 YYMMDD 형태로 생성하는 함수
 * @returns {String} YYMMDD 형태의 년/월/일
 */
function createDateYYMMDD() {
  const date = new Date();
  const year = String(date.getFullYear() - 2000);
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const day = String(date.getDate()).padStart(2, 0);

  return `${year}${month}${day}`;
}

let num = 1;

/**
 *
 * @returns {String} 001 ~ 999 사이의 숫자
 */
function createThreeDigitNumber() {
  // num이 999가 넘어가면 1로 초기화
  if (num > 999) {
    num = 1;
  }

  // 하루가 지나면 num을 1로 초기화
  if (true) {
  }

  const threeDigitNum = String(num).padStart(3, 0);

  num++;

  return String(threeDigitNum);
}

// 24시가 지났는지 판별하는 함수
// function checkDateIsToday(curDate) {
//   var today, resultDate;
//   today = new Date();
//   resultDate = new Date(curDate);

//   // Time (minutes * seconds * millisecond)
//   if ((today - resultDate) / (60 * 60 * 1000) <= 24) {
//     // 하루 이전 글인 경우 여기에 코드 작성
//   } else {
//     // 하루 이후 글인 경우 여기에 코드 작성
//   }
// }

/**
 * 주문 번호를 생성하는 함수
 * @returns {String} 주문번호 YYMMDD + (001 ~ 999 사이의 숫자)
 */
function createOrderNumber() {
  const YYMMDD = createDateYYMMDD();
  const THREE_DIGIT_NUM = createThreeDigitNumber();

  return `${YYMMDD}${THREE_DIGIT_NUM}`;
}

renderOrder();
