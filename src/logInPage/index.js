import { checkEmail } from "../utils/index.js";

const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const loginBtn = document.querySelector("#loginBtn");
const nonmemberBtn = document.querySelector("#nonmemberBtn");

// 로그인버튼 이벤트
loginBtn.addEventListener("click", loginSubmit);

async function loginSubmit(e) {
  // preventDefault 안 하면 새로고침됨.
  e.preventDefault;

  // 입력값 가져오기
  const email = emailInput.value;
  const password = passwordInput.value;

  // 객체 만듦
  const data = {
    email,
    password,
  };

  // 입력 여부 확인
  // if (!email) {
  //   return alert("이메일을 입력해 주세요.");
  // } else {
  //   checkEmail();
  // }

  if (!password) {
    return alert("비밀번호를 입력해 주세요.");
  }

  // JSON 만들기
  const dataJson = JSON.stringify(data);

  const apiUrl = `http://localhost:5000/api/users/login`; //수정 필요할지도

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: dataJson,
  });

  const responseData = await response.json();

  console.log(responseData);

  localStorage.setItem("userData", responseData.data.token);

  const userData = {
    email: responseData.data.email,
    fullName: responseData.data.fullName,
    phoneNumber: responseData.data.phoneNumber,
    address: responseData.data.address,
    _id: responseData.data._id,
  };

  sessionStorage.setItem("userData", JSON.stringify(userData));

  // if (response.ok) {
  //   alert("로그인에 성공하였습니다!");
  //   window.location.href = "/landingPage";
  // } else {
  //   alert("로그인에 실패하였습니다...");
  //   window.location.href = "/loginPage";
  // }
}

//비회원 주문조회 이벤트
nonmemberBtn.addEventListener("click", () => {
  window.location.href = "/adminMypage";
});
