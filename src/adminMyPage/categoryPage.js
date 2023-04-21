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
  const majorDiv = document.getElementsByClassName("major_category")[0];

  // 재렌더링을 위해 자식 요소 삭제
  majorDiv.replaceChildren();

  // 상위 카테고리를 전부 담을 ul 생성
  const majorUl = document.createElement("ul");

  for (let i = 0; i < dummy.length; i++) {
    // 상위 카테고리 하나를 담을 li 생성
    const majorLi = document.createElement("li");

    // 상위 카테고리 명을 담을 p 생성
    const majorP = document.createElement("p");
    majorP.innerText = `${dummy[i].major}`;

    majorP.addEventListener("click", changeClickedMajor);

    majorLi.appendChild(majorP);

    // 상위 카테고리 삭제 button 생성
    const majorDeleteBtn = document.createElement("button");
    majorDeleteBtn.innerText = "X";

    majorDeleteBtn.addEventListener("click", deleteMajorHandler);

    majorLi.appendChild(majorDeleteBtn);

    majorUl.appendChild(majorLi);
  }

  majorDiv.appendChild(majorUl);
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

  for (let i = 0; i < clickedCategory.minor.length; i++) {
    // 하위 카테고리 하나를 담을 li 생성
    const minorLi = document.createElement("li");

    // 하위 카테고리 명을 담을 p 생성
    const minorP = document.createElement("p");
    minorP.innerText = `${clickedCategory.minor[i]}`;

    minorLi.appendChild(minorP);

    // 하위 카테고리 삭제 button 생성
    const minorDeleteBtn = document.createElement("button");
    minorDeleteBtn.innerText = "X";

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

const majorBtn = document.getElementsByClassName("major_btn")[0];

majorBtn.addEventListener("click", addMajorHandler);

/**
 * 상위 카테고리를 추가하는 함수
 */
function addMajorHandler() {
  const majorInput = document.getElementsByClassName("major_input")[0];

  const addedMajor = majorInput.value;

  majorInput.value = "";

  // 카테고리 추가 API 통신 진행
  // await fetch("url", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "인증헤더" : 토큰,
  //   },
  //   body: {
  //     item,
  //   },
  // });

  // 추가 후 업데이트된 카테고리 정보를 API 통신으로 가져옴.
  // getCategoryData();

  const newMajor = {
    major: addedMajor,
  };

  dummy.push(newMajor);

  // 상위 카테고리 재렌더링
  renderMajorCategory();
}

const minorBtn = document.getElementsByClassName("minor_btn")[0];

minorBtn.addEventListener("click", addMinorHandler);

/**
 * 하위 카테고리를 추가하는 함수
 */
function addMinorHandler() {
  const minorInput = document.getElementsByClassName("minor_input")[0];

  const addedMinor = minorInput.value;

  minorInput.value = "";

  // 카테고리 추가 API 통신 진행
  // await fetch("url", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "인증헤더" : 토큰,
  //   },
  //   body: {
  //     item,
  //   },
  // });

  // 추가 후 업데이트된 카테고리 정보를 API 통신으로 가져옴.
  // getCategoryData();

  // 선택된 major 정보 가져오기
  const clickedCategory = dummy.find(
    (category) => category.major === clickedMajor
  );

  if (clickedCategory.minor === undefined) {
    clickedCategory.minor = [addedMinor];
  } else {
    clickedCategory.minor.push(addedMinor);
  }

  // 하위 카테고리 재렌더링
  renderMinorCategory();
}

/**
 * 상위 카테고리를 제거하는 함수
 * @param {Event} 상위 카테고리 제거 버튼 클릭 이벤트
 */
function deleteMajorHandler(e) {
  // X 버튼의 이전 형제 요소를 탐색한다. HTML 구조 상 그 요소는 특정한 상위 카테고리를 의미한다.
  const deleteTargetMajor = e.target.previousSibling.innerText;

  // 상위 카테고리가 삭제된 경우, 하위 카테고리도 삭제되는데
  // 이 때, 삭제된 상위 카테고리가 하위 카테고리를 보여주고 있던 카테고리라면
  // 삭제되버린 상위 카테고리의 하위 카테고리를 렌더링하는 것으로 인해 undefined 에러가 발생한다.
  // 상위 카테고리가 삭제되면 하위 카테고리도 모두 다 삭제되기 때문이다.
  // 따라서, 삭제된 상위 카테고리의 바로 이전 상위 카테고리를 clickedMajor로 간주하여
  // 해당 에러를 회피한다.
  const deletedCategoryIndex = dummy.findIndex(
    (category) => category.major === deleteTargetMajor
  );

  if (deletedCategoryIndex > 0) {
    clickedMajor = dummy[deletedCategoryIndex - 1].major;
  } else {
    clickedMajor = null;
  }

  // 카테고리 데이터에서 해당 상위 카테고리 삭제
  dummy = dummy.filter((category) => category.major !== deleteTargetMajor);

  // 상위 카테고리로 제거로 인해 하위 카테고리 삭제가 동시 진행될 수 있으므로, 전체 카테고리 재렌더링
  renderCategory();
}

/**
 * 하위 카테고리를 제거하는 함수
 * @param {Event} 하위 카테고리 제거 버튼 클릭 이벤트
 */
function deleteMinorHandler(e) {
  // X 버튼의 이전 형제 요소를 탐색한다. HTML 구조 상 그 요소는 특정한 하위 카테고리를 의미한다.
  const deleteTargetMinor = e.target.previousSibling.innerText;

  // 하위 카테고리를 포함하는 상위 카테고리의 데이터 상 인덱스 번호 추출
  const majorIndex = dummy.findIndex((category) =>
    category.minor.includes(deleteTargetMinor)
  );

  dummy[majorIndex].minor = dummy[majorIndex].minor.filter(
    (eachMinor) => eachMinor !== deleteTargetMinor
  );

  // 하위 카테고리 재렌더링
  renderMinorCategory();
}

renderCategory();
