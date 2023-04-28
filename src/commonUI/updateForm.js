// 회원가입, 회원 정보 수정 폼
export function userForm() {
  const field = `
  <div class="field">
  <label class="label" for="nameInput">이름</label>
  <input class="input" id="nameInput" type="text" />
  </div>
  <div class="field">
  <label class="label" for="emailInput">이메일</label>
  <input class="input" id="emailInput" type="text" />
  </div>
  <div class="field">
  <label class="label" for="currentPasswordInput">현재 비밀번호</label>
  <input class="input" id="currentPasswordInput" type="password" placeholder="비밀번호를 입력해주세요."/>
  </div>
  <div class="field">
  <label class="label" for="passwordInput">새 비밀번호</label>
  <input class="input" id="passwordInput" type="password" />
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
