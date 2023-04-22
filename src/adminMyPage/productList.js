//Btn clik 이벤트가 하나의 머튼에만 적용되고 있습니다..

const productcontainer = document.querySelector('#productList-container')

// 데이터를 받아 요소를 만든 후, html에 삽입
insertProductElement()

const editBtn = document.querySelector("#editBtn")
const deletBtn = document.querySelector("#deletBtn")

//해당 상품의 수정 페이지로 이동 -> 상품 name을 넘겨줘야함
//버튼들 중에서, 특정 버튼을 어떻게 구분하지 -> name으로 구분해야지
//근데 그 name을 버튼에 어떻게 할당하지..
//for문을 돌려서 "#deledBtn-${name}" 이런식으로 만들어야 하나..?
editBtn.addEventListener("click", () => {window.location.href = "admin-editPage.html";});
deletBtn.addEventListener("click", deleteProduct)

function insertProductElement() {
  // const res = await fetch(`/api/products`) //GET요청으로 사용
  // const Data = await res.json()
  
  //난 더미데이터! 나중에 지워주세요!
  const Data=[{
    "name" : "난 버너",
    "price" : 18000,
    //카테고리
    "description" : "맥주처럼 보이지만 버너입니다. 위에 조리도구를 올려 사용하세요!",
    "summary" : "맥주모양 담요입니다",
    "company" : "happy fire",
    "stock" : 89,
    "img" : "https://as2.ftcdn.net/v2/jpg/05/91/78/95/1000_F_591789500_vRd3qnI9kBZUzWyh2VSNZL61jf4AnJFL.jpg"
  },{
    "name" : "난 물병",
    "price" : 18000,
    //카테고리
    "description" : "향수처럼 보이지만 물병입니다. 마실 수 있어요!",
    "summary" : "향수모양 유리 물병입니다",
    "company" : "아임텀블러",
    "stock" : 10,
    "img" :"https://as2.ftcdn.net/v2/jpg/05/91/06/49/1000_F_591064973_ewRXNLyJqEBgY0ftnhWwzZ5cexrKUg2n.jpg"
  }]

  for (let i=0; i<Data.length; i++){
  const data = Data[i]

  const name = data.name
  const stock = data.stock
  const price = data.price
  const img = data.img

  //요소 만들기
  productcontainer.insertAdjacentHTML('beforeend',`
    <div>
      <img src="${img}">
    </div>
    <h3 class="name">${name}</h3>
    <div>대분류</div>
    <div>소분류</div>
    <div class="price">${price}</div>
    <div class="stock">${stock}</div>
    <div id="editBtn"><button type="button">수정</div>
    <div id="deletBtn"><button type="button">삭제</div>
  `)
  }
}

//상품 삭제 함수
//그런데 삭제할 상품의 Btn들을 어떻게 구분할지..?
function deleteProduct() {
  const apiUrl = "/api/products/:name" //삭제하고싶은 상품의 name

  const answer = confirm(
    `정말 상품을 삭제하시겠습니까?`
  )
  if (answer) {
    fetch (apiurl, {
      method: 'DELETE'
    })
      .then(async (res) => {
        const json = await res.json();

        if (res.ok) {
          return json;
        }

        return Promise.reject(json);
      })
      .then((data) => {
        alert("상품 삭제에 성공하였습니다!");
        window.location.href = "/";
      })
      .catch((err) =>
        alert(`삭제에 실패하였습니다...`)
      );
  }
}
