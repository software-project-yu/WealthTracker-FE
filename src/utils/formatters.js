export const formatDate = (date) => {
  if (!date) return "날짜 없음";
  try {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  } catch (error) {
    console.error('날짜 형식 변환 오류:', error);
    return "날짜 형식 오류";
  }
};

export const formatAmount = (amount) => {
  if (!amount) return "금액 없음";
  try {
    const num = typeof amount === 'string' ? parseInt(amount, 10) : amount;
    return num.toLocaleString('ko-KR') + '원';
  } catch (error) {
    console.error('금액 형식 변환 오류:', error);
    return "금액 형식 오류";
  }
};