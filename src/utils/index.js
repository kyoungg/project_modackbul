/**
 * 이메일 입력값을 정규식에 따라 검증하는 함수
 * @param {String} email 이메일 문자열
 * @returns 이메일 형식에 맞으면 true, 아니면 false를 반환
 */
export function checkEmail(email) {
  const regex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

  if (!regex.test(email)) {
    alert("이메일 형식이 올바르지 않습니다.");
    return false;
  }

  return true;
}

/**
 * 이름 입력값을 정규식에 따라 검증하는 함수
 * @param {String} name 이름 문자열
 * @returns 이름 형식에 맞으면 true, 아니면 false 반환
 */
export function checkName(name) {
  const regex = /^[가-힣]{2,4}$/;

  if (!regex.test(name)) {
    alert("이름을 다시 확인해주세요. 한글로 2 ~ 4자 까지 입력 가능합니다.");
    return false;
  }

  return true;
}

/**
 * 휴대전화 번호 입력값을 정규식에 따라 검증하는 함수
 * @param {String} phoneNumber 휴대전화 번호 문자열
 * @returns 휴대전화 번호 형식에 맞으면 true, 아니면 false 반환
 */
export function checkPhoneNumber(phoneNumber) {
  const regex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;

  if (!regex.test(phoneNumber)) {
    alert(
      "휴대전화 번호를 다시 확인해주세요. 000-0000-0000 형식으로 입력해주세요."
    );
    return false;
  }

  return true;
}

// 주소 검색 API
export function findAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = ""; // 주소
      let extraAddr = ""; // 참고 항목

      if (data.userSelectedType === "R") {
        // 도로명 주소
        addr = data.roadAddress;
      } else {
        // 지번 주소
        addr = data.jibunAddress;
      }
      if (data.userSelectedType === "R") {
        // 도로명 주소 선택 시 참고항목 조합하기
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
      } else {
      }
      // 우편번호, 주소 필드에 넣기
      postNumber.value = data.zonecode; // #postNumber (우편번호)
      addInput1.value = `${addr} ${extraAddr}`; // #addInput1 (주소)
      // 포커스 다음으로 이동
      addInput2.focus(); // #addInput2 (상세주소)
    },
  }).open();
}

/**
 * 숫자를 3자리마다 콤마(,) 표시가 생기도록 해주는 함수
 * @param {Number} num number 타입 데이터
 * @returns {String} 3자리마다 콤마(,) 표시가 된 문자열
 */
export function chageNumberToLocaleString(num) {
  // 한국식 숫자 표기로 변경. 3자리마다 쉼표 표시.
  const localedNum = num.toLocaleString("ko-kr");

  return localedNum;
}
