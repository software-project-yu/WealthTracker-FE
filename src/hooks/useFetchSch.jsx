import { useQuery } from "@tanstack/react-query";
import { fetchScheduledPayments } from "../api/scheduleAPI";

const useFetchSch = () => {
  return useQuery({
    queryKey: ["scheduledPayments"],
    queryFn: async () => {
      try {
        return await fetchScheduledPayments();
      } catch (error) {
        if (error.response?.status === 500) {
          console.error("결제 예정 목록 서버 에러:", error.response.data);
        }
        throw error;
      }
    },
    staleTime: 5000,
    cacheTime: 300000,
  });
};

export default useFetchSch;