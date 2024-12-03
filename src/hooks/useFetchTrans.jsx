import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";

const useFetchTrans = (url, params) => {
  return useQuery({
    queryKey: [url.includes('expend') ? 'expend' : 'income', params?.month],
    queryFn: async () => {
      try {
        const response = await api.get(url, { params });
        return response.data;
      } catch (error) {
        if (error.response?.status === 500) {
          console.error("서버 에러:", error.response.data);
        }
        throw error;
      }
    },
    staleTime: 5000,
    cacheTime: 300000
  });
};

export default useFetchTrans;
