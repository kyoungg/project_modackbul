// 회원가입, 회원 정보 수정 폼
export function userForm() {
  const field = `
  <div class="field">
  <label class="label" for="emailInput">이메일</label>
  <input class="input" id="emailInput" type="text" />
  </div>
  <div class="field">
  <label class="label" for="passwdInput">비밀번호</label>
  <input class="input" id="passwdInput" type="password" />
  </div>
  <div class="field">
  <label class="label" for="passwdConfirmInput">비밀번호 확인</label>
  <input class="input" id="passwdConfirmInput" type="password" />
  </div>
  <div class="field">
  <label class="label" for="nameInput">이름</label>
  <input class="input" id="nameInput" type="text" />
  </div>
  <div class="field">
  <label class="label" for="phoneNumInput">전화번호</label>
  <input class="input" id="phoneNumInput" type="text" />
  </div>
  <div class="field">
  <label>주소</label>
  <div class="address">
  <input
    type="text"
    class="input"
    id="postNumber"
    placeholder="우편번호"
    readonly
  />
  <input
    type="button"
    id="findAddressBtn"
    value="주소검색"
    class="findAddressBtn"
  />
  </div>
  </div>
  <div class="field">
  <input
  type="text"
  class="input"
  id="addInput1"
  placeholder="주소"
  readonly
  />
  </div>
  <div class="field">
  <input
  type="text"
  class="input"
  id="addInput2"
  placeholder="상세주소"
  />
  </div>
`;

  return field;
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
      postNumber.value = data.zonecode;
      addressInput1.value = `${addr} ${extraAddr}`;
      // 포커스 다음으로 이동
      addressInput2.focus();
    },
  }).open();
}
