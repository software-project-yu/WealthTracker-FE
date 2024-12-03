import { api } from "./api";

export const fetchScheduledPayments = async () => {
  try {
    const response = await api.get("/api/payment/list");
    console.log("GET 요청 성공:", response.data);
    return response.data || [];
  } catch (error) {
    console.error("GET 요청 실패:", error.response?.data || error.message);
    throw error;
  }
};

export const createScheduledPayment = async (data) => {
  if (!data) {
    alert("결제 예정 데이터가 필요합니다.");
    return;
  }
  try {
    console.log("생성 요청 데이터:", data);
    const response = await api.post("/api/payment", {
      paymentDetail: data.paymentDetail,
      dueDate: data.dueDate,
      lastPayment: data.lastPayment,
      cost: Number(data.cost),
      tradeName: data.tradeName,
    });
    console.log("POST 요청 성공:", response.data);
    return response;
  } catch (error) {
    console.error("POST 요청 실패:", error.response?.data || error.message);
    throw error;
  }
};

export const updateScheduledPayment = async (id, data) => {
  if (!id) {
    alert("결제 예정 ID가 필요합니다.");
    return;
  }
  try {
    console.log("수정 요청 데이터:", { id, ...data });
    const formattedData = {
      paymentDetail: data.paymentDetail,
      dueDate: data.dueDate,
      lastPayment: data.lastPayment,
      cost: typeof data.cost === "string" ? Number(data.cost.replace(/[^0-9]/g, "")) : data.cost, // 문자열일 때만 replace 적용
      tradeName: data.tradeName,
    };
    const response = await api.put(`/api/payment/update/${id}`, formattedData);
    console.log("PUT 요청 성공:", response.data);
    return response;
  } catch (error) {
    console.error("PUT 요청 실패:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteScheduledPayment = async (id) => {
  if (!id) {
    alert("결제 예정 ID가 필요합니다.");
    return;
  }
  try {
    console.log("삭제 요청 ID:", id);
    const response = await api.delete(`/api/payment/delete/${id}`);
    console.log("DELETE 요청 성공:", response.data);
    return response;
  } catch (error) {
    console.error("DELETE 요청 실패:", error.response?.data || error.message);
    throw error;
  }
};