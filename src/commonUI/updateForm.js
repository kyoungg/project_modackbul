// 회원가입, 회원 정보 수정 폼
export function userForm() {
  const field = `
  <div class="mb-3">
  <label for="nameInput" class="form-label">이름</label>
  <input type="text" class="input" id="nameInput">
  </div>
  <div class="mb-3">
  <label class="label" for="emailInput">이메일</label>
  <input class="input" id="emailInput" type="text" />
  </div>
  <div class="mb-3">
  <label class="label" for="currentPasswordInput">현재 비밀번호</label>
  <input class="input" id="currentPasswordInput" type="password" placeholder="비밀번호를 입력해주세요."/>
  </div>
  <div class="mb-3">
  <label class="label" for="passwordInput">새 비밀번호</label>
  <input class="input" id="passwordInput" type="password" />
  </div>
  <div class="mb-3">
  <label class="label" for="phoneNumInput">전화번호</label>
  <input class="input" id="phoneNumInput" type="text" />
  </div>
  <div class="mb-3">
  <label>주소</label>
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
  <div class="mb-3">
  <input
  type="text"
  class="input"
  id="addInput1"
  placeholder="주소"
  readonly
  />
  </div>
  <div class="mb-3">
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
