import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
//임시토큰 사용
const initialAccessToken = import.meta.env.VITE_TOKEN;
//localStorage.setItem("accessToken", initialAccessToken);

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const accessToken = initialAccessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.data.error === "INVALID_TOKEN") {
      try {
        // 새로 발급받은 access token으로 재요청
        const newAccessToken = await refreshToken();
        localStorage.setItem("accessToken", newAccessToken);
        // 새로 발급받은 토큰을 원래 요청의 헤더에 추가
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        alert("토큰이 만료되었습니다. 다시 로그인해주세요.");

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }
  const response = await api.post("/refresh-token", { token: refreshToken });
  return response.data.accessToken;
};


//지출 관련 API
export const fetchExpendList = (month) => {
  if (!month || month < 1 || month > 12) {
    throw new Error("올바른 월(month) 값을 입력해주세요 (1-12).");
  }
  return api.get(`/api/expend/list`, { params: { month } });
};

export const createExpend = (data) => {
  console.log("생성 요청 데이터:", data); //디버깅용 로그
  return api.post("/api/expend", {
    expendDate: data.expendDate,
    cost: Number(data.cost),
    category: data.category,
    expendName: data.expendName,
    asset: data.asset,
  });
};

export const updateExpend = (id, data) => {
  if (!id) throw new Error("지출 ID가 필요합니다.");
  console.log("수정 요청 데이터:", { id, ...data }); //디버깅용 로그
  return api.put(`/api/expend/update/${id}`, {
    expendDate: data.expendDate,
    cost: Number(data.cost),
    category: data.category,
    expendName: data.expendName,
    asset: data.asset,
  });
};

export const deleteExpend = (id) => {
  if (!id) throw new Error("지출 ID가 필요합니다.");
  return api.delete(`/api/expend/delete/${id}`);
};

// 수입 관련 API
export const fetchIncomeList = (month) => {
  if (!month || month < 1 || month > 12) {
    throw new Error("올바른 월(month) 값을 입력해주세요 (1-12).");
  }
  return api.get(`/api/income/list`, { params: { month } });
};

export const createIncome = (data) => {
  console.log("수입 생성 요청 데이터:", data); //디버깅용 로그
  return api.post("/api/income", {
    incomeDate: data.incomeDate,
    cost: Number(data.cost),
    category: data.category,
    incomeName: data.incomeName,
    asset: data.asset,
  });
};

export const updateIncome = (id, data) => {
  if (!id) throw new Error("수입 ID가 필요합니다.");
  console.log("수입 수정 요청 데이터:", { id, ...data }); //디버깅용 로그
  return api.put(`/api/income/update/${id}`, {
    incomeDate: data.incomeDate,
    cost: Number(data.cost),
    category: data.category,
    incomeName: data.incomeName,
    asset: data.asset,
  });
};

export const deleteIncome = (id) => {
  if (!id) throw new Error("수입 ID가 필요합니다.");
  return api.delete(`/api/income/delete/${id}`);
};

export default api;