import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const useFetchTrans = (url, params) => {
  return useQuery({
    queryKey: [url.includes('expend') ? 'expend' : 'income', params?.month],
    queryFn: async () => {
      try {
        const response = await api.get(url, { params });
        return response.data;
      } catch (error) {
        console.error("API 요청 실패:", error);
        throw error;
      }
    },
    staleTime: 5000,
    cacheTime: 300000
  });
};

export default useFetchTrans;