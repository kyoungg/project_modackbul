const orderBtn = document.querySelector(".orderBtn");
const userInfoBtn = document.querySelector(".userInfoBtn");
const cartBtn = document.querySelector(".cartBtn");

// 토큰 여부로 유저 확인하기
function checkUser() {
  //쿠키에서 토큰을 어떻게 가져오지? httpOnly는 자바스크립트에서 접근이 안되는데...
}

// 주문 내역 조회 버튼 클릭 시 (로그인 여부)
orderBtn.addEventListener("click", () => {
  if (checkUser()) {
    window.location.href = "checkOrderPage.html";
  } else {
    window.location.href = "guestOrderPage.html";
  }
});

// 장바구니 버튼 클릭 시
cartBtn.addEventListener("click", () => {
  window.location.href = "cartPage.html";
});

// 회원 정보를 클릭 시 (로그인 여부)
userInfoBtn.addEventListener("click", () => {
  if (checkUser()) {
    window.location.href = "userMyInfo.html";
  } else {
    alert("로그인 후에 이용해주세요.");
    window.location.href = "loginPage.html";
  }
});
