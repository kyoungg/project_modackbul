import { CLICKED_MAJOR_CATEGORY } from "./const.js";

let dummy = [
  {
    major: "텐트",
    minor: ["텐트", "타프", "스크린/방수포"],
  },
  {
    major: "침낭/매트리스",
    minor: ["침낭", "매트리스", "해먹"],
  },
  {
    major: "캠핑랜턴",
    minor: ["손전등", "실내등", "헤드랜턴"],
  },
  {
    major: "식기/조리도구",
    minor: ["식기", "조리도구", "설거지 용품"],
  },
  {
    major: "기타용품/수납",
    minor: ["가방", "캠핑공구", "소품"],
  },
];

let clickedMajor = CLICKED_MAJOR_CATEGORY;

async function getCategoryData() {
  // 현재 dummy의 역할을 나중에 data로 변경해야함.
  const data = await fetch("url");

  return data;
}

/**
 * 카테고리를 렌더링 하는 함수
 */
function renderCategory() {
  // const category = getCategoryData();

  renderMajorCategory();

  renderMinorCategory();
}

/**
 * 상위 카테고리를 렌더링하는 함수
 */
function renderMajorCategory() {
  // const majorCategory = document.getElementsByClassName("major_category")[0];
  const majorCategory = document.querySelector(".major_category");

  // 재렌더링을 위해 자식 요소 삭제
  majorCategory.replaceChildren();

  // 상위 카테고리를 전부 담을 ul 생성
  const majorUl = document.createElement("ul");
  majorUl.classList.add("m-0", "p-0");

  for (let i = 0; i < dummy.length; i++) {
    // 상위 카테고리 하나를 담을 li 생성
    const majorLi = document.createElement("li");
    majorLi.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "border-bottom",
      "border-secondary",
      "py-1"
    );

    // 상위 카테고리 명을 담을 p 생성
    const majorP = document.createElement("p");
    majorP.innerText = `${dummy[i].major}`;
    majorP.classList.add("category_text", "m-0", "w-75", "ps-1");

    majorP.addEventListener("click", changeClickedMajor);

    majorLi.appendChild(majorP);

    // 상위 카테고리 수정을 위한 input 생성
    const majorModifyInput = document.createElement("input");
    majorModifyInput.type = "text";
    majorModifyInput.classList.add(
      "major_modify_input",
      "form-control",
      "d-none"
    );
    majorModifyInput.placeholder = "상위 카테고리 수정";
    majorModifyInput.maxlength = "15";
    majorModifyInput.value = majorP.innerText;

    majorLi.appendChild(majorModifyInput);

    // 상위 카테고리 수정 button 생성
    const modifyBtn = document.createElement("button");
    modifyBtn.innerText = "수정";
    modifyBtn.classList.add(
      "major_modify_btn",
      "btn",
      "btn-outline-warning",
      "w-25"
    );

    modifyBtn.addEventListener("click", modifyMajorHandler);

    majorLi.appendChild(modifyBtn);

    // 상위 카테고리 삭제 button 생성
    const majorDeleteBtn = document.createElement("button");
    majorDeleteBtn.innerText = "삭제";
    majorDeleteBtn.classList.add(
      "major_delete_btn",
      "btn",
      "btn-outline-danger",
      "w-25"
    );

    majorDeleteBtn.addEventListener("click", deleteMajorHandler);

    majorLi.appendChild(majorDeleteBtn);

    majorUl.appendChild(majorLi);
  }

  majorCategory.appendChild(majorUl);
}

/**
 * 하위 카테고리를 렌더링하는 함수
 */
