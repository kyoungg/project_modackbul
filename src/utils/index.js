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
