import {
  checkEmail,
  checkName,
  checkPhoneNumber,
  findAddress,
  logout,
} from "../utils/index.js";
import { checkAuth } from "../utils/index.js";
const { isLoggedIn, token } = checkAuth();
import { userForm } from "../commonUI/index.js";

const userInfoForm = document.querySelector(".userInfo");
userInfoForm.innerHTML = userForm();

//폼
const emailInput = document.querySelector("#emailInput");
const passwdInput = document.querySelector("#passwdInput");
const passwdConfirmInput = document.querySelector("#passwdConfirmInput");
const nameInput = document.querySelector("#nameInput");
const phoneNumInput = document.querySelector("#phoneNumInput");
const postNumber = document.querySelector("#postNumber");
const addInput1 = document.querySelector("#addInput1");
const addInput2 = document.querySelector("#addInput2");

//버튼
const findAddressBtn = document.querySelector("#findAddressBtn");
const changeBtn = document.querySelector("#changeBtn");
const deleteBtn = document.querySelector("#deleteBtn");

findAddressBtn.addEventListener("click", findAddress);
changeBtn.addEventListener("click", doCheckout);
deleteBtn.addEventListener("click", userDelete);

// const userData = {
//   email: "abc@elice.com",
//   password: "1234",
//   fullName: "엘리스",
//   phoneNumber: "010-1234-5678",
//   address: {
//     post: "04799",
//     address1: "서울 성동구 아차산로17길 48 (성수동2가)",
//     address2: "성수낙낙 2층 엘리스랩",
//   },
// };

// 유저 정보 가져와서 input에 값 넣기
async function getUserData() {
  if (isLoggedIn) {
    const res = await fetch(`http://localhost:5000/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userData = await res.json();
    console.log(userData);

    nameInput.value = userData.fullName;
    passwdInput.value = userData.password;
    passwdConfirmInput.value = userData.password;
    // postNumber.value = userData.address.post;
    // addInput1.value = userData.address.address1;
    // addInput2.value = userData.address.address2;
    phoneNumInput.value = userData.phoneNumber;
    emailInput.value = userData.email;
  }
}

getUserData();

// 검증 후 정보변경
async function doCheckout(e) {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwdInput.value;
  const passwdConfirm = passwdConfirmInput.value;
  const name = nameInput.value;
  const phoneNum = phoneNumInput.value;
  const post = postNumber.value;
  const address1 = addInput1.value;
  const address2 = addInput2.value;

  // 비밀번호 입력 안 했을 때
  if (!password) {
    alert("비밀번호를 입력해 주세요.");
    return;
  }
  // 비밀번호 확인과 비밀번호와 일치하지 않을 때
  if (passwdConfirm !== password) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }
  if (!checkEmail(email)) {
    return;
  }
  if (!checkName(name)) {
    return;
  }
  if (!checkPhoneNumber(phoneNum)) {
    return;
  }

  // 변경된 정보 추출
  const updatedInfo = {};
  if (password) {
    updatedInfo.password = password;
  }
  if (phoneNum) {
    updatedInfo.phoneNum = phoneNum;
  }
  if (post && address1 && address2) {
    updatedInfo.address = {
      post,
      address1,
      address2,
    };
  }
  console.log(updatedInfo);

  // 정보 변경
  try {
    const res = await fetch("http://localhost:5000/api/${userId}", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedInfo),
    });
    alert("회원 정보가 수정되었습니다.");
    window.location.href = "userMyPage.html";
  } catch (err) {
    console.error(err);
    alert("회원 정보 수정에 실패했습니다.");
  }
}

// 회원 탈퇴
async function userDelete(e) {
  e.preventDefault();
  const confirmed = confirm("정말 탈퇴 하시겠습니까?");
  if (confirmed) {
    // api 명세엔 뒤에 email로 되어있는데 코드는 userId 받는걸로 나와있음??
    const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    logout();
    alert("이용해주셔서 감사합니다.");
    window.location.href = "index.html";
  }
}
