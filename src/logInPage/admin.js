import { checkEmail } from "../utils/index.js";

const emailInput = document.querySelector("#emailInput")
const passwordInput = document.querySelector("#passwordInput")
const loginBtn = document.querySelector("#loginBtn")



// 로그인버튼 이벤트
loginBtn.addEventListener("click", loginSubmit);

async function loginSubmit(e) {
  // preventDefault 안 하면 새로고침됨.
  e.preventDefault()

  // 입력값 가져오기
  const email = emailInput.value
  const password = passwordInput.value

  //입력 여부 확인
  if (!email) {
    return alert("이메일을 입력해 주세요.")
  }

  if (!password) {
    return alert("비밀번호를 입력해 주세요.")
  }

  const data = {
    email,
    password,
  }
  const dataJson = JSON.stringify(data)

  const apiUrl = `http://localhost:5000/api/users/admin-login`

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: dataJson,
  })

  const userData = await response.json();
  console.log(userData)

  localStorage.setItem("userData", userData.data.token);
  localStorage.setItem("userData", userData.data.role);
  console.log(userData.data.role)

  const getuserData = {
    email: userData.data.email,
    fullName: userData.data.fullName,
    phoneNumber: userData.data.phoneNumber,
    address: userData.data.address,
  };

  sessionStorage.setItem("userData", JSON.stringify(userData));

  if (response.ok) {
    alert("로그인에 성공하였습니다!")
    window.location.href = "/index.html"
  } else {
    alert("로그인에 실패하였습니다...")
    window.location.href = "/logInPage.html"
  }
}