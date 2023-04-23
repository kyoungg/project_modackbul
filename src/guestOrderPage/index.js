const guestName = document.querySelector("#guestName");
const orderNumber = document.querySelector("#orderNumber");
const guestOrderBtn = document.querySelector("#guestOrderBtn");

guestOrderBtn.addEventListener("click", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();

  const name = guestName.value;
  const orderNo = orderNumber.value;

  if (!name) {
    return alert("주문자명을 입력하세요.");
  }
  if (!orderNo) {
    return alert("주문번호를 입력하세요.");
  }

  try {
    const res = await fetch(`/api/orders/`);
    const order = await res.json();

    // 주문자 정보 비교
    if (order.orderNumber === orderNo && order.name === name) {
      // 주문 조회 페이지로 이동
      window.location.href = checkOrderPage.html;
    } else {
      alert("요청하신 주문 내역이 없습니다.");
    }
  } catch (error) {
    console.error(error);
  }
}
