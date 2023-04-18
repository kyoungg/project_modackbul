/**
 * 숫자를 3자리마다 콤마(,) 표시가 생기도록 해주는 함수
 * @param {Number} num number 타입 데이터
 * @returns {String} 3자리마다 콤마(,) 표시가 된 문자열
 */
export function chageNumberToLocaleString(num) {
  // 한국식 숫자 표기로 변경. 3자리마다 쉼표 표시.
  const localedNum = num.toLocaleString("ko-kr");

  return localedNum;
}
