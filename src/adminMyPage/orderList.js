//Btn clik 이벤트가 하나의 머튼에만 적용되고 있습니다..
//이벤트 위임 옵션 확인하고 적용시켜봅시다.

const oderList = document.querySelector('#oderList-container')

// 데이터를 받아 요소를 만든 후, html에 삽입
insertOderElement()

const editStatusBtn = document.querySelector("#editStatusBtn")
const orderCancelBtn = document.querySelector("#orderCancelBtn")

//해당 상품의 수정 페이지로 이동 -> 상품 name을 넘겨줘야함
//버튼들 중에서, 특정 버튼을 어떻게 구분하지 -> name으로 구분해야지
//근데 그 name을 버튼에 어떻게 할당하지..
//for문을 돌려서 "#deledBtn-${name}" 이런식으로 만들어야 하나..?
editStatusBtn.addEventListener("click", () => {window.location.href = "admin-editPage.html";})
orderCancelBtn.addEventListener("click", deleteOrder)

function insertOderElement() {
  // const res = await fetch(`/api/products`) //GET요청으로 사용
  // const Data = await res.json()
  
  //난 더미데이터! 나중에 지워주세요!
  const Data=[{
    "customerId" : "imhoho@gmail.com",
    "customerPhoneNumber" : "010-2000-1300",
    "customerAddress" : "성수 낙낙대로 어쩌구동 어쩌구호",
    "orderStatus" : "상품 준비중",
    "cart" : "주문상품목록",
    "total" : 3000000,
    "orderNumber" : "230422001"
  },{
    "customerId" : "soso@gmail.com",
    "customerPhoneNumber" : "010-0010-0001",
    "customerAddress" : "강남 악악대로 어쩌구동 어쩌구호",
    "orderStatus" : "배송중",
    "cart" : "주문상품목록들",
    "total" : 3000000,
    "orderNumber" : "230422001"
  }]

  for (let i=0; i<Data.length; i++){
  const orderData = Data[i]

  const orderNumber = orderData.orderNumber
  const id = orderData.customerId
  const totalprice = orderData.total
  const status = orderData.orderStatus

  //요소 만들기
  oderList.insertAdjacentHTML('beforeend',`
    <h3 class="orderNumber">${orderNumber}</h3>
    <div class="orderid">${id}</div>
    <div class="totalprice">${totalprice}</div>
    <div class="orderStatus">${status}</div>
    <div id="editStatusBtn"><button type="button">등록</div>
    <div id="orderCancelBtn"><button type="button">주문취소</div>
  `)
  }
}

//주문 삭제 함수
//주문할 상품의 Btn들을 어떻게 구분할지..?
function deleteOrder() {
  const apiUrl = "/api/orders" //삭제하고 싶은 주문정보...?

  const answer = confirm(
    `정말 주문을 취소하시겠습니까?`
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
        alert("{주문번호} 주문 취소에 성공하였습니다!");
        window.location.href = "/";
      })
      .catch((err) =>
        alert(`주문 취소에 실패하였습니다...`)
      );
  }
}