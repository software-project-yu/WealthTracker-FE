import { api } from './api';

//일별 소비 데이터 조회
export const fetchDailyData = async () => {
  try {
    const response = await api.get('/api/expend/expendList/day');
    return response.data;
  } catch (error) {
    console.error("일별 데이터 조회 실패:", error);
    throw error;
  }
};

//카테고리별 비용 내역 조회
export const fetchExpenseData = async () => {
  try {
    const response = await api.get('/api/expend/expendList');
    return response.data;
  } catch (error) {
    console.error("카테고리별 데이터 조회 실패:", error);
    throw error;
  }
};
