import { chageNumberToLocaleString } from "../utils/index.js" 

const productBox = document.querySelector(".productBox")
const productList = document.querySelector("#productList-container")

const productcontainer = document.querySelector('#productList-container')

// 데이터를 받아 요소를 만든 후, html에 삽입
insertProductElement()

const editBtn = document.querySelector("#editBtn")
const deleteBtn = document.querySelector("#deleteBtn")
const addproductBtn = document.querySelector("#addproductBtn")

//해당 상품의 수정 페이지로 이동 -> 상품 name을 넘겨줘야함
//버튼들 중에서, 특정 버튼을 어떻게 구분하지 -> name으로 구분해야지
//근데 그 name을 버튼에 어떻게 할당하지..
//for문을 돌려서 "#deledBtn-${name}" 이런식으로 만들어야 하나..?

addproductBtn.addEventListener("click", () =>window.location.href = "admin-addProductPage.html" )

const ActionFunctions = {
  edit: () => window.location.href = "admin-editProductPage.html",
  delete: () => deleteProduct(),
}

productList.addEventListener('click', e => {
  const action = e.target.dataset.action
  if (action) {
    ActionFunctions[action]()
  }
})

function insertProductElement() {
  // const res = await fetch(`/api/products`) //GET요청으로 사용
  // const Data = await res.json()
  
  //난 더미데이터! 나중에 지워주세요!
  const productData=[{
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

  for (let i=0; i<productData.length; i++){
  const data = productData[i]

  const name = data.name
  const stock = data.stock
  const price = chageNumberToLocaleString(data.price)
  const img = data.img


  //요소 만들기
  productcontainer.insertAdjacentHTML('beforeend',`
    <div class="container rounded border border-secondary">
      <div class="row">
        <img class="productImg col" src="${img}">
        <div class="table-box col">
          <table class="table table-borderless text-center">
            <thead  class="border-bottom">
              <tr>
                <th>상품 이름</th>
                <th>카테고리</th>
                <th>가격</th>
                <th>재고</th>
              </tr>
            </thead>
            <tbody>
              <tr class="align-middle">
                <td><div class="name ">${name}</div></td>
                <td>
                  <div>대분류</div>
                  <div>소분류</div>
                </td>
                <td><div class="price">${price}원</div></td>
                <td><div class="stock">${stock}개</div></td>
                </tr>
            </tbody> 
          </table>
        </div>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" data-action="edit" class="btn btn-secondary">Edit</button>
        <button type="button" data-action="delete" class="btn btn-danger">Delete</button>
      </div>
      </div>
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
    fetch (apiUrl, {
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