import { api } from './api';

export const fetchExpendList = (month) => {
  if (!month || month < 1 || month > 12) {
    alert("올바른 월(month) 값을 입력해주세요 (1-12).");
    return;
  }
  return api.get(`/api/expend/list`, { params: { month } });
};

export const createExpend = (data) => {
  if (!data) {
    alert("지출 데이터가 필요합니다.");
    return;
  }
  console.log("생성 요청 데이터:", data);
  return api.post("/api/expend", {
    expendDate: data.expendDate,
    cost: Number(data.cost),
    category: data.category,
    expendName: data.expendName,
    asset: data.asset,
  });
};

export const updateExpend = (id, data) => {
  if (!id) {
    alert("지출 ID가 필요합니다.");
    return;
  }
  console.log("수정 요청 데이터:", { id, ...data });
  return api.put(`/api/expend/update/${id}`, {
    expendDate: data.expendDate,
    cost: Number(data.cost),
    category: data.category,
    expendName: data.expendName,
    asset: data.asset,
  });
};

export const deleteExpend = (id) => {
  if (!id) {
    alert("지출 ID가 필요합니다.");
    return;
  }
  return api.delete(`/api/expend/delete/${id}`);
};
