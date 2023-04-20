import {
  checkEmail,
  checkName,
  checkPhoneNumber,
  findAddress,
} from "../utils/index.js";
import { userForm } from "../commonUI/index.js";

const userInfoForm = document.querySelector(".userInfo");
userInfoForm.innerHTML = userForm();

const emailInput = document.querySelector("#emailInput");
const passwdInput = document.querySelector("#passwdInput");
const passwdConfirmInput = document.querySelector("#passwdConfirmInput");
const nameInput = document.querySelector("#nameInput");
const phoneNumInput = document.querySelector("#phoneNumInput");
const postNumber = document.querySelector("#postNumber");
const addInput1 = document.querySelector("#addInput1");
const addInput2 = document.querySelector("#addInput2");

const findAddressBtn = document.querySelector("#findAddressBtn");
const changeBtn = document.querySelector("#changeBtn");
const deleteBtn = document.querySelector("#deleteBtn");

findAddressBtn.addEventListener("click", findAddress);
changeBtn.addEventListener("click", doCheckout);
deleteBtn.addEventListener("click", userDelete);

// 로그인 한 유저만 접근 가능하게 하기...

// get 기존 유저 정보 불러오기
const data = [
  {
    email: "abc@elice.com",
    password: "1234",
    name: "엘리스",
    phone: "010-1234-5678",
    post: "04799",
    address1: "서울 성동구 아차산로17길 48 (성수동2가)",
    address2: "성수낙낙 2층 엘리스랩",
  },
];

// 기존 정보 값 보여주기
async function getUserData() {
  const userData = data[0];

  nameInput.value = userData.name;
  passwdInput.value = userData.password;
  passwdConfirmInput.value = userData.password;
  postNumber.value = userData.post;
  addInput1.value = userData.address1;
  addInput2.value = userData.address2;
  phoneNumInput.value = userData.phone;
  emailInput.value = userData.email;
}

getUserData();

//입력 값 가져와서 잘 입력했는지 확인
async function doCheckout(e) {
  e.preventDefault();

  const name = nameInput.value;
  const password = passwdInput.value;
  const passwdConfirm = passwdConfirmInput.value;
  const post = postNumber.value;
  const address1 = addInput1.value;
  const address2 = addInput2.value;
  const email = emailInput.value;
  const phoneNum = phoneNumInput.value;

  // 비밀번호 입력 안 했을 때
  if (!password) {
    return alert("비밀번호를 입력해 주세요.");
  }
  // 비밀번호 확인과 비밀번호와 일치하지 않을 때
  if (passwdConfirm !== password) {
    return alert("비밀번호가 일치하지 않습니다.");
  }

  //이메일, 이름, 전화번호 검증
  checkEmail(email);
  checkName(name);
  checkPhoneNumber(phoneNum);

  // 변경된 정보 객체로 저장
  const userObject = {
    email,
    password,
    name,
    phoneNum,
    post,
    address1,
    address2,
  };

  console.log(userObject);

  // 회원정보 수정: PATCH
  try {
    // await Api.patch(`/`, userObject);
    alert("회원 정보가 수정되었습니다.");
    window.location.href = "userMyPage.html";
  } catch (err) {
    console.err(err);
  }
}
// 회원 탈퇴: DELETE
function userDelete() {
  alert("정말 탈퇴 하시겠습니까?");
  window.location.href = "/";
}
