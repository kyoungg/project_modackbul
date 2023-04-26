import { chageNumberToLocaleString } from "../utils/index.js" 

//const productBox = document.querySelector(".productBox")
const productListContainer = document.querySelector("#productList-container")

// 데이터를 받아 요소를 만든 후, html에 삽입
insertProductElement()

const editBtn = document.querySelector("#editBtn")
const deleteBtn = document.querySelector("#deleteBtn")
const addproductBtn = document.querySelector("#addproductBtn")

addproductBtn.addEventListener("click", () =>window.location.href = "/admin-addProductPage.html" )

const ActionFunctions = {
  edit: (e) => editPagehandler(e),
  delete: (e) => deleteProduct(e),
}

productListContainer.addEventListener('click', e => {
  const targetName = e.target.closest(".container").dataset.name
  const action = e.target.dataset.action
  if (action) {
    ActionFunctions[action]({
      targetName
    })
  }
})

function insertProductElement() {
  // const res = await fetch(`/api/products`) //GET요청으로 사용
  // const Data = await res.json()
  const dummyData= [{
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
  
  for (let i=0; i<dummyData.length; i++){
  const data = dummyData[i]

  const Productname = data.name
  const Productstock = data.stock
  const Productprice = chageNumberToLocaleString(data.price)
  const Productimg = data.img

  //요소 만들기
  productListContainer.insertAdjacentHTML('beforeend',`
    <div class="container rounded border border-secondary" data-name="${Productname}">
      <div class="row">
        <img class="productImg col" src="${Productimg}">
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
                <td><div class="name ">${Productname}</div></td>
                <td>
                  <div>카테고리</div>
                </td>
                <td><div class="price">${Productprice}원</div></td>
                <td><div class="stock">${Productstock}개</div></td>
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

//페이지 전환 + targetName 넘기는 함수
function editPagehandler(e){
  localStorage.setItem('targetName',e.targetName)
  window.location.href = "/admin-editProductPage.html"
}

//상품 삭제 함수
async function deleteProduct(e) {
  const targetName = e.targetName
  const productName = JSON.stringify(targetName)

  const apiUrl = `http://localhost:5000/api/products/:${productName}` //삭제하고자 하는 상품의 name

  


  const answer = confirm(
    `정말 [${targetName}]상품을 삭제하시겠습니까?`
  )
  if (answer) {
    //API 통신으로 DB에서 상품 삭제
    const res = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
      body: productName,
    });
    
    if (res.status == 200) {
        //상품 삭제 성공시
        alert(`[${targetName}]상품 삭제에 성공하였습니다!`)
        //페이지에서도 삭제되어야함
      } else {
        alert(`상품 삭제에 실패하였습니다...`)
      }
  }
}