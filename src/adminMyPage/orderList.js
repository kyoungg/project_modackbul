import { chageNumberToLocaleString, checkAuth } from "../utils/index.js" 

const { isAdmin, token } = checkAuth()

const orderListContainer = document.querySelector("#oderList-container")

// 데이터를 받아 요소를 만든 후, html에 삽입
insertOrderElement()

const editStatusBtn = document.querySelector("#editStatusBtn")
const orderCancelBtn = document.querySelector("#orderCancelBtn")

const ActionFunctions = {
  edit: (e) => editOrerstatusHandler(e),
  cancel: (e) => deleteOrder(e) ,
}

orderListContainer.addEventListener('click', e => {
  const targetNum = e.target.closest(".container").dataset.name
  const targetStatus = targetNum.value
  const action = e.target.dataset.action
  if (action) {
    ActionFunctions[action]({
      targetNum
    })
  }
  console.log(targetNum)
  console.log(targetStatus)
})


//API 통신 으로 주문정보 받아오는 함수
async function getOrderData(){

    const apiUrl = `http://localhost:5000/api/orders/admin`

    const res = await fetch(apiUrl, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization : "bearer " + token,
    },
  });

  if (res.ok) {
    alert(`페이지 로딩이 성공했습니다!`)
    const data = await res.json()
    return data;
  } else {
    alert(`페이지 로딩이 실패했습니다...`)
    }
}

async function insertOrderElement() {

  const data =  await getOrderData()
  const orderData = data.data
  console.log(data)

 //난 더미데이터! 나중에 지워주세요!
//      const Data=[{
//      "customerId" : "imhoho@gmail.com",
//      "customerPhoneNumber" : "010-2000-1300",
//      "customerAddress" : "성수 낙낙대로 어쩌구동 어쩌구호",
//      "orderStatus" : "상품 준비중",
//      "cart" : "주문상품목록",
//      "total" : 3000000,
//      "orderNumber" : "230422001"
//       },{
//      "customerId" : "soso@gmail.com",
//      "customerPhoneNumber" : "010-0010-0001",
//      "customerAddress" : "강남 악악대로 어쩌구동 어쩌구호",
//      "orderStatus" : "배송중",
//     "cart" : "주문상품목록들",
//      "total" : 300800,
//      "orderNumber" : "230400001"
// }]


   for (let i=0; i<orderData.length; i++){
   const data = orderData[i]

   const orderNumber = data.orderNumbers
   const id = data.customerId
   const totalprice = chageNumberToLocaleString(data.total)
   const status = data.orderStatus

   //요소 만들기
   orderListContainer.insertAdjacentHTML('beforeend',`
       <div class="container rounded border border-secondary" data-name="${orderNumber}">
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
                       <input type="text" readonly class="form-control-plaintext text-center" id="orderStatus" value="${status}">
                       ${status === "상품 준비중" ? `<button id="editStatusBtn" data-action="edit" class="btn btn-secondary">발송완료</button>` : `<div></div>`}
                   <td>
                   <div class="gap-2 d-md-flex justify-content-md-end">
                    ${ status === "상품 준비중" ? `<button type="button" id="orderCancelBtn" data-action="cancel" class="btn btn-danger">주문취소</button>`: `<div></div>`}
                   </div>
                   </td>
                 </tr>
             </tbody> 
           </table>
         </div>
   `)
   }
 }

 //주문 취소 함수
 //주문 취소되면 페이지 내에서도 삭제해야함
 async function deleteOrder(e) {

   const targetNum = e.targetNum
   const orderNum = JSON.stringify(targetNum)

   const apiUrl = `http://localhost:5000/api/users/admin/:${orderNum}` //삭제할 주문정보

   const answer = confirm(
     `정말 [주문번호:${targetNum}] 주문을 취소하시겠습니까?`
   )
   if (answer) {
     //API 통신으로 DB에서 주문 삭제
     const res = await fetch(apiUrl, {
       method: 'DELETE',
       headers: {
           'Content-Type': 'application/json',
           Authorization : "bearer " + token + role,
       },
     });
    
     if (res.ok) {
         //상품 삭제 성공시
         alert(`[주문번호:${targetNum}] 주문 취소에 성공하였습니다!`)
         window.location.reload();
       } else {
         alert(`주문 취소에 실패하였습니다...`)
       }
   }
 }

 async function editOrerstatusHandler(e){
   const targetNum = e.targetNum
   const orderNum = JSON.stringify(targetNum)

   //서버에 변경값 전송
   const updateData = {
     orderStatus : "배송중"
   }

   const apiUrl = `http://localhost:5000/api/users/admin/:${orderNum}`

   const answer = confirm(
     `[주문번호:${targetNum}] 발송을 완료하시겠습니까?`
   )
   if (answer) {
     //API 통신으로 DB에서 상품 배송상태 변경
     const res = await fetch(apiUrl, {
       method: 'PATCH',
       headers: {
           'Content-Type': 'application/json',
           Authorization : "bearer " + token,
       },
       body: JSON.stringify(updateData),
     });
    
     if (res.ok) {
         alert(`[주문번호:${targetNum}] 배송상태 변경을 완료하였습니다!`)
         window.location.reload();
       } else {
         alert(`배송상태 변경에 실패하였습니다...`)
       }
   }
 }