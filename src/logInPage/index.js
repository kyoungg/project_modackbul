import { checkEmail } from "../utils/index.js";

const emailInput = document.querySelector("#emailInput")
const passwordInput = document.querySelector("#passwordInput")
const loginBtn = document.querySelector("#loginBtn")
const nonmemberBtn = document.querySelector("#nonmemberBtn")

// 로그인버튼 이벤트
loginBtn.addEventListener("click", loginSubmit)

async function loginSubmit(e) {
    // preventDefault 안 하면 새로고침됨.
    e.preventDefault()
  
    // 입력값 가져오기
    const email = emailInput.value;
    const password = passwordInput.value; 
    
    // 객체 만듦
    const data = {
      email,
      password
    }
    
    // 입력 여부 확인
    if (!email) {
      return alert("이메일을 입력해 주세요.")
    } else {
      //비밀번호 체크
    }
    
    if (!password) {
      return alert("비밀번호를 입력해 주세요.")
    };
    
    // JSON 만들기
    const dataJson = JSON.stringify(data)
    //로그인 요청 URL
    const apiUrl = `http://localhost:5000/api/users/login`
  
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: dataJson,
    });
    
    if (res.status === loginSuccess) {
      alert("로그인에 성공하였습니다!")
      window.location.href = '/index.html';
    } else {
      alert("로그인에 실패하였습니다...")
      window.location.href = '/loginPage.html';
    }
  }

  //비회원 주문조회 이벤트
  nonmemberBtn.addEventListener("click", ()=>{
    //비회원 주문 조회 페이지로 이동
    window.location.href = '/';
  });
