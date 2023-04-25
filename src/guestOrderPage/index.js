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
    const res = await fetch(`/api/orders?name=${name}&orderNumber=${orderNo}`);
    if (!res.ok) {
      alert("요청하신 주문 내역이 없습니다.");
      return;
    }

    const order = await res.json();
    // 페이지 이동 시 주문번호 포함해서 보내기
    window.location.href = `/orders/${order.orderNumber}`;
  } catch (err) {
    console.error(err);
  }
}
