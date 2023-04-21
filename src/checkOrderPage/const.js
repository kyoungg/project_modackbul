export const STORAGE_NAME = "orderData";

export const SUMMARY_KEY_LIST = [
  "주문 번호",
  "상품 이름",
  "수량",
  "주문 가격",
  "판매사",
  "배송 상태",
];

export const SUMMARY_PHRASE_LIST = (orderData) => [
  // `${orderData.orderNumber}`,
  "YYMMDD001",
  `${orderData.data[0].name} 외 ${orderData.data.length - 1}개`,
  `총 ${orderData.data.reduce((acc, curr) => {
    return acc + curr.number;
  }, 0)}개`,
  `총 ${orderData.total} 원`,
  `${orderData.data[0].company} 외 ${orderData.data.length - 1}개`,
  `${orderData.orderStatus}`,
];

export const CAN_CHANGE_ORDER_STATE = "상품 준비 중";

export const CHANGE_BUTTON_TEXT = "주문 변경하기";
export const CANCEL_BUTTON_TEXT = "주문 취소하기";