function renderMinorCategory() {
  const minorDiv = document.getElementsByClassName("minor_category")[0];

  // 상위 카테고리가 하나도 존재하지 않는 경우, 그 어떤 것도 표시할 것이 없으므로 렌더링을 진행하지 않는다.
  // 단, 삭제 됐다는 것은 재렌더링을 해줘야하기 때문에, 자식 요소를 삭제하는 것으로 렌더링을 대체.
  if (dummy.length === 0) {
    minorDiv.replaceChildren();
    return;
  }

  // 재렌더링을 위해 자식 요소 삭제
  minorDiv.replaceChildren();

  // 선택된 major 정보 가져오기
  const clickedCategory = dummy.find(
    (category) => category.major === clickedMajor
  );

  // 하위 카테고리가 존재하지 않는 상위 카테고리를 선택한 경우 렌더링은 진행하지 않는다.
  if (clickedCategory.minor === undefined) {
    return;
  }

  // 하위 카테고리를 전부 담을 ul 생성
  const minorUl = document.createElement("ul");
  minorUl.classList.add("m-0", "p-0");

  for (let i = 0; i < clickedCategory.minor.length; i++) {
    // 하위 카테고리 하나를 담을 li 생성
    const minorLi = document.createElement("li");
    minorLi.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "border-bottom",
      "border-secondary",
      "py-1"
    );

    // 하위 카테고리 명을 담을 p 생성
    const minorP = document.createElement("p");
    minorP.innerText = `${clickedCategory.minor[i]}`;
    minorP.classList.add("category_text", "m-0", "w-75", "ps-1");

    minorLi.appendChild(minorP);

    // 하위 카테고리 수정을 위한 input 생성
    const minorModifyInput = document.createElement("input");
    minorModifyInput.type = "text";
    minorModifyInput.classList.add(
      "minor_modify_input",
      "form-control",
      "d-none"
    );
    minorModifyInput.placeholder = "상위 카테고리 수정";
    minorModifyInput.maxlength = "15";
    minorModifyInput.value = minorP.innerText;

    minorLi.appendChild(minorModifyInput);

    // 하위 카테고리 수정 button 생성
    const modifyBtn = document.createElement("button");
    modifyBtn.innerText = "수정";
    modifyBtn.classList.add(
      "minor_modify_btn",
      "btn",
      "btn-outline-warning",
      "w-25"
    );

    modifyBtn.addEventListener("click", modifyMinorHandler);

    minorLi.appendChild(modifyBtn);

    // 하위 카테고리 삭제 button 생성
    const minorDeleteBtn = document.createElement("button");
    minorDeleteBtn.innerText = "삭제";
    minorDeleteBtn.classList.add("btn", "btn-outline-danger", "w-25");

    minorDeleteBtn.addEventListener("click", deleteMinorHandler);

    minorLi.appendChild(minorDeleteBtn);

    minorUl.appendChild(minorLi);
  }

  minorDiv.appendChild(minorUl);
}

/**
 * 클릭된 상위 카테고리를 탐지하여, 그의 하위 카테고리를 렌더링하는 함순
 * @param {Event} e 상위 카테고리 클릭 이벤트
 */
function changeClickedMajor(e) {
  // 선택된 major로 clickedMajor 변경
  clickedMajor = e.target.innerText;

  // minor 카테고리 재렌더링
  renderMinorCategory();
}

const majorBtn = document.querySelector(".major_btn");

majorBtn.addEventListener("click", addMajorHandler);

/**
 * 상위 카테고리를 추가하는 함수
 */
function addMajorHandler() {
  const majorInput = document.querySelector(".major_input");

  if (majorInput.value === "") {
    return alert("1글자 이상 입력해주세요.");
  }

  const addedMajor = majorInput.value;

  majorInput.value = "";
  majorInput.focus();

  const newMajor = {
    major: addedMajor,
  };

  dummy.push(newMajor);

  // await fetch("url", {
  //   method: "POST",
  //       headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: {

  //   },
  // })

  // 상위 카테고리 재렌더링
  renderMajorCategory();
}

const minorBtn = document.querySelector(".minor_btn");

minorBtn.addEventListener("click", addMinorHandler);

/**
 * 하위 카테고리를 추가하는 함수
 */
function addMinorHandler() {
  const minorInput = document.querySelector(".minor_input");

  if (minorInput.value === "") {
    return alert("1글자 이상 입력해주세요.");
  }

  const addedMinor = minorInput.value;

  minorInput.value = "";
  minorInput.focus();

  // 선택된 major 정보 가져오기
  const clickedCategory = dummy.find(
    (category) => category.major === clickedMajor
  );

  if (clickedCategory.minor === undefined) {
    clickedCategory.minor = [addedMinor];
  } else {
    clickedCategory.minor.push(addedMinor);
  }

  // await fetch("url", {
  //   method: "POST",
  //       headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: {

  //   },
  // })

  // 하위 카테고리 재렌더링
  renderMinorCategory();
}

/**
 * 상위 카테고리를 수정할 수 있도록 p 태그를 input 태그로 변환하는 함수
 * @param {Event} e 상위 카테고리 수정 버튼 클릭 이벤트
 */
function modifyMajorHandler(e) {
  const parent = e.target.parentNode;
  const majorP = parent.querySelector(".category_text");
  const majorModifyInput = parent.querySelector(".major_modify_input");

  if (e.target.innerText === "수정") {
    e.target.innerText = "저장";
  } else {
    e.target.innerText = "수정";
  }

  // 수정을 위한 API 통신
  // await fetch("url", {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: {

  //   }
  // })

  // 상위 카테고리 재렌더링
  // API 통신 성공 시 실행해야 됨. 안 그러면 위에서부터 여기까지 쭉 실행 됨.
  // 재렌더링으로 구현하는게 싫다면, 카테고리 데이터에서 필요한 부분만 수정하는 것도 방법.
  // 물론, 그것도 API 통신 성공했을 때 얘기
  // renderMajorCategory();

  const index = dummy.findIndex(
    (category) => category.major === majorP.innerText
  );

  dummy[index].major = majorModifyInput.value;
  majorP.innerText = majorModifyInput.value;
  console.log(dummy);

  majorP.classList.toggle("d-none");
  majorModifyInput.classList.toggle("d-none");
}

