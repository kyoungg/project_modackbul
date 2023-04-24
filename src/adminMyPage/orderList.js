import { chageNumberToLocaleString } from "../utils/index.js" 

const orderBox = document.querySelector('.orderBox')
const orderList = document.querySelector("#oderList-container")

// 데이터를 받아 요소를 만든 후, html에 삽입
insertOderElement()

const editStatusBtn = document.querySelector("#editStatusBtn")
const orderCancelBtn = document.querySelector("#orderCancelBtn")

//버튼들 중에서, 특정 버튼을 어떻게 구분하지 -> name으로 구분해야지
//근데 그 name을 버튼에 어떻게 할당하지..
//for문을 돌려서 "#deledBtn-${name}" 이런식으로 만들어야 하나..

const ActionFunctions = {
  save: () => window.location.href = "admin-editPage.html",
  cancel: () => { deleteOrder() },
}

orderList.addEventListener('click', e => {
  const action = e.target.dataset.action
  if (action) {
    ActionFunctions[action]()
  }
})

function insertOderElement() {
  // const res = await fetch(`/api/products`) //GET요청으로 사용
  // const Data = await res.json()
  
  //난 더미데이터! 나중에 지워주세요!
  const Data=[{
    "customerId" : "imhoho@gmail.com",
    "customerPhoneNumber" : "010-2000-1300",
    "customerAddress" : "성수 낙낙대로 어쩌구동 어쩌구호",
    "orderStatus" : "배송준비중",
    "cart" : "주문상품목록",
    "total" : 3000000,
    "orderNumber" : "230422001"
  },{
    "customerId" : "soso@gmail.com",
    "customerPhoneNumber" : "010-0010-0001",
    "customerAddress" : "강남 악악대로 어쩌구동 어쩌구호",
    "orderStatus" : "배송중",
    "cart" : "주문상품목록들",
    "total" : 300800,
    "orderNumber" : "230422001"
  }]

  for (let i=0; i<Data.length; i++){
  const orderData = Data[i]

  const orderNumber = orderData.orderNumber
  const id = orderData.customerId
  const totalprice = chageNumberToLocaleString(orderData.total)
  const status = orderData.orderStatus

  //요소 만들기
  orderList.insertAdjacentHTML('beforeend',`
      <div class="container rounded border border-secondary">
        <div class="table-box col">
          <table class="table table-borderless text-center">
            <thead  class="border-bottom">
              <tr>
                <th>주문 번호</th>
                <th>주문자 email</th>
                <th>총 주문 가격</th>
                <th>배송 상태</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="align-middle">
                  <td><div class="orderNumber">${orderNumber}</div></td>
                  <td><div class="orderid">${id}</div></td>
                  <td><div class="totalprice">${totalprice} 원</div></td>
                  <td><div class="orderStatus">
                    <div class="dropdown">
                      <button class="btn btn-light dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      ${status}
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">배송준비중</a></li>
                        <li><a class="dropdown-item" href="#">배송중</a></li>
                        <li><a class="dropdown-item" href="#">배송완료</a></li>
                      </ul>
                        <button type="button" data-action="save" class="btn btn-secondary">등록</button>
                    </div>
                  </div></td>
                  <td>
                  <div class="gap-2 d-md-flex justify-content-md-end">
                    <button type="button" id="orderCancelBtn" data-action="cancel" class="btn btn-danger">주문취소</button>
                  </div>
                  </td>
                </tr>
            </tbody> 
          </table>
        </div>
  `)
  //주문 상태 status가 "배송준비중"이 아닐 경우, 버튼 비활성화 필요
  }
}

//주문 취소 함수
//주문 취소할 할당 함수를 어떻게 구현할지..
//주문 취소되면 페이지 내에서도 삭제되어야함
function deleteOrder(orderNumber) {
  const apiUrl = "/api/orders/:adminId/:orderId" //삭제할 주문정보

  const answer = confirm(
    `정말 주문을 취소하시겠습니까?`
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
        alert(`${orderNumber} 주문 취소에 성공하였습니다!`);
        window.location.href = "/";
      })
      .catch((err) =>
        alert(`주문 취소에 실패하였습니다...`)
      );
  }
}

//배송상태 변경 함수
function editOrderStatus(){
  const apiUrl = "/api/orders/:adminId/:status"//수정하고 싶은 주문 정보:stauts

}