import { api } from './api';

export const fetchIncomeList = (month) => {
  if (!month || month < 1 || month > 12) {
    alert("올바른 월(month) 값을 입력해주세요 (1-12).");
    return;
  }
  return api.get(`/api/income/list`, { params: { month } });
};

export const createIncome = (data) => {
  if (!data) {
    alert("수입 데이터가 필요합니다.");
    return;
  }
  console.log("수입 생성 요청 데이터:", data);
  return api.post("/api/income", {
    incomeDate: data.incomeDate,
    cost: Number(data.cost),
    category: data.category,
    incomeName: data.incomeName,
    asset: data.asset,
  });
};

export const updateIncome = (id, data) => {
  if (!id) {
    alert("수입 ID가 필요합니다.");
    return;
  }
  console.log("수입 수정 요청 데이터:", { id, ...data });
  return api.put(`/api/income/update/${id}`, {
    incomeDate: data.incomeDate,
    cost: Number(data.cost),
    category: data.category,
    incomeName: data.incomeName,
    asset: data.asset,
  });
};

export const deleteIncome = (id) => {
  if (!id) {
    alert("수입 ID가 필요합니다.");
    return;
  }
  return api.delete(`/api/income/delete/${id}`);
};