/**
 * 하위 카테고리를 수정할 수 있도록 p 태그를 input 태그로 변환하는 함수
 * @param {Event} e 하위 카테고리 수정 버튼 클릭 이벤트
 */
function modifyMinorHandler(e) {
  const parent = e.target.parentNode;
  const minorP = parent.querySelector(".category_text");
  const minorModifyInput = parent.querySelector(".minor_modify_input");

  if (e.target.innerText === "수정") {
    e.target.innerText = "저장";
  } else {
    e.target.innerText = "수정";
  }

  // 수정을 위한 API 통신
  // await fetch("url", {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: {

  //   }
  // })

  // 하위 카테고리 재렌더링
  // API 통신 성공 시 실행해야 됨. 안 그러면 위에서부터 여기까지 쭉 실행 됨.
  // 재렌더링으로 구현하는게 싫다면, 카테고리 데이터에서 필요한 부분만 수정하는 것도 방법.
  // 물론, 그것도 API 통신 성공했을 때 얘기
  // renderMinorCategory();

  // 상위 카테고리를 기준으로 하위 카테고리에 접근하기 위해, 상위 카테고리의 인덱스를 파악
  const majorIndex = dummy.findIndex(
    (category) => category.major === clickedMajor
  );

  // 하위 카테고리의 인덱스를 파악
  const minorIndex = dummy[majorIndex].minor.findIndex(
    (category) => category === minorP.innerText
  );

  dummy[majorIndex].minor.splice(minorIndex, 1, minorModifyInput.value);
  minorP.innerText = minorModifyInput.value;
  console.log(dummy);

  minorP.classList.toggle("d-none");
  minorModifyInput.classList.toggle("d-none");
}

/**
 * 상위 카테고리를 제거하는 함수
 * @param {Event} 상위 카테고리 제거 버튼 클릭 이벤트
 */
function deleteMajorHandler(e) {
  const parent = e.target.parentNode;
  const deleteTargetMajor = parent.querySelector(".category_text").innerText;

  // 상위 카테고리가 삭제된 경우, 하위 카테고리도 삭제되는데
  // 이 때, 삭제된 상위 카테고리가 하위 카테고리를 보여주고 있던 카테고리라면
  // 삭제되버린 상위 카테고리의 하위 카테고리를 렌더링하는 것으로 인해 undefined 에러가 발생한다.
  // 상위 카테고리가 삭제되면 하위 카테고리도 모두 다 삭제되기 때문이다.
  // 따라서, 삭제된 상위 카테고리의 바로 이전 상위 카테고리를 clickedMajor로 간주하여
  // 해당 에러를 회피한다.
  const deletedCategoryIndex = dummy.findIndex(
    (category) => category.major === deleteTargetMajor
  );

  // if (deletedCategoryIndex > 0) {
  //   clickedMajor = dummy[deletedCategoryIndex - 1].major;
  // } else {
  //   clickedMajor = dummy[0].major;
  // }

  // console.log(clickedMajor);

  // 카테고리 데이터에서 해당 상위 카테고리 삭제
  dummy = dummy.filter((category) => category.major !== deleteTargetMajor);

  if (deletedCategoryIndex > 0) {
    clickedMajor = dummy[deletedCategoryIndex - 1].major;
  } else {
    clickedMajor = dummy[0].major;
  }

  console.log(clickedMajor);

  // await fetch("url", {
  //   method: "DELETE",
  //       headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: {

  //   },
  // })

  console.log(dummy);

  // 상위 카테고리로 제거로 인해 하위 카테고리 삭제가 동시 진행될 수 있으므로, 전체 카테고리 재렌더링
  renderCategory();
}

/**
 * 하위 카테고리를 제거하는 함수
 * @param {Event} 하위 카테고리 제거 버튼 클릭 이벤트
 */
function deleteMinorHandler(e) {
  // X 버튼의 이전 형제 요소를 탐색한다. HTML 구조 상 그 요소는 특정한 하위 카테고리를 의미한다.
  // const deleteTargetMinor = e.target.previousSibling.innerText;

  const parent = e.target.parentNode;
  const deleteTargetMinor = parent.querySelector(".category_text").innerText;

  // 하위 카테고리를 포함하는 상위 카테고리의 데이터 상 인덱스 번호 추출
  const majorIndex = dummy.findIndex((category) =>
    category.minor.includes(deleteTargetMinor)
  );

  dummy[majorIndex].minor = dummy[majorIndex].minor.filter(
    (eachMinor) => eachMinor !== deleteTargetMinor
  );

  // await fetch("url", {
  //   method: "DELETE",
  //       headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: {

  //   },
  // })

  // 하위 카테고리 재렌더링
  renderMinorCategory();
}

renderCategory();
